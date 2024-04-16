import { isNull, type Nullable } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";
import styled from "styled-components";

import {
  buildButtonStyles,
  buildButtonLoadingContainerStyles,
} from "./Button.styles";
import { Icon } from "../Icon";
import { Loading } from "../Loading/Loading.component";
import { Text } from "../Text";

import { useLogger, useMergedProps, useStyleProps } from "@utils";

import type { ButtonProps, DefaultButtonProps } from "./Button.types";
import type { StyleProps } from "@types";

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
  onClick: null,
};

/**
 * A simple, clickable, responsive & accessible button.
 *
 * @version 0.0.2
 *
 * @param {ButtonProps} props - the button's props
 * @returns {Nullable<JSX.Element>} the rendered button
 */
const Button = (props: ButtonProps): Nullable<JSX.Element> => {
  const { warn } = useLogger("Button");
  const mergedProps = useMergedProps<DefaultButtonProps, ButtonProps>(
    defaultButtonProps,
    props
  );
  const styledProps = useStyleProps(mergedProps);

  const onClick = useCallback(() => {
    if (
      mergedProps.disabled ||
      mergedProps.loading ||
      isNull(mergedProps.onClick)
    )
      return;
    mergedProps.onClick();
  }, [mergedProps]);

  const { label, icon, disabled, title, role, type } = mergedProps;

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
    return null;
  }

  return (
    <StyledButton
      {...styledProps}
      type={type}
      data-testid="button"
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
