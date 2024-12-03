import type { Enum } from "@ubloimmo/front-util";

export const transactionTypes = ["invoice", "payment", "credit_note"] as const;

export type TransactionType = Enum<typeof transactionTypes>;

export const invoiceStateList = [
  "draft",
  "waiting_payment",
  "paid",
  "locked_paid",
  "late_payment",
] as const;

export type InvoiceState = Enum<typeof invoiceStateList>;

export const creditNoteStateList = [
  "draft",
  "available",
  "partially_refunded",
  "locked_partially",
  "refunded",
  "locked_paid",
] as const;

export type CreditNoteState = (typeof creditNoteStateList)[number];

export type BalanceItemState = InvoiceState | CreditNoteState;

export type Transaction = {
  reference: string;
  name: string;
  type: TransactionType;
};

export type TransactionItem = Transaction & {
  date: string;
  amount: number;
  availableAmount?: number;
  balance: number;
  state: BalanceItemState;
  autoSendDate?: string;
};

export type BalanceJournalRowProps = {
  item: TransactionItem;
};
