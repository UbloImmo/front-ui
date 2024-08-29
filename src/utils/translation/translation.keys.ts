const globalTranslationKeys = [
  "yes",
  "no",
  "back",
  "next",
  "previous",
  "search",
  "home",
] as const;

const actionTranslationKeys = [
  "submit",
  "confirm",
  "create",
  "delete",
  "cancel",
  "close",
  "edit",
  "modify",
  "save",
  "reset",
  "copy",
  "paste",
  "add",
  "remove",
  "clear",
  "select",
  "unselect",
  "select-all",
  "deselect-all",
  "expand",
  "collapse",
] as const;

const validationTranslationKeys = [
  "missing",
  "required",
  "invalid",
  "valid",
  "pattern-mismatch",
  "too-short",
  "too-long",
  "too-low",
  "too-high",
  "not-allowed",
  "too-big",
  "too-small",
  "step-mismatch",
  "type-mismatch",
] as const;

const statusTranslationKeys = [
  "active",
  "inactive",
  "pending",
  "loading",
  "success",
  "warning",
  "caution",
] as const;

export const translationKeys = {
  global: globalTranslationKeys,
  action: actionTranslationKeys,
  validation: validationTranslationKeys,
  status: statusTranslationKeys,
} as const;
