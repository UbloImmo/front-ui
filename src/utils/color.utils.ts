import {
  HexColor,
  HexColorAlpha,
  HexColorShorthand,
  HexColorShorthandAlpha,
  HexComponentDouble,
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

const hexComponentDoubleToRgbComponent = (
  hexComponent: HexComponentDouble
): number => {
  return parseInt(hexComponent, 16);
};

const hexAlphaComponentToRgbAlphaComponent = (
  hexComponent: HexComponentDouble
): number => {
  return parseInt(hexComponent, 16) / 255;
};

const isHexColorAlpha = (hexColor: HexColor): hexColor is HexColorAlpha => {
  return hexColor.length === 9;
};

const isHexColorShorthand = (
  hexColor: HexColor
): hexColor is HexColorShorthand => {
  return hexColor.length === 4;
};

const isHexColorShorthandAlpha = (
  hexColor: HexColor
): hexColor is HexColorShorthandAlpha => {
  return hexColor.length === 5;
};

const hexColorToHexColorAlpha = (hexColor: HexColor): HexColorAlpha => {
  const supportedHexColorLengths = [4, 5, 7, 9];
  if (!supportedHexColorLengths.includes(hexColor.length)) {
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

const rgbComponentToHexComponentDouble = (
  rgbComponent: number
): HexComponentDouble => {
  const hexComponent = rgbComponent.toString(16);
  return (
    hexComponent.length === 1 ? `0${hexComponent}` : hexComponent
  ).toUpperCase() as HexComponentDouble;
};

const rgbAlphaComponentToHexAlphaComponent = (
  alphaComponent: number
): HexComponentDouble => {
  const hexComponent = Math.round(alphaComponent * 255).toString(16);
  return (
    hexComponent.length === 1 ? `0${hexComponent}` : hexComponent
  ).toUpperCase() as HexComponentDouble;
};

const hexColorToRgbaColorArr = (hexColor: HexColor): RgbaColorArr => {
  const hexColorAlpha = hexColorToHexColorAlpha(hexColor);
  const componentIndices = [1, 3, 5, 7].map((index) => [index, index + 2]);

  const r = hexComponentDoubleToRgbComponent(
    hexColorAlpha.slice(...componentIndices[0])
  );
  const g = hexComponentDoubleToRgbComponent(
    hexColorAlpha.slice(...componentIndices[1])
  );
  const b = hexComponentDoubleToRgbComponent(
    hexColorAlpha.slice(...componentIndices[2])
  );
  const a = hexAlphaComponentToRgbAlphaComponent(
    hexColorAlpha.slice(...componentIndices[3])
  );
  return [r, g, b, a] as RgbaColorArr;
};

const hexColorToRgbaColorStr = (hexColor: HexColor): RgbaColorStr => {
  return rgbaColorArrToStr(hexColorToRgbaColorArr(hexColor));
};

const hexColorToRgbaColorObj = (hexColor: HexColor): RgbaColorObj => {
  return rgbaColorArrToObj(hexColorToRgbaColorArr(hexColor));
};

const rgbaColorArrToHex = (rgbaColorArr: RgbaColorArr): HexColorAlpha => {
  const [r, g, b, a] = rgbaColorArr;
  const hexColorStr = [r, g, b]
    .map((rgbComponent) => rgbComponentToHexComponentDouble(rgbComponent))
    .join("");
  const hexAlphaStr = rgbAlphaComponentToHexAlphaComponent(a);
  return `#${hexColorStr}${hexAlphaStr}` as HexColorAlpha;
};

const rgbaColorStrToHex = (rgbaColorStr: RgbaColorStr): HexColorAlpha => {
  return rgbaColorArrToHex(rgbaColorStrToArr(rgbaColorStr));
};

const rgbaColorObjToHex = (rgbaColorObj: RgbaColorObj): HexColorAlpha => {
  return rgbaColorArrToHex(rgbaColorObjToArr(rgbaColorObj));
};

export const hexColorConverter = {
  hexToRgbaStr: hexColorToRgbaColorStr,
  hexToRgbaArr: hexColorToRgbaColorArr,
  hexToRgbaObj: hexColorToRgbaColorObj,
  normalize: hexColorToHexColorAlpha,
} as const;

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
