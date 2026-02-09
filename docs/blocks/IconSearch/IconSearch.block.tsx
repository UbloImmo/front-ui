import { isNull } from "@ubloimmo/front-util";
import { useCallback, useMemo, useState } from "react";

import { ComponentVariants } from "../ComponentVariants";
import styles from "./IconSearch.module.scss";

import {
  ComboBox,
  ComboBoxOnChangeFn,
  Icon,
  type IconName,
  TextInput,
} from "@/components";
import {
  BOOTSTRAP_ICON_NAMES,
  CUSTOM_ICON_NAMES,
  GENERATED_ICON_NAMES,
} from "@/components/Icon/__generated__/iconName.types";
import { FlexColumnLayout } from "@layouts";
import { cssClasses, useStatic } from "@utils";

import type { Nullable } from "@ubloimmo/front-util";

type IconFilter = "all" | "custom" | "bootstrap";

const normalizeName = (name: string) => {
  return name.toLowerCase().replaceAll(" ", "").replaceAll("-", "");
};

export const IconSearch = () => {
  const [query, setQuery] = useState<Nullable<string>>(null);
  const [filter, setFilter] = useState<IconFilter>("all");

  const normalizedQuery = useMemo(() => {
    if (isNull(query)) return null;
    return normalizeName(query);
  }, [query]);

  const results = useMemo(() => {
    const names: IconName[] =
      filter === "all"
        ? GENERATED_ICON_NAMES
        : filter === "custom"
          ? CUSTOM_ICON_NAMES
          : BOOTSTRAP_ICON_NAMES;
    if (isNull(normalizedQuery)) {
      return names.sort();
    }
    return names
      .filter((name) => normalizeName(name).includes(normalizedQuery))
      .sort();
  }, [filter, normalizedQuery]);

  const classNames = useStatic(() => ({
    container: cssClasses(styles["icon-search-list-container"]),
    wrapper: cssClasses(styles["icon-search-list-wrapper"]),
    header: cssClasses(styles["icon-search-list-header"]),
    list: cssClasses(styles["icon-search-list"]),
  }));

  const updateFilter = useCallback<ComboBoxOnChangeFn<IconFilter>>(
    ([value]) => setFilter(value ?? null),
    [setFilter]
  );

  return (
    <section className={classNames.container}>
      <header className={classNames.header}>
        <FlexColumnLayout fill="row" gap="s-2">
          <TextInput
            value={query}
            onChange={setQuery}
            placeholder="Search for an icon"
          />
          <ComboBox<IconFilter>
            options={[
              { label: "All icons", value: "all" },
              { label: "Custom icons", value: "custom" },
              { label: "Bootstrap icons", value: "bootstrap" },
            ]}
            value={filter}
            onChange={updateFilter}
            columns={3}
          />
        </FlexColumnLayout>
      </header>
      <section className={classNames.wrapper}>
        <div className={classNames.list}>
          <ComponentVariants
            defaults={{ ...Icon.__DEFAULT_PROPS, size: "s-8" }}
            variants={results}
            for="name"
            justify="space-around"
            of={Icon}
            gap={1}
            scaling={1.2}
          />
        </div>
      </section>
    </section>
  );
};
