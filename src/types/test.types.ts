export type TestIdProps = {
  /**
   * A custom test id.
   *
   * Gets added to the `data-testid` attribute.
   *
   * @default undefined
   */
  testId?: string;
  /**
   * Whether to replace the default test id
   * insted of appending it at the end
   *
   * @default false
   */
  overrideTestId?: boolean;
};
