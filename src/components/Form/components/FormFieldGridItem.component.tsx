import styles from "../Form.module.scss";

import { GridItem, GridItemProps } from "@/layouts/GridItem";
import { TestIdProps } from "@types";
import { isCssLengthUsage, useCssClasses, useCssVariables } from "@utils";

import type { BuiltFormFieldLayoutWidthProps } from "../Form.types";

/**
 * A customized {@link GridItem} with an additional `fixedWidth` property
 *
 * @version 0.1.0
 *
 * @param {BuiltFormFieldLayoutWidthProps & GridItemProps & TestIdProps} props - Component properties
 * @returns Rendered component
 */
export const FormFieldGridItem = ({
  fixedWidth,
  maxWidth,
  minWidth,
  children,
  ...props
}: BuiltFormFieldLayoutWidthProps & GridItemProps & TestIdProps) => {
  const className = useCssClasses(styles["form-field-grid-item"], [
    styles["fixed-width"],
    isCssLengthUsage(fixedWidth),
  ]);
  const style = useCssVariables({
    "fixed-width": fixedWidth,
    "min-width": maxWidth,
    "max-width": minWidth,
  });

  return (
    <GridItem className={className} styleOverride={style} {...props}>
      {children}
    </GridItem>
  );
};
