import type {
  BalanceItemState,
  CreditNoteState,
  InvoiceState,
} from "./BalanceJournal.types";
import type { ValueMap } from "@ubloimmo/front-util";

export const invoiceStateTranslations: ValueMap<InvoiceState, string> = {
  draft: "Draft",
  waiting_payment: "Waiting Payment",
  paid: "Paid",
  late_payment: "Late Payment",
  locked_paid: "Locked Paid",
};

export const creditNoteStateTranslations: ValueMap<CreditNoteState, string> = {
  draft: "Draft",
  available: "Available",
  partially_refunded: "Partially Refunded",
  locked_partially: "Locked Partially",
  refunded: "Refunded",
  locked_paid: "Locked Paid",
};

export const transactionTypeTranslations: ValueMap<BalanceItemState, string> = {
  ...invoiceStateTranslations,
  ...creditNoteStateTranslations,
};
