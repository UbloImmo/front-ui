import { isString, type NonNullish } from "@ubloimmo/front-util";
import { useMemo, type ReactNode } from "react";
import styled, { css, type RuleSet } from "styled-components";

import {
  Heading as HeadingComponent,
  Text as TextComponent,
} from "@/components";
import { buildTypographyStyle, defaultTypographyProps } from "@/typography";
import { cssVarUsage, toStyleProps } from "@/utils";
import {
  StyleProps,
  type HeadingProps,
  type PaletteColor,
  type TextProps,
} from "@types";

/**
 * Renders a heading component with the specified children and props.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {ReactNode} children - The content to be rendered inside the heading.
 * @param {Omit<HeadingProps, "$important">} props - The props to be passed to the heading component.
 * @return {ReactNode} The rendered heading component.
 */
export const Heading = ({
  children,
  ...props
}: Omit<HeadingProps, "important"> & { children: ReactNode }) => {
  const id = useMemo(() => {
    if (isString(props.id)) return props.id;
    if (isString(children)) return children;
    return undefined;
  }, [props.id, children]);
  return (
    <HeadingOverrides $size={props.size}>
      <HeadingComponent {...props} id={id} important>
        {children}
      </HeadingComponent>
    </HeadingOverrides>
  );
};

/**
 * Returns a Heading component with the specified size, weight and color.
 * Used to replace documentation MDX components.
 *
 * @param {HeadingProps["size"]} size - The size of the heading
 * @param {HeadingProps["weight"]} [weight = "medium"] - The weight of the heading
 * @param {PaletteColor} [color = "gray-900"] - The weight of the heading
 * @param {Omit<HeadingProps, "size" | "important" | "color">} props - The other props for the heading
 */
export const specificHeading =
  (
    size: HeadingProps["size"],
    weight: HeadingProps["weight"] = "medium",
    color: PaletteColor = "gray-900"
  ) =>
  ({
    children,
    ...props
  }: Omit<HeadingProps, "size" | "important" | "weight" | "color">) => (
    <Heading {...props} size={size} weight={weight} color={color}>
      {children}
    </Heading>
  );

/**
 * Renders a Text component with given children and props.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {Omit<TextProps, "$important"> & { children: ReactNode }} children - The children to be rendered within the Text component.
 * @return {ReactNode} The rendered Text component.
 */
export const Text = ({
  children,
  ...props
}: Omit<TextProps, "important"> & { children: ReactNode }) => {
  return (
    <TextOverrides $size={props.size}>
      <TextComponent {...props} important>
        {children}
      </TextComponent>
    </TextOverrides>
  );
};

/**
 * Returns a Text component with the specified size and props.
 * Used to replace documentation MDX components.
 *
 * @param {TextProps["size"]} size - The size of the text
 * @param {TextProps["weight"]} [weight = "regular"] - The weight of the text
 * @param {PaletteColor} [color = "gray-900"] - The color of the text
 * @param {Omit<TextProps, "size" | "important">} props - The other props for the heading
 */
export const textOfSize =
  (
    size: TextProps["size"],
    weight: TextProps["weight"] = "regular",
    color: PaletteColor = "gray-900"
  ) =>
  ({
    children,
    ...props
  }: Omit<TextProps, "size" | "important" | "weight" | "color">) => (
    <Text {...props} size={size} weight={weight} color={color}>
      {children}
    </Text>
  );

const headingOverridesStyles = ({
  $size,
}: {
  $size?: HeadingProps["size"];
}) => css`
  &:not(:has(> span)),
  &:not(:has(> code)),
  & > *:not(code) {
    margin-top: var(
      --s-${$size === "h4"
          ? "4"
          : $size === "h3"
            ? "8"
            : $size === "h2"
              ? "10"
              : "16"}
    ) !important;
    margin-bottom: var(
      --s-${$size === "h4"
          ? "2"
          : $size === "h3"
            ? "4"
            : $size === "h2"
              ? "6"
              : "8"}
    ) !important;
  }
  & > a[aria-hidden="true"] {
    display: none;
  }
  &:has(+ hr) {
    margin-bottom: var(--s-2) !important;
  }

  & > code {
    font-size: inherit !important;
    font-weight: inherit !important;
    color: inherit !important;
  }
`;

/**
 * Returns a styled-components RuleSet for heading elements with custom styles.
 * Used to override default heading styles in documentation blocks.
 *
 * @param {NonNullish<HeadingProps["size"]>} size - The heading size (h1-h6)
 * @param {HeadingProps["weight"]} [weight="medium"] - The font weight
 * @param {PaletteColor} [color="gray-900"] - The text color
 * @returns {RuleSet} The styled-components CSS rules
 */
export const buildheadingOverrides = (
  size: NonNullish<HeadingProps["size"]>,
  weight: HeadingProps["weight"] = "medium",
  color: PaletteColor = "gray-900"
): RuleSet => {
  const props = {
    ...defaultTypographyProps,
    size,
    weight,
    color,
  };
  const styleProps = toStyleProps(props);
  return css`
    ${buildTypographyStyle(props)(styleProps)}
    ${headingOverridesStyles({ $size: size })}
  `;
};

const HeadingOverrides = styled.span<{ $size?: HeadingProps["size"] }>`
  ${headingOverridesStyles}
`;

const TextOverrides = styled.span<{
  $size?: TextProps["size"];
}>`
  & > * {
    margin-bottom: var(
      --s-${({ $size }) => ($size === "xs" ? "05" : $size === "s" ? "1" : "2")}
    ) !important;
  }
  display: inline-block !important;

  &:has(span),
  & {
    display: inline-block !important;
  }

  & > span:has(em),
  & > span:has(strong) {
    display: inline !important;
  }
`;

export const Pre = styled.pre<
  StyleProps<{
    background?: PaletteColor;
    foreground?: PaletteColor;
    padded?: boolean;
  }>
>`
  padding: ${({ $padded }) => cssVarUsage($padded ? "s-3" : "s-1")} !important;
  background: ${({ $background }) =>
    $background ? cssVarUsage($background) : "gray-50"} !important;
  color: ${({ $foreground }) =>
    cssVarUsage($foreground ?? "gray-900")} !important;
  font-size: var(--text-s) !important;
  border-radius: var(--s-1) !important;
`;

export const Em = styled.em`
  color: inherit !important;
  font-size: inherit !important;
  font-weight: inherit !important;
  font-style: italic !important;
  font-synthesis: style;
  font-variation-settings: ital 1 !important;
`;

export const Strong = styled.strong`
  color: inherit !important;
  font-size: inherit !important;
  font-weight: var(--text-weight-medium) !important;
  font-style: inherit !important;
  font-variation-settings: inherit !important;

  &:has(code) {
    font-weight: var(--text-weight-bold) !important;
  }
`;
