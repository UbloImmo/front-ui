import { Loading, LoadingProps, defaultLoadingProps } from "../Loading";
import styles from "./SmallLoader.module.scss";

import { useCssClasses, useMergedProps, useTestId } from "@utils";

import type { TestIdProps } from "@types";

/**
 *
 * A loading animation that can be used in page redirection
 *
 * @version 0.1.0
 *
 * @param {TestIdProps} props - SmallLoader component props
 * @returns {JSX.Element}
 */
const SmallLoader = (props: TestIdProps & LoadingProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultLoadingProps, props);
  const testId = useTestId("small-loader", props);
  const className = useCssClasses(styles["small-loader"], props.className);

  return (
    <Loading
      {...mergedProps}
      animation="ProgressBar"
      testId={testId}
      overrideTestId
      className={className}
    />
  );
};

SmallLoader.__DEFAULT_PROPS = {};

export { SmallLoader };
