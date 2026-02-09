import { isNull } from "@ubloimmo/front-util";
import { MouseEventHandler, useCallback, useMemo } from "react";

import { useChipStyle } from "./Chip.styles";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { FlexRowLayout } from "@/layouts/Flex";
import {
  isEmptyString,
  useLogger,
  useMergedProps,
  useTestId,
  useUikitTranslation,
} from "@utils";

import type { ChipProps, DefaultChipProps } from "./Chip.types";
import type { TestIdProps } from "@types";

const defaultChipProps: DefaultChipProps = {
  label: "[Chip]",
  icon: null,
  color: "primary",
  iconPlacement: "left",
  onDelete: null,
  deleteButtonTitle: null,
  disabled: false,
  className: null,
  styleOverride: null,
};

/**
 * An interactive `Badge` with a remove button, can be used as a filter tag.
 *
 * @version 0.1.0
 * @param {ChipProps} props - the props for the Chip component
 * @returns {JSX.Element} - the Chip component
 */
const Chip = (props: ChipProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultChipProps, props);
  const testId = useTestId("chip", props);

  const { label, icon, deleteButtonTitle, disabled } = mergedProps;
  const { warn } = useLogger("Chip");

  const tl = useUikitTranslation();
  const deleteLabel = useMemo(
    () => deleteButtonTitle ?? tl.action.delete(label),
    [deleteButtonTitle, label, tl]
  );

  const onDelete = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      if (isNull(mergedProps.onDelete)) return;
      event.stopPropagation();
      mergedProps.onDelete();
    },
    [mergedProps]
  );

  const { colors, style, classes } = useChipStyle(mergedProps);

  if (!props.label || isEmptyString(props.label)) {
    warn(`Missing required label, defaulting to ${defaultChipProps.label}`);
  }

  return (
    <FlexRowLayout
      className={classes.wrapper}
      styleOverride={style}
      align="center"
      testId={testId}
      overrideTestId
      role="status"
    >
      <div className={classes.chip} title={label}>
        {icon && <Icon name={icon} size="s-3" color={colors.icon} />}
        <Text
          className={classes.label}
          size="s"
          weight="medium"
          color={colors.text}
          ellipsis
        >
          {label}
        </Text>
      </div>

      {!disabled && (
        <button
          className={classes.button}
          onClick={onDelete}
          onMouseDown={onDelete}
          data-testid="chip-button"
          type="button"
          title={deleteLabel}
          aria-label={deleteLabel}
        >
          <Icon name="X" size="s-4" color={colors.icon} />
        </button>
      )}
    </FlexRowLayout>
  );
};

Chip.__DEFAULT_PROPS = defaultChipProps;
export { Chip };
