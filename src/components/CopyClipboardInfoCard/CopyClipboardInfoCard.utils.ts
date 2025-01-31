import { isFunction, type Logger, type Nullable } from "@ubloimmo/front-util";

import type { OnCopiedFn } from "./CopyClipboardInfoCard.types";

/**
 * Copies the given content to the clipboard.
 *
 * @param {string} content - The content to be copied.
 * @param {Nullable<OnCopiedFn>} [onCopied] - Optional callback that gets called after the content is copied to the user's clipboard.
 * @param {Logger} [logger] - Optional logger for error handling.
 * @return {Promise<boolean>} A promise that resolves to true if the content is successfully copied, otherwise false.
 */
export const copyToClipboard = async (
  content: string,
  onCopied?: Nullable<OnCopiedFn>,
  logger?: Logger
): Promise<boolean> => {
  if (
    !navigator ||
    !("clipboard" in navigator) ||
    !isFunction(navigator.clipboard.writeText)
  ) {
    (logger ?? console).warn("Clipboard API not available");
    return false;
  }
  if (!("clipboard" in navigator)) return false;
  if (!isFunction(navigator.clipboard.writeText)) return false;
  try {
    await navigator.clipboard.writeText(content);
    if (onCopied) onCopied(content);
    return true;
  } catch (error) {
    (logger ?? console).error(error);
    return false;
  }
};
