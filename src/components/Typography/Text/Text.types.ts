import { TextVariant } from "src";
import { TypographyProps } from "../Typography.types";

export interface TextProps extends TypographyProps {
  variant?: TextVariant;
}
