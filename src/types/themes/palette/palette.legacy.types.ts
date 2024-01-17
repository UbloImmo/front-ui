export interface LegacyLightAndDarkPalette {
  dark: string;
  light: string;
}
export interface LegacyBasePalette {
  base: string;
}

export interface LegacyFullPalette
  extends LegacyLightAndDarkPalette,
    LegacyBasePalette {}

export interface LegacyEmphasisPalette {
  inactive: string;
  disabled: string;
  mediumEmphasis: string;
  highEmphasis: string;
}

export interface LegacyDegreesPalette {
  _50: string;
  _100: string;
  _200: string;
  _300: string;
}

export interface LegacyShadows {
  high: string;
  card: string;
  input: string;
  color: string;
  button: string;
  flat: string;
  bottomDivider: string;
  topDivider: string;
  carousselCard: string;
}

export interface LegacyPalette {
  [k: string]:
    | LegacyFullPalette
    | LegacyLightAndDarkPalette
    | LegacyBasePalette
    | LegacyEmphasisPalette
    | LegacyDegreesPalette
    | LegacyShadows;
  primary: LegacyFullPalette;
  error: LegacyFullPalette;
  warning: LegacyFullPalette;
  pending: LegacyFullPalette;
  success: LegacyFullPalette;
  info: LegacyFullPalette;
  background: LegacyLightAndDarkPalette;
  white: LegacyBasePalette;
  black: LegacyEmphasisPalette;
  gray: LegacyDegreesPalette;
  shadows: LegacyShadows;
}
