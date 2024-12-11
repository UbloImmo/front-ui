import styled from "styled-components";

import { useBalanceJournalConfig } from "./BalanceJournal.config";
import {
  BalanceJournalContextProvider,
  useBalanceJournalContext,
} from "./BalanceJournal.context";
import { BalanceJournalRenderer } from "./BalanceJournal.renderer";
import { List } from "../../List.component";

import { Button, Heading, Input, Text } from "@/components";
import { FlexColumnLayout, FlexRowLayout } from "@layouts";

const Card = styled(FlexColumnLayout)`
  padding: var(--s-8);
  background: white;
  box-shadow: var(--shadow-card-default);
  border-radius: var(--s-2);
`;

const BalanceJournalContent = () => {
  const { config } = useBalanceJournalConfig();
  const { startDate, setStartDate, endDate, setEndDate } =
    useBalanceJournalContext();
  return (
    <Card gap="s-6">
      <FlexRowLayout justify="space-between" fill align="center">
        <Heading size="h4" weight="bold" color="gray-900">
          Balance journal
        </Heading>
        <Button label="Export" icon="Download" secondary />
      </FlexRowLayout>

      <FlexRowLayout gap="s-2" fill align="center">
        <Text noWrap>Period from</Text>
        <Input
          type="date"
          onChange={setStartDate}
          value={startDate}
          placeholder="start date"
        />
        <Text noWrap>to</Text>
        <Input
          type="date"
          onChange={setEndDate}
          value={endDate}
          placeholder="end date"
        />
      </FlexRowLayout>

      <List config={config}>
        <BalanceJournalRenderer />
      </List>
    </Card>
  );
};

export const BalanceJournalExample = () => {
  return (
    <BalanceJournalContextProvider>
      <BalanceJournalContent />
    </BalanceJournalContextProvider>
  );
};
