import { objectEntries } from "@ubloimmo/front-util";
import { useMemo, useReducer } from "react";

import styles from "./ColorShadeGrid.module.scss";

import { GridItem } from "@layouts";
import { rgbaColorConverter, useCssClasses, useCssVariables } from "@utils";

import { Checkbox, Text } from "@components";

import type {
  DefaultPaletteColorShadeKey,
  GrayscalePaletteColorShadeKey,
  PaletteColor,
  PaletteColorShaded,
  RgbaColorStr,
} from "@types";

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
                name: `${(index + 1) * 10}`,
                color: opacity((index + 1) / 10),
              }))
              .reverse()
          : [{ name: "100", color: rgba }],
      }));

    return shades;
  }, [color, colorName, showOpacity]);

  const className = useCssClasses(styles["color-shade-grid"]);

  return (
    <div className={className}>
      <GridItem columnStart={1} rowStart={1} justify="start" align="center">
        <Checkbox onChange={toggleShowOpacity} active={showOpacity} />
      </GridItem>
      {shades.map(({ name }, index) => (
        <GridItem
          key={name}
          columnStart={index + 2}
          rowStart={1}
          justify="center"
          align="center"
        >
          <Text color="gray-600" important size="s">
            {name}
          </Text>
        </GridItem>
      ))}
      {shades[0].shades.map(({ name }, index) => (
        <GridItem
          key={name}
          columnStart={1}
          rowStart={index + 2}
          justify="end"
          align="center"
        >
          <Text color="gray-600" important size="xs">
            {name}
          </Text>
        </GridItem>
      ))}
      {shades.map(({ name: shadeName, shades: colorShades }, shadeIndex) => {
        let textColor = [...shades].reverse()[shadeIndex].name as PaletteColor;
        if (textColor === shadeName) {
          // make sure the text color is not the same as the shade color
          textColor = shades[0].name as PaletteColor;
        }

        return colorShades.map(({ name: opacityName, color }, opacityIndex) => {
          const name = `${shadeName}-${opacityName}`;
          return (
            <ColorShadeSwatch
              key={name}
              colorName={name}
              color={color}
              opacity={opacityName}
              x={shadeIndex + 2}
              y={opacityIndex + 2}
              textColor={textColor}
            />
          );
        });
      })}
    </div>
  );
};

type ColorShadeSwatchProps = {
  color: RgbaColorStr;
  opacity?: string;
  x: number;
  y: number;
  colorName: string;
  textColor: PaletteColor;
};

/**
 * Renders a color shade swatch with the given color, opacity, x, and y coordinates.
 * Intended for use within Storybook MDX documentation files.
 *
 * @param {ColorShadeSwatchProps} - Object containing color, colorName, opacity, x, and y
 * @return {JSX.Element} the rendered color shade swatch component
 */
const ColorShadeSwatch = ({
  color,
  opacity,
  x,
  y,
  colorName,
  textColor,
}: ColorShadeSwatchProps) => {
  const hex = rgbaColorConverter.strToHex(color);
  const className = useCssClasses(styles["color-shade"]);
  const style = useCssVariables({
    background: color,
    "column-start": x,
    "row-start": y,
  });

  return (
    <div className={className} style={style}>
      <Text weight="medium" size="s" color={textColor} important>
        {colorName}
      </Text>
      {opacity && (
        <Text size="xs" color={textColor} important font="code">
          {hex}
        </Text>
      )}
    </div>
  );
};
