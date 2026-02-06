import { linkTo } from "@storybook/addon-links";
import { useCallback, useLayoutEffect, useMemo, useState } from "react";

import { Header } from "../../containers";
import { Canvas } from "../Canvas";
import { HeaderInfo } from "../HeaderInfo";
import { Markdown } from "../Markdown";
import { Text } from "../Typography";

import { FlexLayout, GridLayout } from "@/layouts";
import { parseJsDoc } from "@docs/docs.utils";

import { Button } from "@components";

import type { ComponentStory } from "@docs/docs.types";
import type { Nullable } from "@ubloimmo/front-util";
import type { ReactNode } from "react";

const FIGMA_TEMPLATE =
  "https://www.figma.com/file/1VG7s2BzfgmnAnaCrUCVu6?node-id=";
const GITHUB_TEMPLATE = "https://github.com/UbloImmo/front-ui/blob/main/src/";

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
  const [isPropsPage, setIsPropsPage] = useState(false);

  useLayoutEffect(() => {
    const pageSubtitle = document.querySelector(
      `main[data-layout="docs-content"] > span:first-child > h2[data-testid="heading"]:first-child`
    );

    setIsPropsPage(
      !!(pageSubtitle && pageSubtitle.textContent === "Properties")
    );
  }, []);

  const name = useMemo(() => {
    return props.name ?? props.of.default.component.name;
  }, [props]);

  const { title, parent, propsLink } = useMemo<{
    title: string;
    parent?: string;
    propsLink?: Nullable<string>;
  }>(() => {
    let rawTitle = props.title ?? props.of.default.title;

    if (!rawTitle)
      return {
        title: name,
      };

    const propsLink = rawTitle.endsWith("/Usage")
      ? rawTitle.replace("/Usage", "/Properties")
      : rawTitle.endsWith("/Stories")
        ? rawTitle.replace("/Stories", "/Properties")
        : null;

    // remove "Stories" from the title if present
    if (rawTitle && rawTitle.endsWith("/Stories")) {
      rawTitle = rawTitle.slice(0, -8);
    }
    const [title, ...rest] = rawTitle.split("/").reverse();
    const parent =
      (props.parent ?? (Array.isArray(rest) && rest.length > 0))
        ? rest.reverse().join("/")
        : "";

    if (parent.length === 0)
      return {
        title,
        propsLink,
      };

    return {
      title,
      parent,
      propsLink,
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
    //lowercase the first letter of the parent directory
    //remove the parent directory used in storybook to match the github structure
    const parentLink =
      parent &&
      parent
        .replaceAll("Components", "components")
        .replaceAll("Layouts", "layouts")
        .split("/")[0];

    return `${GITHUB_TEMPLATE}${parentLink}/${title}`;
  }, [title, parent]);

  const figmaLink = useMemo(() => {
    return `${FIGMA_TEMPLATE}${props.figmaId}`;
  }, [props]);

  const openSourceLink = useCallback(
    (link: string) => () => {
      if (link) {
        window.open(link, "_blank");
      }
    },
    []
  );

  const redirectToProps = useMemo(() => {
    if (!propsLink) return null;
    return linkTo(propsLink);
  }, [propsLink]);

  return (
    <Header>
      <FlexLayout direction="column" gap="s-2" fill>
        <HeaderInfo parent={parent} title={title}>
          {description && <Markdown>{description}</Markdown>}
          {props.children}
        </HeaderInfo>

        <FlexLayout wrap gap="s-2">
          {redirectToProps && !isPropsPage && (
            <Button
              icon="Gear"
              role="link"
              label="Properties"
              title="Check component properties"
              color="black"
              secondary
              onClick={redirectToProps}
            />
          )}
          <Button
            icon="Github"
            role="link"
            label="Source"
            title="Check source code on GitHub"
            color="black"
            secondary
            onClick={openSourceLink(githubLink)}
          />
          {props.figmaId && (
            <Button
              icon="Figma"
              role="link"
              label="Design"
              title="Check design on Figma"
              secondary
              onClick={openSourceLink(figmaLink)}
            />
          )}
        </FlexLayout>
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

      <Canvas of={props.of.Default} horizontal inHeader fillWidth />
    </Header>
  );
};
