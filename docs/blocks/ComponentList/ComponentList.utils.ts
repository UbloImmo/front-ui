import {
  isFunction,
  isNullish,
  isObject,
  objectEntries,
  objectFromEntries,
} from "@ubloimmo/front-util";

import { isEmptyString } from "@utils";

import type {
  AnyIndex,
  Component,
  ComponentDefaultPropsMask,
  ComponentEntries,
  ComponentEntry,
  ComponentEntryItem,
  ComponentIndex,
  ComponentMask,
  ComponentName,
  ComponentProps,
  DocumentedComponent,
  MaybeDocumentedComponent,
} from "./ComponentList.types";
import type { Nullish, Nullable } from "@ubloimmo/front-util";

/**
 * Checks if the given value is a valid component name.
 *
 * @template TIndex - The type of the index.
 * @param {ComponentName<TIndex> | Nullish<string>} maybeName - The value to check.
 * @return {maybeName is ComponentName<TIndex>} - True if the value is a valid component name, false otherwise.
 */
const isComponentName = <TIndex extends AnyIndex>(
  maybeName: ComponentName<TIndex> | Nullish<string>
): maybeName is ComponentName<TIndex> => {
  // remove null values
  if (isNullish(maybeName)) return false;
  // remove empty strings
  if (isEmptyString(maybeName)) return false;
  // only accept if first char is uppercase
  if (maybeName.charAt(0) !== maybeName.charAt(0).toUpperCase()) return false;
  // assume name is PascalCase
  return true;
};

/**
 * Extracts components from an index object.
 *
 * @template {AnyIndex} TIndex - Any imported module or plain object containing components
 *
 * @param {Nullish<TIndex>} index - The root index to extract components from. Returns null if nullish
 * @returns {Nullable<ComponentIndex<TIndex>>} - The extracted components index or null
 */
export const extractComponentsFromIndex = <TIndex extends AnyIndex>(
  index: Nullish<TIndex>
): Nullable<ComponentIndex<TIndex>> => {
  if (isNullish(index)) return null;
  const entries = objectEntries<TIndex>(index).filter((entry) => {
    const [name, maybeComponent] = entry;
    // remove hooks
    if (name.includes("use")) return false;
    // remove camelCase in favor of PascalCase
    if (!isComponentName(name)) return false;
    // only keep functions
    if (!isFunction<ComponentMask<TIndex>>(maybeComponent)) return false;
    // only keep components that expose their default props
    if (!("defaultProps" in maybeComponent)) return false;
    if (!isObject(maybeComponent.defaultProps)) return false;
    return true;
  });

  if (!entries.length) return null;

  return objectFromEntries(entries) as ComponentIndex<TIndex>;
};

/**
 * Converts a component index into an array of component entries.
 *
 * @template {AnyIndex} TIndex - The shape of the index.
 * @param {Nullish<ComponentIndex<TIndex>>} index - The component index to convert or null / undefined.
 * @param {ComponentName<TIndex>[]} [exclude] - An optional array of component names to exclude.
 * @param {ComponentName<TIndex>[]} [include] - An optional array of component names to include.
 * @returns {Nullable<ComponentEntries<TIndex>>} - An array of component entries or null if the index is nullish or empty.
 */
export const componentIndexToEntries = <TIndex extends AnyIndex>(
  index: Nullish<ComponentIndex<TIndex>>,
  exclude?: ComponentName<TIndex>[],
  include?: ComponentName<TIndex>[]
): Nullable<ComponentEntries<TIndex>> => {
  if (isNullish(index)) return null;

  const entries = objectEntries(index)
    .map(
      <TName extends ComponentName<TIndex>>([name, Component]: ComponentEntry<
        TIndex,
        TName
      >): ComponentEntryItem<TIndex, TName> => ({
        name,
        Component,
      })
    )
    .sort((a, b) => a.name.localeCompare(b.name))
    .filter(({ name }) => (!exclude ? true : !exclude.includes(name)))
    .filter(({ name }) => (!include ? true : include.includes(name)));
  if (!entries.length) return null;

  return entries;
};

/**
 * Checks if a component is a documented component.
 *
 * @template {AnyIndex} TIndex - The index type of the component.
 * @template {ComponentName<TIndex>} TName - The name type of the component.
 * @param {Component<TIndex, TName> | DocumentedComponent<TIndex, TName>} maybeDocumentedComponent - The component to check.
 * @return {maybeDocumentedComponent is DocumentedComponent<TIndex, TName>} - True if the component is a documented component, false otherwise.
 */
export const isDocumentedComponent = <
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
>(
  maybeDocumentedComponent:
    | Component<TIndex, TName>
    | DocumentedComponent<TIndex, TName>
): maybeDocumentedComponent is DocumentedComponent<TIndex, TName> => {
  return (
    "__docgenInfo" in maybeDocumentedComponent &&
    isObject(maybeDocumentedComponent.__docgenInfo)
  );
};

/**
 * Checks if a component has default props.
 *
 * @remarks this is needed to make TS behave
 *
 * @template TIndex - The index type of the component.
 * @template TName - The name type of the component.
 * @param {MaybeDocumentedComponent<TIndex, TName>} component - The component to check.
 * @return {component is MaybeDocumentedComponent<TIndex, TName> & ComponentDefaultPropsMask<ComponentProps<TIndex, TName>>} - True if the component has default props, false otherwise.
 */
export const hasDefaultProps = <
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
>(
  component: MaybeDocumentedComponent<TIndex, TName>
): component is MaybeDocumentedComponent<TIndex, TName> &
  ComponentDefaultPropsMask<ComponentProps<TIndex, TName>> => {
  if (!("defaultProps" in component)) return false;
  if (!isObject(component.defaultProps)) return false;
  return true;
};
