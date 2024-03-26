import { useLogger, useMergedProps } from "@utils";
import { DefaultLoadingProps, LoadingProps } from "./Loading.types";
import { useMemo } from "react";
import * as LoadingAnimations from "./animations";
import { Nullable } from "@ubloimmo/front-util";

const defaultLoadingProps: DefaultLoadingProps = {
  size: "s-8",
  color: "primary-base",
  animation: "BouncingBalls",
};

const defaultAnimationName = defaultLoadingProps.animation;

/**
 * An extensible component for displaying loadings animation.
 *
 * @param {LoadingProps} props - props for configuring the loading animation
 * @return {Nullable<JSX.Element>} the rendered loading animation component, or null if no animation found
 */
const Loading = (props: LoadingProps): Nullable<JSX.Element> => {
  const { warn, error } = useLogger("Loading");
  const { animation, ...mergedProps } = useMergedProps(
    defaultLoadingProps,
    props
  );

  const Animation = useMemo(() => {
    const DefaultAnimation = LoadingAnimations[defaultAnimationName];
    if (!animation) {
      warn(`No animation provided. Defaulting to ${defaultAnimationName}`);
      return DefaultAnimation;
    }
    if (!(animation in LoadingAnimations)) {
      warn(
        `Unknown animation ${animation}. Defaulting to ${defaultAnimationName}`
      );
      return DefaultAnimation;
    }
    return LoadingAnimations[animation];
  }, [animation, warn]);

  if (!Animation) {
    error(`No animation linked to name ${animation}`);
    return null;
  }
  return <Animation {...mergedProps} />;
};

Loading.defaultProps = defaultLoadingProps;

export { Loading };
