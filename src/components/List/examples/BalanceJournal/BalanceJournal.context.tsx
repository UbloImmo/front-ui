import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Nullable } from "@ubloimmo/front-util";
import { z } from "zod";

type BalanceJournalContextValue = {
  startDate: Nullable<string>;
  endDate: Nullable<string>;
  error: boolean;
  setStartDate: (date: Nullable<string>) => void;
  setEndDate: (date: Nullable<string>) => void;
};

const useBalanceJournal = (): BalanceJournalContextValue => {
  const [startDate, setStartDate] = useState<Nullable<string>>(null);
  const [endDate, setEndDate] = useState<Nullable<string>>(null);

  const error = useMemo(() => {
    const result = z
      .object({
        startDate: z.string().nullable(),
        endDate: z.string().nullable(),
      })
      .superRefine((data, ctx) => {})
      .safeParse({
        startDate,
        endDate,
      });

    return !!result.error;
  }, [startDate, endDate]);

  return { startDate, endDate, setStartDate, setEndDate, error };
};

export const BalanceJournalContext = createContext<BalanceJournalContextValue>({
  startDate: null,
  endDate: null,
  error: false,
  setStartDate: () => {},
  setEndDate: () => {},
});

export const useBalanceJournalContext = (): BalanceJournalContextValue => {
  return useContext(BalanceJournalContext);
};

export const BalanceJournalContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const journal = useBalanceJournal();

  return (
    <BalanceJournalContext.Provider value={journal}>
      {children}
    </BalanceJournalContext.Provider>
  );
};
