import type { FC } from "react";

type ComponentModule<
  TComponentName extends string,
  TComponentProps extends Record<string, unknown>
> = {
  [key in TComponentName]: FC<TComponentProps>;
};

type ComponentDefaultModule<TComponentProps extends Record<string, unknown>> = {
  default: FC<TComponentProps>;
};

/**
 * Loads a component from a specified path and returns it as a Promise.
 *
 * @remarks used for lazy-loading a component dynamically
 *
 * @param {string} componentName - The name of the component to load.
 * @param {string} [componentPath] - The path to the component module.
 * @return {Promise<ComponentDefaultModule<TComponentProps>>} A Promise that resolves to the loaded component module.
 *
 * @example
 * ```tsx
 * import { lazy, useReducer } from "react";
 * import { loadComponent } from "@utils";
 * imoprt type { BadgeProps } from "@components/Badge";
 *
 * const LazyLoadedBadge = lazy(loadComponent<BadgeProps, "Badge">("Badge"));
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
    TComponentProps extends Record<string, unknown>,
    TComponentName extends string
  >(
    componentName: TComponentName,
    componentPath?: string
  ) =>
  async (): Promise<ComponentDefaultModule<TComponentProps>> => {
    const path = componentPath ?? `@components/${componentName}`;
    const absolutePath = path
      .replace("@components/", "/src/components/")
      .replace("@/", "/src/");
    const module = (await import(absolutePath)) as ComponentModule<
      TComponentName,
      TComponentProps
    >;
    if (!(componentName in module)) {
      throw new Error(`Component ${componentName} not found in ${path}`);
    }
    return { default: module[componentName] };
  };
