import type { FC, ReactNode } from "react";
import { Text, HeaderInfo, Canvas } from ".";
import { Header } from "../containers";
import { GridLayout } from "../../src/layouts";
import { useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Markdown } from "@storybook/blocks";
import styled from "styled-components";

type DocgenPropDef<TPropName extends string, TPropType> = {
  name: TPropName;
  required: boolean;
  description?: string;
  defaultValue?: TPropType;
  value?: TPropType;
  type: {
    name: string;
    value: unknown;
  };
};

type DocgenProps<TComponentProps extends Record<string, unknown>> = {
  [TPropKey in keyof TComponentProps & string]: DocgenPropDef<
    TPropKey,
    TComponentProps[TPropKey]
  >;
};

type DocgenInfo<TComponentProps extends Record<string, unknown>> = {
  description?: string;
  displayName: string;
  props: DocgenProps<TComponentProps>;
};

type ComputedComponentMeta<TComponentProps extends Record<string, unknown>> =
  Meta<FC<TComponentProps>> & {
    component: {
      __docgenInfo: DocgenInfo<TComponentProps>;
      name: string;
    };
  };

type ComponentStory<TComponentProps extends Record<string, unknown>> = {
  default: ComputedComponentMeta<TComponentProps>;
  Default: StoryObj<Meta<FC<TComponentProps>>>;
};

type ComponentInfoProps<TComponentProps extends Record<string, unknown>> = {
  name: string;
  title?: string;
  children?: ReactNode;
  version: string;
  description?: string;
  links?: {
    code: string;
    design: string;
  };
  of: ComponentStory<TComponentProps>;
};

/**
 * Renders the component info section (header) for a given component's documentation page.
 *
 * @param {ComponentInfoProps<TComponentProps>} props - The props for the component info section.
 * @return {JSX.Element} The rendered component info section.
 */
export const ComponentInfo = <TComponentProps extends Record<string, unknown>>(
  props: ComponentInfoProps<TComponentProps>
) => {
  const name = useMemo(() => {
    return props.name ?? props.of.default.component.name;
  }, [props]);

  const { title, parent } = useMemo<{ title: string; parent?: string }>(() => {
    const rawTitle = props.title ?? props.of.default.title;
    if (!rawTitle)
      return {
        title: name,
      };
    const [title, ...rest] = rawTitle.split("/").reverse();
    const parent =
      Array.isArray(rest) && rest.length > 0 ? rest.reverse().join("/") : "";
    if (parent.length === 0)
      return {
        title,
      };

    return {
      title,
      parent,
    };
  }, [props, name]);

  const usageStr = useMemo(() => {
    return `import { ${name} } from "@ubloimmo/front-ui";`;
  }, [name]);

  const description = useMemo(() => {
    return (
      props.description ?? props.of.default.component.__docgenInfo.description
    );
  }, [props]);

  return (
    <Header>
      <HeaderInfo parent={parent} title={title}>
        {description && <Markdown>{description}</Markdown>}
        {props.children}
      </HeaderInfo>
      <GridLayout
        gap={{ column: "s-4", row: "s-2" }}
        flow="row"
        columns={["auto", "1fr"]}
        rows="unset"
        align="start"
      >
        <Text size="s" weight="semiBold" color="gray-500">
          Version
        </Text>
        <Text size="s" color="gray-800">
          <code>{props.version}</code>
        </Text>
        <Text size="s" weight="semiBold" color="gray-500">
          Usage
        </Text>
        <Text size="s" color="gray-800">
          <code>{usageStr}</code>
        </Text>
      </GridLayout>

      <CanvasContainer>
        <Canvas of={props.of.Default} horizontal inHeader />
      </CanvasContainer>
    </Header>
  );
};

const CanvasContainer = styled.div`
  width: 100%;
  flex: 1;
`;
