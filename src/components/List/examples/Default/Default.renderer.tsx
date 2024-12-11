import styled from "styled-components";

import { DefaultListItem } from "./Default.types";
import { useListContext } from "../../context";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableScrollView,
} from "@layouts";

export const DefaultListRenderer = () => {
  const { data } = useListContext<DefaultListItem>();

  return (
    <Container>
      <Table>
        <TableHeader sticky>
          <TableHeaderCell>Value</TableHeaderCell>
          <TableHeaderCell>Label</TableHeaderCell>
          <TableHeaderCell>Active</TableHeaderCell>
        </TableHeader>
        <TableBody style="list">
          {data.map((item, index) => {
            return (
              <TableRow style="list" key={index}>
                <TableCell padded>{item.value}</TableCell>
                <TableCell padded>{item.label}</TableCell>
                <TableCell padded>{item.active ? "Yes" : "No"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Container>
  );
};

const Container = styled(TableScrollView)`
  height: 10rem;
  max-height: 100%;
`;
