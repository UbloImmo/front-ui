import { useLogger, useTestId, useMergedProps } from "@utils";

import type { FormProps, FormDefaultProps } from "./Form.types";
import type { TestIdProps } from "@types";

const defaultFormProps: FormDefaultProps = {
  // TODO
};

/**
 * Form component
 *
 * TODO description
 *
 * @version 0.0.1
 *
 * @param {FormProps & TestIdProps} props - Form component props
 * @returns {JSX.Element}
 */
const Form = (props: FormProps & TestIdProps): JSX.Element => {
  const { log } = useLogger("Form");
  const mergedProps = useMergedProps(defaultFormProps, props);
  const testId = useTestId("form", props);
  // TODO

  log(mergedProps);

  return <div data-testid={testId}>Form TODO</div>;
};
Form.defaultProps = defaultFormProps;

export { Form };
