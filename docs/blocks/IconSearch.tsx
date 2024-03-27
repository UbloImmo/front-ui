import { objectKeys, isNull } from "@ubloimmo/front-util";
import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { ComponentVariants } from "./ComponentVariants";

import { Icon, TextInput } from "@/components";
import * as BootstrapIcons from "@/components/Icon/__generated__/bootstrap";
import * as CustomIcons from "@/components/Icon/__generated__/custom";

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

  return (
    <ListContainer>
      <ListHeader>
        <TextInput
          value={query}
          onChange={setQuery}
          placeholder="Search for an icon"
        />
      </ListHeader>
      <ListWrapper>
        <List>
          <ComponentVariants
            defaults={{ ...Icon.defaultProps, size: "s-8" }}
            variants={results}
            for="name"
            justify="space-around"
            of={Icon}
            gap={1}
          />
        </List>
      </ListWrapper>
    </ListContainer>
  );
};

const ListContainer = styled.div`
  position: relative;
  border-radius: var(--s-2);
  padding-top: var(--s-10);
`;

const ListWrapper = styled.div`
  padding: 0 var(--s-2) var(--s-2);
  background: var(--gray-50);
`;

const List = styled.div`
  padding: var(--s-6);
  overflow-y: auto;
  overflow-x: hidden;
  background: #fff;
  border-radius: var(--s-1);
`;

const ListHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 4;
  background: var(--gray-50);
  padding: var(--s-2) var(--s-2);
  border-top-right-radius: var(--s-2);
  border-top-left-radius: var(--s-2);
`;
