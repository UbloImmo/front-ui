import type {
  CompleteTranslationMap,
  DefaultTranslationMaps,
} from "./translation.types";

const globalTranslations: CompleteTranslationMap<"global"> = {
  yes: "Yes",
  no: "No",
  back: "Back",
  next: "Next",
  previous: "Previous",
  search: "Search",
  home: "Home",
};

const action: CompleteTranslationMap<"action"> = {
  submit: "Submit",
  confirm: "Confirm",
  create: "Create",
  delete: "Delete",
  cancel: "Cancel",
  close: "Close",
  edit: "Edit",
  modify: "Modify",
  save: "Save",
  reset: "Reset",
  copy: "Copy",
  copyToClipboard: "Copy to clipboard",
  paste: "Paste",
  add: "Add",
  addItem: "Add an item",
  remove: "Remove",
  clear: "Clear",
  select: "Select",
  unselect: "Unselect",
  selectItem: "Select an item",
  selectAll: "Select all",
  unselectAll: "Unselect all",
  expand: "Expand",
  collapse: "Collapse",
  show: "Show",
  hide: "Hide",
  giveUp: "Give up",
} as const;

const validation: CompleteTranslationMap<"validation"> = {
  missing: "Missing",
  required: "Required",
  invalid: "Invalid",
  valid: "Valid",
  patternMismatch: (pattern) =>
    `Pattern ${pattern ? `(${pattern}) ` : ""}does not match`,
  tooShort: "Value is too short",
  tooLong: "Value is too long",
  tooLow: "Value is too low",
  tooHigh: "Value is too high",
  notAllowed: "Value is not allowed",
  tooBig: "Value is too big",
  tooSmall: "Value is too small",
  stepMismatch: (step) => `Value does not respect the required step ${step}`,
  typeMismatch: "Value does not respect the required type",
};

const status: CompleteTranslationMap<"status"> = {
  active: "Active",
  inactive: "Inactive",
  activated: "Activated",
  deactivated: "Deactivated",
  pending: "Pending",
  loading: "Loading",
  success: "Success",
  warning: "Warning",
  caution: "Caution",
  error: "Error",
  disabled: "Disabled",
  archived: "Archived",
  hidden: "Hidden",
  empty: "Empty",
};

export const defaultTranslations: DefaultTranslationMaps = {
  global: globalTranslations,
  action,
  validation,
  status,
};
