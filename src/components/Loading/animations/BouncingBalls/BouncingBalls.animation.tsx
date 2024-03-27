import { useMemo } from "react";
import styled from "styled-components";

import { bouncingBallsStyle } from "./BouncingBalls.styles";
import { LoadingAnimationProps } from "../../Loading.types";

import { parseFixedLength } from "@/sizes/size.utils";
import { cssVarUsage } from "@utils";

export const BouncingBalls = (props: LoadingAnimationProps) => {
  const innerProps = useMemo(() => {
    return {
      color: cssVarUsage(props.color),
      size: parseFixedLength(props.size),
    };
  }, [props]);

  return (
    <Container
      xmlns="http://www.w3.org/2000/svg"
      height={innerProps.size}
      fill={innerProps.color}
      viewBox="0 0 62 30"
      data-testid="loading-indicator"
    >
      <g>
        <circle cx="4" cy="15" r="4" />
        <circle cx="16" cy="15" r="6" />
        <circle cx="32" cy="15" r="8" />
        <circle cx="52" cy="15" r="10" />
      </g>
    </Container>
  );
};

const Container = styled.svg`
  ${bouncingBallsStyle}
`;
