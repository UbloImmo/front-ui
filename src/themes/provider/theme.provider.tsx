import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ReactNode, useMemo } from "react";
import { buildTheme } from "../theme";
import { GlobalStyle } from "./globalStyle";

type ThemeProviderProps = {
  children: ReactNode;
};

/**
 * ThemeProvider component to provide `styled-components` theme to the children components.
 *
 * @param {ReactNode} children - The child components to apply the theme to.
 * @return {JSX.Element} The styled theme provider component with the provided theme.
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  // TODO: get current client org from Kaffy
  const theme = useMemo(() => buildTheme(), []);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
