import { isArray } from "@ubloimmo/front-util";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { IconName } from "../Icon/Icon.types";
import { IconPickerItem } from "./components/IconPickerItem/IconPickerItem.component";
import { iconPickerContainerStyles } from "./IconPicker.styles";

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
 * @version 0.0.3
 *
 * @param {IconPickerProps & TestIdProps} props - IconPicker component props
 * @returns {JSX.Element}
 */
const IconPicker = (props: IconPickerProps & TestIdProps): JSX.Element => {
  const { warn, debug } = useLogger("IconPicker");
  const mergedProps = useMergedProps(defaultIconPickerProps, props);
  const testId = useTestId("icon-picker", props);
  const className = useClassName(mergedProps);

  const [selection, setSelection] = useState(mergedProps.value);

  const updateSelection = useCallback(
    (icon: IconName) => () => {
      if (mergedProps.disabled) return;

      const newIcon = icon === selection && !mergedProps.required ? null : icon;
      setSelection(newIcon);
      if (mergedProps.onChange && newIcon !== mergedProps.value) {
        debug(["propagate change", newIcon]);
        mergedProps.onChange(newIcon);
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

  if (!mergedProps.icons.length) {
    warn(`Missing icons`);
  }

  const hasRows = useMemo(
    () => isArray(mergedProps.icons[0]),
    [mergedProps.icons]
  );

  return (
    <IconPickerContainer
      direction={hasRows ? "column" : "row"}
      testId={testId}
      gap="s-2"
      className={className}
      overrideTestId
      fill
      id={mergedProps.id}
    >
      {mergedProps.icons.map((iconOrRow, index) =>
        isArray(iconOrRow) ? (
          <FlexLayout key={`row-${index}`} fill gap="s-2">
            {iconOrRow.map((icon, rowIndex) => (
              <IconPickerItem
                key={["row", index, rowIndex].join("-")}
                name={icon}
                active={selection === icon}
                disabled={mergedProps.disabled}
                onClick={updateSelection(icon)}
              />
            ))}
          </FlexLayout>
        ) : (
          <IconPickerItem
            key={[iconOrRow, index].join("-")}
            name={iconOrRow}
            active={selection === iconOrRow}
            disabled={mergedProps.disabled}
            onClick={updateSelection(iconOrRow)}
          />
        )
      )}
    </IconPickerContainer>
  );
};
IconPicker.defaultProps = defaultIconPickerProps;

const IconPickerContainer = styled(FlexLayout)`
  ${iconPickerContainerStyles}
`;

export { IconPicker };
