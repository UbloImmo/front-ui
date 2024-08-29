import { isNullish, isObject, isString } from "@ubloimmo/front-util";
import { useMemo, type ReactNode } from "react";
import styled from "styled-components";

import { Markdown } from "./Markdown";

import { computeCalloutColors } from "@/components/Callout/Callout.styles";

import { type CalloutProps, Callout as UikitCallout } from "@components";

export const Callout = ({
  children,
  color = "primary",
  ...props
}: CalloutProps) => {
  const { text: textColor } = useMemo(
    () => computeCalloutColors(color),
    [color]
  );
  const content = useMemo(() => {
    if (
      isObject(children) &&
      "props" in children &&
      "children" in children.props &&
      !isNullish(children.props.children)
    ) {
      return children.props.children as ReactNode;
    }
    return children;
  }, [children]);
  return (
    <CalloutStyleOverrides>
      <UikitCallout {...props} color={color}>
        {isString(content) ? (
          <Markdown color={textColor}>{content}</Markdown>
        ) : (
          content ?? ""
        )}
      </UikitCallout>
    </CalloutStyleOverrides>
  );
};

const CalloutStyleOverrides = styled.span`
  margin: var(--s-2) 0 var(--s-4);

  [data-testid="callout"] span[data-testid="text"] {
    margin: 0 !important;
    font-size: var(--text-m) !important;
  }
`;
