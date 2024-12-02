import type { ListContextConfig } from "./context";
import type { Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

export type ListProps<TItem extends object> = {
  /**
   * A list context configuration object.
   *
   * If provided, the list will instanciate its own context and provider
   * instead of using one possibly rendered by its parent.
   *
   * @type {Nullable<ListContextConfig<TItem>>}
   * @default null
   */
  config?: Nullable<ListContextConfig<TItem>>;
  children?: ReactNode;
};

export type ListDefaultProps<TItem extends object> = Required<ListProps<TItem>>;

export type ListProviderWrapperProps<TItem extends object> = {
  children: ReactNode;
} & Pick<ListProps<TItem>, "config">;
