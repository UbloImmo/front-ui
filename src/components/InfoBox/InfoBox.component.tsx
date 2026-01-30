import { useMemo } from "react";

import { Icon } from "../Icon";
import { Text } from "../Text";
import styles from "./InfoBox.module.scss";

import { FlexColumnLayout } from "@/layouts/Flex";
import {
  useLogger,
  useTestId,
  useMergedProps,
  isNonEmptyString,
  useUikitTranslation,
  useCssClasses,
} from "@utils";

import type { InfoBoxProps, InfoBoxDefaultProps } from "./InfoBox.types";
import type { TextProps, TestIdProps } from "@types";

const defaultInfoBoxProps: InfoBoxDefaultProps = {
  icon: "Square",
  label: null,
  info: null,
};

/**
 * A small card to display contextual data.
 *
 * @version 0.1.0
 *
 * @param {InfoBoxProps & TestIdProps} props - InfoBox component props
 * @returns {JSX.Element}
 */
const InfoBox = (props: InfoBoxProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("InfoBox");
  const mergedProps = useMergedProps(defaultInfoBoxProps, props);
  const { icon, label, info } = mergedProps;
  const tl = useUikitTranslation();
  const testId = useTestId("info-box", props);
  const className = useCssClasses(styles["info-box"]);

  const stateColor = useMemo(() => {
    return info ? "gray-800" : "gray-500";
  }, [info]);

  const displayInfo = useMemo(() => {
    if (isNonEmptyString(info)) {
      return info;
    }
    return tl.status.unspecified();
  }, [info, tl.status]);

  const textProps = useMemo<TextProps>(() => {
    return {
      color: stateColor,
      weight: info ? "medium" : "regular",
    };
  }, [stateColor, info]);

  if (!props.label) {
    warn(`Missing required label, defaulting to ${defaultInfoBoxProps.label}`);
  }

  if (!props.icon) {
    warn(`Missing required icon, defaulting to ${defaultInfoBoxProps.icon}`);
  }

  return (
    <FlexColumnLayout
      className={className}
      testId={testId}
      align="center"
      gap="s-1"
      overrideTestId
    >
      <Icon name={icon} size="s-4" color={stateColor} />
      <Text
        size="m"
        weight="bold"
        color={stateColor}
        align="center"
        ellipsis
        fill
        lineClamp={3}
        styleOverride={{ flex: "unset" }}
      >
        {label}
      </Text>
      <Text
        size="m"
        {...textProps}
        testId={`${testId}-text`}
        overrideTestId
        align="center"
        ellipsis
        lineClamp={3}
        fill
        styleOverride={{ flex: "unset" }}
      >
        {displayInfo}
      </Text>
    </FlexColumnLayout>
  );
};
InfoBox.defaultProps = defaultInfoBoxProps;

export { InfoBox };
