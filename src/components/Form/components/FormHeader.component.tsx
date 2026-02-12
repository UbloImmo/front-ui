import { useMemo } from "react";

import { FormEditButton } from "./FormEditButton.component";
import { useFormContext } from "../Form.context";
import styles from "../Form.module.scss";

import { Badge } from "@/components/Badge";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { FlexRowLayout } from "@/layouts/Flex";
import { useCssClasses, useMergedProps } from "@utils";

import type { FormHeaderProps } from "../Form.types";
import type { HeadingSize } from "@types";

const defaultFormHeaderProps: Required<FormHeaderProps> = {
  title: "Form",
  badge: null,
  icon: null,
};

/**
 * Renders a form's header (title, badge & buttons)
 *
 * @version 0.1.0
 *
 * @param {FormHeaderProp} props - The header's props
 * @returns {JSX.Element} - The rendered form header
 */
export const FormHeader = (props: FormHeaderProps): JSX.Element => {
  const { asModal } = useFormContext();
  const mergedProps = useMergedProps(defaultFormHeaderProps, props);
  const className = useCssClasses(styles["form-header"]);
  const heading = useCssClasses(styles["form-heading"]);

  const size = useMemo<HeadingSize>(() => (asModal ? "h2" : "h4"), [asModal]);

  return (
    <header className={className} data-testid="form-header">
      <FlexRowLayout gap="s-2" align="center">
        {mergedProps.icon && <Icon name={mergedProps.icon} size="s-5" />}
        <Heading
          className={heading}
          size={size}
          weight="bold"
          color="gray-900"
          testId="form-title"
        >
          {mergedProps.title}
        </Heading>
        {mergedProps.badge && <Badge {...mergedProps.badge} />}
      </FlexRowLayout>
      <FormEditButton />
    </header>
  );
};
