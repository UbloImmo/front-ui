import { useMemo } from "react";

import { defaultTypographyProps, useTypographyStyles } from "../../typography";

import { useHtmlAttribute, useTestId } from "@utils";

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
  const testId = useTestId("heading", props);
  const id = useHtmlAttribute(props.id);
  const title = useHtmlAttribute(props.title);
  const typographyStyles = useTypographyStyles(props, true);

  const sharedProperties = useMemo(() => {
    return {
      ...typographyStyles,
      id,
      title,
      "data-testid": testId,
      children: props.children,
    };
  }, [id, props.children, testId, title, typographyStyles]);

  switch (props.size) {
    case "h2":
      return <h2 {...sharedProperties} />;
    case "h3":
      return <h3 {...sharedProperties} />;
    case "h4":
      return <h4 {...sharedProperties} />;
    default:
      return <h1 {...sharedProperties} />;
  }
};

Heading.defaultProps = defaultHeadingProps;

export { Heading };
