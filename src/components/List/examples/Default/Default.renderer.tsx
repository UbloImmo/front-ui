import { CSSProperties } from "react";

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
} from "@/layouts/Table";
import { cssRem } from "@utils";

const containerStyle: CSSProperties = {
  height: cssRem(10),
  maxHeight: "100%",
};

export const DefaultListRenderer = () => {
  const { data } = useListContext<DefaultListItem>();

  return (
    <TableScrollView styleOverride={containerStyle}>
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
    </TableScrollView>
  );
};
