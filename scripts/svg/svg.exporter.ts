import { FileDescription, NormalizedIconFileDeclaration } from "./svg.types";
import { Logger } from "@ubloimmo/front-util";
const ROOT_DIR_PATH = "./src/components/Icon/__generated";

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
  return `${componentName}.icon.tsx`;
};

const generateLocalIconIndex = (
  files: NormalizedIconFileDeclaration[],
  rootDirPath: string
): FileDescription => {
  const contents = [
    ...files.map(({ componentName }) => {
      const path = iconFileName(componentName);
      return `export { ${componentName} } from "${path}";`;
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
    const path = `${rootDirPath}/${iconFileName(iconFile.componentName)}`;
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

export const exportSvgFiles = async (
  bootstrapIcons: NormalizedIconFileDeclaration[],
  customIcons: NormalizedIconFileDeclaration[]
) => {
  await exportGeneratedSvgFiles(bootstrapIcons, BOOTSTRAP_ICONS_DIR_PATH, true);
  await exportGeneratedSvgFiles(customIcons, CUSTOM_ICONS_DIR_PATH, true);
};
