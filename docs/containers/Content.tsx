import styled from "styled-components";

import { FlexColumnLayout } from "../../src/layouts";

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
  return (
    <FlexColumnLayout align="center" justify="start">
      <ContentContainer>{children}</ContentContainer>
    </FlexColumnLayout>
  );
};

const ContentContainer = styled.main`
  padding: var(--s-4);
  width: 100%;
  max-width: 1000px;
`;
