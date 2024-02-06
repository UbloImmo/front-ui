import { FileDescription, NormalizedIconFileDeclaration } from "./svg.types";
import { Logger } from "@ubloimmo/front-util";
const ROOT_DIR_PATH = "./src/components/Icon/__generated__";

const BOOTSTRAP_ICONS_DIR_PATH = `${ROOT_DIR_PATH}/bootstrap`;
const CUSTOM_ICONS_DIR_PATH = `${ROOT_DIR_PATH}/custom`;

const logger = Logger();

/**
 * Writes data to a file at the specified path.
 *
 * @param {string} path - The path of the file to write to.
 * @param {string} data - The data to write to the file.
 * @return {Promise<void>} A promise that resolves when the data has been written to the file.
 */
const writeFile = async (
  { path, contents }: FileDescription,
  dryRun = false
) => {
  logger[dryRun ? "info" : "debug"](
    `${dryRun ? "DRY RUN: " : ""}${path}`,
    "write file"
  );
  if (dryRun) return;
  await Bun.write(path, contents);
};

const writeMultipleFiles = async (files: FileDescription[], dryRun = false) => {
  await Promise.all(files.map((file) => writeFile(file, dryRun)));
};

const iconFileName = (componentName: string) => {
  return `${componentName}.icon`;
};

const generateLocalIconIndex = (
  files: NormalizedIconFileDeclaration[],
  rootDirPath: string
): FileDescription => {
  const contents = [
    ...files.map(({ componentName }) => {
      const name = iconFileName(componentName);
      return `export { ${componentName} } from "./${name}";`;
    }),
    "",
  ].join("\n");
  const path = `${rootDirPath}/index.ts`;
  return {
    contents,
    path,
  };
};

export const exportGeneratedSvgFiles = async (
  iconFiles: NormalizedIconFileDeclaration[],
  rootDirPath: string,
  dryRun = false
) => {
  const files: FileDescription[] = iconFiles.map((iconFile) => {
    const path = `${rootDirPath}/${iconFileName(iconFile.componentName)}.tsx`;
    return {
      path,
      contents: iconFile.tsx,
    };
  });

  const iconsAndIndex: FileDescription[] = [
    ...files,
    generateLocalIconIndex(iconFiles, rootDirPath),
  ];

  await writeMultipleFiles(iconsAndIndex, dryRun);
};

const generateRootIconIndex = (rootDirPath: string): FileDescription => {
  const indexPaths = ["bootstrap", "custom"];
  const contents = [
    ...indexPaths.map((path) => {
      return `export * from "./${path}";`;
    }),
    "",
  ].join("\n");
  const path = `${rootDirPath}/index.ts`;

  return {
    contents,
    path,
  };
};

const generateCommonTypesDefs = (rootDirPath: string): FileDescription => {
  const contents = `import type { CssLength, PaletteColor } from "../../../types";

export type CommonIconProps = {
  color: PaletteColor;
  size?: CssLength;
};

export type CommonIconDefaultProps = Required<CommonIconProps>;

export const commonIconDefaulProps: CommonIconDefaultProps = {
  color: "primary-base",
  size: "1rem",
} as const;
`;

  const path = `${rootDirPath}/common.types.ts`;

  return {
    path,
    contents,
  };
};
export const exportSvgFiles = async (
  bootstrapIcons: NormalizedIconFileDeclaration[],
  customIcons: NormalizedIconFileDeclaration[],
  dryRun = false
) => {
  await exportGeneratedSvgFiles(
    bootstrapIcons,
    BOOTSTRAP_ICONS_DIR_PATH,
    dryRun
  );
  await exportGeneratedSvgFiles(customIcons, CUSTOM_ICONS_DIR_PATH, dryRun);
  await writeMultipleFiles(
    [
      generateRootIconIndex(ROOT_DIR_PATH),
      generateCommonTypesDefs(ROOT_DIR_PATH),
    ],
    dryRun
  );
};
