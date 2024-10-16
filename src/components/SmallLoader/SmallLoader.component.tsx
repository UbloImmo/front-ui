import styled from "styled-components";

import { Loading, LoadingProps, defaultLoadingProps } from "../Loading";

import { useClassName, useMergedProps, useTestId } from "@utils";

import type { TestIdProps } from "@types";

/**
 *
 * A loading animation that can be used in page redirection
 *
 * @version 0.0.2
 *
 * @param {TestIdProps} props - SmallLoader component props
 * @returns {JSX.Element}
 */
const SmallLoader = (props: TestIdProps & LoadingProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultLoadingProps, props);
  const testId = useTestId("small-loader", props);
  const className = useClassName(props);

  return (
    <SmallLoaderComponent
      {...mergedProps}
      animation="ProgressBar"
      testId={testId}
      overrideTestId
      className={className}
    />
  );
};

SmallLoader.defaultProps = {};

export { SmallLoader };

const SmallLoaderComponent = styled(Loading)`
  width: 100%;
`;
