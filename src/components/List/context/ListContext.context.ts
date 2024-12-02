import { createContext, type Context, useContext } from "react";

import { defaultListContextValue } from "./ListContext.default";

import type { ListContextValue } from "./ListContext.types";

export const ListContext = createContext<ListContextValue<object>>(
  defaultListContextValue<object>()
);

export const useListContext = <TItem extends object = object>() => {
  return useContext(ListContext as unknown as Context<ListContextValue<TItem>>);
};
