import { isString, type ValueMap } from "@ubloimmo/front-util";
import { useCallback, useMemo } from "react";

import {
  AMOUNT_FILTER_LABEL,
  creditNoteStateMap,
  invoiceStateMap,
  STATE_FILTER_LABEL,
  TRANSACTION_FILTER_LABEL,
} from "./BalanceJournal.config";
import {
  TransactionItem,
  type BalanceJournalRowProps,
  type CreditNoteState,
  type InvoiceState,
  type TransactionType,
} from "./BalanceJournal.types";
import { ListTableHeaderFilter } from "../../components";
import { useListContext } from "../../context";

import { normalizeToDateStr } from "@/components/Input";
import { formatCurrencyInt } from "@/components/Input/CurrencyInput/CurrencyInput.utils";
import { Loading } from "@/components/Loading";
import { StaticIcon, type StaticIconProps } from "@/components/StaticIcon";
import { Text } from "@/components/Text";
import { Tooltip } from "@/components/Tooltip";
import {
  FlexLayout,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "@layouts";
import { PaletteColor, type ColorKey, type CurrencyInt } from "@types";
import { isPositive } from "@utils";

import type { IconName } from "@/components/Icon";

const transactionItemIconMap: ValueMap<TransactionType, IconName> = {
  invoice: "Invoice2Out",
  credit_note: "Invoice2In",
  payment: "CoinsIn",
};

const formatCurrencyIntWithSign = (value: CurrencyInt) => {
  const formatted = formatCurrencyInt(value);
  if (isPositive(value)) return `+ ${formatted}`;
  return formatted;
};

const BalanceJournalRow = ({ item }: BalanceJournalRowProps) => {
  const date = useMemo(() => normalizeToDateStr(item.date), [item.date]);

  const isAutomaticInvoice = useMemo(
    () => item.type === "invoice" && isString(item.autoSendDate),
    [item.type, item.autoSendDate],
  );
  const staticIconProps = useMemo<StaticIconProps>(() => {
    const name = transactionItemIconMap[item.type];
    const color: ColorKey = isAutomaticInvoice ? "primary" : "gray";
    return {
      name,
      color,
      size: "s",
    };
  }, [item.type, isAutomaticInvoice]);

  const textColor = useMemo<PaletteColor>(
    () => (isAutomaticInvoice ? "primary-base" : "gray-800"),
    [isAutomaticInvoice],
  );

  const formattedAmount = useMemo(
    () => formatCurrencyIntWithSign(item.amount),
    [item.amount],
  );

  const formattedBalance = useMemo(
    () => formatCurrencyIntWithSign(item.balance),
    [item.balance],
  );

  const state = useMemo(() => {
    if (item.type === "invoice") {
      const [label, icon, color] = invoiceStateMap[item.state as InvoiceState];
      return { label, icon, color };
    }
    const [label, icon, color] =
      creditNoteStateMap[item.state as CreditNoteState];
    return { label, icon, color };
  }, [item.state, item.type]);

  const onClick = useCallback(() => {}, []);

  return (
    <TableRow style="list" onClick={onClick}>
      <TableCell padded colSpan={2}>
        <Text>{date}</Text>
      </TableCell>
      <TableCell padded colSpan={3}>
        <FlexLayout gap="s-2" fill align="center">
          <StaticIcon {...staticIconProps} />
          <FlexLayout direction="column" fill>
            <Text size="s" color="gray-600" fill ellipsis>
              {item.reference}
            </Text>
            <Text weight="bold" color={textColor} fill ellipsis>
              {item.name}
            </Text>
          </FlexLayout>
        </FlexLayout>
      </TableCell>
      <TableCell padded colSpan={2}>
        <Text>{formattedAmount}</Text>
      </TableCell>
      <TableCell padded colSpan={2}>
        <Text>{formattedBalance}</Text>
      </TableCell>
      <TableCell padded colSpan={1}>
        <FlexLayout fill align="center" justify="center">
          <Tooltip content={state.label}>
            <StaticIcon name={state.icon} color={state.color} size="s" />
          </Tooltip>
        </FlexLayout>
      </TableCell>
    </TableRow>
  );
};

export const BalanceJournalRenderer = () => {
  const { data, getFilterByLabel, loading } = useListContext<TransactionItem>();

  const filters = useMemo(
    () => ({
      transaction: getFilterByLabel(TRANSACTION_FILTER_LABEL),
      amount: getFilterByLabel(AMOUNT_FILTER_LABEL),
      state: getFilterByLabel(STATE_FILTER_LABEL),
    }),
    [getFilterByLabel],
  );

  if (loading)
    return (
      <FlexLayout fill align="center" justify="center">
        <Loading animation="BouncingBalls" />
      </FlexLayout>
    );

  return (
    <Table layout="fixed">
      <TableHeader sticky top="s-1">
        <TableHeaderCell colSpan={2}>
          <Text color="gray-800" weight="bold">
            Date
          </Text>
        </TableHeaderCell>
        <ListTableHeaderFilter
          filter={filters.transaction}
          fallbackLabel={TRANSACTION_FILTER_LABEL}
          tooltip={{ content: "coucou" }}
          colSpan={3}
        />
        <ListTableHeaderFilter
          filter={filters.amount}
          fallbackLabel={AMOUNT_FILTER_LABEL}
          colSpan={2}
        />
        <TableHeaderCell colSpan={2}>
          <Text color="gray-800" weight="bold">
            Balance
          </Text>
        </TableHeaderCell>
        <ListTableHeaderFilter filter={filters.state} hideLabel colSpan={1} />
      </TableHeader>
      <TableBody style="list">
        {data.map((item) => (
          <BalanceJournalRow key={item.reference} item={item} />
        ))}
      </TableBody>
    </Table>
  );
};
