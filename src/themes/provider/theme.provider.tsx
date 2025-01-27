import { isNull, isNullish } from "@ubloimmo/front-util";
import { useMemo, useState, useEffect, useRef } from "react";
import {
  ThemeProvider as StyledThemeProvider,
  useTheme as useStyledTheme,
} from "styled-components";

import { GlobalStyle } from "./GlobalStyle";
import { useLogger } from "../../utils";
import { applyFavicon, buildTheme } from "../theme";

import type { Theme, ThemeOverride, ThemeProviderProps } from "@types";
import type { GenericFn, Nullable } from "@ubloimmo/front-util";

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
  const overridesFetched = useRef(false);

  useEffect(() => {
    if (
      isNullish(getOverridesFn) ||
      !isNull(overrides) ||
      overridesFetched.current
    )
      return;
    /**
     * Fetches overrides asynchronously and sets the overrides data.
     * Sets favicon from overrides if the favicon is not already applied.
     */
    const fetchOverrides = async () => {
      debug("fetching overrides...");
      try {
        const data = await getOverridesFn();
        setOverrides(data);
        if (!isNull(data) && !noFavicon) {
          debug(`Applying favicon ${data ? "with" : "without"} overrides...`);
          const faviconApplied = applyFavicon(data, faviconLinkSelectors);
          debug(`Favicon ${faviconApplied ? "applied" : "replacement failed"}`);
        }
      } catch (e) {
        warn((e as Error).message);
        if (overrides) {
          setOverrides(null);
        }
      }

      overridesFetched.current = true;
    };
    fetchOverrides();
  }, [
    getOverridesFn,
    overrides,
    warn,
    overridesFetched,
    faviconLinkSelectors,
    debug,
    noFavicon,
  ]);

  const theme = useMemo(
    () => buildTheme(overrides, _forceTheme),
    [overrides, _forceTheme],
  );

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
