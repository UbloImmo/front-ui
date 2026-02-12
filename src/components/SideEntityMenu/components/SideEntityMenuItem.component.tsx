import { motion } from "framer-motion";
import { FC, useCallback, useMemo } from "react";

import { Heading } from "../../Heading";
import { Icon } from "../../Icon";
import { Text } from "../../Text";
import { useSideEntityMenuItemClassNames } from "../SideEntityMenu.styles";

import { isDefined, isNonNullish, useTestId } from "@utils";

import type { SideEntityMenuItemProps } from "../SideEntityMenu.types";
import type { PaletteColor } from "@types";

/**
 * SideEntityMenuItem component for rendering individual menu items
 *
 * @version 0.1.0
 */
export const SideEntityMenuItem: FC<SideEntityMenuItemProps> = ({
  link,
  activeItem,
  navigate,
  isBacklink,
  ...props
}) => {
  const testId = useTestId("side-entity-menu-item", props);
  const classNames = useSideEntityMenuItemClassNames();

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (link.disabled) {
        event.preventDefault();
        return;
      }

      const hasModifiers =
        event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0;

      if (hasModifiers) {
        // Let browser handle cmd+click, ctrl+click, shift+click, middle click, etc.
        return;
      }

      if (navigate && link.to) {
        event.preventDefault();
        navigate(link.to);
        return;
      }

      if (link.onClick) {
        event.preventDefault();
        link.onClick();
      }

      // Otherwise, let the browser handle the link naturally
    },
    [link, navigate]
  );

  const isDisabled = useMemo(
    () => link.disabled || !link.to,
    [link.disabled, link.to]
  );

  const isActive = link.to
    ? isNonNullish(activeItem)
      ? activeItem === link.to
      : isDefined(window) && window.location.pathname === link.to
    : false;

  const linkProps = useMemo(
    () => ({
      onClick: handleClick,
      tabIndex: isDisabled ? -1 : 0,
      "aria-disabled": isDisabled,
      "aria-current": (isActive ? "page" : undefined) as "page" | undefined,
      "data-testid": testId,
      "data-border-bottom": link.borderBottom,
    }),
    [handleClick, isActive, isDisabled, link.borderBottom, testId]
  );

  if (link.hidden) return null;

  if ("isTitle" in link && link.isTitle && link.icon) {
    return (
      <div className={classNames.item} {...linkProps} data-menu-header>
        <div className={classNames.icon}>
          <Icon name={link.icon} size="s-5" color="gray-700" />
        </div>
        <div className={classNames.title} data-text-content>
          <Heading
            size="h4"
            weight="bold"
            color="gray-900"
            fill
            ellipsis
            lineClamp={2}
          >
            {link.title}
          </Heading>
        </div>
      </div>
    );
  }

  const textColor: PaletteColor = isDisabled
    ? "gray-500"
    : isActive
      ? "primary-base"
      : "gray-900";

  const menuItemContent = (
    <>
      {isActive && (
        <motion.div className={classNames.indicator} layoutId="current" />
      )}
      {link.icon && (
        <div className={classNames.icon}>
          <Icon
            name={link.icon}
            size={link.head ? "s-5" : "s-4"}
            color={
              isDisabled ? "gray-400" : isActive ? "primary-base" : "gray-700"
            }
          />
          {link.error && (
            <div className={classNames.errorIndicator} data-error-indicator>
              <Icon name="CircleFill" size="s-2" color="error-base" />
            </div>
          )}
        </div>
      )}
      <div className={classNames.title} data-text-content>
        {link.head ? (
          <Heading
            size="h4"
            weight="bold"
            color={textColor}
            fill
            ellipsis
            lineClamp={2}
            title={link.title}
          >
            {link.title}
          </Heading>
        ) : (
          <Text
            size={isBacklink ? "s" : "m"}
            weight={isActive && !isBacklink ? "bold" : "medium"}
            color={textColor}
            fill
            ellipsis
            noWrap
            title={link.title}
          >
            {link.title}
          </Text>
        )}
        {link.pinned && (
          <Icon name="PinAngleFill" size="s-3" color="gray-700" />
        )}
        {link.error && <Icon name="CircleFill" size="s-2" color="error-base" />}
      </div>
    </>
  );

  return (
    <a className={classNames.item} href={link.to} {...linkProps}>
      {menuItemContent}
    </a>
  );
};
