import { useBalanceJournalData } from "./BalanceJournal.dataProvider";
import {
  creditNoteStateList,
  invoiceStateList,
  type CreditNoteState,
  type InvoiceState,
} from "./BalanceJournal.types";
import { useListConfig } from "../../context";
import { BooleanOperators } from "../../List.enums";

import { useStatic, useUikitTranslation } from "@utils";

import type { IconName } from "@/components/Icon";
import type { ColorKey } from "@types";
import type { ValueMap } from "@ubloimmo/front-util";

export const TRANSACTION_FILTER_LABEL = "Transaction";

export const AMOUNT_FILTER_LABEL = "Amount";

export const STATE_FILTER_LABEL = "State";

export const invoiceStateMap: ValueMap<
  InvoiceState,
  [label: string, icon: IconName, color: ColorKey]
> = {
  // invoice
  draft: ["Brouillon de facture", "File", "gray"],
  waiting_payment: ["Facture en attente de paiement", "ClockFill", "pending"],
  paid: ["Facture payée", "CheckCircle", "success"],
  late_payment: [
    "Facture en retard de paiement",
    "ExclamationCircleFill",
    "error",
  ],
  locked_paid: ["Facture clôturée", "Check2Circle", "gray"],
  // credit note
};
export const creditNoteStateMap: ValueMap<
  CreditNoteState,
  [label: string, icon: IconName, color: ColorKey]
> = {
  draft: ["Brouillon d'avoir", "File", "gray"],
  available: ["Avoir disponible", "CircleCore", "success"],
  partially_refunded: [
    "Paiement partiellement réconcilié",
    "CircleCore2NdHalf",
    "warning",
  ],
  locked_partially: ["Avoir partiellement consommé", "CircleCore", "pending"],
  locked_paid: ["Avoir clôturé", "Check2Circle", "gray"],
  refunded: ["Avoir remboursé", "CoinsOut", "gray"],
};

export const useBalanceJournalConfig = () => {
  const {
    config,
    option,
    match,
    filter,
    options,
    not,
    configureSearchParams,
    divider,
  } = useListConfig(useBalanceJournalData);

  const tl = useUikitTranslation();

  useStatic(() => {
    configureSearchParams({ sync: "read" });
  });

  // transaction type options & filter
  const typeFilter = useStatic(() => {
    const isInvoice = match("type", "=", "invoice");
    const isAutomatic = match("autoSendDate", "!=", null);
    const invoices = option("Invoice", [isInvoice, not(isAutomatic)], {
      icon: "Invoice2In",
      operator: BooleanOperators.AND,
    });

    const isCreditNote = match("type", "=", "credit_note");
    const creditNotes = option("Credit Note", isCreditNote, {
      icon: "Invoice2Out",
    });

    const isPayment = match("type", "=", "payment");
    const payments = option("Payment", isPayment, { icon: "CoinsIn" });

    const automaticInvoices = option(
      "Automatic Invoice",
      [isInvoice, isAutomatic],
      {
        operator: BooleanOperators.AND,
        icon: "CatRobot",
        color: "primary",
      },
    );

    return filter(
      TRANSACTION_FILTER_LABEL,
      [automaticInvoices, invoices, payments, creditNotes],
      {
        emptyLabel: tl.status.all(`${TRANSACTION_FILTER_LABEL}s`),
      },
    );
  });

  const amountFilter = useStatic(() => {
    const isPositive = match("amount", "<", 0);
    const debit = option("Debit", isPositive, {
      icon: "DashCircle",
    });

    const isNegative = match("amount", ">", 0);
    const credit = option("Credit", isNegative, {
      icon: "PlusCircle",
    });

    return filter(AMOUNT_FILTER_LABEL, [debit, credit], { multi: false });
  });

  const stateFilter = useStatic(() => {
    const invoiceOptions = options(
      "state",
      "=",
      invoiceStateList.map((value) => {
        const [label, icon, color] = invoiceStateMap[value];
        return {
          label,
          value,
          config: {
            icon,
            color,
            disabled: true,
          },
        };
      }),
    );

    const creditNoteOptions = options(
      "state",
      "=",
      creditNoteStateList.map((value) => {
        const [label, icon, color] = creditNoteStateMap[value];
        return {
          label,
          value,
          config: {
            icon,
            color,
          },
        };
      }),
    );

    return filter(
      STATE_FILTER_LABEL,
      [
        divider("Invoices"),
        ...invoiceOptions,
        divider("Credit notes / payments"),
        ...creditNoteOptions,
      ],
      {
        // multi: false,
      },
    );
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
