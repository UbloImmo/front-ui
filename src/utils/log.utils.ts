import { useMemo } from "react";
import { Logger, transformObject } from "@ubloimmo/front-util";
import type { LoggerFn, LoggerConfig } from "@ubloimmo/front-util";
import { capitalize } from ".";

/**
 * Generates a logger for the specified component.
 *
 * @param {string} componentName - The name of the component
 * @return {function} A function that logs messages for the component
 */
export const useLogger = (componentName: string, config?: LoggerConfig) => {
  const logFns = useMemo(() => {
    const { config: _, ...fns } = Logger(config);
    return fns;
  }, [config]);
  return useMemo(() => {
    const prefix = `[Component:${capitalize(componentName)}]`;
    return transformObject(
      logFns,
      (logFn: LoggerFn) => (message: unknown) => logFn(message, prefix)
    );
  }, [logFns, componentName]);
};
