import { Divider, type DividerProps } from "@/components/Divider";
import { GridItem } from "@layouts";

/**
 * Renders a form divider component.
 * Essentially a standard `Divider` wrapped in a full-width `GridItem`
 *
 * @param {DividerProps} props - The props for the divider component.
 * @return {JSX.Element} The rendered form divider component.
 */
export const FormDivider = (props: DividerProps) => {
  return (
    <GridItem columnStart={1} columnEnd={-1} fill>
      <Divider {...props} testId="form-divider" overrideTestId />
    </GridItem>
  );
};
