import { ListProviderWrapper } from "./components/internal";

import { useMergedProps } from "@utils";

import type { ListProps, ListDefaultProps } from "./List.types";
import type { ReactNode } from "react";

const defaultListProps: ListDefaultProps<object> = {
  config: null,
  children: null,
};

/**
 * Highly customizable list component
 *
 * @version 0.1.0
 *
 * @param {ListProps} props - List component props
 * @returns {ReactNode}
 */
const List = <TItem extends object>(props: ListProps<TItem>): ReactNode => {
  const mergedProps = useMergedProps(
    defaultListProps as unknown as ListDefaultProps<TItem>,
    props
  );

  return (
    <ListProviderWrapper config={mergedProps.config}>
      {mergedProps.children}
    </ListProviderWrapper>
  );
};
List.__DEFAULT_PROPS = defaultListProps;

export { List };
