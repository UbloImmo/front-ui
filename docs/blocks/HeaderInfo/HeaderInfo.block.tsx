import { Text } from "../Typography";
import styles from "./HeaderInfo.module.scss";

import { FlexColumnLayout } from "@/layouts";
import { isEmptyString, useCssClasses } from "@utils";

import { Heading } from "@components";

import type { ReactNode } from "react";

type HeaderInfoProps = {
  children?: ReactNode;
  parent?: string;
  title: string;
};

export const HeaderInfo = ({ title, parent, children }: HeaderInfoProps) => {
  const className = useCssClasses(styles["info-heading"]);
  return (
    <FlexColumnLayout gap="s-3" align="start" justify="start">
      <FlexColumnLayout gap={0} align="start" justify="start">
        {parent && !isEmptyString(parent) && (
          <Text size="xs" color="primary-base" weight="medium">
            {parent}
          </Text>
        )}
        <Heading
          className={className}
          size="h1"
          color="primary-dark"
          weight="bold"
          important
        >
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
