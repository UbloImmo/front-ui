import { forwardRef, useLayoutEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";

import { paneContainerStyles, paneContentStyles } from "./Pane.styles";
import {
  type PaneProps,
  type PaneDefaultProps,
  PaneStyleProps,
} from "./Pane.types";

import { parseFixedLength } from "@/sizes/size.utils";
import {
  useTestId,
  useMergedProps,
  useStyleProps,
  useClassName,
  useHtmlAttribute,
  cssRemToCssPx,
  extractPx,
} from "@utils";

import type { TestIdProps } from "@types";

const defaultPaneProps: PaneDefaultProps = {
  expandedWidth: "15rem",
  collapsedWidth: "s-11",
  forceExpanded: false,
  children: null,
  dynamicContent: null,
  headLess: false,
  expandedBreakpoint: null,
  className: null,
  styleOverride: null,
  anchor: "left",
  top: 0,
  bottom: 0,
};

/**
 * Pane component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {PaneProps & TestIdProps} props - Pane component props
 * @returns {JSX.Element}
 */
const Pane = forwardRef<HTMLElement, PaneProps & TestIdProps>(
  (props: PaneProps & TestIdProps, ref): JSX.Element => {
    const mergedProps = useMergedProps(defaultPaneProps, props);
    const contentRef = useRef<HTMLElement>(null);
    const {
      expandedWidth,
      collapsedWidth,
      expandedBreakpoint,
      styleOverride,
      anchor,
      headLess,
      forceExpanded,
      top,
      bottom,
      dynamicContent: DynamicContent,
    } = mergedProps;

    const styleProps: PaneStyleProps = useStyleProps({
      expandedBreakpoint,
      expandedWidth,
      collapsedWidth,
      anchor,
      headLess,
      forceExpanded,
      top,
      bottom,
    });

    const testId = useTestId("pane", props);
    const className = useClassName(mergedProps);
    const style = useHtmlAttribute(styleOverride);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const expandedWidthPx = useMemo(
      () => extractPx(cssRemToCssPx(parseFixedLength(expandedWidth))),
      [expandedWidth]
    );

    useLayoutEffect(() => {
      if (contentRef.current) {
        const observer = new ResizeObserver((entries) => {
          const entry = entries.at(0);
          if (!entry) return;
          const size = entry.borderBoxSize.at(0);
          if (!size) return;

          setIsCollapsed(size.inlineSize < expandedWidthPx);
        });

        observer.observe(contentRef.current);

        return () => observer.disconnect();
      }
    }, [expandedWidthPx]);

    return (
      <PaneContainer
        ref={ref}
        className={className}
        style={style}
        data-testid={testId}
        {...styleProps}
      >
        <PaneContent
          ref={contentRef}
          data-testid="pane-content"
          {...styleProps}
        >
          {mergedProps.children}
          {DynamicContent && <DynamicContent isCollapsed={isCollapsed} />}
        </PaneContent>
      </PaneContainer>
    );
  }
);

export { Pane };

const PaneContainer = styled.aside<PaneStyleProps>`
  ${paneContainerStyles}
`;

const PaneContent = styled.section<PaneStyleProps>`
  ${paneContentStyles}
`;
