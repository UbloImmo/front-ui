import { useMemo } from "react";
import styled from "styled-components";

import { Header } from "../containers";

import { FlexLayout, GridLayout } from "@/layouts";
import { parseJsDoc } from "@docs/docs.utils";

import { Button } from "@components";

import { Text, HeaderInfo, Canvas, Markdown } from ".";

import type { ComponentStory } from "@docs/docs.types";
import type { ReactNode } from "react";

type ComponentInfoProps<TComponentProps extends Record<string, unknown>> = {
  name: string;
  title?: string;
  parent?: string;
  children?: ReactNode;
  version?: string;
  description?: string;
  figmaId?: string;
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
    let rawTitle = props.title ?? props.of.default.title;

    if (!rawTitle)
      return {
        title: name,
      };

    // remove "Stories" from the title if present
    if (rawTitle && rawTitle.endsWith("/Stories")) {
      rawTitle = rawTitle.slice(0, -8);
    }
    const [title, ...rest] = rawTitle.split("/").reverse();
    const parent =
      props.parent ?? (Array.isArray(rest) && rest.length > 0)
        ? rest.reverse().join("/")
        : "";
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
    return `import { ${title} } from "@ubloimmo/uikit";`;
  }, [title]);

  const { description, version } = useMemo(() => {
    const jsdoc =
      props.description ?? props.of.default.component.__docgenInfo.description;
    if (!jsdoc) return { description: null, version: props.version ?? null };
    const { description, version } = parseJsDoc(jsdoc);
    return {
      description,
      version: props.version ?? version,
    };
  }, [props]);

  const githubLink = useMemo(() => {
    //lowercase the first letter of the parent, needed when contains subdirectory (e.g: "Components/Input" => "components/Input")
    const parentLink =
      parent && parent?.slice(0, 1).toLowerCase() + parent?.slice(1);
    return `https://github.com/UbloImmo/front-ui/blob/main/src/${parentLink}/${title}`;
  }, [title, parent]);

  const figmaLink = useMemo(() => {
    return `https://www.figma.com/file/1VG7s2BzfgmnAnaCrUCVu6?node-id=${props.figmaId}`;
  }, [props]);

  const handleSourceLink = (link: string) => () => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  return (
    <Header>
      <HeaderInfo parent={parent} title={title}>
        {description && <Markdown>{description}</Markdown>}
        {props.children}
      </HeaderInfo>

      <FlexLayout wrap gap="s-2">
        <Button
          icon="Github"
          role="link"
          label="View code"
          title="Check source code on GitHub"
          iconPlacement="right"
          secondary
          onClick={handleSourceLink(githubLink)}
        />
        {props.figmaId && (
          <Button
            icon="Figma"
            role="link"
            label="View design"
            title="Check design on Figma"
            iconPlacement="right"
            secondary
            onClick={handleSourceLink(figmaLink)}
          />
        )}
      </FlexLayout>

      <GridLayout
        gap={{ column: "s-4", row: "s-2" }}
        flow="row"
        columns={["auto", "1fr"]}
        rows="unset"
        align="start"
      >
        {version && (
          <>
            <Text size="s" weight="medium" color="gray-500">
              Version
            </Text>
            <Text size="s" color="gray-800">
              <code>{version}</code>
            </Text>
          </>
        )}
        <Text size="s" weight="medium" color="gray-500">
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
