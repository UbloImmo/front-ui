import { isNullish } from "@ubloimmo/front-util";
import { ReactNode, useMemo, useState, useEffect } from "react";
import {
  ThemeProvider as StyledThemeProvider,
  useTheme as useStyledTheme,
} from "styled-components";

import { GlobalStyle } from "./globalStyle";
import { buildTheme } from "../theme";

import type {
  DynamicColorPaletteKey,
  GetThemeOverridesFn,
  Theme,
  ThemeOverride,
} from "@types";
import type { GenericFn, Nullable } from "@ubloimmo/front-util";

type ThemeProviderProps = {
  children: ReactNode;
  getOverridesFn?: GetThemeOverridesFn;
  _forceTheme?: DynamicColorPaletteKey;
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
  _forceTheme = "primary",
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
    () => buildTheme(overrides, _forceTheme),
    [overrides, _forceTheme]
  );

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledThemeProvider>
  );
};

/**
 * A re-export of `styled-components`' `useTheme` hook , typed to return {@link Theme}
 *
 * @returns {Theme}
 */
export const useTheme = useStyledTheme as GenericFn<[], Theme>;
