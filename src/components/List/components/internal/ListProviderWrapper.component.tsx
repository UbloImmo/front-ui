import { useListContext, ListContextProvider } from "../../context";

import type { ListProviderWrapperProps } from "../../List.types";

/**
 * Wraps the List component in a ListContextProvider if:
 * - the parent context is missing and
 * - the List component has a config prop
 *
 * @version 0.0.1
 *
 * @template TItem - The type of items in the list
 * @param {ListProviderWrapperProps<TItem>} props - List provider wrapper props
 * @returns {JSX.Element}
 */
export const ListProviderWrapper = <TItem extends object>(
  props: ListProviderWrapperProps<TItem>
): JSX.Element => {
  const parentContext = useListContext<TItem>();
  if (parentContext.contextMissing && props.config) {
    return (
      <ListContextProvider config={props.config}>
        {props.children}
      </ListContextProvider>
    );
  }
  return <>{props.children}</>;
};
