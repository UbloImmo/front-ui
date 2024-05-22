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

const isComponentName = <TIndex extends AnyIndex>(
  maybeName: ComponentName<TIndex> | Nullish<string>
): maybeName is ComponentName<TIndex> => {
  if (isNullish(maybeName)) return false;
  if (isEmptyString(maybeName)) return false;
  if (maybeName.charAt(0) !== maybeName.charAt(0).toUpperCase()) return false;
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
    if (!("defaultProps" in maybeComponent)) return false;
    if (name === "Input") console.warn("Input passes");
    if (!isObject(maybeComponent.defaultProps)) return false;
    return true;
  });

  if (!entries.length) return null;

  return objectFromEntries(entries) as ComponentIndex<TIndex>;
};

export const componentIndexToEntries = <TIndex extends AnyIndex>(
  index: Nullish<ComponentIndex<TIndex>>
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
    .sort((a, b) => a.name.localeCompare(b.name));
  if (!entries.length) return null;

  return entries;
};

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

export const hasDefaultProps = <
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
