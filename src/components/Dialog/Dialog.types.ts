import type {
  GenericFn,
  Nullable,
  Optional,
  VoidFn,
} from "@ubloimmo/front-util";
import type { ReactNode } from "react";

/**
 * A dialog's reference. Must be a non-empty string
 */
export type DialogReference = Exclude<string, ``>;
/**
 * Internal map used to track each dialog's state
 */
export type InternalDialogStateMap = Record<DialogReference, Nullable<boolean>>;

export type GlobalDialogContext = {
  /**
   * Registers a new dialog and optionally opens it
   *
   * @param {DialogReference} reference - the new dialog's reference
   * @param {Optional<boolean>} [open = false] - whether to open the registered dialog
   *
   * @type {VoidFn<[DialogReference, Optional<boolean>]>}
   */
  registerDialog: VoidFn<[DialogReference, Optional<boolean>]>;
  /**
   * Unregisters an existing dialog
   *
   * @param {DialogReference} reference - the discarded dialog's reference
   *
   * @type {VoidFn<[DialogReference]>}
   */
  unregisterDialog: VoidFn<[DialogReference]>;
  /**
   * Checks if a dialog is registered
   *
   * @param {DialogReference} reference - the dialog's reference
   * @return {boolean} - whether the dialog is registered
   *
   * @type {VoidFn<[DialogReference]>}
   */
  isDialogRegistered: GenericFn<[DialogReference], boolean>;
  /**
   * Opens a dialog if not already open
   *
   * @param {DialogReference} reference - the dialog's reference
   *
   * @type {VoidFn<[DialogReference]>}
   */
  openDialog: VoidFn<[DialogReference]>;
  /**
   * Closes a dialog if currently open
   *
   * @param {DialogReference} reference - the dialog's reference
   *
   * @type {VoidFn<[DialogReference]>}
   */
  closeDialog: VoidFn<[DialogReference]>;
  /**
   * Toggles a dialog's open state based on its reference
   *
   * @param {DialogReference} reference - the dialog's reference
   *
   * @type {VoidFn<[DialogReference]>}
   */
  toggleDialog: VoidFn<[DialogReference]>;
  /**
   * Sets a dialog's open state based on its reference
   *
   * @param {DialogReference} reference - the dialog's reference
   * @param {boolean} open - the dialog's new `open` open state
   * @type {VoidFn<InternalDialogState>}
   */
  setDialogState: VoidFn<[DialogReference, boolean]>;
  /**
   * Returns a registered dialog's open state based on its reference
   *
   * @param {DialogReference} reference - the dialog's reference
   * @returns {boolean} - the dialog's open state
   *
   * @type {VoidFn<[DialogReference]>}
   *
   * @remarks Returns `false` if the dialog reference is not registered
   */
  isDialogOpen: GenericFn<[DialogReference], boolean>;
  /**
   * A css selector needed to find the root element the attache the portal to
   *
   * @default "#dialog-root"
   * @required
   *
   */
  portalRoot: string;
};

export type DialogContext = {
  /**
   * Registers a specific dialog and optionally opens it
   *
   * @param {Optional<boolean>} [open = false] - whether to open the registered dialog
   *
   * @type {VoidFn<[Optional<boolean>]>}
   */
  register: VoidFn<[Optional<boolean>]>;
  /**
   * Unregisters a specific dialog
   *
   * @type {VoidFn}
   */
  unregister: VoidFn;
  /**
   * Opens a specific dialog if not already open
   *
   * @type {VoidFn}
   */
  open: VoidFn;
  /**
   * Closes a specific dialog if currently open
   *
   * @type {VoidFn}
   */
  close: VoidFn;
  /**
   * Toggles a specific dialog's open state
   *
   * @type {VoidFn}
   */
  toggle: VoidFn;
  /**
   * Sets a specifics dialog's open state
   *
   * @param {boolean} open - the dialog's new `open` open state
   * @type {VoidFn<[boolean]>}
   */
  set: VoidFn<[boolean]>;
  /**
   * Whether a specific dialog is currently open
   */
  isOpen: boolean;
  /**
   * Whether a specific dialog is registered
   */
  isRegistered: boolean;
  /**
   * A css selector targeting the root element the attache the dialog's portal to
   *
   * @default "#dialog-root"
   */
  portalRoot: string;
};

export type DialogProps = {
  /**
   * The dialog's reference. Used internally to register and unregister the dialog
   *
   * @remarks Must be a non-empty string
   *
   * @type {DialogReference}
   * @required
   */
  reference: DialogReference;
  /**
   * The content to render inside the dialog
   */
  children?: ReactNode;
  /**
   * Dictates whether the dialog should be opened by default
   * @default false
   */
  open?: boolean;
  /**
   * A css selector needed to find the root element the attache the portal to
   * @default "#dialog-root"
   */
  portalRoot?: string;
};

export type DefaultDialogProps = Required<DialogProps>;

export type DialogContextProviderProps = Pick<
  DialogProps,
  "portalRoot" | "children"
>;

export type DialogContextProps = Omit<DialogContextProviderProps, "children">;
