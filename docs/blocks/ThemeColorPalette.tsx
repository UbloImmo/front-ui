import type {
  ColorPalette as CPalette,
  DefaultPaletteColorShadeKey,
  GrayscalePaletteColorShadeKey,
  Theme,
  PaletteColorShaded,
  PaletteColor,
} from "../../src/types";
import React, { useMemo, useReducer, type ReactNode } from "react";
import styled, { useTheme } from "styled-components";
import { ColorShadeGrid } from "./ColorShadeGrid";
import { transformObject } from "@ubloimmo/front-util";
import { FlexLayout } from "../../src/layouts";
import { Heading, Text } from "../../src/components";
import { Pre } from "./Typography";

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
      <BlockSection align="baseline" justify="start" gap="s-3">
        <BlockSection align="baseline" justify="start" gap="s-3">
          <Heading $important size="h4" weight="semiBold">
            {title ?? colorKey}
          </Heading>
          <Pre background={lightShade} foreground={darkShade}>
            theme.{colorKey}
          </Pre>
        </BlockSection>
        <BlockSection align="center" gap="s-1" justify="end">
          <BlockTab
            $selected={!showCodePreview}
            onClick={toggleShowCodePreview}
          >
            <Text $important weight="bold" size="xs">
              Swatches
            </Text>
          </BlockTab>
          <BlockTab $selected={showCodePreview} onClick={toggleShowCodePreview}>
            <Text $important weight="bold" size="xs">
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
    <Pre foreground={lightShade} background={darkShade} padded>
      {JSON.stringify(codePreview, null, 2)}
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
