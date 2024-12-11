import { useDefaultListConfig } from "./Default.config";
import { DefaultListRenderer } from "./Default.renderer";
import { ListFilterCollection } from "../../components";
import { List } from "../../List.component";

import { FlexRowLayout } from "@layouts";

export const DefaultExample = () => {
  const config = useDefaultListConfig();

  return (
    <List config={config}>
      <FlexRowLayout gap="s-3" fill wrap>
        <ListFilterCollection />
        <DefaultListRenderer />
      </FlexRowLayout>
    </List>
  );
};
