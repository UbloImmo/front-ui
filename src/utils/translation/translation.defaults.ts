import type {
  CompleteTranslationMap,
  DefaultTranslationMaps,
} from "./translation.types";

const globalT: CompleteTranslationMap<"global"> = {
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
  paste: "Paste",
  add: "Add",
  remove: "Remove",
  clear: "Clear",
  select: "Select",
  unselect: "Unselect",
  "select-all": "Select all",
  "deselect-all": "Deselect all",
  expand: "Expand",
  collapse: "Collapse",
} as const;

const validation: CompleteTranslationMap<"validation"> = {
  missing: "Missing",
  required: "Required",
  invalid: "Invalid",
  valid: "Valid",
  "pattern-mismatch": (pattern) => `Pattern (${pattern}) does not match`,
  "too-short": "Value is too short",
  "too-long": "Value is too long",
  "too-low": "Value is too low",
  "too-high": "Value is too high",
  "not-allowed": "Value is not allowed",
  "too-big": "Value is too big",
  "too-small": "Value is too small",
  "step-mismatch": (step) => `Value does not respect the required step ${step}`,
  "type-mismatch": "Value does not respect the required type",
};

const status: CompleteTranslationMap<"status"> = {
  active: "Active",
  inactive: "Inactive",
  pending: "Pending",
  loading: "Loading",
  success: "Success",
  warning: "Warning",
  caution: "Caution",
};

export const defaultTranslations: DefaultTranslationMaps = {
  global: globalT,
  action,
  validation,
  status,
};
