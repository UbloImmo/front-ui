export type StylePropName<TPropName extends string> = `$${TPropName}`;

export type StyleProps<TProps extends Record<string, unknown>> = {
  [TPropName in keyof TProps &
    string as StylePropName<TPropName>]: TProps[TPropName];
};
