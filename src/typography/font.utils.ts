import type {
  FontFaceDeclaration,
  FontFamilyDeclaration,
  FontStyleDeclaration,
} from "@types";

export const fontFace = (declaration: FontFaceDeclaration) => {
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

export const fontFamily =
  (familyDeclaration: FontFamilyDeclaration) =>
  (styleDeclarations: FontStyleDeclaration[]) =>
    styleDeclarations
      .map((styleDeclaration) =>
        fontFace({
          ...familyDeclaration,
          ...styleDeclaration,
        })
      )
      .join("");
