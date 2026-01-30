import styles from "./Callout.module.scss";

import {
  cssVarUsage,
  isGrayColor,
  useCssClasses,
  useCssVariables,
} from "@utils";

import type { IconName } from "../Icon";
import type { CalloutColor, CalloutDefaultProps } from "./Callout.types";

export const calloutIconNames: Record<CalloutColor, IconName> = {
  primary: "InfoSquareFill",
  warning: "QuestionSquareFill",
  pending: "HourglassSplit",
  gray: "SlashSquareFill",
  error: "ExclamationSquareFill",
};

export function useCalloutStyle(props: CalloutDefaultProps) {
  const className = useCssClasses(
    styles.callout,
    styles[props.size],
    props.className
  );

  const style = useCssVariables(() => {
    const background = cssVarUsage(
      props.size === "l"
        ? "white"
        : isGrayColor(props.color)
          ? "gray-50"
          : `${props.color}-light`
    );
    const border = cssVarUsage(
      isGrayColor(props.color)
        ? "gray-600"
        : props.size === "l"
          ? `${props.color}-medium`
          : `${props.color}-base`
    );

    return {
      "callout-background": background,
      "callout-border": border,
    };
  }, props.styleOverride);

  return { className, style };
}
