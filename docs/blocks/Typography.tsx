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
}: Omit<HeadingProps, "$important"> & { children: ReactNode }) => {
  return (
    <MDHeading {...props} $important>
      {children}
    </MDHeading>
  );
};

/**
 * Create a Text component with given children and props.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {Omit<TextProps, "$important"> & { children: ReactNode }} children - The children to be rendered within the Text component.
 * @return {ReactNode} The rendered Text component.
 */
export const Text = ({
  children,
  ...props
}: Omit<TextProps, "$important"> & { children: ReactNode }) => {
  return (
    <MDText {...props} $important>
      {children}
    </MDText>
  );
};

const MDHeading = styled(HeadingComponent)`
  margin: var(--s-4) 0 !important;
  margin-bottom: var(
    --s-${({ size }) => (size === "h4" ? "4" : size === "h3" ? "6" : size === "h2" ? "8" : "12")}
  ) !important;
`;

const MDText = styled(TextComponent)`
  margin-bottom: var(
    --s-${({ size }) => (size === "xs" ? "05" : size === "s" ? "1" : "2")}
  ) !important;
  display: block;
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
