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
  tsType: DocgenPropType;
};

export type DocgenProps<TComponentProps extends Record<string, unknown>> = {
  [TPropKey in keyof TComponentProps & string]: DocgenPropDef<
    TComponentProps[TPropKey]
  >;
};

type DocgenInfo<TComponentProps extends Record<string, unknown>> = {
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
  description: string;
  defaultValue: Nullable<string>;
  todo: boolean;
  reason: Nullable<string>;
  version: Nullable<string>;
  type: Nullable<string>;
  required: boolean;
};

export type ParsedJsDocDescription = Omit<ParsedJsDoc, "defaultValue"> & {
  defaultValue: string;
};

export type ParsedPropInfo = ParsedJsDocDescription & {
  type: string;
  requiredStr: "Yes" | "No";
  name: string;
};
