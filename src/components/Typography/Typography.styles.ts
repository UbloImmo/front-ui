import { css, StyleFunction } from "styled-components";
import { TypographyProps } from "./Typography.types";
import { TypographyColor } from "src";

const typographyColor =
  (defaultColor: TypographyColor): StyleFunction<TypographyProps> =>
  ({ color }) => {
    return `var(--${color ?? defaultColor})`;
  };

const typographyFontStyle =
  (defaultItalic: boolean): StyleFunction<TypographyProps> =>
  ({ italic }) => {
    return italic ?? defaultItalic ? "italic" : "normal";
  };

const typographyFontWeight =
  (defaultBold: boolean): StyleFunction<TypographyProps> =>
  ({ bold }) => {
    return bold ?? defaultBold ? "bold" : "normal";
  };

const typographyTextDecoration =
  (
    defaults: Pick<
      Required<TypographyProps>,
      "underline" | "overline" | "lineThrough"
    >
  ): StyleFunction<TypographyProps> =>
  (props) => {
    const underline = props.underline ?? defaults.underline;
    const overline = props.overline ?? defaults.overline;
    const lineThrough = props.lineThrough ?? defaults.lineThrough;
    if (!underline && !overline && !lineThrough) {
      return "none";
    }
    const decorations: string[] = [];
    if (underline) {
      decorations.push("underline");
    }
    if (overline) {
      decorations.push("overline");
    }
    if (lineThrough) {
      decorations.push("line-through");
    }
    if (decorations.length === 0) return "none";
    return decorations.join(" ");
  };

export const typographyStyles = css<TypographyProps>`
  color: ${typographyColor("gray-900")};
  font-style: ${typographyFontStyle(false)};
  font-weight: ${typographyFontWeight(false)};
  text-decoration: ${typographyTextDecoration({
    lineThrough: false,
    underline: false,
    overline: false,
  })};
`;
