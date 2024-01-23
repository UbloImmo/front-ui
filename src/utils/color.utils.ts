import {
  HexColor,
  HexColorAlpha,
  HexColorShorthand,
  HexColorShorthandAlpha,
  HexComponentDouble,
  hexRegex,
  RgbaColorArr,
  RgbaColorObj,
  RgbaColorStr,
  AnyColor,
} from "../types";
import { isString, isObject, isArray } from "@ubloimmo/front-util";
import { lerp } from "./number.utils";

/**
 * Converts an RGBA color string to an RGBA color array.
 *
 * @param {RgbaColorStr} colorStr - The RGBA color string to convert.
 * @return {RgbaColorArr} - The converted RGBA color array.
 */
const rgbaColorStrToArr = (colorStr: RgbaColorStr): RgbaColorArr => {
  const rgbaValues = colorStr
    .split("rgba(")[1]
    .split(")")[0]
    .split(",")
    .map((numberStr) => parseInt(numberStr.trim()));
  return rgbaValues as RgbaColorArr;
};

/**
 * Converts an RGBA color array to an RGBA color string.
 *
 * @param {RgbaColorArr} colorArr - The RGBA color array to convert.
 * @return {RgbaColorStr} The converted RGBA color string.
 */
const rgbaColorArrToStr = (colorArr: RgbaColorArr): RgbaColorStr => {
  return `rgba(${colorArr.join(", ")})` as RgbaColorStr;
};

/**
 * Converts an RGBA color string to an RGBA color object.
 *
 * @param {RgbaColorStr} colorStr - The RGBA color string to convert.
 * @returns {RgbaColorObj} The RGBA color object.
 */
const rgbaColorStrToObj = (colorStr: RgbaColorStr): RgbaColorObj => {
  const [r, g, b, a] = rgbaColorStrToArr(colorStr);
  return { r, g, b, a };
};

/**
 * Converts an RGBA color array to an RGBA color object.
 *
 * @param {RgbaColorArr} colorArr - The RGBA color array to be converted.
 * @return {RgbaColorObj} The converted RGBA color object.
 */
const rgbaColorArrToObj = (colorArr: RgbaColorArr): RgbaColorObj => {
  const [r, g, b, a] = colorArr;
  return { r, g, b, a };
};

/**
 * Converts an RGBA color object to a string representation.
 *
 * @param {RgbaColorObj} colorObj - The RGBA color object to convert.
 * @return {RgbaColorStr} The string representation of the RGBA color.
 */
const rgbaColorObjToStr = (colorObj: RgbaColorObj): RgbaColorStr => {
  const { r, g, b, a } = colorObj;
  return rgbaColorArrToStr([r, g, b, a]);
};

/**
 * Convert an RGBA color object to an RGBA color array.
 *
 * @param {RgbaColorObj} colorObj - The RGBA color object to be converted.
 * @return {RgbaColorArr} The converted RGBA color array.
 */
const rgbaColorObjToArr = (colorObj: RgbaColorObj): RgbaColorArr => {
  const { r, g, b, a } = colorObj;
  return [r, g, b, a];
};

/**
 * Predicate that checks if the given string is a valid hexadecimal color string.
 *
 * @param {unknown} rootStr - The string to be checked.
 * @return {boolean} Returns true if the string is a valid hexadecimal color string, false otherwise.
 */
export const isValidHexStr = (rootStr: unknown): rootStr is HexColor => {
  const supportedHexColorLengths = [4, 5, 7, 9];
  if (
    typeof rootStr !== "string" ||
    !supportedHexColorLengths.includes(rootStr.length) ||
    rootStr[0] !== "#"
  ) {
    return false;
  }
  return hexRegex.test(rootStr);
};

/**
 * Converts a hexadecimal color shorthand (#RGB) or shorthand alpha (#RGBA)
 * to a hexadecimal color with alpha (#RRGGBBAA).
 *
 * @remarks If no alpha information is provided, defaults to FF (100% opacity)
 *
 * @param {HexColorShorthand | HexColorShorthandAlpha} hexColorShorthand - The hexadecimal color shorthand or shorthand alpha to be converted.
 * @return {HexColorAlpha} The hexadecimal color with alpha.
 */
const hexColorShorthandToHexColorAlpha = (
  hexColorShorthand: HexColorShorthand | HexColorShorthandAlpha
): HexColorAlpha => {
  const [hashtag, redComponent, greenComponent, blueComponent, alphaComponent] =
    hexColorShorthand.split("");
  return [
    hashtag,
    redComponent,
    redComponent,
    greenComponent,
    greenComponent,
    blueComponent,
    blueComponent,
    alphaComponent ?? "F",
    alphaComponent ?? "F",
  ].join("") as HexColorAlpha;
};

/**
 * Converts a hexadecimal component (2 characters) to an RGB component (0-255).
 *
 * @param {HexComponentDouble} hexComponent - The hexadecimal component to convert.
 * @return {number} The converted RGB component.
 */
const hexComponentDoubleToRgbComponent = (
  hexComponent: HexComponentDouble
): number => {
  return parseInt(hexComponent, 16);
};

/**
 * Converts a hexadecimal alpha component (00-FF) to an RGB alpha component (0-1f).
 *
 * @param {HexComponentDouble} hexComponent - The hexadecimal alpha component to convert.
 * @return {number} The converted RGB alpha component.
 */
const hexAlphaComponentToRgbAlphaComponent = (
  hexComponent: HexComponentDouble
): number => {
  return parseInt(hexComponent, 16) / 255;
};

/**
 * Checks if the given hex color is in the format of a hex color with an alpha value (#RRGGBBAA).
 *
 * @param {HexColor} hexColor - The hex color to check.
 * @return {boolean} Returns true if the hex color has an alpha value, false otherwise.
 */
const isHexColorAlpha = (hexColor: unknown): hexColor is HexColorAlpha => {
  return isValidHexStr(hexColor) && hexColor.length === 9;
};

/**
 * Checks if a hex color string is in shorthand format (#RGB).
 *
 * @param {HexColor} hexColor - The hex color string to check.
 * @return {boolean} Returns true if the hex color is in shorthand format, false otherwise.
 */
const isHexColorShorthand = (
  hexColor: unknown
): hexColor is HexColorShorthand => {
  return isValidHexStr(hexColor) && hexColor.length === 4;
};

/**
 * Determines if the given hex color is in shorthand alpha format (#RGBA).
 *
 * @param {HexColor} hexColor - The hex color to check.
 * @return {boolean} Returns true if the hex color is in shorthand alpha format, false otherwise.
 */
const isHexColorShorthandAlpha = (
  hexColor: unknown
): hexColor is HexColorShorthandAlpha => {
  return isValidHexStr(hexColor) && hexColor.length === 5;
};

/**
 * Converts any hex color format (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
 * to a hex color with alpha channel (#RRGGBBAA).
 *
 * @param {HexColor} hexColor - The hex color to convert.
 * @throws {Error} when an unsupported hex color is provided.
 * @return {HexColorAlpha} The hex color with alpha channel.
 */
const hexColorToHexColorAlpha = (hexColor: HexColor): HexColorAlpha => {
  if (!isValidHexStr(hexColor)) {
    throw new Error("Unsupported hex color provided");
  }
  if (isHexColorAlpha(hexColor)) {
    return hexColor;
  }
  if (isHexColorShorthand(hexColor) || isHexColorShorthandAlpha(hexColor)) {
    return hexColorShorthandToHexColorAlpha(hexColor);
  }
  return `${hexColor}FF` as HexColorAlpha;
};

/**
 * Converts an RGB component (0-255) to a double hex component (00-FF).
 *
 * @param {number} rgbComponent - The RGB component to convert.
 * @return {HexComponentDouble} - The double hex component.
 */
const rgbComponentToHexComponentDouble = (
  rgbComponent: number
): HexComponentDouble => {
  const hexComponent = rgbComponent.toString(16);
  return (
    hexComponent.length === 1 ? `0${hexComponent}` : hexComponent
  ).toUpperCase() as HexComponentDouble;
};

/**
 * Converts the alpha component of an RGB color (0-1) to a hexadecimal alpha component (00-FF).
 *
 * @param {number} alphaComponent - The alpha component of the RGB color (0-1).
 * @return {HexComponentDouble} The hexadecimal alpha component (00-FF).
 */
const rgbAlphaComponentToHexAlphaComponent = (
  alphaComponent: number
): HexComponentDouble => {
  const hexComponent = Math.round(alphaComponent * 255).toString(16);
  return (
    hexComponent.length === 1 ? `0${hexComponent}` : hexComponent
  ).toUpperCase() as HexComponentDouble;
};

/**
 * Converts a hexadecimal color string (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
 * to an RGBA color array ( [R, G, B, A] ).
 *
 * @param {HexColor} hexColor - The hexadecimal color string to convert.
 * @return {RgbaColorArr} - The resulting RGBA color array.
 */
const hexColorToRgbaColorArr = (hexColor: HexColor): RgbaColorArr => {
  const hexColorAlpha = hexColorToHexColorAlpha(hexColor);
  const componentIndices: [number, number][] = [1, 3, 5, 7].map((index) => [
    index,
    index + 2,
  ]);

  /**
   * Extracts `HexComponentDouble` by slicing the `hexColorAlpha` string
   * from the specified `indices` and converting it to uppercase.
   *
   * @remarks cast is necessary to at least get a bit of type safety while dealing with limited TS type complexity
   *
   * @param {Array<number>} indices - The starting and ending indices of the slice.
   * @return {HexComponentDouble} - The sliced component in uppercase.
   */
  const sliceHexColor = (indices: [number, number]): HexComponentDouble => {
    return hexColorAlpha
      .slice(indices[0], indices[1])
      .toUpperCase() as HexComponentDouble;
  };

  const r = hexComponentDoubleToRgbComponent(
    sliceHexColor(componentIndices[0])
  );
  const g = hexComponentDoubleToRgbComponent(
    sliceHexColor(componentIndices[1])
  );
  const b = hexComponentDoubleToRgbComponent(
    sliceHexColor(componentIndices[2])
  );
  const a = hexAlphaComponentToRgbAlphaComponent(
    sliceHexColor(componentIndices[3])
  );
  return [r, g, b, a];
};

/**
 * Converts a hexadecimal color string to an RGBA color string.
 *
 * @param {HexColor} hexColor - The hexadecimal color code to convert.
 * @return {RgbaColorStr} The RGBA color string representation of the given hexadecimal color code.
 */
const hexColorToRgbaColorStr = (hexColor: HexColor): RgbaColorStr => {
  return rgbaColorArrToStr(hexColorToRgbaColorArr(hexColor));
};

/**
 * Converts a hexadecimal color string to an RGBA color object.
 *
 * @param {HexColor} hexColor - The hexadecimal color code to convert.
 * @return {RgbaColorObj} - The RGBA color object.
 */
const hexColorToRgbaColorObj = (hexColor: HexColor): RgbaColorObj => {
  return rgbaColorArrToObj(hexColorToRgbaColorArr(hexColor));
};

/**
 * Converts an RGBA color array to a hexadecimal color with alpha (#RRGGBBAA).
 *
 * @param {RgbaColorArr} rgbaColorArr - The RGBA color array to be converted.
 * @return {HexColorAlpha} The hexadecimal color with alpha.
 */
const rgbaColorArrToHex = (rgbaColorArr: RgbaColorArr): HexColorAlpha => {
  const [r, g, b, a] = rgbaColorArr;
  const hexColorStr = [r, g, b]
    .map((rgbComponent) => rgbComponentToHexComponentDouble(rgbComponent))
    .join("");
  const hexAlphaStr = rgbAlphaComponentToHexAlphaComponent(a);
  return `#${hexColorStr}${hexAlphaStr}` as HexColorAlpha;
};

/**
 * Converts an RGBA color string to a hex color with alpha value (#RRGGBBAA).
 *
 * @param {RgbaColorStr} rgbaColorStr - The RGBA color string to convert.
 * @return {HexColorAlpha} The hex color with alpha value.
 */
const rgbaColorStrToHex = (rgbaColorStr: RgbaColorStr): HexColorAlpha => {
  return rgbaColorArrToHex(rgbaColorStrToArr(rgbaColorStr));
};

/**
 * Converts an RGBA color object to a hexadecimal color with alpha channel (#RRGGBBAA).
 *
 * @param {RgbaColorObj} rgbaColorObj - The RGBA color object to be converted.
 * @return {HexColorAlpha} The hexadecimal color with alpha channel.
 */
const rgbaColorObjToHex = (rgbaColorObj: RgbaColorObj): HexColorAlpha => {
  return rgbaColorArrToHex(rgbaColorObjToArr(rgbaColorObj));
};

/**
 * Converts any color format to an RGBA color array.
 *
 * @param {AnyColor} anyColor - the color to be converted
 * @return {RgbaColorArr} the RGBA color array
 */
const anyColorToRgbaColorArr = (anyColor: AnyColor): RgbaColorArr => {
  if (isValidHexStr(anyColor)) {
    return hexColorToRgbaColorArr(anyColor);
  }
  if (isObject(anyColor) && !isArray(anyColor)) {
    return rgbaColorObjToArr(anyColor);
  }
  if (isString(anyColor)) {
    return rgbaColorStrToArr(anyColor);
  }
  return anyColor;
};

/**
 * Blends two colors using a specified factor.
 *
 * @param {AnyColor} colorA - the first color to blend
 * @param {AnyColor} colorB - the second color to blend
 * @param {number} [factor=0.5] - the blending factor
 * @return {RgbaColorStr} the blended color in RGBA string format
 */
export const blendColors = (
  colorA: AnyColor,
  colorB: AnyColor,
  factor = 0.5
): RgbaColorStr => {
  const arrA = anyColorToRgbaColorArr(colorA);
  const arrB = anyColorToRgbaColorArr(colorB);

  const blended = arrA.map((channel, index) => {
    const lerped = lerp(channel, arrB[index], factor);
    // do not round alpha channel
    if (index === 3) return lerped;
    return Math.round(lerped);
  }) as RgbaColorArr;

  return rgbaColorArrToStr(blended);
};

/**
 * Use when you want to convert from a hex color to something else.
 */
export const hexColorConverter = {
  hexToRgbaStr: hexColorToRgbaColorStr,
  hexToRgbaArr: hexColorToRgbaColorArr,
  hexToRgbaObj: hexColorToRgbaColorObj,
  normalize: hexColorToHexColorAlpha,
} as const;

/**
 * Use when you want to convert from an RGBA color to something else.
 */
export const rgbaColorConverter = {
  strToArr: rgbaColorStrToArr,
  strToObj: rgbaColorStrToObj,
  strToHex: rgbaColorStrToHex,
  arrToStr: rgbaColorArrToStr,
  arrToObj: rgbaColorArrToObj,
  arrToHex: rgbaColorArrToHex,
  objToStr: rgbaColorObjToStr,
  objToArr: rgbaColorObjToArr,
  objToHex: rgbaColorObjToHex,
} as const;
