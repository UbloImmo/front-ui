import styled from "styled-components";

import { energyLabelStyle } from "./EnergyLabel.styles";
import { Text } from "../Text";

import { StyleProps, type TestIdProps } from "@types";
import { useLogger, useTestId, useMergedProps, useStyleProps } from "@utils";

import type {
  EnergyLabelProps,
  EnergyLabelDefaultProps,
} from "./EnergyLabel.types";

const defaultEnergyLabelProps: EnergyLabelDefaultProps = {
  type: "DPE",
  value: null,
  state: "inactive",
};

/**
 * Renders a EnergyLabel component, with required Value, Type and State.
 *
 * @version 0.0.1
 *
 * @param {EnergyLabelProps & TestIdProps} props - EnergyLabel component props
 * @returns {JSX.Element}
 */
const EnergyLabel = (props: EnergyLabelProps & TestIdProps): JSX.Element => {
  const { log } = useLogger("EnergyLabel");
  const mergedProps = useMergedProps(defaultEnergyLabelProps, props);
  const styledProps = useStyleProps(mergedProps);
  const testId = useTestId("energy-label", props);

  log(mergedProps);

  return (
    <EnergyLabelContainer data-testid={testId} {...styledProps} role="status">
      <Text weight="bold" testId="energy-label-value" overrideTestId>
        {mergedProps.value || "-"}
      </Text>
    </EnergyLabelContainer>
  );
};

EnergyLabel.defaultProps = defaultEnergyLabelProps;
export { EnergyLabel };

const EnergyLabelContainer = styled.div<StyleProps<EnergyLabelProps>>`
  ${energyLabelStyle}
`;
