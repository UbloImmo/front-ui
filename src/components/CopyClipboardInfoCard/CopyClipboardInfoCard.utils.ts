import { isFunction, type Logger } from "@ubloimmo/front-util";

/**
 * Copies the given content to the clipboard.
 *
 * @param {string} content - The content to be copied.
 * @param {Logger} [logger] - Optional logger for error handling.
 * @return {Promise<boolean>} A promise that resolves to true if the content is successfully copied, otherwise false.
 */
export const copyToClipboard = async (
  content: string,
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
    return true;
  } catch (error) {
    (logger ?? console).error(error);
    return false;
  }
};
