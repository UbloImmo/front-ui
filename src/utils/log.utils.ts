import { Logger, transformObject } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { capitalize } from "./string.utils";

import type { LoggerFn, LoggerConfig } from "@ubloimmo/front-util";

/**
 * Generates a logger for the specified component.
 *
 * @param {string} componentName - The name of the component
 * @return {function} A function that logs messages for the component
 */
export const useLogger = (
  componentName: string,
  config?: LoggerConfig
): Logger => {
  const logger = useMemo(() => {
    const { config: conf, ...fns } = Logger(config);
    return { fns, conf };
  }, [config]);
  return useMemo(() => {
    const prefix = `[Component:${capitalize(componentName)}]`;
    return {
      ...transformObject(
        logger.fns,
        (logFn: LoggerFn) => (message: unknown) => logFn(message, prefix)
      ),
      config: logger.conf,
    };
  }, [logger, componentName]);
};
