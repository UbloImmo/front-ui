import { DeepNonNullish } from "@/types/global/global.types";
import * as util from "util";

type LoggerMode = "auto" | "simple";
type LoggerSeverity = "info" | "error" | "warn" | "log" | "debug"

type LoggerPrefixes = Record<LoggerSeverity, string>;

export type LoggerConfig = {
  /**
   * Either "auto" or "simple"
   * - simple: default console.log behavior
   * - auto: logs objects and arrays in their entirety
   *  @default {@link defaultConfig.mode}
   */
  mode?: LoggerMode
  /**
   * Whether to turn warnings to errors
   * when calling `logger.warn()`
   * @default {@link defaultConfig.warningsAsErrors}
   */
  warningsAsErrors?: boolean;
  /**
   * Whether to throw an error
   * when calling `logger.error()`
   * @default {@link defaultConfig.throwOnError}
   */
  throwOnError?: boolean;
  /**
   * Whether to hide debug logs,
   * silencing calls to `logger.debug()`
   * @default {@link defaultConfig.hideDebug}
   */
  hideDebug?: boolean;
  /**
   * Whether to hide basic logs,
   * silencing calls to `logger.log()`
   * @default {@link defaultConfig.hideLogs}
   */
  hideLogs?: boolean;
  /**
   * Replacement prefixes map for every logging severity level
   * @default {@link defaultConfig.prefixes}
   */
  prefixes?: LoggerPrefixes;
  /**
   * Number of newlines to insert between consecutive logs
   * @default {@link defaultConfig.spacing}
   */
  spacing?: number;
}

/**
 * Default logger config
 */
const defaultConfig: DeepNonNullish<LoggerConfig> = {
  /**
   * @see LoggerConfig.mode
   */
  mode: "auto",
  /**
   * @see LoggerConfig.warningsAsErrors
   */
  warningsAsErrors: false,
  /**
   * @see LoggerConfig.throwOnError
   */
  throwOnError: false,
  /**
   * @see LoggerConfig.hideDebug
   */
  hideDebug: false,
  /**
   * @see LoggerConfig.hideLogs
   */
  hideLogs: false,
  /**
   * @see LoggerConfig.prefixes:
   */
  prefixes: {
    info: "Info:    ",
    error: "Error:   ",
    warn: "Warning: ",
    log: "Log:     ",
    debug: "Debug:   ",
  },
  /**
   * @see LoggerConfig.spacing
   */
  spacing: 0,
} as const;

type LoggerFn = (message: unknown, name?: string) => void;

export type Logger = {
  config: DeepNonNullish<LoggerConfig>,
  log: LoggerFn;
  info: LoggerFn;
  warn: LoggerFn;
  error: LoggerFn;
  debug: LoggerFn;
}

/**
 * Logger constructor function
 * @param {LoggerConfig} [initialConfig = defaultConfig] - Optional initial configuration. See {@link defaultConfig}
 * @return {Logger} - Logger config and methods. See {@link Logger}
 * @constructor
 * @example
 * const { log } = Logger({
 *   spacing: 1,
 *   throwOnError: true,
 * })
 *
 * log("hello world", "my log title")
 */
export function Logger(initialConfig?: LoggerConfig): Logger {

  const config = Object.assign({}, defaultConfig, initialConfig);

  const logMessage = (message: unknown, severity: LoggerSeverity, name?: string) => {
    const logFn = console[severity];
    if(!logFn) return;
    const prefix = name ? `[${config.prefixes[severity].replaceAll(":", "").trim()}] ${name}:` : config.prefixes[severity];
    const spacing = Array(config.spacing).fill("\n").join("");
    if (config.mode === "auto" && typeof message === "object") {
      logFn(prefix)
      util.inspect(message)
    } else {
      logFn(prefix, message);
    }
    const typeInfo = Array.isArray(message) ? `array[${message.length}]` : typeof message;
    if(severity === "debug") {
      logFn(`( ${typeInfo} )`, spacing);
    } else {
      logFn(spacing)
    }
  }

  const log = (message: unknown, name?: string) => {
    if(config.hideLogs) return;
    logMessage(message, "log", name)
  }

  const info = (message: unknown, name?: string) => {
    logMessage(message, "info", name)
  }

  const warn = (message: unknown, name?: string) => {
    if (config.warningsAsErrors) {
      error(message, name)
    } else {
      logMessage(message, "warn", name)
    }
  }

  const error = (message: unknown, name?: string) => {
    logMessage(message, "error", name);
    if (config.throwOnError) {
      throw new Error(message as string);
    }
  }

  const debug =(message: unknown, name?: string) => {
    if(config.hideDebug) return;
    logMessage(message, "debug", name)
  }
  return {
    config,
    log,
    info,
    warn,
    error,
    debug,
  }
}