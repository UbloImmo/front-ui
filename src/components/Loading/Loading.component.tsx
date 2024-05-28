import { Nullable } from "@ubloimmo/front-util";
import { useMemo } from "react";

import * as LoadingAnimations from "./animations";
import { DefaultLoadingProps, LoadingProps } from "./Loading.types";

import { useLogger, useMergedProps } from "@utils";

const defaultLoadingProps: DefaultLoadingProps = {
  size: "s-4",
  color: "primary-base",
  animation: "BouncingBalls",
};

const defaultAnimationName = defaultLoadingProps.animation;

/**
 * An extensible component for displaying loadings animation.
 *
 * @version 0.0.1
 *
 * @param {LoadingProps} props - props for configuring the loading animation
 * @return {Nullable<JSX.Element>} the rendered loading animation component, or null if no animation found
 */
const Loading = (props: LoadingProps): Nullable<JSX.Element> => {
  const { warn } = useLogger("Loading");
  const { animation, ...mergedProps } = useMergedProps(
    defaultLoadingProps,
    props
  );

  const Animation = useMemo(() => {
    const DefaultAnimation = LoadingAnimations[defaultAnimationName];
    if (!(animation in LoadingAnimations)) {
      warn(
        `Unknown animation ${animation}. Defaulting to ${defaultAnimationName}`
      );
      return DefaultAnimation;
    }
    return LoadingAnimations[animation];
  }, [animation, warn]);

  return <Animation {...mergedProps} />;
};

Loading.defaultProps = defaultLoadingProps;

export { Loading };
