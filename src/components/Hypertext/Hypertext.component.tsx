import { MouseEventHandler, useCallback, useMemo } from "react";

import { useHypertextStyle } from "./Hypertext.styles";
import { DefaultHypertextProps, HypertextProps } from "./Hypertext.types";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { isEmptyString, useLogger, useMergedProps, useTestId } from "@utils";

import type { PaletteColor } from "@types";

const defaultHypertextProps: DefaultHypertextProps = {
  children: "[Hypertext]",
  title: "",
  href: "",
  color: "primary",
  onClick: null,
  className: null,
  styleOverride: null,
};

/**
 * Renders a hyperlink component with a text and an icon.
 *
 * @version 0.1.0
 *
 * @param {HypertextProps} props - The hypertext's props
 * @return {JSX.Element} The rendered hypertext
 */
const Hypertext = (props: HypertextProps): JSX.Element => {
  const { warn } = useLogger("Hypertext");
  const mergedProps = useMergedProps(defaultHypertextProps, props);
  const testId = useTestId("hypertext");
  const { children, href, title, color, onClick } = mergedProps;
  const { className, style } = useHypertextStyle(mergedProps);

  // Only warn about missing href if onClick is not provided
  if (isEmptyString(href || "") && !onClick) {
    warn(
      `Missing required href, please provide a redirection link or an onClick handler`
    );
  }

  if (isEmptyString(title)) {
    warn(
      `Missing required title, please provide a title for better accessibility`
    );
  }

  const textColor = useMemo<PaletteColor>(() => {
    if (color) {
      return color !== "gray" ? `${color}-base` : `gray-700`;
    }

    return "primary-base";
  }, [color]);

  const iconColor = useMemo<PaletteColor>(() => {
    if (color) {
      return color !== "gray"
        ? color === "pending"
          ? `${color}-dark`
          : `${color}-base`
        : `gray-700`;
    }

    return "primary-base";
  }, [color]);

  const handleClick = useCallback<MouseEventHandler>(
    (event) => {
      // If onClick is provided, use it and prevent default link behavior
      if (onClick) {
        event.preventDefault();
        onClick();
      }
      // Otherwise, let the default link behavior happen (href is used)
    },
    [onClick]
  );

  const content = (
    <>
      <Text size="m" weight="medium" color={textColor} underline>
        {children}
      </Text>
      <Icon name="BoxArrowUpRight" size="s-3" color={iconColor} />
    </>
  );

  if (onClick) {
    return (
      <button
        className={className}
        style={style}
        title={title}
        onClick={handleClick}
        data-testid={testId}
        type="button"
      >
        {content}
      </button>
    );
  }

  return (
    <a
      className={className}
      style={style}
      title={title}
      href={href}
      target="_blank"
      rel="noreferrer"
      data-testid={testId}
    >
      {content}
    </a>
  );
};

Hypertext.defaultProps = defaultHypertextProps;

export { Hypertext };
