import { useMemo } from "react";
import { css, type RuleSet } from "styled-components";

import styles from "./InputLabel.module.scss";

import { cssClasses, useCssClasses } from "@utils";

import type { InputLabelTextStyleProps } from "./InputLabel.types";
import type { Nullish } from "@ubloimmo/front-util";

// FIXME: finish removal of styled-components in List components, then delete this
export const inputLabelTextStyles = ({
  $required,
}: InputLabelTextStyleProps): RuleSet => css`
  ${$required &&
  css`
    &::after {
      content: " *";
      color: var(--warning-base);
    }
  `}
`;

export function getInputLabelTextClassName(required: Nullish<boolean>) {
  return cssClasses(styles["input-label-text"], [styles.required, required]);
}

export function useInputLabelClassNames(
  required: Nullish<boolean>,
  className: Nullish<string>
) {
  const label = useCssClasses(styles["input-label"], className);
  const text = useMemo(() => getInputLabelTextClassName(required), [required]);

  return { label, text };
}
