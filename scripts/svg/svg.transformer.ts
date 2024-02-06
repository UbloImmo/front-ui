import {
  Logger,
  Primitives,
  isString,
  objectEntries,
  objectFromEntries,
} from "@ubloimmo/front-util";
import parser, {
  RootNode as SvgRootNode,
  Node as SvgNode,
  TextNode as SvgTextNode,
  ElementNode as SvgElementNode,
} from "svg-parser";
import { readdir } from "node:fs/promises";
import {
  BootstrapIconFile,
  CustomIconFile,
  IconFileType,
  NormalizedIconFileDeclaration,
} from "./svg.types";
import { camelCase, capitalize } from "src/utils/string.utils";
import { isBootstrapIconFile } from "./svg.utils";
import { icons } from "@ubloimmo/front-tokens/lib/icons";

const logger = Logger({
  mode: "simple",
});
const LOGGER_NAME = "svg transform";

const COLOR_PROPERTIES = ["fill", "stroke", "color", "background-color"];

/**
 * Generate an array of strings representing the properties of an SVG tag.
 *
 * @param {Record<string, string | number>} properties - optional properties for the SVG tag
 * @param {boolean} isRoot - optional flag indicating if the SVG tag is the root tag
 * @return {string[]} array of strings representing the properties of the SVG tag
 */
const svgTagProperties = (
  properties?: Record<string, string | number>,
  isRoot?: boolean
): string[] => {
  if (!properties) return [];

  properties = objectFromEntries(
    objectEntries(properties).map(([key, value]) => {
      const formattedKey = camelCase(key);
      // replace hard coded colors with prop usage
      if (COLOR_PROPERTIES.includes(String(key))) {
        return [formattedKey, "{color}"];
      }
      // replace hard coded sizes with prop usage
      if (isRoot && (key === "width" || key === "height")) {
        return [formattedKey, "{size}"];
      }
      return [formattedKey, `"${value}"`];
    })
  );

  // remove class property
  const { class: _, ...propertiesWithoutClass } = properties;

  return objectEntries(propertiesWithoutClass).map(
    ([key, value]): string => `${key}=${value}`
  );
};

/**
 * Function to generate indentation string based on the provided indentation level.
 *
 * @param {number} indentation - The level of indentation to generate the string for
 * @return {string} The generated indentation string
 */
const tagIndentation = (indentation: number): string =>
  Array(indentation).fill("  ").join("");

/**
 * Factory function for creating SVG tag markup with properties and children.
 */
const svgTagFactory =
  (tagName: string, indentation = 0, printWidth = 80) =>
  (
    properties?: Record<string, string | number>,
    children: Primitives = ""
  ): string => {
    const spaces = tagIndentation(indentation);
    const childrenStr = String(children);
    const hasChildren = childrenStr.length > 0;
    const childrenUsage = hasChildren ? `\n${children}\n${spaces}` : "";
    const propMappings = svgTagProperties(properties, tagName === "svg");
    const hasProps = propMappings.length > 0;
    // construct left tag;
    const leftTagPrefix = `${spaces}<${tagName}`;

    const propsOneLine = propMappings.join(" ");

    const leftTagOneLineSuffix = hasChildren ? ">" : "/>";
    const leftTagOneLine = `${leftTagPrefix}${
      hasProps
        ? ` ${propsOneLine}${
            propsOneLine.charAt(propsOneLine.length - 1) === "}" ? " " : ""
          }`
        : ""
    }${leftTagOneLineSuffix}`;

    const leftTagMultilineSuffix = hasChildren
      ? `\n${spaces}>`
      : `\n${spaces}/>`;
    const leftTagMultiline = `${leftTagPrefix}\n${propMappings
      .map((mapping) => `${tagIndentation(indentation + 1)}${mapping}`)
      .join("\n")}${leftTagMultilineSuffix}`;

    const overflows =
      leftTagOneLine.length >= printWidth && propMappings.length > 1;

    const leftTag = overflows ? leftTagMultiline : leftTagOneLine;

    const rightTag = hasChildren ? `</${tagName}>` : "";

    return `${leftTag}${childrenUsage}${rightTag}`;
  };

/**
 * Convert an SVG text node to a TypeScript JSX string.
 *
 * @param {SvgTextNode} node - The SVG text node to be converted
 * @return {string} The TypeScript JSX string representation of the SVG text node
 */
const svgTextNodeToTsx = (node: SvgTextNode): string => {
  logger.log(`encountered text node: ${node.value}`, LOGGER_NAME);
  return String(node.value);
};

/**
 * Converts an SVG element node to TSX syntax.
 *
 * @param {SvgElementNode} param - The SVG element node to be converted
 * @param {number} indentation - The number of spaces for indentation
 * @return {string} The TSX syntax of the SVG element
 */
const svgElementNodeToTsx = (
  { tagName = "", properties, children: childNodes }: SvgElementNode,
  indentation = 0
): string => {
  logger.log(`converting ${tagName} to tsx syntax...`, LOGGER_NAME);

  const svgTag = svgTagFactory(tagName, indentation);

  const children = childNodes
    .map((childNode) =>
      svgNodeToTsx(
        isString(childNode) ? { value: childNode, type: "text" } : childNode,
        indentation + 1
      )
    )
    .join("\n");

  const tsxTag = svgTag(properties, children);

  logger.log(`converted ${tagName} to tsx syntax:\n${tsxTag}`, LOGGER_NAME);
  return tsxTag;
};

/**
 * Convert a given SVG node to a TSX element string.
 *
 * @param {SvgNode} node - The SVG node to be converted
 * @param {number} indentation - The level of indentation for the TSX element
 * @return {string} - The converted tsx element string
 */
const svgNodeToTsx = (node: SvgNode, indentation = 0): string => {
  if (node.type === "text") {
    return svgTextNodeToTsx(node);
  }
  return svgElementNodeToTsx(node, indentation);
};

/**
 * Converts a SVG root node to TSX format.
 *
 * @param {SvgRootNode} node - the SVG root node to be converted
 * @return {type} the TSX representation of the SVG root node
 */
const svgRootNodeToTsx = (node: SvgRootNode) => {
  return svgNodeToTsx(node.children[0], 2);
};

/**
 * Generates an icon component declaration string.
 *
 * @param {string} name - description of parameter
 * @param {string} componentName - description of parameter
 * @param {string} render - description of parameter
 * @param {IconFileType} type - description of parameter
 * @return {string} - the icon component string
 */
const componentDeclarationTemplate = (
  name: string,
  componentName: string,
  render: string,
  type: IconFileType
) => {
  return `/**
 * React component generated from ${type} icon: \`${name}\`.
 * Auto-generated before NPM release
 *
 * @params {CommonIconDefaultProps} props - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ${componentName} = (props: CommonIconDefaultProps) => {
  const { color, size } = useMemo(() => {
    const mergedProps = mergeDefaultProps(commonIconDefaulProps, props);
    return {
      color: cssVarUsage(mergedProps.color),
      size: cssLengthUsage(mergedProps.size),
    };
  }, [props]);

  return (
${render}
  );
};`;
};

/**
 * Convert an icon file to a normalized icon file declaration.
 *
 * @param {BootstrapIconFile | CustomIconFile} iconFile - the icon file to be converted
 * @return {NormalizedIconFileDeclaration} the normalized icon file declaration
 */
const iconFileDeclaration = (
  iconFile: BootstrapIconFile | CustomIconFile
): NormalizedIconFileDeclaration => {
  const { svg, name } = iconFile;
  const type: IconFileType = isBootstrapIconFile(iconFile)
    ? "bootstrap"
    : "custom";
  const importTemplate = `import { useMemo } from "react";
import { CommonIconDefaultProps, commonIconDefaulProps } from "../common.types";
import {
  cssLengthUsage,
  cssVarUsage,
  mergeDefaultProps,
} from "../../../../utils";`;

  const tsxReturn = svgRootNodeToTsx(parseSvgStr(svg));

  const componentName = capitalize(camelCase(name));

  const tsx = `${importTemplate}
${componentDeclarationTemplate(name, componentName, tsxReturn, type)}
`;

  return {
    tsx,
    name,
    svg,
    type,
    componentName,
  };
};

const parseSvgStr = (svgStr: string): SvgRootNode => {
  logger.log("parsing svg string...", LOGGER_NAME);
  const node: SvgRootNode = parser.parse(svgStr);
  logger.log("parsed svg string", LOGGER_NAME);
  return node;
};

const BOOTSTRAP_ICONS_DIR = "./node_modules/bootstrap-icons/icons";

const getBootstrapIconFiles = async (): Promise<BootstrapIconFile[]> => {
  logger.info(
    `fetching bootstrap svg icons list from ${BOOTSTRAP_ICONS_DIR}...`,
    LOGGER_NAME
  );

  const svgFilesNames = await readdir(BOOTSTRAP_ICONS_DIR);

  logger.log(
    `found ${svgFilesNames.length} svg files in ${BOOTSTRAP_ICONS_DIR}`,
    LOGGER_NAME
  );

  logger.log("retrieving file contents...", LOGGER_NAME);

  const iconFiles = await Promise.all(
    svgFilesNames.map(async (svgFileName) => {
      const filePath = `${BOOTSTRAP_ICONS_DIR}/${svgFileName}`;
      const iconName = svgFileName.replace(".svg", "");
      const file = Bun.file(filePath);
      const fileContents = await file.text();
      const type: IconFileType = "bootstrap";
      return {
        name: iconName,
        svg: fileContents,
        type,
      };
    })
  );

  logger.info(`retrieved ${iconFiles.length} bootstrap svg icons`, LOGGER_NAME);

  return iconFiles;
};

const generateBootstrapIconFiles = async (): Promise<
  NormalizedIconFileDeclaration[]
> => {
  logger.info("generate bootstrap icons", LOGGER_NAME);
  const bootstrapIconFiles = await getBootstrapIconFiles();
  return bootstrapIconFiles.map((iconFile) => {
    return iconFileDeclaration(iconFile);
  });
};

const getCustomIconFiles = (): CustomIconFile[] => {
  return [...icons];
};

const generateCustomIconFiles = (): NormalizedIconFileDeclaration[] => {
  const customIconFiles = getCustomIconFiles();
  return customIconFiles.map((iconFile) => {
    return iconFileDeclaration(iconFile);
  });
};

export const transformSvgs = async () => {
  logger.info("begin", LOGGER_NAME);
  const bootstrapIcons = await generateBootstrapIconFiles();
  const customIcons = generateCustomIconFiles();
  return {
    bootstrapIcons,
    customIcons,
  };
};
