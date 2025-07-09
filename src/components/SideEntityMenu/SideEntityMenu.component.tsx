import { useMemo } from "react";
import styled from "styled-components";

import { SideEntityMenuItem } from "./components/SideEntityMenuItem";
import { sideEntityMenuContainerStyles } from "./SideEntityMenu.styles";
import { Divider } from "../Divider";

import { Pane } from "@layouts";
import {
  useTestId,
  useMergedProps,
  useHtmlAttribute,
  useClassName,
} from "@utils";

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
  title: null,
  titleIcon: null,
  activeItem: null,
};

/**
 * A side navigation menu component for entity-based navigation
 *
 * @version 0.0.1
 *
 * @param {SideEntityMenuProps & TestIdProps} props - SideEntityMenu component props
 * @returns {JSX.Element}
 */
const SideEntityMenu = (
  props: SideEntityMenuProps & TestIdProps
): JSX.Element => {
  const mergedProps = useMergedProps(defaultSideEntityMenuProps, props);
  const testId = useTestId("side-entity-menu", props);
  const className = useClassName(props);
  const style = useHtmlAttribute(props.styleOverride);

  const {
    menuLinks,
    backLinks,
    width,
    collapsedWidth,
    forceExpanded,
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

  return (
    <StyledSideEntityPane
      expandedWidth={width}
      collapsedWidth={collapsedWidth}
      forceExpanded={forceExpanded}
      testId={testId}
      className={className}
      styleOverride={style}
      overrideTestId
      expandedBreakpoint="LG"
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

      {menuLinks.map((link, index) => (
        <SideEntityMenuItem
          key={`menu-${index}`}
          link={link}
          activeItem={activeItem}
          navigate={navigate}
          testId={`side-entity-menu-item-${index}`}
          overrideTestId={true}
        />
      ))}
    </StyledSideEntityPane>
  );
};

SideEntityMenu.defaultProps = defaultSideEntityMenuProps;

export { SideEntityMenu };

const StyledSideEntityPane = styled(Pane)`
  ${sideEntityMenuContainerStyles}
`;
