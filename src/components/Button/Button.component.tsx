import { isNull, isString } from "@ubloimmo/front-util";
import {
  MouseEvent,
  useCallback,
  useMemo,
  type MouseEventHandler,
} from "react";

import { Icon } from "../Icon";
import { Loading } from "../Loading/Loading.component";
import { Text } from "../Text";
import styles from "./Button.module.scss";

import {
  useClassName,
  useCssClasses,
  useHtmlAttribute,
  useLogger,
  useMergedProps,
  useTestId,
} from "@utils";

import type { ButtonProps, DefaultButtonProps } from "./Button.types";
import type { TestIdProps } from "@types";

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
  styleOverride: null,
};

/**
 * A simple, clickable, responsive & accessible button.
 *
 * @version 0.1.0
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
  const testId = useTestId<ButtonProps>("button", props);
  const className = useClassName(props);
  const style = useHtmlAttribute(props.styleOverride);

  const onClick = useCallback<
    MouseEventHandler<HTMLButtonElement | HTMLDivElement>
  >(
    (event) => {
      if (mergedProps.disabled) return;
      if (mergedProps.onClickNative)
        mergedProps.onClickNative(event as MouseEvent<HTMLButtonElement>);
      if (mergedProps.loading || isNull(mergedProps.onClick)) return;
      mergedProps.onClick();
    },
    [mergedProps]
  );

  const {
    icon,
    disabled,
    title,
    role,
    type,
    expandOnHover,
    fullWidth,
    iconPlacement,
    embedded,
    secondary,
    loading,
    color,
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
      "Button must have at least a label and / or an icon. Both are missing"
    );
    label = "[Label]";
  }

  const classNames = useCssClasses(
    styles.button,
    [styles.primary, !secondary],
    [styles.secondary, secondary],
    [styles["full-width"], fullWidth],
    [styles.loading, loading],
    [styles.expandable, expandable],
    className
  );

  const commonProps = useMemo(
    () => ({
      "data-testid": testId,
      "data-expandable": expandable,
      "data-color": color,
      className: classNames,
      disabled: disabled || loading,
      "data-icon-placement": iconPlacement,
      "aria-disabled": disabled || loading,
      "data-loading": loading,
      title: ariaTitle,
      "aria-label": ariaTitle,
      role: ariaRole,
      style,
    }),
    [
      ariaRole,
      ariaTitle,
      classNames,
      color,
      disabled,
      expandable,
      iconPlacement,
      loading,
      style,
      testId,
    ]
  );

  const buttonContent = useMemo(() => {
    return (
      <>
        {icon && <Icon name={icon} size="s-4" />}
        {label && label.length > 0 && (
          <Text size="m" weight="medium" color="inherit">
            {label}
          </Text>
        )}
        {loading && (
          <div className={styles["button-loading-container"]}>
            <Loading animation="BouncingBalls" size="s-3" />
          </div>
        )}
      </>
    );
  }, [icon, label, loading]);

  if (embedded)
    return (
      <div {...commonProps} onClick={onClick}>
        {buttonContent}
      </div>
    );

  return (
    <button {...commonProps} onClick={onClick} type={type}>
      {buttonContent}
    </button>
  );
};

Button.defaultProps = defaultButtonProps;

export { Button };
