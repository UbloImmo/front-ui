import { Fragment } from "react";
import styled from "styled-components";

import { SideEntityMenuItem } from "./components/SideEntityMenuItem";
import {
  sideEntityMenuContainerStyles,
  sideEntityMenuHeaderStyles,
  sideEntityMenuTitleSectionStyles,
  sideEntityMenuTitleTextStyles,
  sideEntityMenuPinnedSpacerStyles,
} from "./SideEntityMenu.styles";
import { Heading } from "../Heading";
import { Icon } from "../Icon";

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
    <StyledSideEntityMenu
      data-testid={testId}
      className={className}
      style={style}
      $width={width}
      $collapsedWidth={collapsedWidth}
    >
      {backLinksWithIcons.length > 0 && (
        <StyledSideEntityMenuHeader>
          {backLinksWithIcons.map((link, index) => (
            <SideEntityMenuItem
              key={`backlink-${index}`}
              link={link}
              activeItem={activeItem}
              testId={`side-entity-menu-back-${index}`}
              overrideTestId={true}
            />
          ))}
        </StyledSideEntityMenuHeader>
      )}

      {title && titleIcon && (
        <StyledTitleSection>
          <Icon name={titleIcon} size="s-4" />
          <StyledTitleText data-text-content>
            <Heading size="h4" weight="bold">
              {title}
            </Heading>
          </StyledTitleText>
        </StyledTitleSection>
      )}

      {menuLinks.map((link, index) => (
        <Fragment key={`menu-${index}`}>
          <SideEntityMenuItem
            link={link}
            activeItem={activeItem}
            testId={`side-entity-menu-item-${index}`}
            overrideTestId={true}
          />
          {link.pinned && index === 0 && <StyledPinnedSpacer />}
        </Fragment>
      ))}
    </StyledSideEntityMenu>
  );
};

SideEntityMenu.defaultProps = defaultSideEntityMenuProps;

export { SideEntityMenu };

const StyledSideEntityMenu = styled.div<{
  $width: string;
  $collapsedWidth: string;
}>`
  ${sideEntityMenuContainerStyles}
`;

const StyledSideEntityMenuHeader = styled.div`
  ${sideEntityMenuHeaderStyles}
`;

const StyledTitleSection = styled.div`
  ${sideEntityMenuTitleSectionStyles}
`;

const StyledTitleText = styled.div`
  ${sideEntityMenuTitleTextStyles}
`;

const StyledPinnedSpacer = styled.div`
  ${sideEntityMenuPinnedSpacerStyles}
`;
