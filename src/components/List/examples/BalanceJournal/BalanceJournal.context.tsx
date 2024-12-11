import { createContext, useContext, useState, type ReactNode } from "react";

import type { Nullable } from "@ubloimmo/front-util";

type BalanceJournalContextValue = {
  startDate: Nullable<string>;
  endDate: Nullable<string>;
  setStartDate: (date: Nullable<string>) => void;
  setEndDate: (date: Nullable<string>) => void;
};

const useBalanceJournal = (): BalanceJournalContextValue => {
  const [startDate, setStartDate] = useState<Nullable<string>>(null);
  const [endDate, setEndDate] = useState<Nullable<string>>(null);

  return { startDate, endDate, setStartDate, setEndDate };
};

export const BalanceJournalContext = createContext<BalanceJournalContextValue>({
  startDate: null,
  endDate: null,
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
