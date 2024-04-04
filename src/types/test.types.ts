export type TestIdProps = {
  /**
   * A custom test id.
   *
   * Gets added to the `data-testid` attribute.
   *
   * @default undefined
   */
  testId?: string;
};

export type WithTestId<TProps extends Record<string, unknown>> = TProps &
  TestIdProps;
