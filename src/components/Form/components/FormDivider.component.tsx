import { Divider, type DividerProps } from "@/components/Divider";
import { GridItem } from "@/layouts/GridItem";

/**
 * Renders a form divider component.
 * Essentially a standard `Divider` wrapped in a full-width `GridItem`
 *
 * @version 0.1.0
 *
 * @param {DividerProps} props - The props for the divider component.
 * @return {JSX.Element} The rendered form divider component.
 */
export const FormDivider = (props: DividerProps): JSX.Element => {
  return (
    <GridItem columnStart={1} columnEnd={-1} fill>
      <Divider {...props} testId="form-divider" overrideTestId />
    </GridItem>
  );
};
