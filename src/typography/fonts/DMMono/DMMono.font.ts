import { css } from "styled-components";

import light from "./DMMono-Light.woff2";
import lightItalic from "./DMMono-LightItalic.woff2";
import medium from "./DMMono-Medium.woff2";
import mediumItalic from "./DMMono-MediumItalic.woff2";
import regular from "./DMMono-Regular.woff2";
import regularItalic from "./DMMono-RegularItalic.woff2";
import { fontFamily } from "../../font.utils";
import { buildTypographyWeightMap } from "../../typogaphy.weight";

const DMMonoFamily = fontFamily({
  fontFamily: "DMMono",
  format: "woff2",
});

export const DMMono = () => {
  const weights = buildTypographyWeightMap();

  const fontFaces = DMMonoFamily([
    {
      src: light,
      weight: weights.regular,
    },
    {
      src: lightItalic,
      weight: weights.regular,
      italic: true,
    },
    {
      src: regular,
      weight: weights.medium,
    },
    {
      src: regularItalic,
      weight: weights.medium,
      italic: true,
    },
    {
      src: medium,
      weight: weights.bold,
    },
    {
      src: mediumItalic,
      weight: weights.bold,
      italic: true,
    },
  ]);
  return css`
    ${fontFaces}
  `;
};
