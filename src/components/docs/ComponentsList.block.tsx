import // arrayFilter,
// isFunction,
// isObject,
// objectEntries,
// type GenericFn,
// type Nullable,
"@ubloimmo/front-util";

import { GridLayout } from "@/layouts";
// import * as componentsIndexRaw from "../index";
// import type { ReactNode } from "react";

// type ComponentIndexModule = typeof componentsIndexRaw;

// type ComponentKey = keyof ComponentIndexModule;

// TODO: change to obj type once filtering is stable
// type ComponentListItem = GenericFn<
//   [Record<string, unknown>],
//   Nullable<ReactNode>
// >;

// const filterComponentsFromExports = (): ComponentListItem[] => {
//   if (!isObject(componentsIndexRaw)) return [];
//   const entries = objectEntries<ComponentIndexModule>(
//     componentsIndexRaw
//   ).filter((entry): entry is [ComponentKey, ComponentListItem] => {
//     const [name, maybeComponent] = entry;
//     // remove hooks
//     if (name.includes("use")) return false;
//     // remove camelCase in favor of PascalCase
//     if (name.charAt(0) !== name.charAt(0).toUpperCase()) return false;
//     if (!isFunction<ComponentListItem>(maybeComponent)) return false;
//     return true;
//   });
// };

export const ComponentsListRenderer = () => {
  // console.log(allComponents);
  return null;
};

export const ComponentsList = () => {
  return (
    <GridLayout columns={3} gap="s-2">
      <ComponentsListRenderer />
    </GridLayout>
  );
};
