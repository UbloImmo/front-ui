import {
  isBoolean,
  isNull,
  isString,
  type Nullable,
  type Optional,
  type VoidFn,
} from "@ubloimmo/front-util";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from "react";

import { isEmptyString, isNonEmptyString, useLogger } from "@utils";

import type {
  DialogContextProps,
  DialogContext,
  DialogReference,
  DialogContextProviderProps,
  InternalDialogStateMap,
  GlobalDialogContext,
  InternalDialogStateAction,
} from "./Dialog.types";

const DEFAULT_PORTAL_ROOT = "#dialog-root";

/**
 * Custom hook for managing global dialog states.
 *
 * @param {DialogContextProps} params - Parameters for the dialog context
 * @return {GlobalDialogContext} The global dialog context object
 */
export const useGlobalDialogContext = (
  params: DialogContextProps,
): GlobalDialogContext => {
  const { error, warn, debug } = useLogger("Dialog Manager");

  /**
   * Internal counter that tracks the number of registred dialogs.
   * Used for logging.
   */
  const registerCounter = useRef<number>(0);

  /**
   * Contains all registred dialog states and holds data in case of concurrent changes / dialog registrations
   * and handles all dialog state changes through actions.
   *
   * Used to trigger re-renders and to sync with prop changes.
   */
  const [dialogStateMap, dispatchDialogState] = useReducer(
    (
      map: InternalDialogStateMap,
      action: InternalDialogStateAction,
    ): InternalDialogStateMap => {
      const copy: InternalDialogStateMap = new Map(map.entries());
      switch (action.type) {
        case "register": {
          copy.set(action.reference, action.open ?? false);
          return copy;
        }
        case "unregister": {
          copy.delete(action.reference);
          return copy;
        }
        case "set": {
          copy.set(action.reference, action.open);
          return copy;
        }
        case "open": {
          copy.set(action.reference, true);
          return copy;
        }
        case "close": {
          copy.set(action.reference, false);
          return copy;
        }
        case "toggle": {
          const state = copy.get(action.reference);
          if (!isBoolean(state)) return copy;
          copy.set(action.reference, !state);
          return copy;
        }
        default:
          return copy;
      }
    },
    new Map<DialogReference, boolean>(),
  );

  /**
   * The portal root is the element to which the dialogs will be appended to.
   * If no portal root is provided, the default portal root is used.
   */
  const portalRoot = useMemo(() => {
    if (!params || !params?.portalRoot) return DEFAULT_PORTAL_ROOT;
    if (!isNonEmptyString(params?.portalRoot)) {
      error("portalRoot must be a CSS selector string");
      return DEFAULT_PORTAL_ROOT;
    }
    return params.portalRoot;
  }, [params, error]);

  /**
   * Finds the state of a dialog based on its reference.
   *
   * @param {DialogReference} reference - The dialog reference to search for
   * @return {Nullable<boolean>} The state of the dialog
   */
  const findDialogState = useCallback(
    (reference: DialogReference): Nullable<boolean> => {
      return dialogStateMap.get(reference) ?? null;
    },
    [dialogStateMap],
  );

  /**
   * See {@link GlobalDialogContext.isDialogRegistered}
   */
  const isDialogRegistered = useCallback(
    (reference: DialogReference) => {
      return dialogStateMap.has(reference);
    },
    [dialogStateMap],
  );

  /**
   * Registers a dialog by setting its reference as a key in the {@link dialogStateMap}
   * and its value to a `boolean`.
   *
   * See {@link GlobalDialogContext.registerDialog}
   */
  const registerDialog = useCallback(
    (reference: DialogReference, open?: Optional<boolean>) => {
      debug(
        `Registering dialog ${reference}... (${registerCounter.current} already registered)`,
      );
      if (!isString(reference)) {
        error("Dialog reference should be a string");
        return;
      }
      if (isEmptyString(reference)) {
        error("Dialog reference should not be an empty string");
        return;
      }
      if (isDialogRegistered(reference)) {
        debug(`Dialog ${reference} already registered`);
        return;
      }
      dispatchDialogState({ reference, type: "register", open: open ?? false });
      registerCounter.current++;
      debug(
        `Dialog ${reference} registered. ${registerCounter.current} currently registered`,
      );
    },
    [debug, isDialogRegistered, error],
  );

  /**
   * Executes a callback if a dialog is registered.
   *
   * @param {DialogReference} reference - The dialog reference
   * @param {VoidFn<[boolean]>} callback - The callback to execute
   * @param {string} [errorMessage] - The error message to log if the dialog is not registered
   */
  const executeIfDialogIsRegistered = useCallback(
    (
      reference: DialogReference,
      callback: VoidFn<[boolean]>,
      errorMessage?: string,
    ) => {
      const state = findDialogState(reference);
      const message = errorMessage ?? `Unable to execute action for dialog`;
      if (isNull(state)) {
        warn(`${message} ${reference}. Unknown reference.`);
        return;
      }
      callback(state);
    },
    [findDialogState, warn],
  );

  /**
   * Un-registers a dialog by setting its value in the {@link dialogStateMap} to `null`
   *
   * See {@link GlobalDialogContext.unregisterDialog}
   */
  const unregisterDialog = useCallback(
    (reference: DialogReference) => {
      debug(`Unregistering dialog ${reference}...`);
      executeIfDialogIsRegistered(
        reference,
        () => {
          dispatchDialogState({ reference, type: "unregister" });
          registerCounter.current--;
          debug(
            `Dialog ${reference} unregistered, ${registerCounter.current} remaining`,
          );
        },
        "Already unregistered dialog",
      );
    },
    [debug, executeIfDialogIsRegistered],
  );

  /**
   * See {@link GlobalDialogContext.openDialog}
   */
  const openDialog = useCallback(
    (reference: DialogReference, forceOpen?: boolean) => {
      if (forceOpen) {
        registerDialog(reference, true);
      }
      executeIfDialogIsRegistered(
        reference,
        () => {
          dispatchDialogState({ reference, type: "open" });
          debug(`Dialog ${reference} opened`);
        },
        "Unable to open dialog",
      );
    },
    [debug, executeIfDialogIsRegistered, registerDialog],
  );

  /**
   * See {@link GlobalDialogContext.closeDialog}
   */
  const closeDialog = useCallback(
    (reference: DialogReference) => {
      executeIfDialogIsRegistered(
        reference,
        () => {
          dispatchDialogState({ reference, type: "close" });
          debug(`Dialog ${reference} closed`);
        },
        "Unable to close dialog",
      );
    },
    [debug, executeIfDialogIsRegistered],
  );

  /**
   * See {@link GlobalDialogContext.toggleDialog}
   */
  const toggleDialog = useCallback(
    // TODO: test function
    (reference: DialogReference) => {
      executeIfDialogIsRegistered(
        reference,
        (state) => {
          const newState = !state;
          dispatchDialogState({ reference, type: "toggle" });
          debug(
            `Dialog ${reference} toggled to ${newState ? "open" : "closed"}`,
          );
        },
        "Unable to toggle dialog",
      );
    },
    [debug, executeIfDialogIsRegistered],
  );

  /**
   * See {@link GlobalDialogContext.setDialogState}
   */
  const setDialogState = useCallback(
    // TODO: test function
    (reference: DialogReference, open: boolean) => {
      executeIfDialogIsRegistered(
        reference,
        () => dispatchDialogState({ reference, type: "set", open }),
        "Unable to set open state for dialog",
      );
    },
    [executeIfDialogIsRegistered],
  );

  /**
   * See {@link GlobalDialogContext.isDialogOpen}
   */
  const isDialogOpen = useCallback(
    (reference: DialogReference) => {
      return findDialogState(reference) ?? false;
    },
    [findDialogState],
  );

  return {
    registerDialog,
    unregisterDialog,
    isDialogRegistered,
    isDialogOpen,
    openDialog,
    closeDialog,
    toggleDialog,
    setDialogState,
    portalRoot,
  };
};

const defaultDialogContext: GlobalDialogContext = {
  registerDialog: () => {},
  unregisterDialog: () => {},
  isDialogRegistered: () => false,
  setDialogState: () => {},
  isDialogOpen: () => false,
  openDialog: () => {},
  closeDialog: () => {},
  toggleDialog: () => {},
  portalRoot: "#dialog-root",
};

const DialogReactContext = createContext(defaultDialogContext);

/**
 * A hook that returns the methods exposed by {@link useGlobalDialogContext} through {@link DialogContext}.
 *
 * Allows for managing the state of multiple dialogs at the same time.
 *
 * @return {GlobalDialogContext} The global dialog context from the useContext hook.
 */
export const useDialogManager = (): GlobalDialogContext => {
  return useContext(DialogReactContext);
};

/**
 * A hook that takes a dialog's reference and returns tailored methods
 * for managing it through {@link useDialogManager}.
 *
 * @param {DialogReference} reference - the reference to the dialog
 * @return {DialogContext} the dialog context object with various dialog-related functions and properties
 */
export const useDialog = (reference: DialogReference) => {
  const context = useDialogManager();

  return useMemo<DialogContext>(() => {
    return {
      portalRoot: context.portalRoot,
      isOpen: context.isDialogOpen(reference),
      isRegistered: context.isDialogRegistered(reference),
      open: (forceOpen = false) => context.openDialog(reference, forceOpen),
      close: () => context.closeDialog(reference),
      toggle: () => context.toggleDialog(reference),
      register: (open?: boolean) => context.registerDialog(reference, open),
      unregister: () => context.unregisterDialog(reference),
      set: (open: boolean) => context.setDialogState(reference, open),
    };
  }, [context, reference]);
};

/**
 * Context Provider needed to manager one or multiple dialogs in a page / app.
 *
 * @param {DialogContextProviderProps} props - Initial {@link DialogContext} config and children.
 * @return {JSX.Element} Its children wrapped in a {@link DialogContext.Provider}
 */
export const DialogProvider = ({
  children,
  portalRoot,
}: DialogContextProviderProps): JSX.Element => {
  const context = useGlobalDialogContext({ portalRoot });
  return (
    <DialogReactContext.Provider value={context}>
      {children}
    </DialogReactContext.Provider>
  );
};
