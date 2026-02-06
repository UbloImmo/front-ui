import { useMemo, Suspense, type LazyExoticComponent } from "react";

// import * as allIcons from "./__generated__";
import * as lazyIcons from "./__generated__/index.lazy.ts";
import styles from "./Icon.module.scss";
import {
  DefaultIconProps,
  GeneratedIcon,
  IconProps,
  type MissingIcon,
} from "./Icon.types";
import { isGeneratedIcon, useIconSize } from "./Icon.utils.tsx";

import { cssClasses, cssVariables, mergeDefaultProps, useLogger } from "@utils";

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
 * @version 0.1.0
 *
 * @param {IconProps} props - The props for the icon component.
 * @return {JSX.Element} The rendered icon component or an empty fallback div if the icon component is not found.
 */
const Icon = (props: IconProps): JSX.Element => {
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

  const Fallback = useMemo(() => {
    const className = cssClasses(styles["icon-fallback"]);
    const style = cssVariables({ size: parsedSize });
    return (
      <div className={className} style={style} data-testid="icon-fallback" />
    );
  }, [parsedSize]);

  if (!isGeneratedIcon(IconComponent)) {
    warn(`No icon component found for name "${name}"`);
    return Fallback;
  }
  return (
    <Suspense key={`icon-suspense-${name}`} fallback={Fallback}>
      <IconComponent key={`icon-${name}`} size={parsedSize} color={color} />
    </Suspense>
  );
};

Icon.defaultProps = defaultIconProps;

export { Icon };
