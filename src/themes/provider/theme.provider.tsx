import { isNull, isNullish } from "@ubloimmo/front-util";
import { useMemo, useState, useEffect, useLayoutEffect, useRef } from "react";
import {
  ThemeProvider as StyledThemeProvider,
  useTheme as useStyledTheme,
} from "styled-components";

import { GlobalStyle } from "./globalStyle";
import { applyFavicon, buildTheme } from "../theme";

import type { Theme, ThemeOverride, ThemeProviderProps } from "@types";
import type { GenericFn, Nullable } from "@ubloimmo/front-util";

const FAVICON_APPLY_TRY_COUNT_LIMIT = 3;

/**
 * ThemeProvider component to provide `styled-components` theme to the children components.
 *
 * @param {ThemeProviderProps} props - The provider's props
 * @return {JSX.Element} The styled theme provider component with the provided theme.
 */
export const ThemeProvider = ({
  children,
  getOverridesFn,
  _forceTheme = "primary",
  noFavicon = false,
  faviconLinkSelectors,
}: ThemeProviderProps): JSX.Element => {
  const [overrides, setOverrides] = useState<Nullable<ThemeOverride>>(null);
  const faviconApplied = useRef(false);
  const faviconApplyTryCount = useRef(0);

  useEffect(() => {
    if (isNullish(getOverridesFn) || !isNull(overrides)) return;
    /**
     * Fetches overrides asynchronously and sets the overrides data.
     */
    const fetchOverrides = async () => {
      const data = await getOverridesFn();
      setOverrides(data);
    };
    fetchOverrides();
  }, [getOverridesFn, overrides]);

  const theme = useMemo(
    () => buildTheme(overrides, _forceTheme),
    [overrides, _forceTheme]
  );

  useLayoutEffect(() => {
    if (
      noFavicon ||
      faviconApplied.current ||
      FAVICON_APPLY_TRY_COUNT_LIMIT >= FAVICON_APPLY_TRY_COUNT_LIMIT
    ) {
      return;
    }
    faviconApplied.current = applyFavicon(theme, faviconLinkSelectors);
    faviconApplyTryCount.current++;
  }, [theme, noFavicon, faviconLinkSelectors]);

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
