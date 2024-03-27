import type { LoadingAnimationProps } from "../../Loading.types";
import type { StyleProps } from "@types";
import { useStyleProps } from "@utils";
import styled from "styled-components";
import { spinnerStyle } from "./Spinner.styles";

/**
 * Renders a Spinner loading animation
 *
 * @param {LoadingAnimationProps} props - the loading animation props.
 * @return {JSX.Element} the rendered spinner component
 */
export const Spinner = (props: LoadingAnimationProps): JSX.Element => {
  const styleProps = useStyleProps(props);

  return <Renderer {...styleProps} data-testid="loading-indicator" />;
};

const Renderer = styled.div<StyleProps<LoadingAnimationProps>>`
  ${spinnerStyle}
`;
