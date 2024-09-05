import { useCallback, useEffect, useState } from "react";

import { IconPickerItem } from "./components/IconPickerItem/IconPickerItem.component";
import { IconName } from "../Icon/Icon.types";

import { FlexLayout } from "@layouts";
import { useLogger, useTestId, useMergedProps, useClassName } from "@utils";

import type {
  IconPickerProps,
  IconPickerDefaultProps,
} from "./IconPicker.types";
import type { TestIdProps } from "@types";

const defaultIconPickerProps: IconPickerDefaultProps = {
  icons: [],
  value: null,
  onChange: null,
  disabled: false,
  required: false,
  className: null,
  id: null,
};

/**
 * Allows users to pick an icon from a subset, like a radio input for icons.
 *
 * @version 0.0.1
 *
 * @param {IconPickerProps & TestIdProps} props - IconPicker component props
 * @returns {JSX.Element}
 */
const IconPicker = (props: IconPickerProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("IconPicker");
  const mergedProps = useMergedProps(defaultIconPickerProps, props);
  const testId = useTestId("icon-picker", props);
  const className = useClassName(mergedProps);

  const [selection, setSelection] = useState(mergedProps.value);

  const updateSelection = useCallback(
    (icon: IconName) => () => {
      if (mergedProps.disabled) return;

      if (icon === selection && !mergedProps.required) {
        setSelection(null);
      } else {
        setSelection(icon);
      }
    },
    [mergedProps, selection]
  );

  useEffect(() => {
    if (mergedProps.value === selection) return;

    setSelection(mergedProps.value);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.value]);

  useEffect(() => {
    if (!mergedProps.onChange) return;
    if (mergedProps.value === selection) return;

    mergedProps.onChange(selection);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.onChange, selection]);

  if (!mergedProps.icons.length) {
    warn(`Missing icons`);
  }

  return (
    <FlexLayout
      testId={testId}
      gap="s-2"
      className={className}
      overrideTestId
      id={mergedProps.id}
    >
      {mergedProps.icons.map((icon) => (
        <IconPickerItem
          key={icon}
          name={icon}
          active={selection === icon}
          disabled={mergedProps.disabled}
          onClick={updateSelection(icon)}
        />
      ))}
    </FlexLayout>
  );
};
IconPicker.defaultProps = defaultIconPickerProps;

export { IconPicker };
