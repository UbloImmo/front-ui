import { ColorPalette, LegacyPalette, OrganizationData } from ".";

/**
 * Styled-components theme
 *
 * Includes all properties of {@link ColorPalette} and keeps {@link LegacyPalette} under the `palette` key.
 *
 * @extends {@link ColorPalette}
 */
export interface Theme extends ColorPalette {
  /**
   * Legacy palette declaration, derived from new palette
   * @deprecated;
   */
  palette: LegacyPalette;
  organization: OrganizationData;
}
