import type {
  FixedCssLength,
  PaletteColor,
  StyleOverrideProps,
  TestIdProps,
} from "@types";

export type AnimationProps = Omit<StyleOverrideProps, "as"> & {
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
   * @default "primary-base"
   */
  color?: PaletteColor;
};

export type DefaultAnimationProps = Required<AnimationProps>;

export type LoadingAnimationProps = DefaultAnimationProps & TestIdProps;
