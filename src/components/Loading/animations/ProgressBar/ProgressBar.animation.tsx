import styled from "styled-components";

import { ProgressBarStyle } from "./ProgressBar.styles";

import { useClassName, useHtmlAttribute, useStyleProps } from "@utils";

import type { LoadingAnimationProps } from "../Loading.animations.types";
import type { StyleProps } from "@types";

/**
 * Renders a ProgressBar loading animation
 *
 * @param {LoadingAnimationProps} props - the loading animation props.
 * @return {JSX.Element} the rendered spinner component
 */
export const ProgressBar = (props: LoadingAnimationProps): JSX.Element => {
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
  ${ProgressBarStyle}
`;
