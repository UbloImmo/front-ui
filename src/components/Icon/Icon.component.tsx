import { useMemo, Suspense, type LazyExoticComponent } from "react";
import styled from "styled-components";

import * as lazyIcons from "./__generated__/index.lazy.ts";
import { iconFallbackStyles } from "./Icon.styles.ts";
import {
  DefaultIconProps,
  GeneratedIcon,
  IconFallbackStyleProps,
  IconProps,
  type MissingIcon,
} from "./Icon.types";
import { isGeneratedIcon, useIconSize } from "./Icon.utils.tsx";

import { mergeDefaultProps, useLogger } from "@utils";

import type { Nullable } from "@ubloimmo/front-util";

const defaultIconProps: DefaultIconProps = {
  size: "s-4",
  color: "primary-base",
  name: "Circle",
};

/**
 * Renders the appropriate icon component based on the provided props.
 *
 * @remarks Determines the icon name based on the provided name, then looks up the corresponding icon component.
 *
 * @version 0.0.3
 *
 * @param {IconProps} props - The props for the icon component.
 * @return {JSX.Element | null} The rendered icon component or null if the icon component is not found.
 */
const Icon = (props: IconProps) => {
  const { warn } = useLogger("Icon");

  if (!props.name) warn("Missing name prop");
  const { name, color, size } = useMemo(
    () => mergeDefaultProps(defaultIconProps, props),
    [props]
  );

  const IconComponent = useMemo<
    Nullable<
      LazyExoticComponent<GeneratedIcon> | LazyExoticComponent<MissingIcon>
    >
  >(() => {
    return lazyIcons[name] ?? null;
  }, [name]);

  // sanitize size before passing it as svg width & height
  const parsedSize = useIconSize(size, warn);

  if (!isGeneratedIcon(IconComponent)) {
    warn(`No icon component found for name "${name}"`);
    return <IconFallback data-testid="icon-fallback" $size={parsedSize} />;
  }
  return (
    <Suspense
      key={`icon-suspense-${name}`}
      fallback={<IconFallback data-testid="icon-fallback" $size={parsedSize} />}
    >
      <IconComponent key={`icon-${name}`} size={parsedSize} color={color} />
    </Suspense>
  );
};

Icon.defaultProps = defaultIconProps;

export { Icon };

const IconFallback = styled.div<IconFallbackStyleProps>`
  ${iconFallbackStyles}
`;
