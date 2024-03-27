import { objectEntries } from "@ubloimmo/front-util";
import { useMemo, useReducer } from "react";
import styled from "styled-components";

import { Text } from "../../src/components";
import { rgbaColorConverter } from "../../src/utils";

import type {
  DefaultPaletteColorShadeKey,
  GrayscalePaletteColorShadeKey,
  PaletteColorShaded,
  RgbaColorStr,
} from "../../src/types";

/**
 * Renders a color shade grid based on the provided color and color name.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {{ color: PaletteColorShaded<DefaultPaletteColorShadeKey[]> | PaletteColorShaded<GrayscalePaletteColorShadeKey[]>, colorName: string, initShowOpacity?: boolean }} param - Object containing color, colorName, and optional initShowOpacity
 * @return {JSX.Element} The rendered color shade grid component
 */
export const ColorShadeGrid = ({
  color,
  colorName,
  initShowOpacity,
}: {
  color:
    | PaletteColorShaded<DefaultPaletteColorShadeKey[]>
    | PaletteColorShaded<GrayscalePaletteColorShadeKey[]>;
  colorName: string;
  initShowOpacity?: boolean;
}): JSX.Element => {
  const [showOpacity, toggleShowOpacity] = useReducer(
    (state) => !state,
    initShowOpacity ?? false
  );

  const shades = useMemo(() => {
    const sumRgbaColor = (colorStr: RgbaColorStr): number => {
      const arr = rgbaColorConverter.strToArr(colorStr);
      return arr.reduce((acc, component) => acc + component, 0);
    };

    const shades = objectEntries(
      color as PaletteColorShaded<
        DefaultPaletteColorShadeKey[] | GrayscalePaletteColorShadeKey[]
      >
    )
      .sort(([_aKey, aValue], [_bKey, bValue]) => {
        const aSum = sumRgbaColor(aValue.rgba);
        const bSum = sumRgbaColor(bValue.rgba);
        return bSum - aSum;
      })
      .map(([key, { opacity, rgba }]) => ({
        name: `${colorName}-${key}`,
        shades: showOpacity
          ? Array(10)
              .fill(0)
              .map((_, index) => ({
                name: `${(index + 1) * 10}%`,
                color: opacity((index + 1) / 10),
              }))
              .reverse()
          : [{ name: "100%", color: rgba }],
      }));

    return shades;
  }, [color, colorName, showOpacity]);
  return (
    <ShadeGridContainer>
      <GridItem $x={1} $y={1} $justify="start">
        <input
          type="checkbox"
          checked={showOpacity}
          onChange={toggleShowOpacity}
          title="show opacity"
        />
      </GridItem>
      {shades.map(({ name }, index) => (
        <GridItem key={name} $x={index + 2} $y={1} $justify="center">
          <Text color="gray-600" important size="s">
            {name}
          </Text>
        </GridItem>
      ))}
      {shades[0].shades.map(({ name }, index) => (
        <GridItem key={name} $x={1} $y={index + 2} $justify="end">
          <Text color="gray-600" important size="xs">
            {name}
          </Text>
        </GridItem>
      ))}
      {shades.map(({ name: shadeName, shades }, shadeIndex) => {
        return shades.map(({ name: opacityName, color }, opacityIndex) => {
          const name = `${shadeName}-${opacityName}`;
          return (
            <ColorShadeSwatch
              key={name}
              color={color}
              opacity={opacityName}
              x={shadeIndex + 2}
              y={opacityIndex + 2}
            />
          );
        });
      })}
    </ShadeGridContainer>
  );
};

/**
 * Renders a color shade swatch with the given color, opacity, x, and y coordinates.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {RgbaColorStr} color - the RGBA color string
 * @param {string} [opacity] - optional opacity value
 * @param {number} x - the x-coordinate
 * @param {number} y - the y-coordinate
 * @return {JSX.Element} the rendered color shade swatch component
 */
const ColorShadeSwatch = ({
  color,
  opacity,
  x,
  y,
}: {
  color: RgbaColorStr;
  opacity?: string;
  x: number;
  y: number;
}) => {
  const hex = rgbaColorConverter.strToHex(color);
  return (
    <ShadeContainer $background={color} $x={x} $y={y}>
      <Text weight="semiBold" size="xs" color="gray-500" important>
        {hex}
      </Text>
      {opacity && (
        <Text size="xs" color="gray-500" important>
          {opacity}
        </Text>
      )}
    </ShadeContainer>
  );
};

const ShadeGridContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, max-content) repeat(auto-fit, minmax(0, 1fr));
  grid-template-rows: minmax(0, max-content) repeat(auto-fit, minmax(0, 1fr));
  gap: var(--s-05);
  padding: var(--s-1);
  background: #fff;
  border-radius: var(--s-1);
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.palette.shadows.flat};
`;

const ShadeContainer = styled.div.attrs<{
  $background: string;
  $x: number;
  $y: number;
}>((props) => ({
  style: {
    background: props.$background,
    gridRowStart: props.$y,
    gridColumnStart: props.$x,
  },
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--s-1);
  flex: 1;
  padding: 2rem 0.5rem;
  grid-column-end: span 1;
  grid-row-end: span 1;
  border-radius: var(--s-1);
  margin: 0;

  transition: all 600ms ease-out 0s;
  transform: scale(1);

  & > span {
    mix-blend-mode: difference;
    filter: blur(var(--s-2));
    opacity: 0;
    transition: all 150ms ease-out 0s;
  }

  &:hover {
    border-radius: var(--s-3);
    transform: scale(1.2);
    transition-duration: 300ms;
    z-index: 2;
  }

  &:hover span {
    opacity: 1;
    filter: blur(0);
    transition-duration: 450ms;
  }
`;

const GridItem = styled.div.attrs<{
  $x: number;
  $y: number;
  $justify: string;
}>((props) => ({
  style: {
    gridRowStart: props.$y,
    gridColumnStart: props.$x,
    justifySelf: props.$justify,
  },
}))`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--s-1);
  flex: 1;
  padding: 0.5rem;
  grid-column-end: span 1;
  grid-row-end: span 1;
`;
