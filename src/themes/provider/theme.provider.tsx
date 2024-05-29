import { isFunction, isNull, isNullish } from "@ubloimmo/front-util";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  ThemeProvider as StyledThemeProvider,
  useTheme as useStyledTheme,
} from "styled-components";

import { GlobalStyle } from "./GlobalStyle";
import { applyFavicon, buildTheme } from "../theme";

import { useLogger } from "@utils";

import type {
  GetThemeOverridesFn,
  Theme,
  ThemeOverride,
  ThemeProviderProps,
} from "@types";
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
  const { warn, debug } = useLogger("ThemeProvider");
  const [overrides, setOverrides] = useState<Nullable<ThemeOverride>>(null);
  const [overridesFetched, setOverridesFetched] = useState(false);
  const faviconApplied = useRef(false);
  const faviconApplyTryCount = useRef(0);

  useEffect(() => {
    if (isNullish(getOverridesFn) || !isNull(overrides) || overridesFetched)
      return;
    /**
     * Fetches overrides asynchronously and sets the overrides data.
     */
    const fetchOverrides = async () => {
      try {
        const data = await getOverridesFn();
        setOverrides(data);
      } catch (e) {
        warn((e as Error).message);
        if (overrides) {
          setOverrides(null);
        }
      }
      setOverridesFetched(true);
    };
    fetchOverrides();
  }, [getOverridesFn, overrides, warn, overridesFetched]);

  const theme = useMemo(
    () => buildTheme(overrides, _forceTheme),
    [overrides, _forceTheme]
  );

  const waitingForOverrides = useMemo(
    () => isFunction<GetThemeOverridesFn>(getOverridesFn) && !overridesFetched,
    [getOverridesFn, overridesFetched]
  );

  useEffect(() => {
    if (noFavicon) return;
    if (waitingForOverrides) {
      debug("Waiting for overrides...");
      return;
    }
    if (
      faviconApplied.current ||
      faviconApplyTryCount.current >= FAVICON_APPLY_TRY_COUNT_LIMIT
    ) {
      return;
    }
    debug(`Applying favicon ${overrides ? "with" : "without"} overrides...`);
    faviconApplied.current = applyFavicon(theme, faviconLinkSelectors);
    debug(
      `Favicon ${faviconApplied.current ? "applied" : "replacement failed"}`
    );
    faviconApplyTryCount.current++;
  }, [
    theme,
    noFavicon,
    faviconLinkSelectors,
    debug,
    waitingForOverrides,
    overrides,
  ]);

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
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
