import { rm } from "node:fs/promises";

import { Logger } from "@ubloimmo/front-util";

import {
  ExtendedIconFileDeclaration,
  FileDescription,
  NormalizedIconFileDeclaration,
} from "./svg.types";

import { delay } from "@utils";
const ROOT_DIR_PATH = "src/components/Icon/__generated__";

const BOOTSTRAP_DIR = "bootstrap";
const CUSTOM_DIR = "custom";

const BOOTSTRAP_ICONS_DIR_PATH = `${ROOT_DIR_PATH}/${BOOTSTRAP_DIR}`;
const CUSTOM_ICONS_DIR_PATH = `${ROOT_DIR_PATH}/${CUSTOM_DIR}`;

const logger = Logger();

/**
 * Writes data to a file at the specified path.
 *
 * @param {FileDescription} file - The description of the file to write
 * @param {string} file.path - The path of the file to write to.
 * @param {string} file.data - The data to write to the file.
 * @param {boolean} [dryRun = false] - Whether to not do anytg
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

  const iconsAndIndex: FileDescription[] = [...files];

  await writeMultipleFiles(iconsAndIndex, dryRun);
};

/**
 * Generates a file description for the lazy icon index.
 *
 * @param {ExtendedIconFileDeclaration[]} files - the array of normalized icon file declarations
 * @param {string} rootDirPath - the root directory path
 * @return {FileDescription} the generated file description
 */
const generateLazyIconIndex = (
  files: ExtendedIconFileDeclaration[],
  rootDirPath: string
): FileDescription => {
  const imports = [`import { lazy } from "react";`];

  let indexMap = `export const iconIndex = {`;

  for (const { componentName, rootDir } of files) {
    indexMap += `\n  ${componentName}: lazy(() => import("./${rootDir}/${componentName}.icon.tsx")),`;
  }

  indexMap += "}";

  const contents = [...imports, "", indexMap].join("\n");
  const path = `${rootDirPath}/index.lazy.ts`;
  return {
    contents,
    path,
  };
};

const generateIconNameTypeDefs = (
  customIcons: NormalizedIconFileDeclaration[],
  bootstrapIcons: NormalizedIconFileDeclaration[],
  rootDirPath: string
): FileDescription => {
  const imports = `import type { Enum } from "@ubloimmo/front-util";`;

  function buildIconNameTypeDef(
    arrayName: string,
    typeName: string,
    icons: NormalizedIconFileDeclaration[]
  ) {
    const readonlyArrayName = `${arrayName}_READONLY`;
    let readonlyNameArray = `const ${readonlyArrayName} = [`;
    const sortedIcons = icons.sort((a, b) =>
      a.componentName.localeCompare(b.name)
    );
    for (let i = 0; i < sortedIcons.length; i++) {
      const { componentName } = sortedIcons[i];
      if (!i) {
        readonlyNameArray += `"${componentName}"`;
        continue;
      }
      readonlyNameArray += `, "${componentName}"`;
    }
    readonlyNameArray += "] as const;";
    const typeStr = `export type ${typeName} = Enum<typeof ${readonlyArrayName}>;`;
    const nameArray = `export const ${arrayName} = ${readonlyArrayName} as unknown as ${typeName}[];`;

    return [readonlyNameArray, "", typeStr, "", nameArray].join("\n");
  }

  const customStr = buildIconNameTypeDef(
    "CUSTOM_ICON_NAMES",
    "CustomIconName",
    customIcons
  );
  const bootstrapStr = buildIconNameTypeDef(
    "BOOTSTRAP_ICON_NAMES",
    "BootstrapIconName",
    bootstrapIcons
  );

  const allArrayStr = `export const GENERATED_ICON_NAMES = [...CUSTOM_ICON_NAMES, ...BOOTSTRAP_ICON_NAMES];`;
  const allTypeStr = `export type GeneratedIconName = CustomIconName | BootstrapIconName;`;
  const allStr = [allArrayStr, "", allTypeStr].join("\n");

  const contents = [imports, "", customStr, "", bootstrapStr, "", allStr].join(
    "\n"
  );

  const path = `${rootDirPath}/iconName.types.ts`;
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
  const contents = `import type { CssLength, PaletteColor } from "@types";

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
  // clear both directories
  if (!dryRun) {
    logger.debug("clearing both directories");
    await rm(BOOTSTRAP_ICONS_DIR_PATH, { recursive: true, force: true });
    await rm(CUSTOM_ICONS_DIR_PATH, { recursive: true, force: true });
  }

  await delay(150);

  // write all icon files
  await exportGeneratedSvgFiles(
    bootstrapIcons,
    BOOTSTRAP_ICONS_DIR_PATH,
    dryRun
  );
  await delay(150);
  await exportGeneratedSvgFiles(customIcons, CUSTOM_ICONS_DIR_PATH, dryRun);

  const allIcons: ExtendedIconFileDeclaration[] = [
    ...bootstrapIcons.map(
      (icon): ExtendedIconFileDeclaration => ({
        ...icon,
        rootDir: BOOTSTRAP_DIR,
      })
    ),
    ...customIcons.map(
      (icon): ExtendedIconFileDeclaration => ({
        ...icon,
        rootDir: CUSTOM_DIR,
      })
    ),
  ].sort((a, b) => a.componentName.localeCompare(b.componentName));

  await writeMultipleFiles(
    [
      generateCommonTypesDefs(ROOT_DIR_PATH),
      generateLazyIconIndex(allIcons, ROOT_DIR_PATH),
      generateIconNameTypeDefs(customIcons, bootstrapIcons, ROOT_DIR_PATH),
    ],
    dryRun
  );
};
