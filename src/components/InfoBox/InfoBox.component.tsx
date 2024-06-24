import { useMemo } from "react";
import styled from "styled-components";

import { infoBoxStyles } from "./InfoBox.styles";
import { Icon } from "../Icon";
import { Text } from "../Text";

import { FlexColumnLayout } from "@layouts";
import { useLogger, useTestId, useMergedProps } from "@utils";

import type { InfoBoxProps, InfoBoxDefaultProps } from "./InfoBox.types";
import type { TestIdProps } from "@types";

const defaultInfoBoxProps: InfoBoxDefaultProps = {
  icon: "Square",
  label: null,
  info: null,
};

/**
 * A small card to display contextual data.
 *
 * @version 0.0.1
 *
 * @param {InfoBoxProps & TestIdProps} props - InfoBox component props
 * @returns {JSX.Element}
 */
const InfoBox = (props: InfoBoxProps & TestIdProps): JSX.Element => {
  const { warn } = useLogger("InfoBox");
  const mergedProps = useMergedProps(defaultInfoBoxProps, props);
  const { icon, label, info } = mergedProps;
  const testId = useTestId("info-box", props);

  const stateColor = useMemo(() => {
    return info ? "gray-800" : "gray-500";
  }, [info]);

  if (!label) {
    warn(`Missing required label, defaulting to ${defaultInfoBoxProps.label}`);
  }

  if (!icon) {
    warn(`Missing required icon, defaulting to ${defaultInfoBoxProps.icon}`);
  }

  return (
    <InfoBoxContainer testId={testId} align="center" gap="s-1" overrideTestId>
      <Icon name={icon} size="s-4" color={stateColor} />
      <Text size="m" weight="bold" color={stateColor}>
        {label}
      </Text>
      <Text size="m" weight="medium" color={stateColor}>
        {info ? info : `Non renseignée(s)`}
      </Text>
    </InfoBoxContainer>
  );
};
InfoBox.defaultProps = defaultInfoBoxProps;

export { InfoBox };

const InfoBoxContainer = styled(FlexColumnLayout)`
  ${infoBoxStyles}
`;
