import type * as componentsIndexRaw from "@components";

import type { DocgenInfo } from "@docs/docs.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

export type ComponentIndexModule = typeof componentsIndexRaw;

export type AnyIndex = {
  [key: string]: unknown;
};

type ComponentPropsMask<
  TProps extends Record<string, unknown> = Record<string, unknown>
> = TProps | (TProps & TestIdProps);

type RemoveTestIdProps<TProps extends ComponentPropsMask> = {
  [TKey in keyof TProps]: TKey extends keyof TestIdProps ? never : TProps[TKey];
};

export type ComponentDefaultProps<TProps extends ComponentPropsMask> = Required<
  RemoveTestIdProps<TProps>
>;

export type ComponentDefaultPropsMask<TProps extends ComponentPropsMask> = {
  defaultProps: ComponentDefaultProps<TProps>;
};

type ComponentReturnMask = JSX.Element | Nullable<JSX.Element>;

type ComponentFnMask<TProps extends ComponentPropsMask> = {
  (props: TProps): ComponentReturnMask;
};

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

type ComponentNameMask<TIndex extends AnyIndex> = {
  [TKey in keyof ComponentIndexMask<TIndex> &
    string]: ComponentIndexMask<TIndex>[TKey] extends never ? never : TKey;
}[keyof ComponentIndexMask<TIndex> & string];

// 19 possible components
export type ComponentIndex<TIndex extends AnyIndex> = {
  [TName in ComponentNameMask<TIndex> &
    string]: ComponentIndexMask<TIndex>[TName];
};

export type ComponentName<TIndex extends AnyIndex> =
  keyof ComponentIndex<TIndex> & string;

export type ComponentEntry<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex> = ComponentName<TIndex>
> = [TName, ComponentIndex<TIndex>[TName]];

export type Component<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = ComponentIndex<TIndex>[TName];

export type ComponentProps<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = Parameters<Component<TIndex, TName>>[0];

export type DocumentedComponent<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = Component<TIndex, TName> & {
  __docgenInfo: DocgenInfo<ComponentProps<TIndex, TName>>;
};

export type MaybeDocumentedComponent<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = Component<TIndex, TName> | DocumentedComponent<TIndex, TName>;

export type ComponentEntryItem<
  TIndex extends AnyIndex,
  TName extends ComponentName<TIndex>
> = {
  name: TName;
  Component: MaybeDocumentedComponent<TIndex, TName>;
};

export type ComponentEntries<TIndex extends AnyIndex> = ComponentEntryItem<
  TIndex,
  ComponentNameMask<TIndex>
>[];
