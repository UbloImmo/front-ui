import { FileDescription, NormalizedIconFileDeclaration } from "./svg.types";
import { Logger } from "@ubloimmo/front-util";
const ROOT_DIR_PATH = "./src/components/Icon/__generated__";

const BOOTSTRAP_ICONS_DIR_PATH = `${ROOT_DIR_PATH}/bootstrap`;
const CUSTOM_ICONS_DIR_PATH = `${ROOT_DIR_PATH}/custom`;

const logger = Logger();

/**
 * Writes data to a file at the specified path.
 *
 * @param {FileDescription} file - The description of the file to write
 * @param {string} file.path - The path of the file to write to.
 * @param {string} file.data - The data to write to the file.
 * @param [dryRun = false] - Whether to not do anytg
 * @return {Promise<void>} A promise that resolves when the data has been written to the file.
 */
const writeFile = async (
  { path, contents }: FileDescription,
  dryRun = false
) => {
  if (dryRun) return;
  logger.debug(`${path}`, "write file");
  await Bun.write(path, contents);
};

/**
 * Writes multiple files asynchronously.
 *
 * @param {FileDescription[]} files - array of file descriptions
 * @param [dryRun = false] - flag indicating whether to perform a dry run
 * @return {Promise<void>} a Promise that resolves when all files are written
 */
const writeMultipleFiles = async (files: FileDescription[], dryRun = false) => {
  await Promise.all(files.map((file) => writeFile(file, dryRun)));
};

/**
 * Returns the file name for the icon corresponding to the given component name.
 *
 * @param {string} componentName - the name of the component
 * @return {string} the file name for the corresponding icon
 */
const iconFileName = (componentName: string) => {
  return `${componentName}.icon`;
};

/**
 * Generates a file description for the local icon index.
 *
 * @param {NormalizedIconFileDeclaration[]} files - the array of normalized icon file declarations
 * @param {string} rootDirPath - the root directory path
 * @return {FileDescription} the generated file description
 */
const generateLocalIconIndex = (
  files: NormalizedIconFileDeclaration[],
  rootDirPath: string
): FileDescription => {
  const contents = [
    ...files
      .sort((a, b) => a.componentName.localeCompare(b.componentName))
      .map(({ componentName }) => {
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

/**
 * Asynchronously exports generated SVG files based on the provided icon files, root directory path, and dry run flag.
 *
 * @param {NormalizedIconFileDeclaration[]} iconFiles - The array of normalized icon file declarations
 * @param {string} rootDirPath - The root directory path where the SVG files will be exported
 * @param [dryRun=false] - A flag indicating whether this is a dry run or not
 */
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

/**
 * Generates the root icon index file description.
 *
 * @param {string} rootDirPath - The root directory path
 * @return {FileDescription} The file description object
 */
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

/**
 * Generates a file description for common types definitions.
 *
 * @param {string} rootDirPath - the root directory path
 * @return {FileDescription} the file description object containing path and contents
 */
const generateCommonTypesDefs = (rootDirPath: string): FileDescription => {
  const contents = `import type { CssLength, PaletteColor } from "../../../types";

export type CommonIconProps = {
  color?: PaletteColor;
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

/**
 * Export SVG files asynchronously.
 *
 * @param {NormalizedIconFileDeclaration[]} bootstrapIcons - The array of normalized icon file declarations for Bootstrap icons.
 * @param {NormalizedIconFileDeclaration[]} customIcons - The array of normalized icon file declarations for custom icons.
 * @param [dryRun = false] - Flag indicating whether the function should run in dry run mode.
 * @return {Promise<void>} A promise that resolves when all SVG files are exported.
 */
export const exportSvgFiles = async (
  bootstrapIcons: NormalizedIconFileDeclaration[],
  customIcons: NormalizedIconFileDeclaration[],
  dryRun = false
): Promise<void> => {
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
