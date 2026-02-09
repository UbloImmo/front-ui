import { useMemo } from "react";

import { SideEntityMenuItem } from "./components";
import { useSideEntityMenuClassnames } from "./SideEntityMenu.styles";
import { Divider } from "../Divider";

import { Pane } from "@layouts";
import { useTestId, useMergedProps, useHtmlAttribute } from "@utils";

import type {
  SideEntityMenuProps,
  SideEntityMenuDefaultProps,
} from "./SideEntityMenu.types";
import type { TestIdProps } from "@types";

const defaultSideEntityMenuProps: SideEntityMenuDefaultProps = {
  menuLinks: [],
  backLinks: [],
  width: "15.5rem",
  collapsedWidth: "2.75rem",
  forceExpanded: false,
  expandedBreakpoint: "MD",
  title: null,
  titleIcon: null,
  activeItem: null,
  navigate: null,
  className: null,
  styleOverride: null,
};

/**
 * A side navigation menu component for entity-based navigation
 *
 * @version 0.1.0
 *
 * @param {SideEntityMenuProps & TestIdProps} props - SideEntityMenu component props
 * @returns {JSX.Element}
 */
const SideEntityMenu = (
  props: SideEntityMenuProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultSideEntityMenuProps, props);
  const testId = useTestId("side-entity-menu", props);
  const classNames = useSideEntityMenuClassnames(mergedProps);
  const style = useHtmlAttribute(props.styleOverride);

  const {
    menuLinks,
    backLinks,
    width,
    collapsedWidth,
    forceExpanded,
    expandedBreakpoint,
    title,
    titleIcon,
    activeItem,
    navigate,
  } = mergedProps;

  // Add default icon to backlinks if not provided
  const backLinksWithIcons = useMemo(
    () =>
      backLinks.map((link) => ({
        ...link,
        icon: link.icon || "ArrowLeftShort",
      })),
    [backLinks]
  );

  // Separate items by type: head, pinned, regular
  const { headItems, pinnedItems, regularItems } = useMemo(() => {
    const head = menuLinks.filter((link) => link.head);
    const pinned = menuLinks.filter((link) => link.pinned && !link.head);
    const regular = menuLinks.filter((link) => !link.pinned && !link.head);
    return { headItems: head, pinnedItems: pinned, regularItems: regular };
  }, [menuLinks]);

  return (
    <Pane
      expandedWidth={width}
      collapsedWidth={collapsedWidth}
      forceExpanded={forceExpanded}
      testId={testId}
      className={classNames.pane}
      styleOverride={style}
      overrideTestId
      expandedBreakpoint={expandedBreakpoint}
    >
      {backLinksWithIcons.length > 0 && (
        <>
          {backLinksWithIcons.map((link, index) => (
            <SideEntityMenuItem
              key={`backlink-${index}`}
              link={link}
              activeItem={activeItem}
              navigate={navigate}
              testId={`side-entity-menu-back-${index}`}
              overrideTestId={true}
              isBacklink
            />
          ))}
          <Divider />
        </>
      )}

      {title && titleIcon && (
        <SideEntityMenuItem
          link={{ isTitle: true, title, icon: titleIcon, head: true }}
          navigate={navigate}
        />
      )}

      {/* Render head items first */}
      {headItems.map((link, index) => (
        <SideEntityMenuItem
          key={`head-${index}`}
          link={link}
          activeItem={activeItem}
          navigate={navigate}
          testId={`side-entity-menu-head-${index}`}
          overrideTestId={true}
        />
      ))}

      {/* Render pinned items */}
      {pinnedItems.map((link, index) => (
        <SideEntityMenuItem
          key={`pinned-${index}`}
          link={link}
          activeItem={activeItem}
          navigate={navigate}
          testId={`side-entity-menu-pinned-${index}`}
          overrideTestId={true}
        />
      ))}

      {/* Add spacing after pinned items if there are regular items */}
      {pinnedItems.length > 0 && regularItems.length > 0 && (
        <div aria-hidden="true" className={classNames.separator} />
      )}

      {/* Render regular items */}
      {regularItems.map((link, index) => (
        <SideEntityMenuItem
          key={`regular-${index}`}
          link={link}
          activeItem={activeItem}
          navigate={navigate}
          testId={`side-entity-menu-regular-${index}`}
          overrideTestId={true}
        />
      ))}
    </Pane>
  );
};

SideEntityMenu.__DEFAULT_PROPS = defaultSideEntityMenuProps;

export { SideEntityMenu };
