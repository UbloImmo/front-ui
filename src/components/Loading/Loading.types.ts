import type * as LoadingAnimations from "./animations";
import type { AnimationProps } from "./animations/Loading.animations.types";
import type { StyleOverrideProps } from "@types";

export type LoadingAnimation = keyof typeof LoadingAnimations;

export type LoadingProps = StyleOverrideProps &
  AnimationProps & {
    /**
     * The name of the animation to play
     *
     * @type {LoadingAnimation}
     * @default "BouncingBalls"
     */
    animation?: LoadingAnimation;
  };

export type DefaultLoadingProps = Required<LoadingProps>;
