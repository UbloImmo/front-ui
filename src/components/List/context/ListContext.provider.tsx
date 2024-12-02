import { useMemo } from "react";

import { ListContext } from "./ListContext.context";
import { defaultListContextValue } from "./ListContext.default";
import { useListContextStore } from "./ListContext.store";

import type {
  ListContextConfig,
  ListContextValue,
  ListProviderProps,
} from "./ListContext.types";

/**
 * Provider component for the List context
 *
 * @template TItem - The type of items in the list
 * @param props - The provider props
 * @param props.config - Configuration object for the list context
 * @param props.children - Child components that will have access to the list context
 * @returns React component that provides list context to its children
 */
export const ListContextProvider = <TItem extends object>({
  config,
  children,
}: ListProviderProps<TItem>) => {
  const contextConfig = useMemo<ListContextConfig<TItem>>(() => {
    if (!config) {
      const { dataProvider } = defaultListContextValue<TItem>();
      return { useDataProvider: () => dataProvider };
    }
    return config;
  }, [config]);

  const contextValue = useListContextStore(contextConfig);

  return (
    <ListContext.Provider
      value={contextValue as unknown as ListContextValue<object>}
    >
      {children}
    </ListContext.Provider>
  );
};
