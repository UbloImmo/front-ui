import type { ComponentStory, DocgenPropDef } from "@docs/docs.types";
import type { NullishPrimitives } from "@ubloimmo/front-util";
import { Text } from "@components";
import { Markdown } from ".";
import { objectEntries } from "@ubloimmo/front-util";
import { useMemo } from "react";
import { formatPropInfo } from "@docs/docs.utils";
import styled from "styled-components";
import { useStatic } from "@utils";

type ComponentPropsBlockProps<TComponentProps extends Record<string, unknown>> =
  {
    of: ComponentStory<TComponentProps>;
  };

type ComponentPropInfo = DocgenPropDef<NullishPrimitives> & {
  name: string;
};

/**
 * Generates a table of component props from a storybook story and renders them as a table.
 * Extracts relevant information from jsdoc comments.
 *
 * @param {ComponentPropsBlockProps<TComponentProps>} props - the component props block props
 * @return {JSX.Element} the table of component props
 */
const ComponentPropsBlock = <TComponentProps extends Record<string, unknown>>(
  props: ComponentPropsBlockProps<TComponentProps>
): JSX.Element => {
  const propList = useMemo(() => {
    return objectEntries(props.of.default.component.__docgenInfo.props)
      .map(
        ([name, propInfo]) =>
          ({
            ...propInfo,
            name,
          } as ComponentPropInfo)
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [props.of.default.component]);

  return (
    <Table>
      <ComponentPropsTableHeader />
      <TableBody>
        {propList.map((prop, index) => (
          <ComponentPropRow
            componentProp={prop}
            key={`${prop.name}-${index}`}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export { ComponentPropsBlock as ComponentProps };

/**
 * Render the table header in {@link ComponentPropsBlock}
 *
 * @return {JSX.Element} Table header component
 */
const ComponentPropsTableHeader = (): JSX.Element => {
  const columns = useStatic([
    "name",
    "type",
    "required",
    "default",
    "description",
  ]);

  return (
    <TableHeader>
      <TableRow>
        {columns.map((column, index) => (
          <TableHeaderCell key={`${column}-${index}`}>
            <Text size="s" weight="semiBold" color="gray-800" important>
              {column}
            </Text>
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
  );
};

type ComponentPropRowProps = {
  componentProp: ComponentPropInfo;
};

/**
 * Renders a table row from a component's prop's computed info.
 *
 * @param {ComponentPropRowProps} props - The row's own props.
 * @return {JSX.Element} The rendered table row.
 */
const ComponentPropRow = ({
  componentProp,
}: ComponentPropRowProps): JSX.Element => {
  console.log(componentProp);
  const { defaultValue, description, todo, type, required, name } =
    useMemo(() => {
      return formatPropInfo(componentProp);
    }, [componentProp]);

  const textColor = useMemo(() => (todo ? "gray-500" : "gray-800"), [todo]);

  return (
    <TableRow>
      <TableCell>
        <Text
          size="s"
          weight={todo ? "regular" : "bold"}
          color={todo ? "gray-400" : "primary-dark"}
          important
          lineThrough={todo}
        >
          <code>{name}</code>
        </Text>
      </TableCell>
      <TableCell>
        <Text size="s" color={textColor} important>
          <code>{type}</code>
        </Text>
      </TableCell>
      <TableCell>
        <Text size="s" color={textColor} important>
          <code>{required}</code>
        </Text>
      </TableCell>
      <TableCell>
        <Text size="s" color={textColor} important>
          <code>{defaultValue}</code>
        </Text>
      </TableCell>
      <TableCell>
        <Text size="s" color={textColor} important>
          <Markdown>{description}</Markdown>
        </Text>
      </TableCell>
    </TableRow>
  );
};

const Table = styled.table`
  display: block;
  max-width: 100%;
  width: max-content;
  margin-top: var(--s-6) !important;
  margin-bottom: var(--s-8) !important;
  border-radius: var(--s-2);
  background: var(--gray-50) !important;
  padding: var(--s-1) var(--s-1) 0 !important;
  border-collapse: separate !important;
  border-spacing: var(--s-1) var(--s-2) !important;
  border: none !important;
  overflow-y: hidden !important;
  overflow-x: auto !important;
`;

const TableBody = styled.tbody`
  tr:hover td {
    background: var(--primary-light-50);
    transition-duration: 150ms;
  }
`;

const TableRow = styled.tr`
  background: none !important;
`;
const TableHeader = styled.thead`
  border-top-left-radius: var(--s-2);
  border-top-right-radius: var(--s-2);
  overflow-y: hidden !important;
  background: var(--gray-50) !important;
  border: none !important;
`;

const TableHeaderCell = styled.th`
  text-transform: capitalize;
  padding: 0 var(--s-2) !important;
  text-align: left;
  background: none !important;
  border: none !important;
  display: table-cell;
`;

const TableCell = styled.td`
  background: #fff;
  border-radius: var(--s-1);
  border: none !important;
  padding: var(--s-2) !important;
  display: table-cell;
  width: max-content;
  vertical-align: top;
  transition: background 300ms ease-out 0s;

  span:has(*) {
    margin: 0 !important;
  }
  // normalize stacked margins
  span:not(:has(*:not(code))) {
    margin: var(--s-1) 0 !important;
  }
`;
