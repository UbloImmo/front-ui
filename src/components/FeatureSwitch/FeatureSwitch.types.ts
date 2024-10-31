import type { IconName } from "../Icon";
import type { SelectInputProps } from "../Input";
import type {
  Enum,
  Nullable,
  NullishPrimitives,
  VoidFn,
} from "@ubloimmo/front-util";

const featureSwitchVariants = ["checkbox", "switch", "select"] as const;
export type FeatureSwitchVariant = Enum<typeof featureSwitchVariants>;

/**
 * Props related to the togglable variants, like `switch` and `checkbox`
 */
type TogglableVariants = {
  /**
   * Whether the switch/checkbox is active or not
   *
   * @type {boolean}
   * @default false
   */
  active?: boolean;
  /**
   * Optional callback called when the switch/checkbox is toggled
   *
   * @type {VoidFn<[boolean]>}
   */
  onChange?: VoidFn<[boolean]>;
  /**
   * The variants of the feature switch, can be `switch`, `checkbox`
   *
   * @type {Exclude<FeatureSwitchVariant, "select">}
   */
  variant: Exclude<FeatureSwitchVariant, "select">;
};

/**
 * Properties related to the `select` variant
 *
 * @see {@link SelectInputProps}
 */
type OptionsVariant<TValue extends NullishPrimitives> =
  SelectInputProps<TValue> & {
    variant: "select";
  };

export type FeatureSwitchProps<TValue extends NullishPrimitives> = {
  icon?: Nullable<IconName>;
  name: string;
  description?: Nullable<string>;
  compact?: boolean;
  disabled?: boolean;
  tooltipText?: Nullable<string>;
} & (TogglableVariants | OptionsVariant<TValue>);

export type FeatureSwitchDefaultProps<TValue extends NullishPrimitives> =
  Required<FeatureSwitchProps<TValue>>;
