import { transformObject } from "@ubloimmo/front-util";
import { useMemo } from "react";
import { Toaster as Sonner } from "sonner";

import {
  type ToasterProps,
  type ToasterDefaultProps,
  ToasterIconOverrides,
} from "./Toaster.types";
import { Icon } from "../Icon";
import { toasterIcons, useToasterClassNames } from "./Toaster.styles";
import { Loading } from "../Loading";

import { parseFixedLengthToPx } from "@/sizes/size.utils";
import { useLogger, useMergedProps, useStatic } from "@utils";

import type { TestIdProps } from "@types";

const defaultToasterProps: ToasterDefaultProps = {
  theme: "system",
  position: "bottom-center",
  visibleToasts: 3,
  duration: 5000,
  richColors: false,
  offset: "s-3",
  mobileOffset: "s-3",
  invert: false,
  expand: false,
  closeButton: true,
  iconOverrides: {},
};

/**
 * Bakes 🍞 toast 🍞 notifications.
 *
 * Built with [Sonner](https://sonner.emilkowal.ski/).
 *
 * @version 0.1.0
 *
 * @param {ToasterProps & TestIdProps} props - Toaster component props
 * @returns {JSX.Element}
 */
const Toaster = (props: ToasterProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("Toaster");
  const {
    theme,
    position,
    visibleToasts,
    duration,
    richColors,
    offset,
    mobileOffset,
    invert,
    expand,
    closeButton,
    iconOverrides,
  } = useMergedProps(defaultToasterProps, props);

  const offsets = useMemo(
    () =>
      transformObject({ offset, mobileOffset }, (length) =>
        parseFixedLengthToPx(length, warn)
      ),
    [offset, mobileOffset, warn]
  );

  const icons = useStatic<ToasterIconOverrides>({
    ...transformObject(toasterIcons, (name) => <Icon name={name} size="s-4" />),
    loading: <Loading animation="Ripple" size="s-4" color="pending-base" />,
    ...iconOverrides,
  });
  const classNames = useToasterClassNames();

  return (
    <Sonner
      theme={theme}
      position={position}
      visibleToasts={visibleToasts}
      duration={duration}
      richColors={richColors}
      offset={offsets.offset}
      mobileOffset={offsets.mobileOffset}
      invert={invert}
      expand={expand}
      closeButton={closeButton}
      icons={icons}
      toastOptions={{ classNames }}
    />
  );
};
Toaster.defaultProps = defaultToasterProps;

export { Toaster };
