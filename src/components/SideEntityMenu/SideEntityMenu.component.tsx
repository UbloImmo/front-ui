import { Fragment } from "react";
import styled from "styled-components";

import { SideEntityMenuItem } from "./components/SideEntityMenuItem";
import {
  sideEntityMenuContainerStyles,
  sideEntityMenuTitleSectionStyles,
} from "./SideEntityMenu.styles";

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
import { Pane } from "@layouts";
import { Divider } from "../Divider";

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

  // return (
  //   <StyledSideEntityMenu
  //     data-testid={testId}
  //     className={`side-entity-menu-container ${className}`}
  //     style={style}
  //     $width={width}
  //     $collapsedWidth={collapsedWidth}
  //   >
  //     {backLinksWithIcons.length > 0 && (
  //       <>
  //         {backLinksWithIcons.map((link, index) => (
  //           <SideEntityMenuItem
  //             key={`backlink-${index}`}
  //             link={link}
  //             activeItem={activeItem}
  //             testId={`side-entity-menu-back-${index}`}
  //             overrideTestId={true}
  //           />
  //         ))}
  //       </>
  //     )}

  //     {title && titleIcon && (
  //       <StyledTitleSection>
  //         <Icon name={titleIcon} size="s-5" />
  //         <Heading size="h4" weight="bold">
  //           {title}
  //         </Heading>
  //       </StyledTitleSection>
  //     )}

  //     {menuLinks.map((link, index) => (
  //       <Fragment key={`menu-${index}`}>
  //         <SideEntityMenuItem
  //           link={link}
  //           activeItem={activeItem}
  //           testId={`side-entity-menu-item-${index}`}
  //           overrideTestId={true}
  //         />
  //       </Fragment>
  //     ))}
  //   </StyledSideEntityMenu>
  // );
};

SideEntityMenu.defaultProps = defaultSideEntityMenuProps;

export { SideEntityMenu };

const StyledSideEntityPane = styled(Pane)`
  ${sideEntityMenuContainerStyles}
`;

const StyledTitleSection = styled.div`
  ${sideEntityMenuTitleSectionStyles}
`;
