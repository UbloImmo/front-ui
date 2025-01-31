import { isNull } from "@ubloimmo/front-util";
import { MouseEventHandler, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import {
  ComboBoxButtonStyles,
  ComboBoxButtonWrapperStyles,
  ComboBoxContextMenuTriggerStyles,
  ComboBoxIconContainerStyle,
} from "./ComboBoxButton.styles";
import { ContextMenu, ContextMenuItemData } from "../ContextMenu";
import { Icon, type IconProps } from "../Icon";
import { Text } from "../Text";

import { FlexColumnLayout } from "@layouts";
import { StyleProps, type TestIdProps, type TextProps } from "@types";
import {
  useLogger,
  useTestId,
  useMergedProps,
  isEmptyString,
  useStyleProps,
  useUikitTranslation,
} from "@utils";

import type {
  ComboBoxButtonProps,
  ComboBoxButtonDefaultProps,
  ComboButtonIconContainerStyleProps,
} from "./ComboBoxButton.types";

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
};

/**
 * A single clickable option in a ComboBox
 *
 * @version 0.0.10
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
  const styleProps = useStyleProps<ComboBoxButtonDefaultProps & TestIdProps>({
    ...mergedProps,
    testId,
  });
  const {
    label,
    multi,
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

  const iconName = useMemo(() => {
    return multi
      ? active
        ? "CheckSquareFill"
        : "Square"
      : active
        ? "CheckCircleFill"
        : "Circle";
  }, [multi, active]);

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

  const iconProps = useMemo<IconProps>(
    () => ({
      color: disabled ? "gray-400" : active ? "primary-base" : "primary-medium",
      name: iconName,
    }),
    [active, disabled, iconName]
  );

  const tl = useUikitTranslation();
  const ariaLabel = useMemo(() => {
    return tl.action[active ? "unselect" : "select"](label);
  }, [active, label, tl.action]);

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

  return (
    <ComboBoxButtonWrapper {...styleProps} role="listitem">
      <ComboBoxButtonContainer
        data-testid={testId}
        onClick={onSelect}
        disabled={mergedProps.disabled}
        type="button"
        title={ariaLabel}
        aria-label={ariaLabel}
        aria-disabled={mergedProps.disabled}
      >
        {showIcon && (
          <ComboBoxIconContainer $active={active ?? false}>
            <Icon {...iconProps} />
            <Icon {...iconProps} />
          </ComboBoxIconContainer>
        )}

        <FlexColumnLayout
          gap="s-1"
          align="start"
          justify="start"
          testId="combo-box-button-content"
          overrideTestId
        >
          <Text {...textProps} testId="combo-box-button-label" overrideTestId>
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
      </ComboBoxButtonContainer>
      {shouldDisplayContextMenu && (
        <ContextMenu
          open={menuOpen}
          onOpenChange={setMenuOpen}
          items={contextMenuItems}
        >
          <ComboBoxContextMenuTrigger
            type="button"
            data-testid={`${testId}-context-menu`}
          >
            <Icon name="ThreeDotsVertical" color={iconProps.color} />
          </ComboBoxContextMenuTrigger>
        </ContextMenu>
      )}
    </ComboBoxButtonWrapper>
  );
};

ComboBoxButton.defaultProps = defaultComboBoxButtonProps;

export { ComboBoxButton };

const ComboBoxButtonContainer = styled.button`
  ${ComboBoxButtonStyles}
`;

const ComboBoxIconContainer = styled.div<ComboButtonIconContainerStyleProps>`
  ${ComboBoxIconContainerStyle}
`;

const ComboBoxButtonWrapper = styled.article<
  StyleProps<ComboBoxButtonDefaultProps & TestIdProps>
>`
  ${ComboBoxButtonWrapperStyles}
`;

const ComboBoxContextMenuTrigger = styled.button`
  ${ComboBoxContextMenuTriggerStyles}
`;
