import styled from "styled-components";

import { Loading, LoadingProps, defaultLoadingProps } from "../Loading";

import { useMergedProps, useTestId } from "@utils";

import type { TestIdProps } from "@types";

/**
 * SmallLoader component
 *
 * A loading animation that can be used in page redirection
 *
 * @version 0.0.1
 *
 * @param {TestIdProps} props - SmallLoader component props
 * @returns {JSX.Element}
 */
const SmallLoader = (props: TestIdProps & LoadingProps): JSX.Element => {
  const mergedProps = useMergedProps(props, defaultLoadingProps);
  const testId = useTestId("small-loader", props);

  return (
    <SmallLoaderComponent
      {...mergedProps}
      animation="ProgressBar"
      testId={testId}
      overrideTestId
    />
  );
};

SmallLoader.defaultProps = {};

export { SmallLoader };

const SmallLoaderComponent = styled(Loading)`
  width: 100%;
`;
