import { useEnergyLabelStyles } from "./EnergyLabel.styles";
import { Text } from "../Text";

import { type TestIdProps } from "@types";
import { useLogger, useTestId, useMergedProps } from "@utils";

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
 * Renders a EnergyLabel component, with required Type, and optional Value and State.
 *
 * @version 0.1.1
 *
 * @param {EnergyLabelProps & TestIdProps} props - EnergyLabel component props
 * @returns {JSX.Element}
 */
const EnergyLabel = (props: EnergyLabelProps & TestIdProps): JSX.Element => {
  const { log } = useLogger("EnergyLabel", { hideLogs: true });
  const mergedProps = useMergedProps(defaultEnergyLabelProps, props);
  const testId = useTestId("energy-label", props);

  log(mergedProps);

  const { classNames, style } = useEnergyLabelStyles(mergedProps);

  return (
    <div
      className={classNames.box}
      data-testid={testId}
      role="status"
      style={style}
    >
      <Text
        className={classNames.label}
        weight="bold"
        align="center"
        testId="energy-label-value"
        overrideTestId
      >
        {mergedProps.value || "-"}
      </Text>
    </div>
  );
};

EnergyLabel.__DEFAULT_PROPS = defaultEnergyLabelProps;
export { EnergyLabel };
