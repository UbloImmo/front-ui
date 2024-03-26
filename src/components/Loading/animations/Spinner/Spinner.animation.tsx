import { useStyleProps } from "@utils";
import type { LoadingAnimationProps } from "../../Loading.types";
import styled from "styled-components";
import { spinnerStyle } from "./Spinner.styles";
import type { StyleProps } from "@types";

export const Spinner = (props: LoadingAnimationProps) => {
  const styleProps = useStyleProps(props);

  return <Renderer {...styleProps} data-testid="loading-indicator" />;
};

const Renderer = styled.div<StyleProps<LoadingAnimationProps>>`
  ${spinnerStyle}
`;
