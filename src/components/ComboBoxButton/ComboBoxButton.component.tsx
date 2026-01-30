import { isNull } from "@ubloimmo/front-util";
import { type MouseEventHandler, useCallback, useMemo, useState } from "react";

import { useComboBoxButtonStyles } from "./ComboBoxButton.styles";
import { ContextMenu, type ContextMenuItemData } from "../ContextMenu";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { FlexColumnLayout } from "@/layouts/Flex";
import {
  useLogger,
  useTestId,
  useMergedProps,
  isEmptyString,
  useUikitTranslation,
} from "@utils";

import type {
  ComboBoxButtonProps,
  ComboBoxButtonDefaultProps,
} from "./ComboBoxButton.types";
import type { TestIdProps, TextProps } from "@types";

const defaultComboBoxButtonProps: ComboBoxButtonDefaultProps = {
  active: false,
  multi: false,
  label: "[ComboBox option]",
  onSelect: null,
  disabled: false,
  fill: false,
  showIcon: true,
  description: null,
  deletable: false,
  editable: false,
  onEdit: null,
  onDelete: null,
  editLabel: null,
  deleteLabel: null,
  required: false,
};

/**
 * A single clickable option in a ComboBox
 *
 * @version 0.1.0
 *
 * @param {ComboBoxButtonProps & TestIdProps} props - ComboBoxButton component props
 * @returns {JSX.Element}
 */
const ComboBoxButton = (
  props: ComboBoxButtonProps & TestIdProps
): JSX.Element => {
  const { warn } = useLogger("ComboBoxButton");
  const mergedProps = useMergedProps(defaultComboBoxButtonProps, props);
  const testId = useTestId("combo-box-button", props);
  const {
    label,
    active,
    showIcon,
    disabled,
    description,
    editable,
    deletable,
    onDelete,
    onEdit,
    deleteLabel,
    editLabel,
    required,
  } = mergedProps;

  const [menuOpen, setMenuOpen] = useState(false);

  if (!props.label || isEmptyString(props.label)) {
    warn(
      `Missing required label, defaulting to ${defaultComboBoxButtonProps.label}`
    );
  }

  const onSelect = useCallback<MouseEventHandler<HTMLElement>>(
    (event) => {
      if (isNull(mergedProps.onSelect)) return;
      event.stopPropagation();
      mergedProps.onSelect();
    },
    [mergedProps]
  );

  const textProps = useMemo<TextProps>(
    () => ({
      color: disabled
        ? active
          ? "gray-800"
          : "gray-600"
        : active
          ? "primary-dark"
          : "gray-800",
      weight: active ? "bold" : "medium",
      size: "m",
      ellipsis: true,
    }),
    [active, disabled]
  );

  const tl = useUikitTranslation();
  const ariaLabel = useMemo(() => {
    if (active && required) return label;
    return tl.action[active ? "unselect" : "select"](label);
  }, [active, label, tl.action, required]);

  const shouldDisplayContextMenu = useMemo(
    () => (editable || deletable) && !disabled,
    [editable, deletable, disabled]
  );

  const contextMenuItems = useMemo<ContextMenuItemData[]>(
    () => [
      {
        label: editLabel ?? tl.action.edit(),
        disabled: disabled || !editable,
        onClick: onEdit,
      },
      {
        label: deleteLabel ?? tl.action.delete(),
        disabled: disabled || !deletable,
        onClick: onDelete,
      },
    ],
    [
      deletable,
      deleteLabel,
      disabled,
      editLabel,
      editable,
      onDelete,
      onEdit,
      tl.action,
    ]
  );

  const { classNames, icons } = useComboBoxButtonStyles(mergedProps);

  return (
    <article className={classNames.wrapper} role="listitem">
      <button
        className={classNames.button}
        data-testid={testId}
        data-active={active}
        onClick={onSelect}
        disabled={mergedProps.disabled}
        type="button"
        title={ariaLabel}
        role="option"
        aria-label={ariaLabel}
        aria-disabled={mergedProps.disabled}
        aria-selected={active}
      >
        {showIcon && (
          <div className={classNames.icons}>
            <Icon name={icons.inactive} color="primary-medium" size="s-4" />
            <Icon name={icons.active} color="primary-base" size="s-4" />
          </div>
        )}

        <FlexColumnLayout
          className={classNames.content}
          gap="s-1"
          align="start"
          justify="start"
          testId="combo-box-button-content"
          overrideTestId
        >
          <Text
            className={classNames.label}
            {...textProps}
            testId="combo-box-button-label"
            overrideTestId
          >
            {label}
          </Text>
          {description && (
            <Text
              color="gray-600"
              testId="combo-box-button-description"
              overrideTestId
            >
              {description}
            </Text>
          )}
        </FlexColumnLayout>
      </button>
      {shouldDisplayContextMenu && (
        <ContextMenu
          open={menuOpen}
          onOpenChange={setMenuOpen}
          items={contextMenuItems}
        >
          <button
            className={classNames.trigger}
            type="button"
            data-testid={`${testId}-context-menu`}
          >
            <Icon name="ThreeDotsVertical" />
          </button>
        </ContextMenu>
      )}
    </article>
  );
};

ComboBoxButton.defaultProps = defaultComboBoxButtonProps;

export { ComboBoxButton };
