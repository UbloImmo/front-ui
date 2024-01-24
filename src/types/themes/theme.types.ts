import { ColorPalette, LegacyPalette } from ".";

/**
 * Styled-components theme
 *
 * @extends {@link ColorPalette}
 */
export interface Theme extends ColorPalette {
  /**
   * Legacy palette declaration, derived from new palette
   * @deprecated;
   */
  palette: LegacyPalette;
}
