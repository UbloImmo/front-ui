import { useEffect, useRef, type FC } from "react";

import type { TestIdProps } from "@types";
import type { VoidFn } from "@ubloimmo/front-util";

type Component<TComponentProps extends Record<string, unknown>> =
  TComponentProps extends infer TBaseProps & TestIdProps
    ?
        | FC<TBaseProps & TestIdProps>
        | (FC<TComponentProps> & { defaultProps: Required<TBaseProps> })
    :
        | FC<TComponentProps>
        | (FC<TComponentProps> & { defaultProps: Required<TComponentProps> });

type ComponentModule<
  TComponentName extends string,
  TComponentProps extends Record<string, unknown>
> = Record<string, unknown> & {
  [key in TComponentName]: Component<TComponentProps>;
};

type ComponentDefaultModule<TComponentProps extends Record<string, unknown>> = {
  default: Component<TComponentProps>;
};

/**
 * Loads a component from a specified path and returns it as a Promise.
 *
 * @remarks used for lazy-loading a component dynamically
 *
 * @param {string} componentName - The name of the component to load.
 * @return {Promise<ComponentDefaultModule<TComponentProps>>} A Promise that resolves to the loaded component module.
 *
 * @example
 * ```tsx
 * import { lazy, useReducer } from "react";
 * import { loadComponent } from "@utils";
 *
 * const LazyLoadedBadge = lazy(loadComponent("Badge", import("../Badge")));
 *
 * export const MyComponent = () => {
 *  const [state, toggleState] = useReducer((state) => !state, false);
 *  return (
 *    <div>
 *      <span>Label</span>
 *      {state && <LazyLoadedBadge label="Badge"/>}
 *    <div/>
 *  )
 * };
 * ```
 */
export const loadComponent =
  <
    TComponentName extends string,
    TComponentProps extends Record<string, unknown>
  >(
    componentName: TComponentName,
    modulePromise: Promise<ComponentModule<TComponentName, TComponentProps>>
  ) =>
  async (): Promise<ComponentDefaultModule<TComponentProps>> => {
    try {
      const module = await modulePromise;
      if (!(componentName in module)) {
        throw new Error(`Component ${componentName} not found`);
      }
      return { default: module[componentName] };
    } catch (e) {
      throw new Error(`Failed to load component ${componentName}: ${e}`);
    }
  };

/**
 * Executes a callback after the current tick
 *
 * @param {VoidFn} callback - The callback to execute.
 */
export const nextTick = (callback: VoidFn) => setTimeout(callback);

/**
 * Executes a callback after the component is mounted
 *
 * @param {VoidFn} callback - The callback to execute.
 */
export const useMounted = (callback: VoidFn) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;
    callback();

    return () => {
      mounted.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
