import {
  isArray,
  isBoolean,
  isFunction,
  isNullish,
  isObject,
  isString,
  isUndefined,
  objectEntries,
  objectFromEntries,
  type Nullable,
  type NullishPrimitives,
  type Optional,
  type Primitives,
} from "@ubloimmo/front-util";
import { isValidElement } from "react";

import { SPACING_PREFIX } from "@types";
import { capitalize, isColorKey, isEmptyString, isPaletteColor } from "@utils";

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
 * Returns a function that searches for a given decorator in an array of lines
 * and returns the value of the decorator if found.
 *
 * @param {string[]} lines - An array of lines to search for the decorator.
 * @param {string} decorator - The decorator to search for in the lines.
 * @return {Nullable<string>} The value of the decorator if found, otherwise null.
 */
const pruneDecorator =
  (lines: string[]) =>
  (decorator: string): Nullable<string> =>
    lines
      .find((line) => line.includes(decorator))
      ?.split(decorator)[1]
      ?.trim() ?? null;

/**
 * Returns a function that checks if a given decorator is present in an array of lines.
 *
 * @param {string[]} lines - An array of lines to search for the decorator.
 * @param {string} decorator - The decorator to search for in the lines.
 * @return {boolean} True if the decorator is found, false otherwise.
 */
const containsDecorator =
  (lines: string[]) =>
  (decorator: string): boolean => {
    return !!lines.find((line) => line.includes(decorator));
  };
/**
 * Parses the JSDoc string and extracts the default value if present.
 *
 * @param {string} jsDoc - The JSDoc string to be parsed
 * @returns {ParsedJsDoc} An object containing the parsed default value, description, and a flag indicating if there's a todo
 */
export const parseJsDoc = (jsDoc: string): ParsedJsDoc => {
  const description = removeJsDocDecorators(jsDoc);
  const lines = jsDoc.split("\n");

  const prune = pruneDecorator(lines);
  const contains = containsDecorator(lines);

  const required = contains("@required");
  const internal = contains("@private");
  const todo = contains("@todo");
  const reason = prune("@todo");
  const defaultValue = prune("@default");
  const version = prune("@version");
  const rawType = prune("@type");
  const prunedType = /{(.+)}/.exec(rawType ?? "");
  const type = prunedType ? prunedType[1] ?? null : null;
  return {
    description,
    defaultValue,
    todo,
    reason,
    version,
    type,
    required,
    internal,
  };
};

const tsGenerics = [
  "Required<",
  "Optional<",
  "Nullable<",
  "Readonly<",
  "Partial<",
  "Omit<",
  "Pick",
];

/**
 * Formats the prop type based on the given TypeScript type and default value.
 *
 * @param {Pick<DocgenPropDef<NullishPrimitives>, "type" | "defaultValue">} param - An object containing the TypeScript type and default value.
 * @param {TsTypeDef} param.type - The TypeScript type definition.
 * @param {PropDefaultValue} param.defaultValue - The default value of the prop.
 * @return {string} The formatted prop type.
 */
const formatPropType = ({
  tsType: type,
  defaultValue,
}: Pick<
  DocgenPropDef<NullishPrimitives>,
  "tsType" | "defaultValue"
>): string => {
  if (!type) {
    type = { name: "unknown" };
  }
  let output = type.name;

  // format enums
  const enumIndexStr = "[number]";
  if (type.name.endsWith(enumIndexStr)) {
    const typeName = type.name.slice(0, -enumIndexStr.length - 1);
    // assume types are names after enums
    output = capitalize(typeName);
  }
  // format unions
  if (type.name === "union" && isArray(type?.elements)) {
    output = type.elements
      .map((nestedType) => formatPropType({ tsType: nestedType }))
      .join(" |\xa0");
  }

  // format literals
  if (type.name === "literal" && isString(type.value)) {
    // replace SPACING LABEL
    output = type.value.replaceAll(
      /\${typeof SPACING_PREFIX}/g,
      SPACING_PREFIX
    );
  }
  const toUnion = (typeStr: string) =>
    typeStr.includes("|")
      ? typeStr.split("|").map((member) => member.trim())
      : [typeStr.trim()];

  if (
    type.name === "signature" &&
    type?.type === "object" &&
    isArray(type?.signature?.properties)
  ) {
    const objectSignature = objectFromEntries(
      type.signature.properties.map((property): [string, string] => [
        property.key,
        formatPropType({ tsType: property.value }),
      ])
    );
    return JSON.stringify(objectSignature, undefined, 2);
  }

  if (
    type.name === "intersection" &&
    isArray(type?.elements) &&
    isString(type.raw)
  ) {
    if (tsGenerics.some((generic) => type.raw?.startsWith(generic))) {
      return type.raw ?? "";
    }
    const rawElements = type.raw.split("&").map((item) => item.trim());
    const elementTypes = type.elements
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
    if (type.name === "Exclude" && isArray(type?.elements)) {
      const [base, intersection] = type.elements;
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
  if (type.name === "unknown") {
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
  tsType: type,
  defaultValue,
  description,
  name: rawName,
}: DocgenPropDef<NullishPrimitives> & { name: string }): ParsedPropInfo => {
  const parsedDescription = parsePropDescription({ description, defaultValue });

  if (!type) {
    type = { name: "unknown" };
  }

  const docGenTypeName: Nullable<string> = (
    type ? /{(.+)}/.exec(type.name) ?? [null, null] : [null, null]
  )[1];
  const docGenType = { ...type, name: docGenTypeName ?? type.name };

  const finalType =
    parsedDescription.type ??
    formatPropType({ tsType: docGenType ?? { name: "unknown" }, defaultValue });

  // remove jsdoc from type string
  const sanitizedType = finalType
    .replaceAll(/\/\*\*[\r\s\S]*?\*\//gi, "")
    .replaceAll(/\n\s*\n/gim, "\n");

  const required = parsedDescription.required || req;
  const requiredStr = required ? "Yes" : "No";
  const name = required ? rawName : `${rawName}?`;
  return {
    ...parsedDescription,
    type: sanitizedType,
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
      if (isObject(value)) {
        const stringObj = JSON.stringify(value, undefined, 2).replaceAll(
          /"(\S+)":\s/gi,
          "$1: "
        );

        const lines = stringObj.split("\n");
        const propObj = lines
          .map((line, index) =>
            index === 0 || index - 1 === lines.length ? line : `  ${line}`
          )
          .join("\n");
        return output(`{${propObj}}`);
      }
      return output(`{${value}}`);
    })
    .filter(
      ([_, value]) => !(isBoolean(value) && !value) && !isUndefined(value)
    );

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
 * Transformed from svg icon generation script
 */
const tagFactory =
  (tagName: string, indentation = 0, printWidth = 80) =>
  (properties?: Record<string, unknown>, children: Primitives = ""): string => {
    const spaces = tagIndentation(indentation);
    const childrenStr = String(children);
    const hasChildren = childrenStr.length > 0;

    const childrenUsage = hasChildren
      ? [
          "\n",
          ...childrenStr
            .split("\n")
            .map((line) => `${tagIndentation(indentation + 1)}${line}`)
            .join("\n"),
          "\n",
          spaces,
        ].join("")
      : "";

    const propMappings = tagProperties(properties);
    const hasProps = propMappings.length > 0;
    const leftTagPrefix = `${spaces}<${tagName}`;
    const propsOneLine = propMappings.join(" ");
    const leftTagOneLineSuffix = hasChildren ? ">" : "/>";
    const leftTagOneLine = `${leftTagPrefix}${
      hasProps ? ` ${propsOneLine}` : ""
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

    const tag = `${leftTag}${childrenUsage}${rightTag}`;

    return tag;
  };

const componentChildrenSourceString = (
  { children }: Record<string, unknown>,
  printWidth = 80,
  indentation = 0
): Optional<string> => {
  if (isNullish(children)) return undefined;
  const componentChildren = isArray(children) ? children : [children];
  if (!componentChildren.length) return undefined;
  const childrenStr = componentChildren
    .map((child) => {
      if (isNullish(child)) return undefined;
      if (isString(child)) return child;
      if (isValidElement(child)) {
        const childName = isString(child.type)
          ? child.type
          : (isObject(child.type) || isFunction(child.type)) &&
            "name" in child.type &&
            isString(child.type.name)
          ? child.type.name
          : isObject(child.type) &&
            "__docgenInfo" in child.type &&
            isObject(child.type.__docgenInfo) &&
            "displayName" in child.type.__docgenInfo &&
            isString(child.type.__docgenInfo.displayName)
          ? child.type.__docgenInfo.displayName
          : "displayName" in child && isString(child.displayName)
          ? child.displayName
          : "UnknownElement";
        const childProps: Record<string, unknown> = isObject(child.props)
          ? (child.props as Record<string, unknown>)
          : {};

        return componentSourceString(
          childName,
          childProps,
          undefined,
          printWidth,
          indentation
        );
      }
      return undefined;
    })
    .filter(isString)
    .join("\n");
  if (isEmptyString(childrenStr)) return undefined;
  return childrenStr;
};

/**
 * Generates the source string for a component with specified properties.
 *
 * @param {string} componentName - The name of the component.
 * @param {Record<string, unknown>} componentProperties - The properties of the component.
 * @param {Record<string, unknown>} [defaultProps] - The default properties of the component (optional). Serves as a mask for the properties.
 * @param {number} [printWidth=80] - The maximum width for printing the properties.
 * @param {number} [indentation=0] - The indentation level for the component.
 * @return {string} The source string for the component with properties.
 */
export const componentSourceString = (
  componentName: string,
  componentProperties: Record<string, unknown>,
  defaultProps?: Record<string, unknown>,
  printWidth = 80,
  indentation = 0
) => {
  const { children, ...restProps } = componentProperties;

  const properties = objectFromEntries(
    objectEntries(restProps).filter(([name, value]) => {
      if (isUndefined(value)) return false;
      if (isString(value) && isEmptyString(value)) return false;
      if (!defaultProps) return true;
      if (!(name in defaultProps)) return false;
      return value !== defaultProps[name];
    })
  );

  const reactChildren = componentChildrenSourceString(
    { children },
    printWidth,
    indentation
  );

  const tagChildren =
    reactChildren ??
    (isNullish(children)
      ? undefined
      : isString(children)
      ? children
      : `{${children}}`);

  return tagFactory(
    componentName,
    indentation,
    printWidth
  )(properties, tagChildren);
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
 * @return {{ source: { language: string; code: string } }} The storybook source parameter
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
): { source: { language: string; code: string } } => {
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
    return componentSource<TComponentProps>(
      componentName,
      mergedPropList,
      defaultProps,
      printWidth
    );
  };
};
