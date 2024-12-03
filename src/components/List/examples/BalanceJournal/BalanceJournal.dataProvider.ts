import { addMonths } from "date-fns";
import { capitalize } from "lodash";

import {
  creditNoteStateList,
  invoiceStateList,
  transactionTypes,
  type TransactionItem,
} from "./BalanceJournal.types";
import { useStaticDataProvider, type UseDataProviderFn } from "../../modules";

import { normalizeToDateNativeStr } from "@/components/Input";
import { delay } from "@utils";

const MAX_AMOUNT = 1_000_000;
const AUTO_SEND_DATE_CHANCE = 0.64;
const BALANCE_OFFSET = 0;
const ITEM_COUNT = 100;
const DELAY = 1000;

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

const fetchBalanceJournalData = async (): Promise<TransactionItem[]> => {
  await delay(DELAY);
  return generateMockTransactionItems();
};

export const useBalanceJournalData: UseDataProviderFn<TransactionItem> = (
  setData
) => {
  return useStaticDataProvider(fetchBalanceJournalData, setData);
};
