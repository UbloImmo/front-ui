import { useBalanceJournalConfig } from "./BalanceJournal.config";
import { BalanceJournalRenderer } from "./BalanceJournal.renderer";
import { ListContextProvider } from "../../context";

export const BalanceJournalList = () => {
  const { config } = useBalanceJournalConfig();

  return (
    <ListContextProvider config={config}>
      <BalanceJournalRenderer />
    </ListContextProvider>
  );
};
