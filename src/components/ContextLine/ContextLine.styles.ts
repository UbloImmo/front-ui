import { css } from "styled-components";
import { ContextLineProps } from "./ContextLine.types";
import { StyleProps } from "@types";
import { fromStyleProps } from "@utils";

export const contextLineStyles = (props: StyleProps<ContextLineProps>) => {
  const { first } = fromStyleProps<ContextLineProps>(props);

  const heightContainer = first === "default" ? "var(--s-11)" : "var(--s-8)";

  const alignContent =
    first === "first"
      ? "flex-start"
      : first === "default"
      ? "center"
      : "flex-end";

  const boxShadow = first === "last" ? "none" : "var(--border-bottom)";

  return css`
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    width: 100%;
    align-items: ${alignContent};
    height: ${heightContainer};
    box-shadow: ${boxShadow};
  `;
};
