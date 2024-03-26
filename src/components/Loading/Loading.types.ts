import { FixedCssLength, PaletteColor } from "@types";
import * as LoadingAnimations from "./animations";

type LoadingAnimation = keyof typeof LoadingAnimations;

export type LoadingProps = {
  /**
   * The name of the animation to play
   *
   * @default "bouncingBalls"
   */
  animation?: LoadingAnimation;
  /**
   * The size of the loading animation and its container
   * Wether it affects height of width is determined by the animation itself
   *
   * @default "bouncingBalls"
   */
  size?: FixedCssLength;
  /**
   * The dominant color of the laading animation
   * Wether it affects height of width is determined by the animation itself
   *
   * @default "primary-base"
   */
  color?: PaletteColor;
};

export type DefaultLoadingProps = Required<LoadingProps>;

export type LoadingAnimationProps = Pick<DefaultLoadingProps, "size" | "color">;
