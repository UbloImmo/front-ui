import { useMemo } from "react";
import styled from "styled-components";

import { FormEditButton } from "./FormEditButton.component";
import { useFormContext } from "../Form.context";
import { formHeaderStyles } from "../Form.styles";

import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { FlexRowLayout } from "@/layouts/Flex";
import { useMergedProps } from "@utils";

import type { FormHeaderProps } from "../Form.types";
import type { HeadingSize } from "@types";

const defaultFormHeaderProps: Required<FormHeaderProps> = {
  title: "Form",
  badge: null,
  icon: null,
};

/**
 * Renders a form's header (title, badge & buttons)
 * @param {FormHeaderProp} props - The header's props
 * @returns {JSX.Element} - The rendered form header
 */
export const FormHeader = (props: FormHeaderProps): JSX.Element => {
  const { asModal } = useFormContext();
  const mergedProps = useMergedProps(defaultFormHeaderProps, props);

  const size = useMemo<HeadingSize>(() => (asModal ? "h2" : "h4"), [asModal]);

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
