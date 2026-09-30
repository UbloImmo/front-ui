import { useRippleStyles } from "./Ripple.styles";

import type { LoadingAnimationProps } from "../Loading.animations.types";
import type { ReactNode } from "react";

/**
 * Renders a Ripple loading animation
 *
 * @param {LoadingAnimationProps} props - the loading animation props.
 * @return {ReactNode} the rendered spinner component
 */
export const Ripple = (props: LoadingAnimationProps): ReactNode => {
  const { style, className } = useRippleStyles(props);

  return <div data-testid={props.testId} className={className} style={style} />;
};
