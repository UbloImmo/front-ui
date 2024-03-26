import type {
  ComponentStory,
  DocgenPropDef,
  ParsedPropInfo,
} from "@docs/docs.types";
import type { NullishPrimitives } from "@ubloimmo/front-util";
import { Text } from "@components";
import { Markdown } from ".";
import { objectEntries } from "@ubloimmo/front-util";
import { useMemo } from "react";
import { formatPropInfo } from "@docs/docs.utils";
import styled, { css } from "styled-components";
import { useStatic } from "@utils";
import type { StyleProps } from "@types";

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
      .map(formatPropInfo)
      .sort(
        (
          { name: aName, todo: aTodo, required: aRequired },
          { name: bName, todo: bTodo, required: bRequired }
        ) => {
          if (aTodo === bTodo && aRequired === bRequired)
            return aName.localeCompare(bName);
          if (aTodo && !bTodo) return 1;
          if (!aTodo && bTodo) return -1;
          if (aRequired && !bRequired) return -1;
          return 0;
        }
      );
  }, [props.of.default.component]);

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
  requiredStr,
  required,
  name,
}: ParsedPropInfo): JSX.Element => {
  const textColor = useMemo(() => (todo ? "gray-500" : "gray-800"), [todo]);

  return (
    <TableRow $todo={todo} $required={required}>
      <TableCell>
        <Text
          size="m"
          weight={todo ? "regular" : required ? "bold" : "semiBold"}
          color={todo ? "gray-400" : required ? "primary-base" : "primary-dark"}
          important
          lineThrough={todo}
        >
          {name}
        </Text>
      </TableCell>
      <TableCell>
        <Text size="s" color={textColor} important>
          <code>{type}</code>
        </Text>
      </TableCell>
      <TableCell>
        <Text size="s" color={textColor} important>
          <code>{requiredStr}</code>
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

const TableBody = styled.tbody``;

const TableRow = styled.tr<
  Partial<StyleProps<Pick<ParsedPropInfo, "todo" | "required">>>
>`
  :hover td {
    background: var(--primary-light-50);
    transition-duration: 150ms;

    &:first-child {
      background: var(--primary-light);
    }
  }
  ${({ $todo, $required }) => css`
    & > td {
      opacity: ${$todo ? 0.5 : 1};
      background: ${$todo
        ? "none"
        : $required
        ? "#fff"
        : "rgba(255, 255, 255, 0.55ss)"};
    }
  `}

  ${({ $todo }) =>
    !$todo &&
    css`
      &:hover td {
        background: var(--primary-light-50);
        transition-duration: 150ms;

        &:first-child {
          background: var(--primary-light);
        }
      }
    `}

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
  background: rgba(255, 255, 255, 0.5);
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
