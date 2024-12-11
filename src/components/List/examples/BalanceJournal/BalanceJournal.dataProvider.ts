import { addMonths, isBefore, isAfter } from "date-fns";
import { capitalize } from "lodash";
import { useCallback } from "react";

import { useBalanceJournalContext } from "./BalanceJournal.context";
import {
  creditNoteStateList,
  invoiceStateList,
  transactionTypes,
  type TransactionItem,
} from "./BalanceJournal.types";
import { useStaticDataProvider, type UseDataProviderFn } from "../../modules";

import { normalizeToDate, normalizeToDateNativeStr } from "@/components/Input";
import { delay, useStatic } from "@utils";

const MAX_AMOUNT = 1_000_000;
const AUTO_SEND_DATE_CHANCE = 0.64;
const BALANCE_OFFSET = 0;
const ITEM_COUNT = 100;
const DELAY = 150;

const randomArrayItem = <T>(array: T[] | readonly T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

const mockTransactionItem = (prevBalance: number): TransactionItem => {
  // random date
  const randomDate = new Date(new Date().valueOf() - Math.random() * 1e12);
  const date = normalizeToDateNativeStr(randomDate) as string;

  const reference = `I${Math.ceil(Math.random() * 100_000)}`;
  const type = randomArrayItem(transactionTypes);
  const name = `${capitalize(type)} ${reference}`;
  const baseAmount = Math.round(Math.random() * MAX_AMOUNT);
  const amount = type === "invoice" ? -baseAmount : baseAmount;

  const state =
    type === "invoice"
      ? randomArrayItem(invoiceStateList)
      : randomArrayItem(creditNoteStateList);
  const availableAmount =
    type === "invoice"
      ? 0
      : state === "draft" || state === "available"
      ? amount
      : state === "locked_paid" || state === "paid" || state === "refunded"
      ? 0
      : Math.round(Math.random() * amount);

  const balance = prevBalance + amount;

  const autoSendDate =
    type === "invoice" && Math.random() < AUTO_SEND_DATE_CHANCE
      ? (normalizeToDateNativeStr(addMonths(randomDate, 1)) as string)
      : undefined;

  return {
    date,
    autoSendDate,
    balance,
    reference,
    name,
    type,
    state,
    amount,
    availableAmount,
  };
};

const generateMockTransactionItems = (): TransactionItem[] => {
  const items: TransactionItem[] = [];
  let balance = BALANCE_OFFSET;
  for (let i = 0; i < ITEM_COUNT; i++) {
    const item = mockTransactionItem(balance);
    balance = item.balance;
    items.push(item);
  }
  return items;
};

export const useBalanceJournalData: UseDataProviderFn<TransactionItem> = (
  setData
) => {
  const staticMockData = useStatic(generateMockTransactionItems);
  const filters = useBalanceJournalContext();

  const fetchBalanceJournalData = useCallback(async (): Promise<
    TransactionItem[]
  > => {
    await delay(DELAY);
    const periodData = staticMockData.filter((item) => {
      const date = normalizeToDate(item.date);
      const startDate = normalizeToDate(filters.startDate ?? null);
      const endDate = normalizeToDate(filters.endDate ?? null);
      if (!startDate && !endDate) return true;
      if (!date) return false;
      const isAfterStartDate = startDate ? isAfter(date, startDate) : true;
      const isBeforeEndDate = endDate ? isBefore(date, endDate) : true;
      return isAfterStartDate && isBeforeEndDate;
    });
    return periodData;
  }, [filters.endDate, filters.startDate, staticMockData]);

  return useStaticDataProvider(fetchBalanceJournalData, setData);
};
