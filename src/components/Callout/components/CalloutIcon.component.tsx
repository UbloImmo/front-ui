import { isNull } from "lodash";
import { useMemo } from "react";

import { computeCalloutIconNames } from "../Callout.styles";

import { Icon } from "@/components/Icon";
import { isGrayColor } from "@utils";

import type { CalloutDefaultProps } from "../Callout.types";
import type { PaletteColor, SpacingLabel } from "@types";

export const CalloutIcon = ({ size, color, icon }: CalloutDefaultProps) => {
  const iconSize = useMemo<SpacingLabel>(
    () => (size === "l" ? "s-6" : "s-4"),
    [size]
  );
  const iconColor = useMemo<PaletteColor>(
    () => (isGrayColor(color) ? "gray-600" : `${color}-base`),
    [color]
  );

  const iconName = useMemo(() => {
    if (isNull(icon)) return null;
    return icon === "auto" ? computeCalloutIconNames[color] : icon;
  }, [icon, color]);

  return (
    <Icon name={iconName ?? undefined} color={iconColor} size={iconSize} />
  );
};
