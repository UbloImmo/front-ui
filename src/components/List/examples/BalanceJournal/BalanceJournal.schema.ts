import { z } from "zod";

export const balanceJournalSchema = z.object({
  startDateFilter: z.string().nullish(),
  endDateFilter: z.string().nullish(),
});

export type BalanceJournalInput = z.input<typeof balanceJournalSchema>;
