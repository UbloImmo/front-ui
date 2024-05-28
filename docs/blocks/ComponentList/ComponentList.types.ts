import type * as componentsIndexRaw from "@components";

import type { DocgenInfo } from "@docs/docs.types";
import type { GridTemplate } from "@layouts";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

export type ComponentIndexModule = typeof componentsIndexRaw;

/**
 * Any index.ts module that exports stuff
 */
export type AnyIndex = {
  [key: string]: unknown;
};

/**
 * Used to filter a potential component by allowing its props to by either TProps or TProps & TestIdProps
 */
type ComponentPropsMask<
  TProps extends Record<string, unknown> = Record<string, unknown>
> = TProps | (TProps & TestIdProps);

/**
 * Removes the {@link TestIdProps} from {@link ComponentPropsMask}
 */
type RemoveTestIdProps<TProps extends ComponentPropsMask> = {
  [TKey in keyof TProps]: TKey extends keyof TestIdProps ? never : TProps[TKey];
};

/**
 * The default props for a component, without the test id props, derived from {@link ComponentPropsMask}
 */
export type ComponentDefaultProps<TProps extends ComponentPropsMask> = Required<
  RemoveTestIdProps<TProps>
>;

/**
 * Used to filter a potential component by checking whether it holds a `defaultProps` property derived from {@link ComponentPropsMask}
 */
export type ComponentDefaultPropsMask<TProps extends ComponentPropsMask> = {
  defaultProps: ComponentDefaultProps<TProps>;
};

/**
 * Used to filter a potential component by only allowing its return type to be either JSX.Element or Nullable<JSX.Element>
 */
type ComponentReturnMask = JSX.Element | Nullable<JSX.Element>;

/**
 * Used to match a component as a function that takes {@link ComponentPropsMask} and returns {@link ComponentReturnMask}
 */
type ComponentFnMask<TProps extends ComponentPropsMask> = {
  (props: TProps): ComponentReturnMask;
};

/**
 * Used to match a component as a function that matches {@link ComponentFnMask} and could match {@link ComponentDefaultPropsMask}
 */
export type ComponentMask<TProps extends ComponentPropsMask> =
  | ComponentFnMask<TProps>
  | (ComponentFnMask<TProps> & ComponentDefaultPropsMask<TProps>);

/**
 * Filters an index module object and only keeps key/values that are valid react components
 */
export type ComponentIndexMask<TIndex extends AnyIndex> = {
  [TKey in keyof TIndex & string]: Parameters<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    TIndex[TKey] extends (...args: any) => any
      ? TIndex[TKey]
      : (...args: never[]) => unknown
  >[0] extends infer TProps extends ComponentPropsMask
    ? TIndex[TKey] extends infer TComponent extends ComponentMask<TProps>
      ? TComponent
      : never
    : never;
};

/**
 * Transforms an index module object into a list of component names that match the {@link ComponentIndexMask}
 */
type ComponentNameMask<TIndex extends AnyIndex> = {
  [TKey in keyof ComponentIndexMask<TIndex> &
    string]: ComponentIndexMask<TIndex>[TKey] extends never ? never : TKey;
}[keyof ComponentIndexMask<TIndex> & string];

/**
 * Extracts only components from an index using the {@link ComponentNameMask}
 */
export type ComponentIndex<TIndex extends AnyIndex> = {
  [TName in ComponentNameMask<TIndex> &
    string]: ComponentIndexMask<TIndex>[TName];
};

/**
 * An enum of valid component names exported by TIndex
 */
export type ComponentName<TIndex extends AnyIndex> =
  keyof ComponentIndex<TIndex> & string;

/**
 * A single entry as returned by {@link Object.entries} on a {@link ComponentIndex} object
 */
export type ComponentEntry<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex> = ComponentName<TIndex>
> = [TName, ComponentIndex<TIndex>[TName]];

/**
 * A component in a {@link ComponentIndex} as indexed by its {@link ComponentName}
 */
export type Component<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = ComponentIndex<TIndex>[TName];

/**
 * The props accepted by a {@link Component} as indexed by its {@link ComponentName}
 */
export type ComponentProps<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = Parameters<Component<TIndex, TName>>[0];

/**
 * A documented component in a {@link ComponentIndex}
 * Basically a component that has been parsed by `storybook` and contains `react-docgen` info
 */
export type DocumentedComponent<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = Component<TIndex, TName> & {
  __docgenInfo: DocgenInfo<ComponentProps<TIndex, TName>>;
};

/**
 * Either a {@link Component} or a {@link DocumentedComponent}
 * in a {@link ComponentIndex} as indexed by its {@link ComponentName}
 */
export type MaybeDocumentedComponent<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = Component<TIndex, TName> | DocumentedComponent<TIndex, TName>;

/**
 * A {@link ComponentEntry} mapped into an object that could have been documented by `Storybook`
 */
export type ComponentEntryItem<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = {
  name: TName;
  Component: MaybeDocumentedComponent<TIndex, TName>;
};

/**
 * An array of {@link ComponentEntryItem}
 */
export type ComponentEntries<TIndex extends AnyIndex> = ComponentEntryItem<
  TIndex,
  ComponentNameMask<TIndex>
>[];

/**
 * Props for {@link ComponentList} block
 */
export type ComponentListProps<TIndex extends AnyIndex> = {
  index: TIndex;
  exclude?: ComponentName<TIndex>[];
  include?: ComponentName<TIndex>[];
  randomSize?: boolean;
  parent?: string;
  columns?: GridTemplate;
};
