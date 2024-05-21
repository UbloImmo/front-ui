import { useMemo, lazy, Suspense } from "react";

import {
  DefaultIconProps,
  GeneratedIcon,
  IconProps,
  type MissingIcon,
} from "./Icon.types";
import { isMissingIcon, loadIcon, useIconSize } from "./Icon.utils.tsx";

import { mergeDefaultProps, useLogger } from "@utils";

import type { LazyExoticComponent } from "react";

const defaultIconProps: DefaultIconProps = {
  size: "s-4",
  color: "primary-base",
  name: "Circle",
};

/**
 * Renders the appropriate icon component based on the provided props.
 *
 * @remarks Fetermines the icon name based on the provided name, then looks up the corresponding icon component.
 *
 * @version 0.0.1
 *
 * @param {IconProps} props - The props for the icon component.
 * @return {JSX.Element | null} The rendered icon component or null if the icon component is not found.
 */
const Icon = (props: IconProps) => {
  const { warn } = useLogger("Icon");
  // runtime variable is needed instead of state or ref
  // in order to be updated during lazy load
  // only lasts 1 render
  let iconIsMissing = false;

  if (!props.name) warn("Missing name prop");
  const { name, color, size } = useMemo(
    () => mergeDefaultProps(defaultIconProps, props),
    [props]
  );

  const IconComponent = useMemo<
    | LazyExoticComponent<GeneratedIcon | MissingIcon>
    | GeneratedIcon
    | MissingIcon
  >(() => {
    return lazy(async () => {
      const icon = await loadIcon(name, warn);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      iconIsMissing = isMissingIcon(icon.default);
      return icon;
    });
  }, [name, warn]);

  // sanitize size before passing it as svg width & height
  const parsedSize = useIconSize(size, warn);

  if (!IconComponent || iconIsMissing) {
    warn(`No icon component found for name "${name}"`);
    return null;
  }
  return (
    <Suspense fallback={null}>
      <IconComponent size={parsedSize} color={color} />
    </Suspense>
  );
};

Icon.defaultProps = defaultIconProps;

export { Icon };
