import styled from "styled-components";

import { FormEditButton } from "./FormEditButton.component";
import { formHeaderStyles } from "../Form.styles";

import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import type { FormHeaderProps } from "../Form.types";

const defaultFormHeaderProps: Required<FormHeaderProps> = {
  title: "Form",
  badge: null,
  icon: null,
};

export const FormHeader = (props: FormHeaderProps) => {
  const mergedProps = useMergedProps(defaultFormHeaderProps, props);

  return (
    <Header data-testid="form-header">
      <FlexRowLayout gap="s-2" align="center">
        {mergedProps.icon && <Icon name={mergedProps.icon} size="s-5" />}
        <Heading size="h3" weight="bold" color="gray-900" testId="form-title">
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
