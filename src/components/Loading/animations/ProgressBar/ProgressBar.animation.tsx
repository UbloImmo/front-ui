import { useProgressBarStyles } from "./ProgressBar.styles";

import type { LoadingAnimationProps } from "../Loading.animations.types";

/**
 * Renders a ProgressBar loading animation
 *
 * @param {LoadingAnimationProps} props - the loading animation props.
 * @return {JSX.Element} the rendered spinner component
 */
export const ProgressBar = (props: LoadingAnimationProps): JSX.Element => {
  const { className, style } = useProgressBarStyles(props);

  return <div data-testid={props.testId} className={className} style={style} />;
};
