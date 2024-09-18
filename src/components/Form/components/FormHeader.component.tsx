import { useMemo } from "react";
import styled from "styled-components";

import { FormEditButton } from "./FormEditButton.component";
import { formHeaderStyles } from "../Form.styles";

import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { FormHeaderProps } from "../Form.types";
import type { HeadingSize } from "@types";

const defaultFormHeaderProps: Required<
  FormHeaderProps & { asModal?: boolean }
> = {
  title: "Form",
  badge: null,
  icon: null,
  asModal: false,
};

export const FormHeader = (props: FormHeaderProps & { asModal?: boolean }) => {
  const mergedProps = useMergedProps(defaultFormHeaderProps, props);

  const size = useMemo<HeadingSize>(
    () => (mergedProps.asModal ? "h2" : "h4"),
    [mergedProps.asModal]
  );

  return (
    <Header data-testid="form-header">
      <FlexRowLayout gap="s-2" align="center">
        {mergedProps.icon && <Icon name={mergedProps.icon} size="s-5" />}
        <Heading size={size} weight="bold" color="gray-900" testId="form-title">
          {mergedProps.title}
        </Heading>
        {mergedProps.badge && <Badge {...mergedProps.badge} />}
      </FlexRowLayout>
      <FormEditButton />
    </Header>
  );
};

const Header = styled.header`
  ${formHeaderStyles}
`;
