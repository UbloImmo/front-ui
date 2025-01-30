import { type VoidFn, isFunction, type Nullable } from "@ubloimmo/front-util";
import { type MouseEventHandler, useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import { actionContainerStyles } from "./Action.styles";
import {
  ActionCard,
  ActionCentered,
  ActionDefault,
  ActionLarge,
} from "./components";

import {
  isEmptyString,
  useClassName,
  useLogger,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

import type { BadgeProps } from "../Badge";
import type { TooltipProps } from "../Tooltip";
import type {
  ActionProps,
  ActionStyledProps,
  DefaultActionProps,
  SizedActionMap,
} from "./Action.types";
import type { TestIdProps } from "@types";

const defaultActionProps: DefaultActionProps = {
  label: "[Action]",
  icon: "Cursor",
  size: "default",
  color: "primary",
  disabled: false,
  badgeLabel: null,
  onClick: null,
  title: null,
  iconTooltip: null,
  description: null,
  className: null,
  indicator: null,
};

/**
 * Maps Action size variants to their corresponding render components.
 * Each component handles the specific layout and styling for that size variant.
 *
 * @type {SizedActionMap}
 * @property {React.FC<SizedActionProps>} default - Component for default size variant
 * @property {React.FC<SizedActionProps>} centered - Component for centered size variant
 * @property {React.FC<SizedActionProps>} large - Component for large size variant
 * @property {React.FC<SizedActionProps>} card - Component for card size variant
 */
const sizedActionMap: SizedActionMap = {
  default: ActionDefault,
  centered: ActionCentered,
  large: ActionLarge,
  card: ActionCard,
};

/**
 * An action button with an icon, label and optional badge
 *
 * @version 0.0.8
 *
 * @param {ActionProps} props - The component's props
 * @returns {JSX.Element}
 */
const Action = (props: ActionProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("Action");

  const mergedProps = useMergedProps(defaultActionProps, props);
  const testId = useTestId("action", props);
  const styleProps = useStyleProps({ ...mergedProps, testId });
  const className = useClassName(props);

  if (!props.icon) {
    warn(`Missing required icon, defaulting to ${defaultActionProps.icon}`);
  }

  if (!props.label) {
    warn(`Missing required icon, defaulting to ${defaultActionProps.label}`);
  }

  if (props.description && props.size === "default") {
    warn(
      `Description is not available for default size. Set size to "large" or "card" to display it.`
    );
  }

  const [isHovering, setIsHovering] = useState(false);

  const onClick = useCallback<MouseEventHandler>(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      if (isFunction<VoidFn>(mergedProps.onClick) && !mergedProps.disabled)
        mergedProps.onClick();
    },
    [mergedProps]
  );

  const badgeProps = useMemo<Nullable<BadgeProps & TestIdProps>>(() => {
    if (
      !mergedProps.badgeLabel ||
      isEmptyString(mergedProps.badgeLabel) ||
      mergedProps.size === "centered"
    )
      return null;
    return {
      label: mergedProps.badgeLabel,
      color: mergedProps.disabled ? "gray" : mergedProps.color,
      shade: "light",
      testId: "action-badge",
    };
  }, [mergedProps]);

  const iconTooltipProps = useMemo<Nullable<TooltipProps>>(() => {
    if (!mergedProps.iconTooltip) return null;

    return {
      ...mergedProps.iconTooltip,
      children: null,
      iconColor: mergedProps.disabled
        ? "gray-400"
        : mergedProps.iconTooltip.iconColor,
    };
  }, [mergedProps]);

  const SizedAction = useMemo(() => {
    if (!(mergedProps.size in sizedActionMap)) {
      warn(
        `Invalid size: ${mergedProps.size} provided, defaulting to "default"`
      );
      return sizedActionMap.default;
    }
    return sizedActionMap[mergedProps.size];
  }, [mergedProps.size, warn]);

  return (
    <ActionContainer
      data-testid={testId}
      type="button"
      title={mergedProps.title ?? mergedProps.label}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={mergedProps.disabled}
      className={className}
      {...styleProps}
    >
      <SizedAction
        {...mergedProps}
        isHovering={isHovering}
        testId={testId}
        onClick={onClick}
        badgeProps={badgeProps}
        iconTooltipProps={iconTooltipProps}
      />
    </ActionContainer>
  );
};

Action.defaultProps = defaultActionProps;

export { Action };

const ActionContainer = styled.button<ActionStyledProps>`
  ${actionContainerStyles}
`;
