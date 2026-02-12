import styles from "./Content.module.scss";

import { FlexColumnLayout } from "@/layouts";
import { useCssClasses } from "@utils";

import type { ReactNode } from "react";

type ContentProps = {
  children: ReactNode;
};

/**
 * Wraps documentation content in a responsive container.
 *
 * @param {ContentProps} children - The children to be rendered inside the content component.
 * @return {ReactNode} The rendered content component.
 */
export const Content = ({ children }: ContentProps) => {
  const className = useCssClasses(styles.content);
  return (
    <FlexColumnLayout
      align="center"
      justify="start"
      data-layout="docs-content-container"
    >
      <main className={className} data-layout="docs-content">
        {children}
      </main>
    </FlexColumnLayout>
  );
};
