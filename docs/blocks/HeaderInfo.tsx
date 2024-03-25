import type { ReactNode } from "react";
import { Text } from "../blocks";
import { FlexColumnLayout } from "../../src/layouts";
import { Heading } from "../../src/components";

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
          <Text size="xs" color="primary-medium" weight="semiBold">
            {parent}
          </Text>
        )}
        <Heading size="h1" color="primary-dark" weight="bold" important>
          {title}
        </Heading>
      </FlexColumnLayout>

      {children && (
        <Text size="m" color="gray-600">
          {children}
        </Text>
      )}
    </FlexColumnLayout>
  );
};
