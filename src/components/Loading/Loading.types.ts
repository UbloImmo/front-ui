import { FixedCssLength, PaletteColor } from "@types";
import * as LoadingAnimations from "./animations";

export type LoadingAnimation = keyof typeof LoadingAnimations;

export type LoadingProps = {
  /**
   * The name of the animation to play
   *
   * @type {LoadingAnimation}
   * @default "BouncingBalls"
   */
  animation?: LoadingAnimation;
  /**
   * The size of the loading animation and its container
   * Wether it affects height of width is determined by the animation itself
   *
   * @type {FixedCssLength}
   * @default "s-4"
   */
  size?: FixedCssLength;
  /**
   * The dominant color of the loading animation.
   * Some animations might have fixed colors and not take this into account
   *
   * @type {PaletteColor}
   * @default "primary-light"
   */
  color?: PaletteColor;
};

export type DefaultLoadingProps = Required<LoadingProps>;

export type LoadingAnimationProps = Pick<DefaultLoadingProps, "size" | "color">;
