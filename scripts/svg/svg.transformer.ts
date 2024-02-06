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
import { BootstrapIconFile } from "./svg.types";
import { camelCase, capitalize } from "src/utils/string.utils";

const logger = Logger({
  mode: "simple",
});

const COLOR_PROPERTIES = ["fill", "stroke", "color", "background-color"];

const svgTagProperties = (
  properties?: Record<string, string | number>
): string => {
  if (!properties) return "";

  properties = objectFromEntries(
    objectEntries(properties).map(([key, value]) => {
      // replace hard coded colors with prop usage
      if (COLOR_PROPERTIES.includes(String(key))) {
        return [key, "{color}"];
      }
      // replace hard coded sizes with prop usage
      if (key === "width" || key === "height") {
        return [key, "{size}"];
      }
      return [key, `"${value}"`];
    })
  );

  // remove class property
  const { class: _, ...propertiesWithoutClass } = properties;

  return Object.entries(propertiesWithoutClass)
    .map(([key, value]) => `${key}=${value}`)
    .join(" ");
};

const svgTagFactory =
  (tagName: string, indentation = 0) =>
  (
    properties?: Record<string, string | number>,
    children: Primitives = ""
  ): string => {
    const spaces = Array(indentation).fill("  ").join("");
    const childrenStr = String(children);
    const hasChildren = childrenStr.length > 0;
    const childrenUsage = hasChildren ? `\n${children}\n${spaces}` : "";
    const leftTag = `${spaces}<${tagName} ${svgTagProperties(properties)} ${
      hasChildren ? ">" : " />"
    }`;
    const rightTag = hasChildren ? `</${tagName}>` : "";

    return `${leftTag}${childrenUsage}${rightTag}`;
  };

const svgTextNodeToTsx = (node: SvgTextNode): string => {
  return String(node.value);
};

const svgElementNodeToTsx = (
  { tagName = "", properties, children: childNodes }: SvgElementNode,
  indentation = 0
): string => {
  const svgTag = svgTagFactory(tagName, indentation);
  const children = childNodes
    .map((childNode) =>
      svgNodeToTsx(
        isString(childNode) ? { value: childNode, type: "text" } : childNode,
        indentation + 1
      )
    )
    .join("\n");

  return svgTag(properties, children);
};

const svgNodeToTsx = (node: SvgNode, indentation = 0) => {
  if (node.type === "text") {
    return svgTextNodeToTsx(node);
  }
  return svgElementNodeToTsx(node, indentation);
};

const svgRootNodeToTsx = (node: SvgRootNode) => {
  return svgNodeToTsx(node.children[0], 2);
};

const componentDeclarationTemplate = (name: string, render: string) => {
  const componentName = capitalize(camelCase(name));
  const componentPropsType = `${componentName}Props`;
  const defaultPropsName = `default${componentName}`;
  return `
type ${componentPropsType} = {
  color: PaletteColor;
  size?: Omit<CssLength, CssFr>;
}

const ${defaultPropsName}: Required<${componentPropsType}> = {
  color: "primary-base",
  size: "1rem"
} as const;

/**
 * Bootstrap icon: ${name}
 * Auto-generated before NPM release
 *
 * @params {${componentPropsType}} props - the icon's size and color
 * @returns {JSX.Element} - the icon
 */
export const ${componentName} = (props: ${componentPropsType}) => {
  const { color, size } = useMemo(() => ({
    color: cssVarUsage(props.color ?? ${defaultPropsName}.color),
    size: cssLengthUsage(props.size ?? ${defaultPropsName}.size),
  }), [props]);

  return (
${render}
  );
};
  `;
};

const bootstrapIconFileToTsx = ({ name, svg }: BootstrapIconFile) => {
  const importTemplate = `
// TODO: imports
  `;

  const tsx = svgRootNodeToTsx(parseSvgStr(svg));

  return `
  ${importTemplate}
  ${componentDeclarationTemplate(name, tsx)}
  
  `;
};

const parseSvgStr = (svgStr: string): SvgRootNode => {
  const node: SvgRootNode = parser.parse(svgStr);
  return node;
};

const BOOTSTRAP_ICONS_DIR = "./node_modules/bootstrap-icons/icons";

const getBootstrapIconFiles = async (): Promise<BootstrapIconFile[]> => {
  const svgFilesNames = await readdir(BOOTSTRAP_ICONS_DIR);

  return await Promise.all(
    svgFilesNames.map(async (svgFileName) => {
      const filePath = `${BOOTSTRAP_ICONS_DIR}/${svgFileName}`;
      const iconName = svgFileName.replace(".svg", "");
      const file = Bun.file(filePath);
      const fileContents = await file.text();
      return {
        name: iconName,
        svg: fileContents,
        type: "bootstrap",
      };
    })
  );
};

const parseBootstrapIcons = async () => {
  const bootstrapIconFiles = await getBootstrapIconFiles();
  const bootstrapIcons = bootstrapIconFiles.map((iconFile) => {
    return bootstrapIconFileToTsx(iconFile);
  });
  logger.debug(bootstrapIcons.join("\n"));
  return bootstrapIcons;
};

const transformSvgs = async () => {
  await parseBootstrapIcons();
};

transformSvgs();
