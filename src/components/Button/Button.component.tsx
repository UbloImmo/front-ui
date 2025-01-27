import { isNull, isString } from "@ubloimmo/front-util";
import { useCallback, useMemo, type MouseEventHandler } from "react";
import styled from "styled-components";

import {
  buildButtonStyles,
  buildButtonLoadingContainerStyles,
} from "./Button.styles";
import { Icon } from "../Icon";
import { Loading } from "../Loading/Loading.component";
import { Text } from "../Text";

import {
  useClassName,
  useLogger,
  useMergedProps,
  useStyleProps,
  useTestId,
} from "@utils";

import type { ButtonProps, DefaultButtonProps } from "./Button.types";
import type { StyleProps, TestIdProps } from "@types";

const defaultButtonProps: DefaultButtonProps = {
  type: "button",
  color: "primary",
  label: null,
  title: "",
  role: "button",
  icon: null,
  embedded: false,
  iconPlacement: "left",
  secondary: false,
  disabled: false,
  loading: false,
  fullWidth: false,
  expandOnHover: false,
  onClick: null,
  className: null,
  onClickNative: null,
};

/**
 * A simple, clickable, responsive & accessible button.
 *
 * @version 0.0.9
 *
 * @param {ButtonProps} props - the button's props
 * @returns {JSX.Element} the rendered button
 */
const Button = (props: ButtonProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("Button");
  const mergedProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    defaultButtonProps,
    props,
  );
  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId<ButtonProps>("button", props);
  const className = useClassName(props);

  const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (event) => {
      if (mergedProps.disabled) return;
      if (mergedProps.onClickNative) mergedProps.onClickNative(event);
      if (mergedProps.loading || isNull(mergedProps.onClick)) return;
      mergedProps.onClick();
    },
    [mergedProps],
  );

  const {
    icon,
    disabled,
    title,
    role,
    type,
    expandOnHover,
    fullWidth,
    embedded,
  } = mergedProps;
  let { label } = mergedProps;

  const ariaTitle = useMemo(() => {
    return title && title.length > 0 ? title : (label ?? undefined);
  }, [title, label]);

  const ariaRole = useMemo(() => {
    return role ?? "button";
  }, [role]);

  const expandable = useMemo(() => {
    if (!expandOnHover) return false;

    if (!isString(icon) || !isString(label)) {
      warn(`Both label and icon must be provided to expand on hover`);
      return false;
    }

    if (fullWidth) {
      warn(`fullWidth takes precence over expandOnHover.`);
      return false;
    }
    return true;
  }, [expandOnHover, fullWidth, label, icon, warn]);

  if ((!icon && !label) || (!icon && label?.length === 0)) {
    warn(
      "Button must have at least a label and / or an icon. Both are missing",
    );
    label = "[Label]";
  }

  const commonProps = useMemo(
    () => ({
      ...styledProps,
      "data-testid": testId,
      "data-expandable": expandable,
      className,
      disabled,
      "aria-disabled": disabled,
      title: ariaTitle,
      "aria-label": ariaTitle,
      role: ariaRole,
    }),
    [ariaRole, ariaTitle, className, disabled, expandable, styledProps, testId],
  );

  const buttonContent = useMemo(() => {
    return (
      <>
        {icon && <Icon name={icon} size="1rem" />}
        {label && label.length > 0 && (
          <Text size="m" weight="medium">
            {label}
          </Text>
        )}
        <StyledButtonLoadingContainer {...styledProps}>
          <Loading animation="BouncingBalls" size="s-3" />
        </StyledButtonLoadingContainer>
      </>
    );
  }, [icon, label, styledProps]);

  if (embedded)
    return (
      <StyledEmbeddedButton
        {...commonProps}
        onClick={onClick as unknown as MouseEventHandler<HTMLDivElement>}
      >
        {buttonContent}
      </StyledEmbeddedButton>
    );

  return (
    <StyledButton {...commonProps} onClick={onClick} type={type}>
      {buttonContent}
    </StyledButton>
  );
};

Button.defaultProps = defaultButtonProps;

export { Button };

const StyledEmbeddedButton = styled.div<StyleProps<DefaultButtonProps>>`
  ${buildButtonStyles}
`;

const StyledButton = styled.button<StyleProps<DefaultButtonProps>>`
  ${buildButtonStyles}
`;

const StyledButtonLoadingContainer = styled.div<StyleProps<DefaultButtonProps>>`
  ${buildButtonLoadingContainerStyles}
`;
