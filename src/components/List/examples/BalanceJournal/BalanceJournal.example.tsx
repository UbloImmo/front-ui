import styled from "styled-components";

import { useBalanceJournalConfig } from "./BalanceJournal.config";
import { BalanceJournalRenderer } from "./BalanceJournal.renderer";
import { ListContextProvider } from "../../context";

import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { FlexColumnLayout, FlexRowLayout } from "@layouts";

const Card = styled(FlexColumnLayout)`
  padding: var(--s-8);
  background: white;
  box-shadow: var(--shadow-card-default);
  border-radius: var(--s-2);
`;

const BalanceJournalContent = () => {
  return (
    <Card gap="s-6">
      <FlexRowLayout justify="space-between" fill align="center">
        <Heading size="h4" weight="bold" color="gray-900">
          Balance journal
        </Heading>
        <Button label="Export" icon="Download" secondary />
      </FlexRowLayout>

      <BalanceJournalRenderer />
    </Card>
  );
};

export const BalanceJournalExample = () => {
  const { config } = useBalanceJournalConfig();

  return (
    <ListContextProvider config={config}>
      <BalanceJournalContent />
    </ListContextProvider>
  );
};
