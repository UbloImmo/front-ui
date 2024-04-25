import {
  isBoolean,
  isNull,
  isString,
  type Nullable,
  type Optional,
} from "@ubloimmo/front-util";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { isEmptyString, isNonEmptyString, useLogger } from "@utils";

import type {
  DialogContextProps,
  DialogContext,
  DialogReference,
  DialogContextProviderProps,
  InternalDialogStateMap,
  GlobalDialogContext,
} from "./Dialog.types";

const DEFAULT_PORTAL_ROOT = "#dialog-root";

/**
 * Custom hook for managing global dialog states.
 *
 * @param {DialogContextProps} params - Parameters for the dialog context
 * @return {GlobalDialogContext} The global dialog context object
 */
export const useGlobalDialogContext = (
  params: DialogContextProps
): GlobalDialogContext => {
  const { error, log, warn, debug } = useLogger("Dialog Manager", {
    hideLogs: true,
    hideDebug: true,
  });
  /**
   * Internal counter that tracks the number of registred dialogs.
   * Used for logging.
   */
  const registerCounter = useRef<number>(0);
  /**
   * Contains all registred dialog states and holds data in case of concurrent changes / dialog registrations
   */
  const dialogStateMapRef = useRef<InternalDialogStateMap>({});
  /**
   * Mirrors {@link dialogStateMapRef}
   * Used exclusively to trigger re-renders and to sync with prop changes.
   */
  const [_, setDialogStateMap] = useState<InternalDialogStateMap>({});

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
      return dialogStateMapRef.current[reference] ?? null;
    },
    []
  );

  /**
   * Upates both the {@link dialogStateMapRef} and {@link dialogStateMap}
   * and keeps them in sync with each other.
   *
   * Used to update, registrer and unregister dialogs.
   *
   * @param {DialogReference} reference - The dialog reference
   * @param {Nullable<boolean>} state - The dialog state
   *
   * @remarks
   * This is the only method that should mutate the dialog state map.
   */
  const changeDialogState = useCallback(
    (reference: DialogReference, state: Nullable<boolean>) => {
      dialogStateMapRef.current = {
        ...dialogStateMapRef.current,
        [reference]: state,
      };
      setDialogStateMap({
        ...dialogStateMapRef.current,
        [reference]: state,
      });
      log(`Dialog ${reference} ${state ? "opened" : "closed"}`);
    },
    [log]
  );

  /**
   * See {@link GlobalDialogContext.isDialogRegistered}
   */
  const isDialogRegistered = useCallback(
    (reference: DialogReference) => {
      return isBoolean(findDialogState(reference));
    },
    [findDialogState]
  );

  /**
   * Registers a dialog by setting its reference as a key in the {@link dialogStateMap}
   * and its value to a `boolean`.
   *
   * See {@link GlobalDialogContext.registerDialog}
   */
  const registerDialog = useCallback(
    (reference: DialogReference, open?: Optional<boolean>) => {
      log(
        `Registering dialog ${reference}... (${registerCounter.current} already registered)`
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
        error(`Dialog ${reference} already registered`);
        return;
      }
      changeDialogState(reference, open ?? false);
      registerCounter.current++;
      log(
        `Dialog ${reference} registered. ${registerCounter.current} currently registered`
      );
    },
    [log, isDialogRegistered, changeDialogState, error]
  );

  /**
   * Un-registers a dialog by setting its value in the {@link dialogStateMap} to `null`
   *
   * See {@link GlobalDialogContext.unregisterDialog}
   */
  const unregisterDialog = useCallback(
    (reference: DialogReference) => {
      log(`Unregistering dialog ${reference}...`);
      if (!isDialogRegistered(reference)) {
        warn("Dialog already unregistered");
        return;
      }
      changeDialogState(reference, null);
      registerCounter.current--;
      log(`Dialog ${reference} unregistered`);
    },
    [warn, log, isDialogRegistered, changeDialogState]
  );

  /**
   * See {@link GlobalDialogContext.openDialog}
   */
  const openDialog = useCallback(
    (reference: DialogReference) => {
      const dialogState = findDialogState(reference);
      if (isNull(dialogState)) {
        warn(`Unable to open dialog ${reference}. Unknown reference.`);
        return;
      }
      changeDialogState(reference, true);
      debug(`Dialog ${reference} opened`);
    },
    [changeDialogState, debug, findDialogState, warn]
  );

  /**
   * See {@link GlobalDialogContext.closeDialog}
   */
  const closeDialog = useCallback(
    (reference: DialogReference) => {
      const dialogState = findDialogState(reference);
      if (isNull(dialogState)) {
        warn(`Unable to close dialog ${reference}. Unknown reference.`);
        return;
      }
      changeDialogState(reference, false);
      debug(`Dialog ${reference} closed`);
    },
    [changeDialogState, debug, findDialogState, warn]
  );

  /**
   * See {@link GlobalDialogContext.toggleDialog}
   */
  const toggleDialog = useCallback(
    // TODO: test function
    (reference: DialogReference) => {
      const state = findDialogState(reference);
      if (isNull(state)) {
        warn(`Unable to toggle dialog ${reference}. Unknown reference.`);
        return;
      }
      const newState = !state;
      changeDialogState(reference, newState);
      debug(`Dialog ${reference} toggled to ${newState ? "open" : "closed"}`);
    },
    [changeDialogState, debug, findDialogState, warn]
  );

  /**
   * See {@link GlobalDialogContext.setDialogState}
   */
  const setDialogState = useCallback(
    // TODO: test function
    (reference: DialogReference, open: boolean) => {
      if (!isDialogRegistered(reference)) {
        warn(
          `Unable to set dialog ${reference}'s open state. Unknown reference.`
        );
        return;
      }
      changeDialogState(reference, open);
    },
    [changeDialogState, warn, isDialogRegistered]
  );

  /**
   * See {@link GlobalDialogContext.isDialogOpen}
   */
  const isDialogOpen = useCallback(
    (reference: DialogReference) => {
      return findDialogState(reference) ?? false;
    },
    [findDialogState]
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
      open: () => context.openDialog(reference),
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
 * @param {DialogContextProviderProps} props - Initial {@link DialogContext} config.
 * @param {ReactNode} props.children - The children components to be wrapped by the provider.
 * @param {string} props.portalRoot - Query selector targeting the root element to portal the dialogs to.
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
