import type { ReactNode } from "react";
import type { HeadingProps, PaletteColor, TextProps } from "../../src/types";
import {
  Heading as HeadingComponent,
  Text as TextComponent,
} from "../../src/components";
import styled from "styled-components";
import { cssVarUsage } from "../../src/utils";

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
    <HeadingMargin $size={props.size}>
      <HeadingComponent {...props} important>
        {children}
      </HeadingComponent>
    </HeadingMargin>
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
    <TextMargin $size={props.size}>
      <TextComponent {...props} important>
        {children}
      </TextComponent>
    </TextMargin>
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

const HeadingMargin = styled.span<{ $size?: HeadingProps["size"] }>`
  & > * {
    margin: var(--s-4) 0 !important;
    margin-bottom: var(
      --s-${({ $size }) => ($size === "h4" ? "3" : $size === "h3" ? "4" : $size === "h2" ? "6" : "8")}
    ) !important;
  }
`;

const TextMargin = styled.span<{ $size?: TextProps["size"] }>`
  & > * {
    margin-bottom: var(
      --s-${({ $size }) => ($size === "xs" ? "05" : $size === "s" ? "1" : "2")}
    ) !important;
    display: block;
  }
`;

export const Pre = styled.pre<{
  background?: PaletteColor;
  foreground?: PaletteColor;
  padded?: boolean;
}>`
  padding: ${({ padded }) => cssVarUsage(padded ? "s-3" : "s-1")} !important;
  background: ${({ background }) =>
    background ? cssVarUsage(background) : "white"} !important;
  color: ${({ foreground }) =>
    cssVarUsage(foreground ?? "gray-900")} !important;
  font-size: var(--text-s) !important;
  border-radius: var(--s-1) !important;
`;
