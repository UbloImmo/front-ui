import {
  forwardRef,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { usePaneLayoutStyle } from "./Pane.styles";

import { parseFixedLength } from "@/sizes/size.utils";
import {
  useTestId,
  useMergedProps,
  cssRemToCssPx,
  extractPx,
  clamp,
  cssPx,
} from "@utils";

import type { PaneProps, PaneDefaultProps } from "./Pane.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

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
  bottom: "unset",
  expandedRatio: 0.5,
};

/**
 * An expandable & collapsible pane wrapper layout with configurable styles & behavior
 *
 * @version 0.0.3
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
      expandedRatio,
      dynamicContent: DynamicContent,
    } = mergedProps;

    const testId = useTestId("pane", props);
    const [isCollapsed, setIsCollapsed] = useState(true);

    const expandedWidthPx = useMemo(
      () => extractPx(cssRemToCssPx(parseFixedLength(expandedWidth))),
      [expandedWidth]
    );

    const collapsedWidthPx = useMemo(
      () => extractPx(cssRemToCssPx(parseFixedLength(collapsedWidth))),
      [collapsedWidth]
    );

    const diff = useMemo(
      () => expandedWidthPx - collapsedWidthPx,
      [expandedWidthPx, collapsedWidthPx]
    );

    const margin = useMemo(
      () => diff * clamp(expandedRatio, 0, 0.9999999999999999),
      [diff, expandedRatio]
    );

    const containerRef = useRef<Nullable<HTMLElement>>(null);

    useLayoutEffect(() => {
      if (contentRef.current) {
        const observer = new ResizeObserver((entries) => {
          const entry = entries.at(0);
          if (!entry) return;
          const size = entry.borderBoxSize.at(0);
          if (!size) return;

          setIsCollapsed(size.inlineSize < expandedWidthPx - margin);
          if (containerRef.current) {
            containerRef.current.style.setProperty(
              "--pane-container-height",
              cssPx(size.blockSize)
            );
          }
        });

        observer.observe(contentRef.current);

        return () => observer.disconnect();
      }
    }, [expandedWidthPx, margin]);

    const assignContainerRef = useCallback(
      (el: Nullable<HTMLElement>) => {
        containerRef.current = el;
        if (ref) {
          if ("current" in ref) {
            ref.current = el;
          } else {
            ref(el);
          }
        }
      },
      [ref]
    );

    const { pane, paneContent } = usePaneLayoutStyle(mergedProps);

    return (
      <aside
        ref={assignContainerRef}
        className={pane.className}
        style={pane.style}
        data-testid={testId}
        data-expanded={!isCollapsed}
        // {...styleProps}
      >
        <section
          ref={contentRef}
          className={paneContent.className}
          style={paneContent.style}
          data-testid="pane-content"
          // {...styleProps}
        >
          {mergedProps.children}
          {DynamicContent && <DynamicContent isCollapsed={isCollapsed} />}
        </section>
      </aside>
    );
  }
);

export { Pane };
