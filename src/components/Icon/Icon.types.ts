import * as bootstrapIcons from "react-bootstrap-icons";
import {
  CssFr,
  CssLength,
  Enum,
  PaletteColor,
  SpacingLabel,
} from "../../types";
import type { Icon as BIcon } from "react-bootstrap-icons";

export type BootstrapIcon = BIcon;

export type BootstrapIconName = keyof typeof bootstrapIcons;

export const customIconNames: string[] = [] as const;

export type CustomIconName = Enum<typeof customIconNames>;

export type IconName = BootstrapIconName | CustomIconName;

export type IconProps = {
  size?: Exclude<CssLength, CssFr | SpacingLabel>;
  color?: PaletteColor;
  name: IconName;
};

export type DefaultIconProps = Required<IconProps>;
