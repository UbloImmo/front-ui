import { forwardRef } from "react";

import { useGridLayoutStyle } from "./Grid.styles";

import { useHtmlAttribute, useMergedProps, useTestId } from "@utils";

import type { GridLayoutDefaultProps, GridLayoutProps } from "./Grid.types";
import type { TestIdProps } from "@types";

const defaultGridLayoutProps: GridLayoutDefaultProps = {
  flow: "row",
  gap: "1rem",
  justify: "start",
  align: "start",
  columns: 12,
  rows: "unset",
  inline: false,
  fill: false,
  children: null,
  className: null,
  role: null,
  id: null,
  as: "div",
  styleOverride: null,
} as const;

/**
 * A grid wrapper layout with default `row` flow and 12 columns
 *
 * @version 0.1.0
 *
 * @param {GridLayoutProps & TestIdProps} [props = defaultGridLayoutProps] - optional props
 * @return {JSX.Element} The styled grid wrapper
 */
const GridLayout = forwardRef<HTMLDivElement, GridLayoutProps & TestIdProps>(
  (props, ref): JSX.Element => {
    const mergedProps = useMergedProps(defaultGridLayoutProps, props);
    const testId = useTestId("grid", props);
    const role = useHtmlAttribute(mergedProps.role);
    const id = useHtmlAttribute(mergedProps.id);
    const Element = mergedProps.as;
    const { className, style } = useGridLayoutStyle(mergedProps);
    return (
      <Element
        data-testid={testId}
        role={role}
        className={className}
        id={id}
        style={style}
        ref={ref}
      >
        {props.children}
      </Element>
    );
  }
);
GridLayout.defaultProps = defaultGridLayoutProps;

export { GridLayout };
