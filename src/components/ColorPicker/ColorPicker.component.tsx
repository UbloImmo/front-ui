import { useCallback, useEffect, useState, type ReactNode } from "react";

import styles from "./ColorPicker.module.scss";
import { decorativeColorKeys } from "../../types";
import { ColorPickerItem } from "./components/ColorPickerItem/ColorPickerItem.component";

import { FlexLayout } from "@/layouts/Flex";
import { useAriaProps } from "@/utils/aria.utils";
import { useLogger, useTestId, useMergedProps, useCssClasses } from "@utils";

import type {
  ColorPickerProps,
  ColorPickerDefaultProps,
} from "./ColorPicker.types";
import type { AriaProps, DecorativeColorKey, TestIdProps } from "@types";

export const decorativeColorLabels: Record<DecorativeColorKey, string> = {
  gray: "Gris",
  wisteria: "Violet",
  maya: "Bleu",
  tiffany: "Turquoise",
  mantis: "Vert",
  yellow: "Jaune",
  orange: "Orange",
  red: "Rouge",
  murrey: "Prune",
  kobicha: "Brun",
};

const defaultColorPickerProps: ColorPickerDefaultProps = {
  colors: [...decorativeColorKeys],
  labels: decorativeColorLabels,
  value: null,
  onChange: null,
  disabled: false,
  required: false,
  className: null,
  id: null,
  styleOverride: null,
  error: false,
};

/**
 * Allows users to pick a color from a closed palette, like a radio input for colors.
 *
 * @version 0.1.0
 *
 * @param {ColorPickerProps & TestIdProps & AriaProps} props - ColorPicker component props
 * @returns {ReactNode}
 */
const ColorPicker = (
  props: ColorPickerProps & TestIdProps & AriaProps
): ReactNode => {
  const { warn, debug } = useLogger("ColorPicker", {
    hideDebug: true,
  });
  const mergedProps = useMergedProps(defaultColorPickerProps, props);
  const testId = useTestId("color-picker", props);
  const className = useCssClasses(styles["color-picker"], props.className);
  const ariaProps = useAriaProps(props);

  const [selection, setSelection] = useState(mergedProps.value);

  const updateSelection = useCallback(
    (color: DecorativeColorKey) => () => {
      if (mergedProps.disabled) return;

      const newColor =
        color === selection && !mergedProps.required ? null : color;
      setSelection(newColor);
      if (mergedProps.onChange && newColor !== selection) {
        debug(["propagate change", newColor]);
        mergedProps.onChange(newColor);
      }
    },
    [debug, mergedProps, selection]
  );

  useEffect(() => {
    if (mergedProps.value === selection) return;
    debug(["update selection from prop", mergedProps.value]);
    setSelection(mergedProps.value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value]);

  if (!mergedProps.colors.length) {
    warn(`Missing colors`);
  }

  return (
    <FlexLayout
      {...ariaProps}
      role="radiogroup"
      aria-invalid={mergedProps.error ? "true" : undefined}
      testId={testId}
      overrideTestId
      gap="s-2"
      wrap
      className={className}
      id={mergedProps.id}
      styleOverride={mergedProps.styleOverride}
    >
      {mergedProps.colors.map((color) => (
        <ColorPickerItem
          key={color}
          color={color}
          label={mergedProps.labels[color] ?? decorativeColorLabels[color]}
          active={selection === color}
          disabled={mergedProps.disabled}
          onClick={updateSelection(color)}
        />
      ))}
    </FlexLayout>
  );
};
ColorPicker.__DEFAULT_PROPS = defaultColorPickerProps;

export { ColorPicker };
