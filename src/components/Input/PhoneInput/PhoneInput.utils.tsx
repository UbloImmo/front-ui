/**
 * Converts a phone number to French format by replacing '0' with '+33 ' if it starts with '0'.
 *
 * @param {string} base - The input phone number.
 * @return {string} the formatted phone number.
 */
export const defaultToFrenchPhone = (base: string) => {
  base = base.trim();
  if (base.startsWith("0")) {
    return base.replace("0", "+33 ");
  }
  return base;
};
