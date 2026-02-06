import { isString } from "@ubloimmo/front-util";
import { useMemo } from "react";

import styles from "./Callout.block.module.scss";
import { Markdown } from "../Markdown";
import { flattenTypographyChildren } from "../Typography/Typography.utils";

import { type CalloutProps, Callout as UikitCallout } from "@components";

export const Callout = ({
  children,
  color = "primary",
  ...props
}: CalloutProps) => {
  const content = useMemo(() => {
    return flattenTypographyChildren(children);
  }, [children]);
  return (
    <UikitCallout className={styles.callout} {...props} color={color}>
      {isString(content) ? <Markdown>{content}</Markdown> : (content ?? "")}
    </UikitCallout>
  );
};
