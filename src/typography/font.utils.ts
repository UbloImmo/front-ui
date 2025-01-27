import type {
  FontFaceDeclaration,
  FontFamilyDeclaration,
  FontStyleDeclaration,
} from "@types";

/**
 * Generates a CSS @font-face declaration string for a given font face configuration
 * @param {FontFaceDeclaration} declaration - The font face configuration object
 * @param {string} declaration.fontFamily - The name of the font family
 * @param {string} declaration.src - URL to the font file
 * @param {string} declaration.format - Format of the font file (e.g. "woff2")
 * @param {number} declaration.weight - Font weight value
 * @param {boolean} [declaration.italic] - Whether the font style is italic
 * @returns {string} CSS @font-face declaration string
 */
export const fontFace = (declaration: FontFaceDeclaration): string => {
  if (!declaration) return "";
  return `
    @font-face {
      font-family: "${declaration.fontFamily}";
      src: url("${declaration.src}") format("${declaration.format}");
      font-weight: ${declaration.weight};
      font-style: ${declaration.italic ? "italic" : "normal"};
      font-display: swap;
    }
  `;
};

/**
 * Creates a function that generates multiple @font-face declarations for a font family
 * @param {FontFamilyDeclaration} familyDeclaration - The base font family configuration
 * @param {string} familyDeclaration.fontFamily - The name of the font family
 * @param {string} familyDeclaration.format - Format of the font files (e.g. "woff2")
 * @returns {(styleDeclarations: FontStyleDeclaration[]) => string} Function that takes style declarations and returns CSS @font-face declarations
 */
export const fontFamily =
  (familyDeclaration: FontFamilyDeclaration) =>
  (styleDeclarations: FontStyleDeclaration[]) =>
    (styleDeclarations ?? [])
      .map((styleDeclaration) =>
        fontFace({
          ...familyDeclaration,
          ...styleDeclaration,
        }),
      )
      .join("");
