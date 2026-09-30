import { useProgressBarStyles } from "./ProgressBar.styles";

import type { LoadingAnimationProps } from "../Loading.animations.types";
import type { ReactNode } from "react";

/**
 * Renders a ProgressBar loading animation
 *
 * @param {LoadingAnimationProps} props - the loading animation props.
 * @return {ReactNode} the rendered spinner component
 */
export const ProgressBar = (props: LoadingAnimationProps): ReactNode => {
  const { className, style } = useProgressBarStyles(props);

  return <div data-testid={props.testId} className={className} style={style} />;
};
