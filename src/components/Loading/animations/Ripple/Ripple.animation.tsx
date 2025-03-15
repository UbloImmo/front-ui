import styled from "styled-components";

import { rippleStyle } from "./Ripple.styles";

import { useClassName, useHtmlAttribute, useStyleProps } from "@utils";

import type { LoadingAnimationProps } from "../Loading.animations.types";
import type { StyleProps } from "@types";

/**
 * Renders a Ripple loading animation
 *
 * @param {LoadingAnimationProps} props - the loading animation props.
 * @return {JSX.Element} the rendered spinner component
 */
export const Ripple = (props: LoadingAnimationProps): JSX.Element => {
  const styleProps = useStyleProps(props);

  const className = useClassName(props);
  const style = useHtmlAttribute(props.styleOverride);

  return (
    <Renderer
      {...styleProps}
      data-testid={props.testId}
      className={className}
      style={style}
    />
  );
};

const Renderer = styled.div<StyleProps<LoadingAnimationProps>>`
  ${rippleStyle}
`;
