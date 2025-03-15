import { useMemo } from "react";
import styled from "styled-components";

import { bouncingBallsStyle } from "./BouncingBalls.styles";

import { parseFixedLength } from "@/sizes/size.utils";
import { cssVarUsage, useClassName, useHtmlAttribute } from "@utils";

import type { LoadingAnimationProps } from "../Loading.animations.types";

/**
 * Renders a BouncingBalls loading animation
 *
 * @param {LoadingAnimationProps} props - the loading animation props.
 * @return {JSX.Element} the rendered spinner component
 */
export const BouncingBalls = (props: LoadingAnimationProps) => {
  const innerProps = useMemo(() => {
    return {
      color: cssVarUsage(props.color),
      size: parseFixedLength(props.size),
    };
  }, [props]);

  const className = useClassName(props);
  const style = useHtmlAttribute(props.styleOverride);

  return (
    <Container
      xmlns="http://www.w3.org/2000/svg"
      height={innerProps.size}
      fill={innerProps.color}
      viewBox="0 0 48 28"
      data-testid={props.testId}
      className={className}
      style={style}
    >
      <g>
        <circle cx="4" cy="14" r="4" />
        <circle cx="20" cy="14" r="6" />
        <circle cx="40" cy="14" r="8" />
      </g>
    </Container>
  );
};

const Container = styled.svg`
  ${bouncingBallsStyle}
`;
