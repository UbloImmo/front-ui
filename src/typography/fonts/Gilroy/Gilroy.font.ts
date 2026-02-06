import bold from "./Gilroy-Bold.woff2";
import boldItalic from "./Gilroy-BoldItalic.woff2";
import medium from "./Gilroy-Medium.woff2";
import mediumItalic from "./Gilroy-MediumItalic.woff2";
import regular from "./Gilroy-Regular.woff2";
import regularItalic from "./Gilroy-Regularitalic.woff2";
import { fontFamily } from "../../font.utils";
import { buildTypographyWeightMap } from "../../typogaphy.weight";

const GilroyFamily = fontFamily({
  fontFamily: "Gilroy",
  format: "woff2",
});

export const Gilroy = () => {
  const weights = buildTypographyWeightMap();

  return GilroyFamily([
    {
      src: bold,
      weight: weights.bold,
    },
    {
      src: boldItalic,
      weight: weights.bold,
      italic: true,
    },
    {
      src: medium,
      weight: weights.medium,
    },
    {
      src: mediumItalic,
      weight: weights.medium,
      italic: true,
    },
    {
      src: regular,
      weight: weights.regular,
    },
    {
      src: regularItalic,
      weight: weights.regular,
      italic: true,
    },
  ]);
};
