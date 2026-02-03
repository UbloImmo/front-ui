import { useMemo } from "react";

import styles from "./ListTableHeaderFilter.module.scss";

import { getInputLabelTextClassName } from "@/components/InputLabel/InputLabel.styles";
import { useCssClasses, useStatic } from "@utils";

import type { ClassNameOverrideProps } from "@types";
import type { Nullish } from "@ubloimmo/front-util";

function useListTableHeaderFilterClassName(
  hideLabel: Nullish<boolean>,
  className: Nullish<string>
) {
  return useCssClasses(
    styles["list-table-header-filter"],
    [styles["hide-label"], hideLabel],
    className
  );
}

function useListTableHeaderFilterLabelClassName() {
  const text = useStatic(() => getInputLabelTextClassName(false));
  return useCssClasses(text, styles["list-table-header-filter-label"]);
}

function useListTableHeaderFilterButtonClassName(active: Nullish<boolean>) {
  return useCssClasses(styles["list-table-header-filter-button"], [
    styles.active,
    active,
  ]);
}

export function useListTableHeaderFilterClassNames({
  active,
  hideLabel,
  className,
}: Record<"active" | "hideLabel", Nullish<boolean>> & ClassNameOverrideProps) {
  const cell = useListTableHeaderFilterClassName(hideLabel, className);
  const label = useListTableHeaderFilterLabelClassName();
  const button = useListTableHeaderFilterButtonClassName(active);

  return useMemo(
    () => ({
      cell,
      label,
      button,
    }),
    [cell, label, button]
  );
}
