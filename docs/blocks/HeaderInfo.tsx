import { Text } from "../blocks";

import { FlexColumnLayout } from "@/layouts";

import { Heading } from "@components";

import type { ReactNode } from "react";

type HeaderInfoProps = {
  children?: ReactNode;
  parent?: string;
  title: string;
};

export const HeaderInfo = ({ title, parent, children }: HeaderInfoProps) => {
  return (
    <FlexColumnLayout gap="s-3" align="start" justify="start">
      <FlexColumnLayout gap={0} align="start" justify="start">
        {parent && (
          <Text size="xs" color="primary-medium" weight="medium">
            {parent}
          </Text>
        )}
        <Heading size="h1" color="primary-dark" weight="bold" important>
          {title}
        </Heading>
      </FlexColumnLayout>

      {children && (
        <Text size="m" color="primary-dark">
          {children}
        </Text>
      )}
    </FlexColumnLayout>
  );
};
