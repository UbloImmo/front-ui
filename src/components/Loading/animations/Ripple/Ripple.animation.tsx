import { useRippleStyles } from "./Ripple.styles";

import type { LoadingAnimationProps } from "../Loading.animations.types";

/**
 * Renders a Ripple loading animation
 *
 * @param {LoadingAnimationProps} props - the loading animation props.
 * @return {JSX.Element} the rendered spinner component
 */
export const Ripple = (props: LoadingAnimationProps): JSX.Element => {
  const { style, className } = useRippleStyles(props);

  return <div data-testid={props.testId} className={className} style={style} />;
};
