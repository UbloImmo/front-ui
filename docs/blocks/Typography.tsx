import styled from "styled-components";

import {
  Heading as HeadingComponent,
  Text as TextComponent,
} from "@/components";
import { cssVarUsage } from "@/utils";
import {
  StyleProps,
  type HeadingProps,
  type PaletteColor,
  type TextProps,
} from "@types";

import type { ReactNode } from "react";

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
  return (
    <HeadingOverrides $size={props.size}>
      <HeadingComponent {...props} important>
        {children}
      </HeadingComponent>
    </HeadingOverrides>
  );
};

/**
 * Returns a Heading component with the specified size and props.
 * Used to replace documentation MDX components.
 *
 * @param {HeadingProps["size"]} size - The size of the heading
 * @param {HeadingProps["weight"]} [weight = "semiBold"] - The weight of the heading
 * @param {Omit<HeadingProps, "size" | "important">} props - The other props for the heading
 */
export const headingOfSize =
  (size: HeadingProps["size"], weight: HeadingProps["weight"] = "semiBold") =>
  ({
    children,
    ...props
  }: Omit<HeadingProps, "size" | "important" | "weight">) =>
    (
      <Heading {...props} size={size} weight={weight}>
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
 * @param {HeadingProps["size"]} size - The size of the text
 * @param {HeadingProps["weight"]} [weight = "regular"] - The weight of the text
 * @param {Omit<HeadingProps, "size" | "important">} props - The other props for the heading
 */
export const textOfSize =
  (size: TextProps["size"], weight: TextProps["weight"] = "regular") =>
  ({ children, ...props }: Omit<TextProps, "size" | "important" | "weight">) =>
    (
      <Text {...props} size={size} weight={weight}>
        {children}
      </Text>
    );

const HeadingOverrides = styled.span<{ $size?: HeadingProps["size"] }>`
  & > * {
    margin-top: var(
      --s-${({ $size }) => ($size === "h4" ? "4" : $size === "h3" ? "8" : $size === "h2" ? "10" : "16")}
    ) !important;
    margin-bottom: var(
      --s-${({ $size }) => ($size === "h4" ? "2" : $size === "h3" ? "4" : $size === "h2" ? "6" : "8")}
    ) !important;
  }
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
  font-weight: var(--text-weight-semibold) !important;
  font-style: inherit !important;
  font-variation-settings: inherit !important;
`;
