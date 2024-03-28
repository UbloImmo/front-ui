import {
  isArray,
  isString,
  objectEntries,
  type Nullable,
  type NullishPrimitives,
  isBoolean,
  objectFromEntries,
  isNullish,
  type Primitives,
} from "@ubloimmo/front-util";

import { SPACING_PREFIX } from "@types";
import {
  capitalize,
  isColorKey,
  isPaletteColor,
  mergeDefaultProps,
} from "@utils";

import type {
  DocgenPropDef,
  ParsedJsDoc,
  ParsedJsDocDescription,
  ParsedPropInfo,
} from "./docs.types";

/**
 * Removes decorators from a jsdoc string
 * @param {string} jsdoc - A jsdoc string
 * @returns {string} the same string minus any decorators (e.g. `@param`, `@returns`, etc..)
 */
export const removeJsDocDecorators = (jsdoc: string) => {
  return jsdoc
    .split("\n")
    .filter((line) => line[0] !== "@")
    .join("\n")
    .trim();
};

/**
 * Parses the JSDoc string and extracts the default value if present.
 *
 * @param {string} jsDoc - The JSDoc string to be parsed
 * @returns {ParsedJsDoc} An object containing the parsed default value, description, and a flag indicating if there's a todo
 */
export const parseJsDoc = (jsDoc: string): ParsedJsDoc => {
  const lines = jsDoc.split("\n");

  const pruneDecorator = (decorator: string): Nullable<string> =>
    lines
      .find((line) => line.includes(decorator))
      ?.split(decorator)[1]
      ?.trim() ?? null;

  const defaultValue = pruneDecorator("@default");
  const todoLine = lines.find((line) => line.includes("@todo"));
  const todo = !!todoLine;
  const reason = pruneDecorator("@todo");
  const description = removeJsDocDecorators(jsDoc);
  const version = pruneDecorator("@version");
  const rawType = pruneDecorator("@type") ?? "";
  const prunedType = /{(.+)}/.exec(rawType);
  const type = prunedType ? prunedType[1] ?? null : null;
  const required = !!lines.find((line) => line.includes("@required"));
  return {
    description,
    defaultValue,
    todo,
    reason,
    version,
    type,
    required,
  };
};

/**
 * Formats the prop type based on the given TypeScript type and default value.
 *
 * @param {Pick<DocgenPropDef<NullishPrimitives>, "tsType" | "defaultValue">} param - An object containing the TypeScript type and default value.
 * @param {TsTypeDef} param.tsType - The TypeScript type definition.
 * @param {PropDefaultValue} param.defaultValue - The default value of the prop.
 * @return {string} The formatted prop type.
 */
const formatPropType = ({
  tsType,
  defaultValue,
}: Pick<
  DocgenPropDef<NullishPrimitives>,
  "tsType" | "defaultValue"
>): string => {
  let output = tsType.name;

  // format enums
  const enumIndexStr = "[number]";
  if (tsType.name.endsWith(enumIndexStr)) {
    const typeName = tsType.name.slice(0, -enumIndexStr.length - 1);
    // assume types are names after enums
    output = capitalize(typeName);
  }
  // format unions
  if (tsType.name === "union" && isArray(tsType?.elements)) {
    output = tsType.elements
      .map((nestedType) => formatPropType({ tsType: nestedType }))
      .join(" |\xa0");
  }

  // format literals
  if (tsType.name === "literal" && isString(tsType.value)) {
    // replace SPACING LABEL
    output = tsType.value.replaceAll(
      /\${typeof SPACING_PREFIX}/g,
      SPACING_PREFIX
    );
  }
  const toUnion = (typeStr: string) =>
    typeStr.includes("|")
      ? typeStr.split("|").map((member) => member.trim())
      : [typeStr.trim()];

  if (
    tsType.name === "intersection" &&
    isArray(tsType?.elements) &&
    isString(tsType.raw)
  ) {
    const rawElements = tsType.raw.split("&").map((item) => item.trim());
    const elementTypes = tsType.elements
      .map((element) => ({
        ...element,
        name:
          // add missing type info that is present in raw
          rawElements.find((rawElement) => rawElement.includes(element.name)) ??
          element.name,
      }))
      // format each element
      .map((elementType) => formatPropType({ tsType: elementType }));

    return elementTypes.join(" & ");
  }

  // format exculdes
  formatExclude: {
    if (tsType.name === "Exclude" && isArray(tsType?.elements)) {
      const [base, intersection] = tsType.elements;
      if (!base) {
        break formatExclude;
      }
      if (!intersection) {
        return formatPropType({ tsType: base });
      }
      const baseType = formatPropType({ tsType: base });
      const intersectionType = formatPropType({ tsType: intersection });
      // convert base and intersection to unions
      const baseUnion = toUnion(baseType);
      const intersectionUnion = toUnion(intersectionType);
      // remove common members and re-format the union
      const finalUnion = baseUnion.filter(
        (member) => !intersectionUnion.includes(member)
      );
      // re-run through union formatter
      return formatPropType({
        tsType: {
          name: "union",
          elements: finalUnion.map((name) => ({
            name,
          })),
        },
      });
    }
  }

  // handle unpopulated known types
  if (tsType.name === "unknown") {
    // format callbacks
    if (defaultValue?.value === "() => {}") {
      return "Function";
    }

    // format colors if not populated
    if (isColorKey(defaultValue?.value.replaceAll('"', ""))) {
      return "ColorKey";
    }

    if (isPaletteColor(defaultValue?.value.replaceAll('"', ""))) {
      return "PaletteColor";
    }
  }

  return output;
};

/**
 * Parses the description and default value of a prop from a DocgenPropDef object.
 *
 * @param {Pick<DocgenPropDef<NullishPrimitives>, "description" | "defaultValue">} param - An object containing the description and default value of a prop.
 * @return {ParsedJsDocDescription} - An object containing the parsed description, default value, and any additional information from the JSDoc comments.
 */
const parsePropDescription = ({
  description: desc,
  defaultValue: defVal,
}: Pick<
  DocgenPropDef<NullishPrimitives>,
  "description" | "defaultValue"
>): ParsedJsDocDescription => {
  const parsed = parseJsDoc(desc ?? "");
  let description = parsed.description ?? desc ?? "—";
  if (parsed.todo) {
    description += "\n\n_**`TODO`**_";
  }
  if (parsed.reason) {
    description += ` ${parsed.reason}`;
  }
  const defaultValueRaw = parsed.defaultValue ?? defVal?.value ?? "—";
  const defaultValue = defaultValueRaw === "undefined" ? "—" : defaultValueRaw;
  return {
    ...parsed,
    defaultValue,
    description,
  };
};

/**
 * Formats the prop information by extracting relevant data from the given prop definition.
 *
 * @param {DocgenPropDef<NullishPrimitives> & { name: string }} propDef - The prop definition object containing information about the prop.
 * @return {ParsedPropInfo} The formatted prop information object.
 */
export const formatPropInfo = ({
  required: req,
  tsType,
  defaultValue,
  description,
  name: rawName,
}: DocgenPropDef<NullishPrimitives> & { name: string }): ParsedPropInfo => {
  const parsedDescription = parsePropDescription({ description, defaultValue });
  const type =
    parsedDescription.type ??
    formatPropType({ tsType: tsType ?? { name: "unknown" }, defaultValue });
  const required = parsedDescription.required || req;
  const requiredStr = required ? "Yes" : "No";
  const name = required ? rawName : `${rawName}?`;
  return {
    ...parsedDescription,
    type,
    required,
    requiredStr,
    name,
  };
};

/**
 * Generate an array of strings representing the properties of an SVG tag.
 *
 * @param {Record<string, string | number>} properties - optional properties for the SVG tag
 * @param {boolean} isRoot - optional flag indicating if the SVG tag is the root tag
 * @return {string[]} array of strings representing the properties of the SVG tag
 */
const tagProperties = (properties?: Record<string, unknown>): string[] => {
  if (!properties) return [];
  const formattedProps = objectEntries(properties)
    .map(([key, value]) => {
      const output = (
        formattedValue: Nullable<string>
      ): [string, unknown, Nullable<string>] => [key, value, formattedValue];
      if (isBoolean(value)) {
        return output(null);
      }
      if (isString(value)) {
        return output(`"${value}"`);
      }
      return output(`{${value}}`);
    })
    .filter(([_, value]) => !(isBoolean(value) && !value));

  return formattedProps.map(([key, _value, formattedValue]): string => {
    if (!formattedValue) return key;
    return `${key}=${formattedValue}`;
  });
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
 * Factory function for creating TSX tag markup with properties and children.
 *
 * Transformed from svg icon generatio script
 */
const tagFactory =
  (tagName: string, indentation = 0, printWidth = 80) =>
  (properties?: Record<string, unknown>, children: Primitives = ""): string => {
    const spaces = tagIndentation(indentation);
    const childrenStr = String(children);
    const hasChildren = childrenStr.length > 0;
    const childrenUsage = hasChildren
      ? `\n${tagIndentation(indentation + 1)}${children}\n${spaces}`
      : "";
    const propMappings = tagProperties(properties);
    const hasProps = propMappings.length > 0;
    const leftTagPrefix = `${spaces}<${tagName}`;
    const propsOneLine = propMappings.join(" ");
    const leftTagOneLineSuffix = hasChildren ? ">" : "/>";
    const leftTagOneLine = `${leftTagPrefix}${
      hasProps ? ` ${propsOneLine} ` : ""
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
 * Generates the source string for a component with specified properties.
 *
 * @param {string} componentName - The name of the component.
 * @param {Record<string, unknown>} componentProperties - The properties of the component.
 * @param {Record<string, unknown>} [defaultProps] - The default properties of the component (optional). Serves as a mask for the properties.
 * @param {number} [printWidth=80] - The maximum width for printing the properties.
 * @return {string} The source string for the component with properties.
 */
export const componentSourceString = (
  componentName: string,
  componentProperties: Record<string, unknown>,
  defaultProps?: Record<string, unknown>,
  printWidth = 80
) => {
  const { children, ...restProps } = componentProperties;

  const properties = objectFromEntries(
    objectEntries(restProps).filter(([name, value]) => {
      if (!defaultProps) return true;
      if (!(name in defaultProps)) return false;
      return value !== defaultProps[name];
    })
  );

  console.log(properties, componentProperties);

  const tagChildren = isNullish(children)
    ? undefined
    : isString(children)
    ? children
    : `{${children}}`;

  return tagFactory(componentName, 0, printWidth)(properties, tagChildren);
};

/**
 * Generates a template for the source code of a component based on the provided component name,
 * list of props, and optional default props. The generated template is in TSX format and
 * includes the code for each prop in a separate code block.
 *
 * @param {string} componentName - The name of the component.
 * @param {Record<string, unknown>[]} [propList = [{}]] - An array of objects representing the props of the component.
 * @param {Record<string, unknown>} [defaultProps] - An optional object representing the default props of the component.
 * @param {number} [printWidth=80] - The maximum width of the code block in the generated template.
 * @return {string} - The generated template for the source code of the component.
 */
export const componentSourceTemplate = (
  componentName: string,
  propList: Record<string, unknown>[] = [{}],
  defaultProps?: Record<string, unknown>,
  printWidth = 80
) => {
  const components = propList.map((props) =>
    componentSourceString(componentName, props, defaultProps, printWidth)
  );
  return components.join("\n");
};

/**
 * Generates an array of objects with a single property, `propName`, and its corresponding value from `propValues`.
 *
 * @param {string} propName - The name of the property to be included in each object.
 * @param {NullishPrimitives[]} propValues - An array of values to be used for the property `propName`.
 * @return {Record<string, unknown>[]} An array of objects with a single property, `propName`, and its corresponding value from `propValues`.
 */
export const componentPropTemplate = <
  TPropName extends string,
  TPropValue extends NullishPrimitives
>(
  propName: TPropName,
  propValues: TPropValue[]
): { [key in TPropName]: TPropValue }[] => {
  return propValues.map(
    (value) =>
      ({
        [propName]: value,
      } as { [key in TPropName]: TPropValue })
  );
};

/**
 * Generates the storybook source parameter for a component story.
 *
 * @param {string} componentName - The name of the component.
 * @param {Record<string, unknown>[]} [propList=[]] - The list of properties for the component.
 * @param {Record<string, unknown>} [defaultProps] - The default properties for the component.
 * @param {number} [printWidth=80] - The width of the printed code.
 * @return {object} Thestorybook source parameter
 */
export const componentSource = <
  TComponentProps extends Record<string, unknown> = Record<
    string,
    NullishPrimitives
  >,
  TDefaultComponentProps extends Required<TComponentProps> = Required<TComponentProps>
>(
  componentName: string,
  propList: TComponentProps[] = [{} as TComponentProps],
  defaultProps?: TDefaultComponentProps,
  printWidth = 80
) => {
  return {
    source: {
      language: "tsx",
      code: componentSourceTemplate(
        componentName,
        propList,
        defaultProps,
        printWidth
      ),
    },
  };
};

export const componentSourceFactory = <
  TComponentProps extends Record<string, unknown> = Record<
    string,
    NullishPrimitives
  >,
  TDefaultComponentProps extends Required<TComponentProps> = Required<TComponentProps>
>(
  componentName: string,
  fixedProps: TComponentProps = {} as TComponentProps,
  defaultProps?: TDefaultComponentProps,
  printWidth = 80
) => {
  return (propList: TComponentProps[] = [{} as TComponentProps]) => {
    const mergedPropList = propList.map((props) => ({
      ...fixedProps,
      ...props,
    }));
    console.log(fixedProps, propList, mergedPropList);
    return componentSource<TComponentProps>(
      componentName,
      mergedPropList,
      defaultProps,
      printWidth
    );
  };
};
