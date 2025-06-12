import { useLogger, useTestId, useMergedProps } from "@utils";

import type { SideMenuProps, SideMenuDefaultProps } from "./SideMenu.types";
import type { TestIdProps } from "@types";

const defaultSideMenuProps: SideMenuDefaultProps = {
  // TODO
};

/**
 * SideMenu component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {SideMenuProps & TestIdProps} props - SideMenu component props
 * @returns {JSX.Element}
 */
const SideMenu = (props: SideMenuProps & TestIdProps): JSX.Element => {
  const { log } = useLogger("SideMenu");
  const mergedProps = useMergedProps(defaultSideMenuProps, props);
  const testId = useTestId("side-menu", props);
  // TODO

  log(mergedProps);

  return <div data-testid={testId}>SideMenu TODO</div>;
};
SideMenu.defaultProps = defaultSideMenuProps;

export { SideMenu };
