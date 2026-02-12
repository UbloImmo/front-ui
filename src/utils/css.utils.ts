import {
  GenericFn,
  isArray,
  isFunction,
  isNullish,
  isNumber,
  isObject,
  isString,
  isUndefined,
  Nullish,
  objectFromEntries,
  Optional,
  Predicate,
} from "@ubloimmo/front-util";
import { CSSProperties, useMemo } from "react";

import { isEmptyString, isNonEmptyString } from "./string.utils";
import { SPACING_PREFIX } from "../types";
import { isPaletteColor } from "./color.utils";
import { isMap } from "./comparison.utils";

import type {
  CssCh,
  CssColorMix,
  CssColorSpace,
  CssDeg,
  CssFr,
  CssLength,
  CssLengthUsage,
  CssPercent,
  CssPx,
  CssRem,
  CssVar,
  CssVarName,
  CssVarUsage,
  FixedCssLength,
  PaletteColor,
  RgbaColorStr,
  SpacingLabel,
} from "@types";

export const REM_FACTOR = 16 as const;

/**
 * Converts a number value to a value in pixels.
 *
 * @param {number} px - the value in numbers to be converted to css pixels
 * @return {CssPx} the converted value in css pixels
 */
export const cssPx = (px: number): CssPx => `${px}px`;

/**
 * Converts a number value to a value in rems.
 *
 * @param {number} rem - the value in numbers to be converted to css rems
 * @return {CssRem} the converted value in css rems
 */
export const cssRem = (rem: number): CssRem => `${rem}rem`;

/**
 * Converts a value in number pixels to a value in number rems.
 *
 * @param {number} px - the value in number pixels to be converted to number rems
 * @param {number} [toFixed] - The amount of digits after the decimal point.
 * @return {number} the converted value in numbers rems
 */
export const pxToRem = (px: number, toFixed?: number): number => {
  const rem = px / REM_FACTOR;
  if (!isNumber(toFixed)) return rem;
  return Number(rem.toFixed(toFixed));
};

/**
 * Converts a value in number rems to a value in number pixels.
 *
 * @param {number} rem - the value in number rems to be converted to number pixels
 * @param {number} [toFixed] - The amount of digits after the decimal point.
 * @return {number} the converted value in numbers pixels
 */
export const remToPx = (rem: number, toFixed?: number): number => {
  const px = rem * REM_FACTOR;
  if (!isNumber(toFixed)) return px;
  return Number(px.toFixed(toFixed));
};

/**
 * Extracts the numerical value from a CSS length value in pixels.
 *
 * @param {CssPx} cssPx - the CSS length value in pixels
 * @return {number} the numerical value extracted from the CSS length value
 */
export const extractPx = (cssPx: CssPx): number =>
  parseFloat(cssPx.split("px")[0]);

/**
 * Extracts the numerical value from a CSS rem unit and returns it as a number.
 *
 * @param {CssRem} cssRem - a string representing a CSS rem unit
 * @return {number} the numerical value extracted from the CSS rem unit
 */
export const extractRem = (cssRem: CssRem): number =>
  parseFloat(cssRem.split("rem")[0]);

/**
 * Converts a value in pixels to a value in rems using the provided utility functions.
 *
 * @param {CssPx} cssPx - the value in pixels to be converted to rems
 * @param {number} [toFixed] - The amount of digits after the decimal point.
 * @return {CssRem} the converted value in rems
 */
export const cssPxToCssRem = (cssPx: CssPx, toFixed?: number): CssRem =>
  cssRem(pxToRem(extractPx(cssPx), toFixed));

/**
 * Convert a value from CSS rem units to CSS px units.
 *
 * @param {CssRem} cssRem - the value in CSS rem units
 * @param {number} [toFixed] - The amount of digits after the decimal point.
 * @return {CssPx} the value in CSS px units
 */
export const cssRemToCssPx = (cssRem: CssRem, toFixed?: number): CssPx =>
  cssPx(remToPx(extractRem(cssRem), toFixed));

/**
 * Predicate that checks if the given value is a CSS pixel value.
 *
 * @param {unknown} value - The value to be checked.
 * @return {boolean} Whether the value is a CSS pixel value.
 */
export const isCssPx = (value: unknown): value is CssPx => {
  if (!isString(value) || !value.includes("px") || isNaN(parseFloat(value))) {
    return false;
  }
  return true;
};

/**
 * Predicate that checks if the input value is a CSS rem value.
 *
 * @param {unknown} value - the value to be checked
 * @return {boolean} true if the input value is a CSS rem value, false otherwise
 */
export const isCssRem = (value: unknown): value is CssRem => {
  if (!isString(value) || !value.includes("rem") || isNaN(parseFloat(value))) {
    return false;
  }
  return true;
};

/**
 * Generates a CSS variable name by prefixing the input name with '--'.
 *
 * @param {string} name - The input name for the CSS variable
 * @return {CssVarName} The generated CSS variable name
 */
export const cssVarName = (name: string): CssVarName => `--${name}`;

/**
 * Returns a CSS variable declaration with the provided name and value.
 *
 * @template {string} TValue - the type of the Css variable's value
 * @param {string} name - the name of the CSS variable
 * @param {TValue} value - the value of the CSS variable
 * @return {CssVar<TValue>} the CSS variable declaration
 */
export const cssVar = <TValue extends string = string>(
  name: string,
  value: TValue
): CssVar<TValue> => `${cssVarName(name)}: ${value};`;

/**
 * Returns a CSS variable usage with the provided name.
 *
 * @param {string} name - the name of the CSS variable
 * @return {CssVarUsage} the usage of the CSS variable
 */
export const cssVarUsage = (name: string): CssVarUsage =>
  `var(${cssVarName(name)})`;

/**
 * Returns a {@link CssFr} string with the given number.
 *
 * @param {number} fr - The number to be concatenated with 'fr'.
 * @return {CssFr} The string with the concatenated number and 'fr' unit.
 */
export const cssFr = (fr: number): CssFr => {
  return `${fr}fr`;
};

/**
 * Returns a {@link CssDeg} string with the given number.
 *
 * @param {number} deg - The number to be concatenated with 'deg'.
 * @return {CssDeg} The string with the concatenated number and 'deg' unit.
 */
export const cssDeg = (deg: number): CssDeg => {
  return `${deg}deg`;
};

/**
 * Type guard to check if the input value is of type {@link CssFr}.
 *
 * @param {unknown} value - The value to be checked
 * @return {boolean} Whether the input value is of type CssFr
 */
export const isCssFr = (value: unknown): value is CssFr => {
  if (!isString(value) || !value.includes("fr")) {
    return false;
  }
  const frValue = parseFloat(value.split("fr")[0]);
  if (isNaN(frValue)) return false;

  return true;
};

/**
 * Type guard to check if the input value is of type {@link CssPercent}.
 *
 * @param {unknown} value - The value to be checked
 * @return {boolean} Whether the input value is of type CssFr
 */
export const isCssPercent = (value: unknown): value is CssPercent => {
  if (!isString(value) || !value.includes("%")) {
    return false;
  }
  const percentValue = parseFloat(value.split("%")[0]);
  if (isNaN(percentValue)) return false;

  return true;
};

/**
 * Type guard to check if the input value is of type {@link CssCh}.
 *
 * @param {unknown} value - The value to be checked
 * @return {boolean} Whether the input value is of type CssCh
 */
export const isCssCh = (value: unknown): value is CssCh => {
  if (!isString(value) || !value.includes("ch")) {
    return false;
  }
  const chValue = parseFloat(value.split("ch")[0]);
  if (isNaN(chValue)) return false;

  return true;
};

/**
 * Type guard to check if the input value is of type {@link CssVarName}.
 *
 * It checks if the value is a string that starts with "--" and if the substring
 * after "--" is a non-empty string.
 *
 * @param {unknown} value - The value to be checked
 * @return {boolean} Whether the input value is of type CssVarName
 */
export const isCssVarName = (value: unknown): value is CssVarName => {
  if (!isString(value) || !value.startsWith("--")) return false;
  return isNonEmptyString(value.split("--")[1]);
};

/**
 * Checks if the given value is a {@link SpacingLabel} by validating its format and scale.
 *
 * @param {unknown} value - the value to be checked
 * @return {boolean} true if the value is a {@link SpacingLabel}, false otherwise
 */
export const isSpacingLabel = (value: unknown): value is SpacingLabel => {
  if (!isString(value) || !value.startsWith(SPACING_PREFIX)) return false;

  const scaleStr = value.split(SPACING_PREFIX)[1];
  if (isUndefined(scaleStr)) return false;
  const scale = parseInt(scaleStr);

  if (isNaN(scale)) return false;

  return true;
};

/**
 * Type guard to check if the input value is of type {@link CssLength}.
 *
 * @param {unknown} value - The value to be checked
 * @return {boolean} Whether the input value is of type CssLength
 */
export const isCssLength = (value: unknown): value is CssLength => {
  return (
    isNumber(value) ||
    isSpacingLabel(value) ||
    isCssRem(value) ||
    isCssPx(value) ||
    isCssFr(value) ||
    isCssPercent(value) ||
    isCssCh(value)
  );
};

/**
 * Type guard to check if the input value is of type {@link FixedCssLength}.
 *
 * A {@link FixedCssLength} is a CSS length that is not relative to the
 * viewport size. It can be a number, a {@link SpacingLabel}, a CSS `rem`
 * length, or a CSS `px` length.
 *
 * @param {unknown} value - The value to be checked
 * @return {boolean} Whether the input value is of type FixedCssLength
 */
export const isFixedCssLength = (value: unknown): value is FixedCssLength => {
  return (
    isNumber(value) ||
    isSpacingLabel(value) ||
    isCssRem(value) ||
    isCssPx(value)
  );
};

/**
 * Parses an input {@link CssLength} into its corresponding {@link CssLengthUsage}.
 *
 * @remarks number values are converted to rem values, spacings labels are converted to their corresponding {@link CssVarUsage}
 *
 * @param {CssLength} length - the flex gap value to be processed
 * @return {CssLengthUsage} the processed CSS value
 */
export const cssLengthUsage = (length: CssLength): CssLengthUsage => {
  if (isNumber(length)) {
    return cssRem(length);
  }
  if (
    isCssPx(length) ||
    isCssRem(length) ||
    isCssCh(length) ||
    isCssPercent(length) ||
    isCssFr(length)
  ) {
    return length;
  }
  if (isSpacingLabel(length)) {
    return cssVarUsage(length);
  }
  return length;
};

/**
 * Checks if the value is a valid {@link CssLengthUsage}
 * by checking if it is a number, a CSS pixel value, a CSS rem value, or a SpacingLabel
 *
 * @param {unknown} value - the value to check
 * @return {boolean} true if the value is a CssLengthUsage, false otherwise
 */
export const isCssLengthUsage = (value: unknown): value is CssLengthUsage => {
  return (
    isNumber(value) ||
    isCssPx(value) ||
    isCssRem(value) ||
    isSpacingLabel(value) ||
    isCssPercent(value) ||
    isCssFr(value) ||
    isCssCh(value)
  );
};

/**
 * Parses a CSS variable into its name and value.
 *
 * @param {CssVar<string>} variable - the CSS variable to parse
 * @return {{ name: CssVarName; value: string }} the name and value of the CSS variable
 */
export const parseCssVar = <TValue extends string>(
  variable: CssVar<TValue>
): { name: CssVarName; value: TValue } => {
  const [name, value] = variable
    .split(":")
    .map((part) => part.trim().replaceAll(";", "")) as [CssVarName, TValue];
  return { name, value };
};

/**
 * Checks if a value is a valid CSS color-mix() function string
 *
 * @param {unknown} value - The value to check
 * @returns {boolean} True if the value is a valid CSS color-mix() function string, false otherwise
 *
 * @example
 * isCssColorMix("color-mix(in oklab, rgba(255, 255, 255, 1), var(--primary-base))") // true
 * isCssColorMix("not-a-color-mix") // false
 */
export const isCssColorMix = (value: unknown): value is CssColorMix => {
  if (!isString(value)) return false;
  if (!value.startsWith("color-mix(in ")) return false;
  if (!value.endsWith(")")) return false;
  return true;
};

/**
 * Creates a CSS color-mix() function string by mixing two colors in a specified color space
 *
 * @param {RgbaColorStr | CssVarUsage | CssColorMix | [RgbaColorStr | CssVarUsage | CssColorMix, CssPercent]} colorA - First color to mix, can be a color string, CSS variable, existing color-mix, or tuple with percentage
 * @param {RgbaColorStr | CssVarUsage | CssColorMix | [RgbaColorStr | CssVarUsage | CssColorMix, CssPercent]} colorB - Second color to mix, can be a color string, CSS variable, existing color-mix, or tuple with percentage
 * @param {CssColorSpace} [colorSpace="oklab"] - Color space to perform mixing in
 * @returns {CssColorMix} CSS color-mix() function string
 *
 * @example
 * cssColorMix("rgba(255,255,255,1)", "var(--primary-base)")
 * // "color-mix(in oklab, rgba(255,255,255,1), var(--primary-base))"
 *
 * cssColorMix(["rgba(255,255,255,1)", "40%"], "var(--primary-base)")
 * // "color-mix(in oklab, rgba(255,255,255,1) 40%, var(--primary-base))"
 */
export const cssColorMix = (
  colorA:
    | RgbaColorStr
    | PaletteColor
    | "white"
    | CssColorMix
    | [RgbaColorStr | PaletteColor | "white" | CssColorMix, CssPercent],
  colorB:
    | RgbaColorStr
    | PaletteColor
    | "white"
    | CssColorMix
    | [RgbaColorStr | PaletteColor | "white" | CssColorMix, CssPercent],
  colorSpace: CssColorSpace = "oklab"
): CssColorMix => {
  const normalizeColor = (stop: typeof colorA) => {
    if (isArray(stop)) {
      const [color, percent] = stop;
      const colorUsage =
        isPaletteColor(color) || color === "white" ? cssVarUsage(color) : color;
      if (!isCssPercent(percent)) return colorUsage;
      return `${colorUsage} ${percent}`;
    }
    if (isPaletteColor(stop)) return cssVarUsage(stop);
    return stop;
  };
  const a = normalizeColor(colorA);
  const b = normalizeColor(colorB);
  return `color-mix(in ${colorSpace}, ${a}, ${b})`;
};

type CssClassRecord =
  | Record<string, Nullish<boolean>>
  | Map<string, Nullish<boolean>>;
type CssClassArray = (
  | Nullish<string>
  | [className: string, active: Nullish<boolean>]
)[];
type CssClassInput = CssClassArray | [CssClassRecord];

/**
 * Predicate typescript function that checks whether a provided {@link CssClassInput} contains a single {@link CssClassRecord}
 *
 * @param {CssClassInput} classes — css class input value to check
 * @returns — true if the value corresponds to a {@link CssClassRecord}
 */
const isClassRecord = (classes: CssClassInput): classes is [CssClassRecord] => {
  return (
    isArray(classes) &&
    classes.length === 1 &&
    !isArray(classes[0]) &&
    (isObject(classes[0]) || isMap(classes[0]))
  );
};

const isClassArray = isArray as Predicate<CssClassArray>;

// TODO: add unit tests for newly added utils (cssClasses, cssStyles, cssVariables)

/**
 * Combines multiple Css classes into a single string
 *
 * @param {CssClassInput} classes - List of classes to combine
 * @returns {Optional<string>} A concatenated string containing all provided active classes or undefined if none active
 *
 * @example
 * cssClasses("base", "secondary", ["not-included", false], ["included", true])
 * // -> "base secondary included"
 * cssClasses("base", "secondary", "included")
 * // -> "base secondary included"
 * cssClasses({ base: true, secondary: true, "not-included": false, included: true })
 * // -> "base secondary included"
 */
export const cssClasses = (...classes: CssClassInput): Optional<string> => {
  if (!classes.length) return undefined;

  let classStr = "";

  const appendClass = (classKey: string) => {
    classStr += ` ${classKey}`;
  };

  if (classes.length === 1 && isNonEmptyString(classes[0])) return classes[0];

  if (isClassRecord(classes)) {
    const record: Record<string, Nullish<boolean>> = isMap(classes[0])
      ? objectFromEntries(Array.from(classes[0].entries()))
      : classes[0];
    for (const classKey in record) {
      const active = record[classKey];
      if (active) appendClass(classKey);
    }
    if (isEmptyString(classStr)) return undefined;
    return classStr.trim();
  }

  for (const item of classes) {
    if (isNonEmptyString(item)) appendClass(item);
    if (!isClassArray(item)) continue;
    const [classKey, active] = item;
    if (active) appendClass(classKey);
  }

  if (isEmptyString(classStr)) return undefined;
  return classStr.trim();
};

/**
 * Memoized {@link cssClasses} utility. Combines multiple Css classes into a single string.
 * @param {CssClassInput} classes - List of classes to combine
 * @returns {Optional<string>} A concatenated string containing all provided active classes or undefined if none active
 *
 * @example
 * useCssClasses("base", "secondary", ["not-included", false], ["included", true])
 * // -> "base secondary included"
 * useCssClasses("base", "secondary", "included")
 * // -> "base secondary included"
 * uCssClasses({ base: true, secondary: true, "not-included": false, included: true })
 * // -> "base secondary included"
 */
export const useCssClasses = (...classes: CssClassInput): Optional<string> => {
  return useMemo<Optional<string>>(() => cssClasses(...classes), [classes]);
};

/**
 * Builds a {@link CSSProperties} CSS styles object containing CSS variable assignements from an object.
 * Keys are variable names and get prepended with `--`.
 * Filters `null` & `undefined` values out before stringifying them.
 *
 * @param {Record<string, Nullish<string | number>>} variables - CSS variable declarations
 * @returns {CSSProperties} Valid CSS style object holding CSS variable declarations.
 *
 * @example
 * const vars = cssVariables({
 *   size: "2rem",
 *   "my-color": "red",
 *   padding: null,
 *   margin: undefined
 * });
 * console.log(vars);
 * // { "--size": "2rem", "--my-color": "red" };
 */
export const cssVariables = (
  variables: Record<string, Nullish<string | number>>
): CSSProperties => {
  const vars: Record<string, string> = {};

  if (!variables) return vars;

  for (const varName in variables) {
    const value = variables[varName];
    if (isNullish(value)) continue;
    vars[cssVarName(varName)] = String(value);
  }

  return vars as CSSProperties;
};

/**
 * Augmented version of {@link cssVariables} in hook form.
 * Takes an additional `override` argument.
 *
 * @param {Record<string, Nullish<string | number>> | GenericFn<[], Record<string, Nullish<string | number>>>} variables - Either an object containing CSS varaibles to transform or a synchronous function returning one.
 * @param {Nullish<CSSProperties>} [override] - Optional style object to spread into the returned styles.
 * @returns {CSSProperties} - Valid CSS style object holding CSS variable declarations and overrides (if provided).
 *
 * @example
 * const styles = useCssVariables({
 *   size: "2rem",
 *   "my-color": "red",
 *   padding: null,
 *   margin: undefined
 * }, {
 *  marginTop: "2px",
 *  background: "blue",
 * });
 * console.log(styles);
 * // { "--size": "2rem", "--my-color": "red", marginTop: "2px", background: "blue" };
 */
export const useCssVariables = (
  variables:
    | Record<string, Nullish<string | number>>
    | GenericFn<[], Record<string, Nullish<string | number>>>,
  override?: Nullish<CSSProperties>
): CSSProperties => {
  return useMemo(() => {
    const baseVars = isFunction<
      GenericFn<[], Record<string, Nullish<string | number>>>
    >(variables)
      ? variables()
      : variables;
    const vars = cssVariables(baseVars);
    if (!override) return vars;
    return {
      ...vars,
      ...override,
    };
  }, [variables, override]);
};

/**
 * Merges multiple CSS style objects into one, overriding properties is needed.
 * @param {Nullish<CSSProperties>[]} ...styles - List of css style objects to merge
 * @returns {CSSProperties} Merged CSS style object
 */
export const cssStyles = (
  ...styles: Nullish<CSSProperties>[]
): CSSProperties => {
  if (!styles || !styles.length) return {};
  return Object.assign({}, ...styles.filter(isObject));
};

/**
 * Memoized version of {@link cssStyles}
 * @param {Nullish<CSSProperties>[]} ...styles - List of css style objects to merge
 * @returns {CSSProperties} Merged CSS style object
 */
export const useCssStyles: typeof cssStyles = (
  ...styles: Nullish<CSSProperties>[]
): CSSProperties => {
  return useMemo(() => cssStyles(...styles), [styles]);
};

/**
 * Naive type predicate that tells typescript if a value is a {@link CSSProperties} object
 * by checking if it is any JS object and not an array
 */
export const isCssProperties: Predicate<CSSProperties> = (
  value: unknown
): value is CSSProperties => isObject(value) && !isArray(value);
