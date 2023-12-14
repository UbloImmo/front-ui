import { Logger } from "@/utils/log.utils";

const PACKAGE_JSON_PATH = "../../package.json"

const logger = Logger({
  throwOnError: true,
  warningsAsErrors: true,
  spacing: 2,
})

const incrementRevision = (currentVersion: string) => {
  let [major, minor, revision] = currentVersion
    .split('.')
    .map((num) => parseInt(num));
  revision++
  return [major, minor, revision].map(String).join('.');
}

const getPackageJSON = async () => {
  return await import(PACKAGE_JSON_PATH)
}

export const writeFile = async (path: string, data: string) => {
  await Bun.write(path, data)
}

const incrementVersion = async () => {
  try {
    const { version, ...packageJSON } = await getPackageJSON();
    logger.log(version, "Current version");
    const newVersion = incrementRevision(version);
    logger.log(newVersion, "New version");

    await writeFile(
      PACKAGE_JSON_PATH,
      JSON.stringify(
        {
          ...packageJSON,
          version: newVersion,
        },
        null,
        2
      )
    );

    return newVersion;
  }
  catch(e) {
    logger.error(e)
  }
}

await incrementVersion()