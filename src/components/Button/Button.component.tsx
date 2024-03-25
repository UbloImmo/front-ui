import type { ButtonProps, DefaultButtonProps } from "./Button.types";
import type { StyleProps } from "@types";
import { useLogger, useMergedProps, useStyleProps } from "@utils";
import { buildButtonStyles } from "./Button.styles";
import { Icon } from "../Icon";
import { Text } from "../Text";
import { useCallback, useMemo } from "react";
import styled from "styled-components";
import type { Nullable } from "@ubloimmo/front-util";

const defaultButtonProps: DefaultButtonProps = {
  type: "button",
  color: "primary",
  label: "Button",
  title: "A button",
  role: "button",
  icon: "CircleFill",
  iconPlacement: "left",
  secondary: false,
  disabled: false,
  loading: false,
  onClick: () => {},
};

/**
 * A simple, clickable, responsive & accessible button.
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
  const { label, icon, disabled, title, role } = mergedProps;

  const onClick = useCallback(() => {
    mergedProps.onClick();
  }, [mergedProps]);

  const ariaTitle = useMemo(() => {
    return title ?? label;
  }, [title, label]);

  const ariaRole = useMemo(() => {
    return role ?? "button";
  }, [role]);

  if (!icon && !label) {
    warn(
      "Button must have at least a label and / or an icon. Both are missing"
    );
    return null;
  }

  return (
    <StyledButton
      {...styledProps}
      data-testid="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
      title={ariaTitle}
      aria-label={ariaTitle}
      role={ariaRole}
    >
      {icon && <Icon name={icon} size="1rem" />}
      {label && (
        <Text size="m" weight="semiBold">
          {label}
        </Text>
      )}
    </StyledButton>
  );
};

Button.defaultProps = defaultButtonProps;

export { Button };

const StyledButton = styled.button<StyleProps<DefaultButtonProps>>`
  ${buildButtonStyles}
`;
