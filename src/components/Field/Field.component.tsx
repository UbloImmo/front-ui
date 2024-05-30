import { useLogger, useTestId, useMergedProps } from "@utils";

import type { FieldProps, FieldDefaultProps } from "./Field.types";
import type { TestIdProps } from "@types";

const defaultFieldProps: FieldDefaultProps = {
  // TODO
};

const Field = (props: FieldProps & TestIdProps) => {
  const { log } = useLogger("Field");
  const mergedProps = useMergedProps(props, defaultFieldProps);
  const testId = useTestId("field", props);
  // TODO

  log(mergedProps);

  return <div data-testid={testId}>Field TODO</div>;
};
Field.defaultProps = defaultFieldProps;

export { Field };
