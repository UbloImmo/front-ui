import type {
  FlexAlignment,
  FlexDirection,
  FlexFill,
  FlexGap,
} from "@/layouts";
import type { FC } from "react";

export type ComponentVariantsBaseConfig = {
  /**
   * Dictates the gap between the variants.
   * @default "2rem".
   */
  gap?: FlexGap;
  /**
   * Setting this property wraps all variants in a {@link GridLayout}.
   * Provided a number for a fixed number of columns, `auto` creates 1 column per variant.
   *
   * @type {number | "auto"}
   * @default undefined
   */
  columns?: number | "auto";
  /**
   * Dictates the vertical alignment of the variants.
   * @default "start".
   */
  align?: FlexAlignment;
  /**
   * Dictates the horizontal alignment of the variants.
   * @default "start".
   */
  justify?: FlexAlignment;
  /**
   * Dictates the flex direction of the variants
   * @default "row"
   */
  direction?: FlexDirection;
  /**
   * By how much to scale a selected variant on hover.
   * @default 1.5
   */
  scaling?: number;
  /**
   * Whether to include the prop's name in the labels while hovering.
   * @remarks This will be ignored if the `variants` contain their own labels
   * @default false
   */
  propLabels?: boolean;
  /**
   * Whether to skip compound variant value typecheck
   * @default false
   */
  forceCompound?: boolean;
  /**
   * Whether to fill the horizontal or vertical space.
   * @default false
   */
  fill?: FlexFill;
};

export type PropVariant<TComponentProps extends Record<string, unknown>> =
  TComponentProps & {
    __propVariantLabel: string;
  };

export type PropVariantInternal<
  TComponentProps extends Record<string, unknown>,
> = {
  componentProps: TComponentProps;
  variantLabel: string;
};

export type ComponentVariantsConfig<
  TComponentProps extends Record<string, unknown>,
  TPropKey extends keyof TComponentProps,
> = ComponentVariantsBaseConfig & {
  /**
   * The key of the prop to vary upon.
   * @required
   */
  for: TPropKey;
  /**
   * The component to render the variants for.
   * @required
   */
  of: FC<TComponentProps>;
  /**
   * The default values for the component's props.
   * @required
   */
  defaults: TComponentProps;
  /**
   * List of possible values for the component's prop.
   * @required
   */
  variants:
    | TComponentProps[TPropKey][]
    | readonly TComponentProps[TPropKey][]
    | { value: TComponentProps[TPropKey]; label: string }[];
};

export type DetailConfigVariants<
  TComponentProps extends Record<string, unknown>,
> = (Partial<TComponentProps> | PropVariant<Partial<TComponentProps>>)[];

export type ComponentVariantsDetailedConfig<
  TComponentProps extends Record<string, unknown>,
> = ComponentVariantsBaseConfig & {
  for?: never;
  /**
   * The component to render the variants for.
   * @required
   */
  of: FC<TComponentProps>;
  /**
   * The default values for the component's props.
   * @required
   */
  defaults: TComponentProps;
  /**
   * List of possible values for the component's prop.
   * @required
   */
  variants: DetailConfigVariants<TComponentProps>;
};
