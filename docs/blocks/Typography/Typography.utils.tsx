import {
  isArray,
  isNullish,
  isObject,
  type Predicate,
} from "@ubloimmo/front-util";

import { isNonEmptyString } from "@utils";

import type { ReactNode } from "react";

export const isChildrenArray = isArray as Predicate<ReactNode[]>;

export function flattenTypographyChildren(
  children: ReactNode,
  index?: number,
  length?: number
): ReactNode {
  if (
    isObject(children) &&
    "props" in children &&
    "children" in children.props &&
    !isNullish(children.props.children)
  ) {
    return children.props.children as ReactNode;
  }
  if (
    isNonEmptyString(children) &&
    children.replaceAll(" ", "") === "\n" &&
    !!index &&
    !(!!length && index === length - 1)
  ) {
    return <br />;
  }
  if (isChildrenArray(children))
    return children.map((child, index) =>
      flattenTypographyChildren(child, index, children.length)
    );
  return children;
}
