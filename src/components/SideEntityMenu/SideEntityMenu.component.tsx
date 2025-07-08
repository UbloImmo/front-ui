import { Fragment } from "react";
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
    title,
    titleIcon,
    activeItem,
  } = mergedProps;

  // Add default icon to backlinks if not provided
  const backLinksWithIcons = backLinks.map((link) => ({
    ...link,
    icon: link.icon || "ArrowLeftShort",
  }));

  return (
    <StyledSideEntityPane
      expandedWidth={width}
      collapsedWidth={collapsedWidth}
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
        />
      )}

      {menuLinks.map((link, index) => (
        <Fragment key={`menu-${index}`}>
          <SideEntityMenuItem
            link={link}
            activeItem={activeItem}
            testId={`side-entity-menu-item-${index}`}
            overrideTestId={true}
          />
        </Fragment>
      ))}
    </StyledSideEntityPane>
  );
};

SideEntityMenu.defaultProps = defaultSideEntityMenuProps;

export { SideEntityMenu };

const StyledSideEntityPane = styled(Pane)`
  ${sideEntityMenuContainerStyles}
`;
