import type { Meta, StoryObj } from "@storybook/react";
import type { Nullable } from "@ubloimmo/front-util";
import type { FC } from "react";

type DocgenPropType = {
  name: string;
  value?: string;
  raw?: string;
  elements?: DocgenPropType[];
};

export type DocgenPropDef<TPropType> = {
  required: boolean;
  description?: string;
  defaultValue?: {
    value: string;
    computed: boolean;
  };
  value?: TPropType;
  type: DocgenPropType;
};

export type DocgenProps<TComponentProps extends Record<string, unknown>> = {
  [TPropKey in keyof TComponentProps & string]: DocgenPropDef<
    TComponentProps[TPropKey]
  >;
};

export type DocgenInfo<TComponentProps extends Record<string, unknown>> = {
  description?: string;
  displayName: string;
  props: DocgenProps<TComponentProps>;
};

type ComputedComponentMeta<TComponentProps extends Record<string, unknown>> =
  Meta<FC<TComponentProps>> & {
    component: {
      __docgenInfo: DocgenInfo<TComponentProps>;
      name: string;
    };
  };

export type ComponentStory<TComponentProps extends Record<string, unknown>> = {
  default: ComputedComponentMeta<TComponentProps>;
  Default: StoryObj<Meta<FC<TComponentProps>>>;
};

export type ParsedJsDoc = {
  /**
   * The description of the component / function
   */
  description: string;
  /**
   * The default value if manually specified
   * maps to the `@default` decorator
   */
  defaultValue: Nullable<string>;
  /**
   * Whether the component / function is a todo
   * maps to the `@todo` decorator
   */
  todo: boolean;
  /**
   * The reason for the todo if flagged
   * maps to the `@todo` decorator's reason
   */
  reason: Nullable<string>;
  /**
   * The version of the component / function
   * maps to the `@version` decorator
   */
  version: Nullable<string>;
  /**
   * The type of the value
   * maps to the `@type` decorator
   */
  type: Nullable<string>;
  /**
   * Whether the value is required
   * maps to the `@required` decorator
   */
  required: boolean;
  /**
   * Whether the value is internal
   * maps to the `@private` decorator
   */
  internal: boolean;
};

export type ParsedJsDocDescription = Omit<ParsedJsDoc, "defaultValue"> & {
  defaultValue: string;
};

export type ParsedPropInfo = ParsedJsDocDescription & {
  type: string;
  requiredStr: "Yes" | "No";
  name: string;
};
