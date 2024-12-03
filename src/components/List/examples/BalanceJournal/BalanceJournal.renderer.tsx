import { useMemo } from "react";

import {
  TransactionItem,
  type BalanceJournalRowProps,
} from "./BalanceJournal.types";
import { useListContext } from "../../context";

import { Icon, type IconName } from "@/components/Icon";
import { normalizeToDateStr } from "@/components/Input";
import { Text } from "@/components/Text";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@layouts";

const BalanceJournalRow = ({ item }: BalanceJournalRowProps) => {
  const date = useMemo(() => normalizeToDateStr(item.date), [item.date]);

  const icon = useMemo<IconName>(() => {
    return "File";
    // if (item.type === "invoice") {
    //   if (isString(item.autoSendDate)) return "Fil"
    // }
  }, []);
  return (
    <TableRow style="list">
      <TableCell padded>
        <Text>{date}</Text>
      </TableCell>
      <TableCell padded>
        <Icon name={icon} />
      </TableCell>
    </TableRow>
  );
};

export const BalanceJournalRenderer = () => {
  const { data } = useListContext<TransactionItem>();

  return (
    <Table>
      <TableHeader>
        <TableHeaderCell>Cell</TableHeaderCell>
        <TableHeaderCell>Transaction</TableHeaderCell>
      </TableHeader>
      <TableBody style="list">
        {data.map((item) => (
          <BalanceJournalRow key={item.reference} item={item} />
        ))}
      </TableBody>
    </Table>
  );
};
