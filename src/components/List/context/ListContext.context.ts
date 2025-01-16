import { createContext, type Context, useContext } from "react";

import { defaultListContextValue } from "./ListContext.default";

import type { ListContextValue } from "./ListContext.types";
import type { DataProviderType } from "../modules";

export const ListContext = createContext<
  ListContextValue<object, DataProviderType>
>(defaultListContextValue<object>());

export const useListContext = <
  TItem extends object = object,
  TProviderType extends DataProviderType = DataProviderType
>() => {
  return useContext(
    ListContext as unknown as Context<ListContextValue<TItem, TProviderType>>
  );
};
