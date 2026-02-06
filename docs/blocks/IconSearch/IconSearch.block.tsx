import { objectKeys, isNull } from "@ubloimmo/front-util";
import { useEffect, useMemo, useState } from "react";

import { ComponentVariants } from "../ComponentVariants";
import styles from "./IconSearch.module.scss";

import { Icon, TextInput } from "@/components";
import * as BootstrapIcons from "@/components/Icon/__generated__/bootstrap";
import * as CustomIcons from "@/components/Icon/__generated__/custom";
import { cssClasses, useStatic } from "@utils";

import type { Nullable } from "@ubloimmo/front-util";

type IconFilter = "all" | "custom" | "bootstrap";

const normalizeName = (name: string) => {
  return name.toLowerCase().replaceAll(" ", "").replaceAll("-", "");
};

export const IconSearch = () => {
  const [query, setQuery] = useState<Nullable<string>>(null);
  const [filter, setFilter] = useState<IconFilter>("all");

  const custom = useMemo(() => {
    return objectKeys(CustomIcons);
  }, []);

  const bootstrap = useMemo(() => {
    return objectKeys(BootstrapIcons);
  }, []);

  const all = useMemo(() => {
    return [...objectKeys(CustomIcons), ...objectKeys(BootstrapIcons)];
  }, []);

  const normalizedQuery = useMemo(() => {
    if (isNull(query)) return null;
    return normalizeName(query);
  }, [query]);

  // TODO: link filter once buttons are made
  useEffect(() => {
    setFilter("all");
  }, []);

  const results = useMemo(() => {
    const names =
      filter === "all" ? all : filter === "custom" ? custom : bootstrap;
    if (isNull(normalizedQuery)) {
      return names.sort();
    }
    return names
      .filter((name) => normalizeName(name).includes(normalizedQuery))
      .sort();
  }, [filter, normalizedQuery, custom, bootstrap, all]);

  const classNames = useStatic(() => ({
    container: cssClasses(styles["icon-search-list-container"]),
    wrapper: cssClasses(styles["icon-search-list-wrapper"]),
    header: cssClasses(styles["icon-search-list-header"]),
    list: cssClasses(styles["icon-search-list"]),
  }));

  return (
    <section className={classNames.container}>
      <header className={classNames.header}>
        <TextInput
          value={query}
          onChange={setQuery}
          placeholder="Search for an icon"
        />
      </header>
      <section className={classNames.wrapper}>
        <div className={classNames.list}>
          <ComponentVariants
            defaults={{ ...Icon.defaultProps, size: "s-8" }}
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
