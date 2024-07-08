import type { CommonInputStyleProps, InputProps } from "../Input.types";
import type { StyleProps } from "@types";

export type TextAreaInputProps = {
  resize?: boolean;
} & InputProps<"textarea">;

export type TextAreaInputDefaultProps = Required<TextAreaInputProps>;

export type TextAreaInputStyleProps = CommonInputStyleProps &
  StyleProps<Pick<TextAreaInputProps, "resize">>;
