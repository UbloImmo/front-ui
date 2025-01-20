import { ListProviderWrapper } from "./components/internal";

import { useMergedProps } from "@utils";

import type { ListProps, ListDefaultProps } from "./List.types";

const defaultListProps: ListDefaultProps<object> = {
  config: null,
  children: null,
};

/**
 * Highly customizable list component
 *
 * @version 0.0.3
 *
 * @param {ListProps} props - List component props
 * @returns {JSX.Element}
 */
const List = <TItem extends object>(props: ListProps<TItem>): JSX.Element => {
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
List.defaultProps = defaultListProps;

export { List };
