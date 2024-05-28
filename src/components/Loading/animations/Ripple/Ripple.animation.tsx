import styled from "styled-components";

import { spinnerStyle as RippleStyle } from "./Ripple.styles";

import { useStyleProps } from "@utils";

import type { LoadingAnimationProps } from "../../Loading.types";
import type { StyleProps } from "@types";

/**
 * Renders a Ripple loading animation
 *
 * @param {LoadingAnimationProps} props - the loading animation props.
 * @return {JSX.Element} the rendered spinner component
 */
export const Ripple = (props: LoadingAnimationProps): JSX.Element => {
  const styleProps = useStyleProps(props);

  return <Renderer {...styleProps} data-testid="loading-indicator" />;
};

const Renderer = styled.div<StyleProps<LoadingAnimationProps>>`
  ${RippleStyle}
`;
