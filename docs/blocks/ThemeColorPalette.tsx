import { transformObject } from "@ubloimmo/front-util";
import React, { useMemo, useReducer, type ReactNode } from "react";
import styled, { useTheme } from "styled-components";

import { ColorShadeGrid } from "./ColorShadeGrid";
import { Pre } from "./Typography";

import { Heading, Text } from "@/components";
import { FlexLayout } from "@/layouts";

import type {
  ColorPalette as CPalette,
  DefaultPaletteColorShadeKey,
  GrayscalePaletteColorShadeKey,
  Theme,
  PaletteColorShaded,
  PaletteColor,
} from "@types";

/**
 * React component for displaying theme color shades and swatches.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {Object} props - The props for the component.
 * @param {keyof Theme & keyof CPalette} props.colorKey - The color key to display shades for.
 * @param {string} [props.title] - Optional title for the component.
 * @param {boolean} [props.initShowOpacity] - Optional flag to initially show opacity in the color shades.
 * @param {ReactNode} [props.children] - Optional React nodes to be displayed within the component.
 * @return {JSX.Element} The JSX element representing the theme color shades component.
 */
export const ThemeColorShades = ({
  colorKey,
  title,
  children,
  initShowOpacity,
}: {
  colorKey: keyof Theme & keyof CPalette;
  title?: string;
  initShowOpacity?: boolean;
  children?: ReactNode;
}) => {
  const theme = useTheme();
  const [showCodePreview, toggleShowCodePreview] = useReducer(
    (state) => !state,
    false
  );
  const { color, lightShade, darkShade } = useMemo(() => {
    const color = theme[colorKey];
    const darkShade = colorKey === "gray" ? "900" : "dark";
    const lightShade = colorKey === "gray" ? "50" : "light";
    return {
      color,
      darkShade: `${colorKey}-${darkShade}` as PaletteColor,
      lightShade: `${colorKey}-${lightShade}` as PaletteColor,
    };
  }, [colorKey, theme]);

  return (
    <BlockContainer>
      <BlockSection align="baseline" justify="space-between" gap="s-3">
        <BlockSection align="baseline" justify="start" gap="s-3">
          <Heading important size="h4" weight="semiBold">
            {title ?? colorKey}
          </Heading>
          <Pre $background={lightShade} $foreground={darkShade} $padded={false}>
            theme.{colorKey}
          </Pre>
        </BlockSection>
        <BlockSection align="center" gap="s-1" justify="end">
          <BlockTab
            $selected={!showCodePreview}
            onClick={toggleShowCodePreview}
          >
            <Text important weight="bold" size="xs">
              Swatches
            </Text>
          </BlockTab>
          <BlockTab $selected={showCodePreview} onClick={toggleShowCodePreview}>
            <Text important weight="bold" size="xs">
              Code
            </Text>
          </BlockTab>
        </BlockSection>
      </BlockSection>
      {children && <BlockSection direction="column">{children}</BlockSection>}
      {showCodePreview ? (
        <ThemeColorCodePreview
          color={color}
          colorKey={colorKey}
          lightShade={lightShade}
          darkShade={darkShade}
        />
      ) : (
        <ColorShadeGrid
          color={color}
          colorName={colorKey}
          initShowOpacity={initShowOpacity}
        />
      )}
    </BlockContainer>
  );
};

/**
 * Generates a code preview based on the provided color and color key.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {Object} props - Object containing color, colorKey, lightShade, and darkShade
 * @param {PaletteColorShaded<DefaultPaletteColorShadeKey[]> | PaletteColorShaded<GrayscalePaletteColorShadeKey[]>} props.color - The color to generate the code preview for
 * @param {string} props.colorKey - The key for the color in the code preview
 * @param {PaletteColor} [props.darkShade] - The dark shade for the code preview background
 * @param {PaletteColor} [props.lightShade] - The light shade for the code preview foreground
 * @return {JSX.Element} The code preview component
 */
const ThemeColorCodePreview = ({
  color,
  colorKey,
  lightShade,
  darkShade,
}: {
  color:
    | PaletteColorShaded<DefaultPaletteColorShadeKey[]>
    | PaletteColorShaded<GrayscalePaletteColorShadeKey[]>;
  colorKey: string;
  darkShade?: PaletteColor;
  lightShade?: PaletteColor;
}) => {
  const codePreview = useMemo(() => {
    const colorObj = transformObject(
      color as PaletteColorShaded<
        DefaultPaletteColorShadeKey[] | GrayscalePaletteColorShadeKey[]
      >,
      ({ hex, rgba }) => ({ hex, rgba, opacity: "[function(number)]" })
    );
    return {
      [colorKey]: colorObj,
    };
  }, [color, colorKey]);
  return (
    <Pre
      className="prismjs"
      $foreground={darkShade}
      $background={lightShade}
      $padded
    >
      <code className="language-json">
        {JSON.stringify(codePreview, null, 2)}
      </code>
    </Pre>
  );
};

const BlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--s-4);
  padding: var(--s-2);
  background: var(--gray-50);
  border-radius: var(--s-2);
  overflow: hidden;
  margin: var(--s-8) 0 !important;
  box-shadow: ${({ theme }) => theme.palette.shadows.flat};
`;

const BlockSection = styled(FlexLayout)`
  flex: 1;
`;

const BlockTab = styled.button.attrs<{ $selected?: boolean }>((props) => ({
  ...props,
  disabled: props.$selected,
}))`
  border: none;
  background: ${({ $selected }) =>
    $selected ? "var(--gray-600)" : "var(--gray-100)"};
  border-radius: var(--s-2);

  span {
    color: ${({ $selected }) =>
      $selected ? "white" : "var(--gray-700)"} !important;
  }
  padding: var(--s-2) var(--s-4);
  cursor: ${({ $selected }) => ($selected ? "default" : "pointer")};
`;
