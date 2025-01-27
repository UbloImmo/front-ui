import { Source } from "@storybook/blocks";
import { objectEntries } from "@ubloimmo/front-util";
import { useMemo } from "react";

import { Markdown } from "./Markdown";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "./Table";

import { formatPropInfo } from "@docs/docs.utils";
import { useStatic } from "@utils";

import { Text } from "@components";

import type {
  DocgenPropDef,
  DocgenProps,
  ParsedPropInfo,
} from "@docs/docs.types";
import type { NullishPrimitives } from "@ubloimmo/front-util";

type ComponentPropInfo = DocgenPropDef<NullishPrimitives> & {
  name: string;
};

type DocTableProps<TObj extends Record<string, unknown>> = {
  docgen: DocgenProps<TObj>;
};

/**
 * Generates a table of component props from a storybook story and renders them as a table.
 * Extracts relevant information from jsdoc comments.
 *
 * @param {ComponentPropsBlockProps<TComponentProps>} props - the component props block props
 * @return {JSX.Element} the table of component props
 */
const DocTable = <TObj extends Record<string, unknown>>(
  props: DocTableProps<TObj>,
): JSX.Element => {
  const propList = useMemo(() => {
    return objectEntries(props?.docgen ?? {})
      .map(
        ([name, propInfo]) =>
          ({
            ...propInfo,
            name,
          }) as ComponentPropInfo,
      )
      .map(formatPropInfo)
      .sort(
        (
          { name: aName, todo: aTodo, required: aRequired },
          { name: bName, todo: bTodo, required: bRequired },
        ) => {
          if (aTodo === bTodo && aRequired === bRequired)
            return aName.localeCompare(bName);
          if (aTodo && !bTodo) return 1;
          if (!aTodo && bTodo) return -1;
          if (aRequired && !bRequired) return -1;
          return 0;
        },
      );
  }, [props]);

  return (
    <Table>
      <ComponentPropsTableHeader />
      <TableBody>
        {propList.map((propInfo, index) => (
          <ComponentPropRow {...propInfo} key={`${propInfo.name}-${index}`} />
        ))}
      </TableBody>
    </Table>
  );
};

export { DocTable as ObjectDocTable };

/**
 * Render the table header in {@link ComponentPropsBlock}
 *
 * @return {JSX.Element} Table header component
 */
const ComponentPropsTableHeader = (): JSX.Element => {
  const columns = useStatic(["name", "type", "default", "description"]);

  return (
    <TableHeader>
      <TableRow>
        {columns.map((column, index) => (
          <TableHeaderCell key={`${column}-${index}`}>
            <Text size="s" weight="medium" color="gray-800" important>
              {column}
            </Text>
          </TableHeaderCell>
        ))}
      </TableRow>
    </TableHeader>
  );
};

/**
 * Renders a table row from a component's prop's computed info.
 *
 * @param {ParsedPropInfo} props - The row's own props.
 * @return {JSX.Element} The rendered table row.
 */
const ComponentPropRow = ({
  defaultValue,
  description,
  todo,
  type,
  required,
  name,
}: ParsedPropInfo): JSX.Element => {
  const textColor = useMemo(() => (todo ? "gray-400" : "gray-800"), [todo]);
  return (
    <TableRow $todo={todo} $required={required}>
      <TableCell>
        <Text
          size="m"
          weight={todo ? "regular" : required ? "bold" : "medium"}
          color={todo ? "gray-400" : required ? "primary-base" : "primary-dark"}
          important
          lineThrough={todo}
        >
          {name}
        </Text>
      </TableCell>
      <TableCell>
        <Source code={type} />
      </TableCell>
      <TableCell>
        <Text size="m" color={textColor} important>
          <code>{defaultValue}</code>
        </Text>
      </TableCell>
      <TableCell>
        <Text size="m" color={textColor} important>
          <Markdown>{description}</Markdown>
        </Text>
      </TableCell>
    </TableRow>
  );
};
