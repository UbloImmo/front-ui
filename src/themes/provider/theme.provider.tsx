import { isNull, isNullish } from "@ubloimmo/front-util";
import {
  useMemo,
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";

import { GlobalStyle } from "./GlobalStyle";
import { useLogger } from "../../utils";
import { applyFavicon, buildTheme } from "../theme";

import type { Theme, ThemeOverride, ThemeProviderProps } from "@types";
import type { Nullable } from "@ubloimmo/front-util";

type ThemeStoreParams = Pick<
  ThemeProviderProps,
  "getOverridesFn" | "_forceTheme" | "noFavicon" | "faviconLinkSelectors"
>;

/**
 * Loads & returns a reference to the app's global theme.
 *
 * @param {ThemeStoreParams} options - Theming options.
 * @returns {Theme} The loaded & possibly overridden theme.
 */
function useThemeStore({
  getOverridesFn,
  _forceTheme = "primary",
  noFavicon = false,
  faviconLinkSelectors,
}: ThemeStoreParams): Theme {
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
  }, [getOverridesFn, overrides, faviconLinkSelectors, debug, noFavicon, warn]);

  return useMemo<Theme>(
    () => buildTheme(overrides, _forceTheme),
    [overrides, _forceTheme]
  );
}

/**
 * Global context that holds the current theme
 */
const THEME_CONTEXT = createContext<Theme>(buildTheme(null, "primary"));

/**
 * ThemeProvider component to provide theme context to the children components.
 *
 * @param {ThemeProviderProps} props - The provider's props
 * @return {JSX.Element} The styled theme provider component with the provided theme.
 */
export const ThemeProvider = ({
  children,
  lightDarkSupport,
  ...themeProps
}: ThemeProviderProps): JSX.Element => {
  const theme = useThemeStore(themeProps);

  return (
    <THEME_CONTEXT.Provider value={theme}>
      <GlobalStyle theme={theme} lightDarkSupport={lightDarkSupport} />
      {children}
    </THEME_CONTEXT.Provider>
  );
};

/**
 * Returns a reference to the app's current theme
 *
 * @returns {Theme}
 */
export const useTheme = (): Theme => useContext(THEME_CONTEXT);
