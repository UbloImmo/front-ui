import { styled } from "styled-components";
import { TextVariant, CssRem } from "src";
import { TextProps } from ".";
import { typographyStyles } from "../Typography.styles";

// TODO: get from generated css vars once they are available
const textVariantFontSizeMap: Record<TextVariant, CssRem> = {
  body: "1rem",
  caption: "0.875rem",
  small: "0.75rem",
};

const textFontSize =
  (defaultVariant: TextVariant) =>
  ({ variant }: TextProps): CssRem => {
    return textVariantFontSizeMap[variant ?? defaultVariant];
  };

export const Text = styled.span<TextProps>`
  display: inline-block;
  font-size: ${textFontSize("body")};
  ${typographyStyles}
`;
