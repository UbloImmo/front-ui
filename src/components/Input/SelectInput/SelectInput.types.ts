import { InputProps, InputValue } from "../Input.types";

import { IconName } from "@/components/Icon";
import { StyleProps } from "@types";

import type { PaletteColor, TestIdProps } from "@types";
import type {
  NullishPrimitives,
  MaybeAsyncFn,
  Nullable,
  Replace,
  VoidFn,
  GenericFn,
  AsyncFn,
} from "@ubloimmo/front-util";
import type { FC } from "react";

export type SelectOption<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = {
  /**
   * The value of the option
   *
   * @type {Nullable<TValue>}
   * @required
   */
  value: TValue | null;
  /**
   * The label of the option
   *
   * @type {string}
   * @required
   */
  label: string;
  /**
   * Whether the option is disabled
   *
   * @type {boolean}
   * @default false
   */
  disabled?: boolean;
  /**
   * An optional icon to display left of the label
   */
  icon?: IconName;
  /**
   * The color of the option's icon
   */
  iconColor?: PaletteColor;
  /**
   * Whether the option is active
   *
   * @remarks Updated dynamically based on the parent SelectInput's state
   * @type {boolean}
   * @default false
   */
  active?: boolean;
  /**
   * Any additional data to be passed alongside the option
   *
   * @type {TExtraData}
   */
  extraData?: TExtraData;
} & TestIdProps;

export type SelectOptionItemStyleProps = StyleProps<
  SelectOption<NullishPrimitives>
>;

// groupe d'options
export type SelectOptionGroup<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = {
  /**
   * The label to display above all options in the group
   */
  label: string;
  /**
   * The group's options
   */
  options: SelectOption<TValue, TExtraData>[];
};

export type SelectOptionOrGroup<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = SelectOption<TValue, TExtraData> | SelectOptionGroup<TValue, TExtraData>;

/**
 * Une fonction potentiellement async sans arguments qui retourne une liste d'options / groupes
 */
export type SelectOptionsQueryFn<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = MaybeAsyncFn<[Nullable<string>], SelectOptionOrGroup<TValue, TExtraData>[]>;

/**
 * Soit un array d'options ou groupes,
 * soit une fonction potentiellement async qui retourne une liste d'options / groupes
 */
export type SelectOptionsQuery<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> =
  | SelectOptionOrGroup<TValue, TExtraData>[]
  | SelectOptionsQueryFn<TValue, TExtraData>;

export type CustomOptionComponent<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = FC<SelectOption<TValue, TExtraData>>;

/**
 * A function used to filter options based on external creteria.
 *
 * @template {NullishPrimitives} TValue - The type of the value.
 * @template {NullishPrimitives} TExtraData - The type of the extra data.
 * @param {SelectOption<TValue, TExtraData>} option - The option to be filtered.
 * @returns {boolean} - Whether the option should be displayed in the list.
 */
export type FilterSelectOptionFn<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = GenericFn<[SelectOption<TValue, TExtraData>], boolean>;

/**
 * The custom component to render the selected option
 */
export type CustomSelectedOptionComponent<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = FC<
  SelectOption<TValue, TExtraData> & {
    /**
     * Whether the selection is disabled
     * @type {boolean}
     */
    disabled?: boolean;
  }
>;

/**
 * A function used to create a new option from a typed label or reject it, when in creatable mode
 *
 * @template {NullishPrimitives} TValue - The type of the value.
 * @template {NullishPrimitives} TExtraData - The type of the extra data.
 *
 * @param {string} createdOptionLabel - The label typed by the user when creating a new option
 * @returns {Nullable<SelectOption<TValue, TExtraData>>} The newly created option based on the label or null if no option should be created for this label
 */
export type SelectInputCreateOptionFn<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = MaybeAsyncFn<
  [createdOptionLabel: string],
  Nullable<SelectOption<TValue, TExtraData>>
>;

/**
 * A function used to ingest an unknown value and convert it to an option or reject it.
 *
 * @template {NullishPrimitives} TValue - The type of the value.
 * @template {NullishPrimitives} TExtraData - The type of the extra data.
 *
 * @param {TValue} unknownOptionValue - The value currently provided to the SelectInput, for which there are no known options
 * @returns {SelectOption<TValue, TExtraData> | Promise<SelectOption<TValue, TExtraData>>} A {@link SelectOption} to represent the unkonwn value if accepted as valid,  or null otherwise. May be a Promise
 */
export type SelectInputIngestUnknowValueFn<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = MaybeAsyncFn<
  [unknownOptionValue: TValue],
  Nullable<SelectOption<TValue, TExtraData>>
>;

/**
 * A function to customize the create button's label based on the current query
 *
 * @param {string} autoCompleteQuery - The current query and future label of the created option
 * @returns {string} The replacement label to show the user, may be dynamic
 *
 * @default tl.action.create(`"${autoCompleteQuery}"`)
 */
export type SelectInputCreateButtonTemplateFn = GenericFn<
  [autoCompleteQuery: string],
  string
>;

/**
 * A function used to handle option changes
 *
 * @template {NullishPrimitives} TValue - The type of the value.
 * @template {NullishPrimitives} TExtraData - The type of the extra data.
 * @param {Nullable<SelectOption<TValue, TExtraData>>} option - The option that was selected or null
 */
export type SelectInputOnOptionChangeFn<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = VoidFn<[option: Nullable<SelectOption<TValue, TExtraData>>]>;

export type SelectInputAllowCreation =
  | "always"
  | "never"
  | "empty"
  | "not-shown"
  | "not-registered";

/**
 * Arguments passed to {@link SelectInputAllowCreationFn}
 */
export type SelectInputAllowCreationFnArgs<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = [
  state: {
    /**
     * What the user has currently typed in the input's search box
     */
    query: string;
    /**
     * Whether the input shows no options
     */
    isEmpty: boolean;
    /**
     * The input's current value
     */
    value: Nullable<TValue>;
    /**
     * The input's current active option or null
     */
    activeOption: Nullable<SelectOption<TValue, TExtraData>>;
    /**
     * The input's currently displayed options
     */
    displayedOptions: SelectOptionOrGroup<TValue, TExtraData>[];
    /**
     * The input's currently registered (loaded + created) options
     */
    registeredOptions: SelectOption<TValue, TExtraData>[];
    /**
     * The input's currently loaded options
     */
    loadedOptions: SelectOption<TValue, TExtraData>[];
    /**
     * The input's currently created options
     */
    createdOptions: SelectOption<TValue, TExtraData>[];
  },
];

/**
 * A callback function that returns whether to show the "create option" button based on the input's current state
 *
 * @param {SelectInputAllowCreationFnArgs[0]} state - The current input's state
 */
export type SelectInputAllowCreationFn<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = GenericFn<SelectInputAllowCreationFnArgs<TValue, TExtraData>, boolean>;

/**
 * Select input prop group used to enable & customize creatable behavior
 */
export type SelectInputCreatableProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = {
  /**
   * A callback function used to create a new option from a label, when in creatable mode
   * @see {SelectInputCreateOptionFn}
   *
   * @required
   */
  createOption: SelectInputCreateOptionFn<TValue, TExtraData>;
  /**
   * A callback function used to ingest an unknown value and convert it to an option or reject it
   * @see {SelectInputIngestUnknowValueFn}
   *
   * @required
   */
  ingestUnknownValue: SelectInputIngestUnknowValueFn<TValue, TExtraData>;
  /**
   * If set to a non-empty-string, will render created or onknown options in a dedicated option group.
   *
   * @type {Nullable<string>}
   * @default null
   */
  createdOptionsGroupLabel?: Nullable<string>;
  /**
   * Controls when to enable the user to create a new option.
   *
   * - `always`: Allow creation whether some or no options are displayed.
   * - `never`: Never allow creation (unknown values will still be ingested).
   * - `empty`: Only allow creation if no options are shown (either because none were provided/loaded or none match the autocomplete query).
   * - `not-shown`: Only allow creation if no shown shown options's label match the current autocomplete query.
   * - `not-registered`: Only allow creation if no registerd option (either loaded or previously created) as a label that matches the current autocomplete query.
   * - A callback function that returns a boolean based on the input's current state. @see {@link SelectInputAllowCreationFn}
   *
   * @remarks
   * Creation will **always** be disallowed if the input is disabled or is loading`
   *
   * @default "not-registered"
   */
  allowCreation?: Nullable<
    SelectInputAllowCreation | SelectInputAllowCreationFn<TValue, TExtraData>
  >;
  /**
   * If provided, overrides the label used in the create button.
   *
   * @param {string} autoCompleteQuery - The current query and future label of the created option
   * @returns {string} The replacement label to show the user, may be dynamic
   *
   * @default tl.action.create(`"${autoCompleteQuery}"`)
   */
  createButtonLabelTemplate?: Nullable<SelectInputCreateButtonTemplateFn>;
  /**
   * If provided, will override the appearance of the create button
   */
  createButtonStyle?: Nullable<
    Omit<SelectOption<TValue, TExtraData>, "value" | "label">
  >;
  /**
   * An optional override component to use when rendering the create button
   *
   * @type {Nullable<CustomOptionComponent<TValue, TExtraData>>}
   */
  CustomCreateButton?: Nullable<CustomOptionComponent<TValue, TExtraData>>;
  /**
   * Callback that gets called if an error occurs while calling `createOption`
   */
  onCreationError?: VoidFn<[error: Error, autoCompleteQuery: string]>;
};

export type SelectInputProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = Replace<
  InputProps<"select", TValue>,
  "value",
  {
    value?: Nullable<InputValue<"select">> & Nullable<TValue>;
  }
> & {
  /**
   * The options data to be displayed in the dropdown
   *
   * @type {SelectOptionsQuery<TValue, TExtraData>}
   * @default null
   */
  options?: SelectOptionsQuery<TValue, TExtraData>;
  /**
   * A function used to filter options based on external creteria
   *
   * @remarks Does not apply to options created through the `creatable` property
   *
   * @default null
   *
   * @type {Nullable<FilterSelectOptionFn<TValue, TExtraData>>}
   */
  filterOption?: Nullable<FilterSelectOptionFn<TValue, TExtraData>>;
  /**
   * Whether the user can search for an option by typing
   *
   * @remarks If "manual", filtering is expected to be handled entirely by the parent component
   *
   * @default false
   * @type {boolean | "manual"}
   */
  searchable?: boolean | "manual";
  /**
   * An optional custom Option component that gets rendered for each option
   *
   * @type {Nullable<CustomOptionComponent<TValue, TExtraData>>}
   */
  Option?: Nullable<CustomOptionComponent<TValue, TExtraData>>;
  /**
   * The custom SelectedOption component that gets rendered for the selected option
   *
   * @type {Nullable<CustomSelectedOptionComponent<TValue, TExtraData>>}
   */
  SelectedOption?: Nullable<CustomSelectedOptionComponent<TValue, TExtraData>>;
  /**
   * The icon that gets displayed right of the control
   *
   * @type {IconName}
   * @default "CaretDownFill"
   */
  controlIcon?: IconName;
  /**
   * Whether the user can clear the selected option
   *
   * @type {boolean}
   * @default false
   */
  clearable?: boolean;
  /**
   * Callback triggered when the selected option changes
   *
   * @type {Nullable<SelectInputOnOptionChangeFn<TValue, TExtraData>>}
   * @default null
   */
  onOptionChange?: Nullable<SelectInputOnOptionChangeFn<TValue, TExtraData>>;
  /**
   * Whether to always display the active option in the options list, even if it is not included in the given options
   *
   * @type {boolean}
   * @default false
   */
  alwaysDisplayActiveOption?: boolean;
  /**
   * Options used to control & enable the input's creatable behavior
   *
   * @type {Nullable<SelectInputCreatableProps<TValue, TExtraData>> | false}
   * @default false
   */
  creatable?: Nullable<SelectInputCreatableProps<TValue, TExtraData>> | false;
};

export type DefaultSelectInputProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = Required<SelectInputProps<TValue, TExtraData>>;

export type SelectInputOptionProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = SelectOption<TValue, TExtraData> & {
  onSelect?: Nullable<VoidFn>;
  Option?: Nullable<CustomOptionComponent<TValue, TExtraData>>;
};

export type SelectInputOptionGroupProps<
  TValue extends NullishPrimitives,
  TExtraData extends NullishPrimitives = NullishPrimitives,
> = SelectOptionGroup<TValue, TExtraData> & {
  onSelectOption: GenericFn<[SelectOption<TValue>], VoidFn>;
  Option?: Nullable<CustomOptionComponent<TValue, TExtraData>>;
};

export type RefetchSelectOptionsFn = AsyncFn<[Nullable<string>], void>;
