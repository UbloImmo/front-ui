import { useLogger, useTestId, useMergedProps } from "@utils";

import type { MenuItemProps, MenuItemDefaultProps } from "./MenuItem.types";
import type { TestIdProps } from "@types";

const defaultMenuItemProps: MenuItemDefaultProps = {
  // TODO
};

/**
 * MenuItem component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {MenuItemProps & TestIdProps} props - MenuItem component props
 * @returns {JSX.Element}
 */
const MenuItem = (props: MenuItemProps & TestIdProps): JSX.Element => {
  const { log } = useLogger("MenuItem");
  const mergedProps = useMergedProps(defaultMenuItemProps, props);
  const testId = useTestId("menu-item", props);
  // TODO

  log(mergedProps);

  return <div data-testid={testId}>MenuItem TODO</div>;
};
MenuItem.defaultProps = defaultMenuItemProps;

export { MenuItem };
