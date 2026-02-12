import { Content } from "../Content";
import styles from "./Header.module.scss";

import { FlexColumnLayout } from "@/layouts";
import { useCssClasses } from "@utils";

import type { ReactNode } from "react";

type HeaderProps = {
  children?: ReactNode;
};

/**
 * Responsive header for documentation pages.
 *
 * @param {ContentProps} children - The children to be rendered inside the content component.
 * @return {ReactNode} The rendered content component.
 */
export const Header = ({ children }: HeaderProps) => {
  const className = useCssClasses(styles.header);
  return (
    <header className={className} data-testid="docs-header">
      <Content>
        <FlexColumnLayout gap="s-8" align="start" justify="start">
          {children}
        </FlexColumnLayout>
      </Content>
    </header>
  );
};
