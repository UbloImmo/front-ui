import { useMemo } from "react";

import { defaultTypographyProps, useTypographyStyles } from "../../typography";

import { useHtmlAttribute, useLogger, useMergedProps, useTestId } from "@utils";

import type { HeadingProps, TestIdProps } from "@types";

const defaultHeadingProps: Required<HeadingProps> = {
  ...defaultTypographyProps,
  size: "h1",
} as const;

/**
 * Customizable, accessible heading.
 *
 * @version 0.1.0
 *
 * @param {WithTestId<HeadingProps>} props - Heading component props
 * @return {JSX.Element} - The styled heading component
 */
const Heading = (props: HeadingProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultHeadingProps, props);
  const testId = useTestId("heading", props);
  const { error } = useLogger("Heading");
  const id = useHtmlAttribute(mergedProps.id);
  const title = useHtmlAttribute(mergedProps.title);
  const typographyStyles = useTypographyStyles(mergedProps, true);

  const sharedProperties = useMemo(() => {
    return {
      ...typographyStyles,
      id,
      title,
      "data-testid": testId,
      children: mergedProps.children,
    };
  }, [id, mergedProps.children, testId, title, typographyStyles]);

  switch (mergedProps.size) {
    case "h2":
      return <h2 {...sharedProperties} />;
    case "h3":
      return <h3 {...sharedProperties} />;
    case "h4":
      return <h4 {...sharedProperties} />;
    default: {
      if (mergedProps.size !== "h1")
        error(
          `Invalid size supplied. Expected one of h1, h2, h3, h4. Got ${mergedProps.size as unknown}.`
        );
      return <h1 {...sharedProperties} />;
    }
  }
};

Heading.__DEFAULT_PROPS = defaultHeadingProps;

export { Heading };
