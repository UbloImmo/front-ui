import {
  RgbaColorArr,
  RgbaColorObj,
  RgbaColorStr,
} from "@/types/themes/color.types";

/**
 * Converts an RGBA color string to an RGBA color array.
 *
 * @param {RgbaColorStr} colorStr - The RGBA color string to convert.
 * @return {RgbaColorArr} - The converted RGBA color array.
 */
export const rgbaColorStrToArr = (colorStr: RgbaColorStr): RgbaColorArr => {
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
export const rgbaColorArrToStr = (colorArr: RgbaColorArr): RgbaColorStr => {
  return `rgba(${colorArr.join(", ")})` as RgbaColorStr;
};

/**
 * Converts an RGBA color string to an RGBA color object.
 *
 * @param {RgbaColorStr} colorStr - The RGBA color string to convert.
 * @returns {RgbaColorObj} The RGBA color object.
 */
export const rgbaColorStrToObj = (colorStr: RgbaColorStr): RgbaColorObj => {
  const [r, g, b, a] = rgbaColorStrToArr(colorStr);
  return { r, g, b, a };
};

/**
 * Converts an RGBA color array to an RGBA color object.
 *
 * @param {RgbaColorArr} colorArr - The RGBA color array to be converted.
 * @return {RgbaColorObj} The converted RGBA color object.
 */
export const rgbaColorArrToObj = (colorArr: RgbaColorArr): RgbaColorObj => {
  const [r, g, b, a] = colorArr;
  return { r, g, b, a };
};

/**
 * Converts an RGBA color object to a string representation.
 *
 * @param {RgbaColorObj} colorObj - The RGBA color object to convert.
 * @return {RgbaColorStr} The string representation of the RGBA color.
 */
export const rgbaColorObjToStr = (colorObj: RgbaColorObj): RgbaColorStr => {
  const { r, g, b, a } = colorObj;
  return rgbaColorArrToStr([r, g, b, a]);
};

/**
 * Convert an RGBA color object to an RGBA color array.
 *
 * @param {RgbaColorObj} colorObj - The RGBA color object to be converted.
 * @return {RgbaColorArr} The converted RGBA color array.
 */
export const rgbaColorObjToArr = (colorObj: RgbaColorObj): RgbaColorArr => {
  const { r, g, b, a } = colorObj;
  return [r, g, b, a];
};

export const rgbaColorConverter = {
  strToArr: rgbaColorStrToArr,
  strToObj: rgbaColorStrToObj,
  arrToStr: rgbaColorArrToStr,
  arrToObj: rgbaColorArrToObj,
  objToStr: rgbaColorObjToStr,
  objToArr: rgbaColorObjToArr,
} as const;
