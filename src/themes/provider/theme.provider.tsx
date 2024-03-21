import type {
  ClientColorPaletteKey,
  GetThemeOverridesFn,
  ThemeOverride,
} from "../../types";
import type { Nullable } from "@ubloimmo/front-util";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ReactNode, useMemo, useState, useEffect } from "react";
import { buildTheme } from "../theme";
import { GlobalStyle } from "./globalStyle";
import { isNullish } from "@ubloimmo/front-util";

type ThemeProviderProps = {
  children: ReactNode;
  getOverridesFn?: GetThemeOverridesFn;
  _forClient?: ClientColorPaletteKey;
};

/**
 * ThemeProvider component to provide `styled-components` theme to the children components.
 *
 * @param {ReactNode} children - The child components to apply the theme to.
 * @return {JSX.Element} The styled theme provider component with the provided theme.
 */
export const ThemeProvider = ({
  children,
  getOverridesFn,
  _forClient = "ublo",
}: ThemeProviderProps): JSX.Element => {
  const [overrides, setOverrides] = useState<Nullable<ThemeOverride>>();

  useEffect(() => {
    if (isNullish(getOverridesFn)) return;
    /**
     * Fetches overrides asynchronously and sets the overrides data.
     *
     * @return {Promise<void>}
     */
    const fetchOverrides = async () => {
      const data = await getOverridesFn();
      setOverrides(data);
    };
    fetchOverrides();
  }, [getOverridesFn]);

  const theme = useMemo(
    () => buildTheme(overrides, _forClient),
    [overrides, _forClient]
  );

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};
