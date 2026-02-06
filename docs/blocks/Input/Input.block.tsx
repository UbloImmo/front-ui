import { type DetailedHTMLProps, InputHTMLAttributes } from "react";

import { Checkbox } from "@components";

export const Input = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => {
  if (props.type === "checkbox") {
    return <Checkbox active={props.checked} disabled={props.disabled} />;
  }

  return <input {...props} />;
};
