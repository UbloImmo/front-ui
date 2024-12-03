import { useBalanceJournalData } from "./BalanceJournal.dataProvider";
import {
  creditNoteStateTranslations,
  invoiceStateTranslations,
} from "./BalanceJournal.translations";
import { creditNoteStateList, invoiceStateList } from "./BalanceJournal.types";
import { useListConfig } from "../../context";
import { BooleanOperators } from "../../List.enums";

import { useStatic } from "@utils";

export const useBalanceJournalConfig = () => {
  const { config, option, match, filter, options } = useListConfig(
    useBalanceJournalData
  );

  // transaction type options & filter
  const typeFilter = useStatic(() => {
    const isInvoice = match("type", "=", "invoice");
    const invoices = option("Invoice", isInvoice);

    const isCreditNote = match("type", "=", "credit_note");
    const creditNotes = option("Credit Note", isCreditNote);

    const isPayment = match("type", "=", "payment");
    const payments = option("Payment", isPayment);

    const isAutomatic = match("autoSendDate", "!=", null);
    const automaticInvoices = option(
      "Automatic Invoice",
      [isInvoice, isAutomatic],
      {
        operator: BooleanOperators.AND,
      }
    );

    return filter("Transaction Type", [
      invoices,
      automaticInvoices,
      creditNotes,
      payments,
    ]);
  });

  const amountFilter = useStatic(() => {
    const isPositive = match("amount", "<", 0);
    const debit = option("Debit", isPositive);

    const isNegative = match("amount", ">", 0);
    const credit = option("Credit", isNegative);

    return filter("Amount", [debit, credit]);
  });

  const stateFilter = useStatic(() => {
    const invoiceOptions = options(
      "state",
      "=",
      invoiceStateList.map((value) => ({
        label: invoiceStateTranslations[value],
        value,
      }))
    );

    const creditNoteOptions = options(
      "state",
      "=",
      creditNoteStateList.map((value) => ({
        label: creditNoteStateTranslations[value],
        value,
      }))
    );

    return filter("State", [...invoiceOptions, ...creditNoteOptions]);
  });

  const filters = useStatic(() => ({
    typeFilter,
    amountFilter,
    stateFilter,
  }));

  return {
    config,
    filters,
  };
};
