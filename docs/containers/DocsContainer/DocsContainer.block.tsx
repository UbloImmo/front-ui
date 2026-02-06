import { DocsContainer as SBDocsContainer } from "@storybook/addon-docs/blocks";
import { isString, type Optional } from "@ubloimmo/front-util";

import { StorybookThemeProvider } from "../StoryDecorator";
import styles from "./DocsContainer.module.scss";

import { getDynamicThemeSlugs } from "@/themes";
import { useCssClasses } from "@utils";

import type { DynamicColorPaletteKey } from "@types";

type DocsContainerProps = Parameters<typeof SBDocsContainer>[0];

/**
 * Wraps each MDX documentation with a dynamic theme provider.
 *
 * @param {Object} props - The component props.
 * @param {ReactNode} props.children - The child components.
 * @param {Object} props.context - The context object.
 * @param {Object} props.theme - The theme object.
 * @return {JSX.Element} The rendered component.
 */
export const DocsContainer = ({
  children,
  context,
  theme,
}: DocsContainerProps): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const storyContext = context as any;
  const themeClient: Optional<DynamicColorPaletteKey> =
    storyContext?.store?.globals?.globals?.theme;
  const clientSlugs = getDynamicThemeSlugs();
  const client: DynamicColorPaletteKey =
    isString(themeClient) && clientSlugs.includes(themeClient)
      ? themeClient
      : "primary";

  const className = useCssClasses(styles["docs-wrapper"], "sb-unstyled");

  return (
    <StorybookThemeProvider theme={{ client }}>
      <div className={className}>
        <SBDocsContainer context={context} theme={theme}>
          {children}
        </SBDocsContainer>
      </div>
    </StorybookThemeProvider>
  );
};
