import { useMemo } from "react";

import * as LoadingAnimations from "./animations";

import { useLogger, useMergedProps, useTestId } from "@utils";

import type { DefaultLoadingProps, LoadingProps } from "./Loading.types";
import type { TestIdProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

export const defaultLoadingProps: DefaultLoadingProps = {
  size: "s-4",
  color: "primary-base",
  animation: "BouncingBalls",
  className: null,
};

const defaultAnimationName = defaultLoadingProps.animation;

/**
 * An extensible component for displaying loadings animation.
 *
 * @version 0.0.2
 *
 * @param {LoadingProps & TestIdProps} props - props for configuring the loading animation
 * @return {Nullable<JSX.Element>} the rendered loading animation component, or null if no animation found
 */
const Loading = (props: LoadingProps & TestIdProps): Nullable<JSX.Element> => {
  const { warn } = useLogger("Loading");
  const { animation, ...mergedProps } = useMergedProps(
    defaultLoadingProps,
    props,
  );
  const testId = useTestId("loading-indicator", props);

  const Animation = useMemo(() => {
    const DefaultAnimation = LoadingAnimations[defaultAnimationName];
    if (!(animation in LoadingAnimations)) {
      warn(
        `Unknown animation ${animation}. Defaulting to ${defaultAnimationName}`,
      );
      return DefaultAnimation;
    }
    return LoadingAnimations[animation];
  }, [animation, warn]);

  return (
    <Animation
      {...mergedProps}
      testId={testId}
      className={mergedProps.className}
    />
  );
};

Loading.defaultProps = defaultLoadingProps;

export { Loading };
