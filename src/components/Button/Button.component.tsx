import { isNull } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";
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
  iconPlacement: "left",
  secondary: false,
  disabled: false,
  loading: false,
  fullWidth: false,
  reverse: false,
  onClick: null,
  className: null,
};

/**
 * A simple, clickable, responsive & accessible button.
 *
 * @version 0.0.6
 *
 * @param {ButtonProps} props - the button's props
 * @returns {JSX.Element} the rendered button
 */
const Button = (props: ButtonProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("Button");
  const mergedProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    defaultButtonProps,
    props
  );
  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId<ButtonProps>("button", props);
  const className = useClassName(props);

  const onClick = useCallback(() => {
    if (
      mergedProps.disabled ||
      mergedProps.loading ||
      isNull(mergedProps.onClick)
    )
      return;
    mergedProps.onClick();
  }, [mergedProps]);

  const { icon, disabled, title, role, type } = mergedProps;
  let { label } = mergedProps;

  const ariaTitle = useMemo(() => {
    return title && title.length > 0 ? title : label ?? undefined;
  }, [title, label]);

  const ariaRole = useMemo(() => {
    return role ?? "button";
  }, [role]);

  if ((!icon && !label) || (!icon && label?.length === 0)) {
    warn(
      "Button must have at least a label and / or an icon. Both are missing"
    );
    label = "[Label]";
  }

  return (
    <StyledButton
      {...styledProps}
      type={type}
      data-testid={testId}
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      title={ariaTitle}
      aria-label={ariaTitle}
      role={ariaRole}
    >
      {icon && <Icon name={icon} size="1rem" />}
      {label && label.length > 0 && (
        <Text size="m" weight="medium">
          {label}
        </Text>
      )}
      <StyledButtonLoadingContainer {...styledProps}>
        <Loading animation="BouncingBalls" size="s-3" />
      </StyledButtonLoadingContainer>
    </StyledButton>
  );
};

Button.defaultProps = defaultButtonProps;

export { Button };

const StyledButton = styled.button<StyleProps<DefaultButtonProps>>`
  ${buildButtonStyles}
`;

const StyledButtonLoadingContainer = styled.div<StyleProps<DefaultButtonProps>>`
  ${buildButtonLoadingContainerStyles}
`;
