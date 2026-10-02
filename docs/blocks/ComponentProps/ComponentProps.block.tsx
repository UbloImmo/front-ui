import { type ReactNode, useMemo } from "react";

import { ObjectDocTable } from "../ObjectDocTable";

import type { ComponentStory } from "@docs/docs.types";

type ComponentPropsBlockProps<TComponentProps extends Record<string, unknown>> =
  {
    of: ComponentStory<TComponentProps>;
  };

/**
 * Generates a table of component props from a storybook story and renders them as a table.
 * Extracts relevant information from jsdoc comments.
 *
 * @param {ComponentPropsBlockProps<TComponentProps>} props - the component props block props
 * @return {ReactNode} the table of component props
 */
const ComponentPropsBlock = <TComponentProps extends Record<string, unknown>>(
  props: ComponentPropsBlockProps<TComponentProps>
): ReactNode => {
  const propList = useMemo(() => {
    return props.of.default.component.__docgenInfo.props;
  }, [props.of.default.component]);

  return <ObjectDocTable docgen={propList} />;
};

export { ComponentPropsBlock as ComponentProps };
