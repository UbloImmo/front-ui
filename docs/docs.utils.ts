import {
  isArray,
  isString,
  type Nullable,
  type NullishPrimitives,
} from "@ubloimmo/front-util";
import type {
  DocgenPropDef,
  ParsedJsDoc,
  ParsedJsDocDescription,
  ParsedPropInfo,
} from "./docs.types";
import { capitalize, isColorKey, isPaletteColor } from "@utils";
import { SPACING_PREFIX } from "@types";

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
  return {
    description,
    defaultValue,
    todo,
    reason,
    version,
    type,
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
  const required = req ? "Yes" : "No";
  const name = req ? rawName : `${rawName}?`;
  return {
    ...parsedDescription,
    type,
    required,
    name,
  };
};
