import { CSSProperties } from "react";

import { useBalanceJournalConfig } from "./BalanceJournal.config";
import {
  BalanceJournalContextProvider,
  useBalanceJournalContext,
} from "./BalanceJournal.context";
import { BalanceJournalRenderer } from "./BalanceJournal.renderer";
import { List } from "../../List.component";

import { Button, Heading, Input, Text } from "@/components";
import { FlexColumnLayout, FlexRowLayout } from "@/layouts/Flex";
import { cssVarUsage } from "@utils";

const cardStyle: CSSProperties = {
  padding: cssVarUsage("s-8"),
  background: cssVarUsage("white"),
  boxShadow: cssVarUsage("shadow-card-default"),
  borderRadius: cssVarUsage("s-2"),
};

const BalanceJournalContent = () => {
  const { config } = useBalanceJournalConfig();
  const { startDate, setStartDate, endDate, setEndDate } =
    useBalanceJournalContext();
  return (
    <FlexColumnLayout styleOverride={cardStyle} gap="s-6">
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
    </FlexColumnLayout>
  );
};

export const BalanceJournalExample = () => {
  return (
    <BalanceJournalContextProvider>
      <BalanceJournalContent />
    </BalanceJournalContextProvider>
  );
};
