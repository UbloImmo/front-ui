import styled from "styled-components";

import { FlexColumnLayout } from "../../src/layouts";

import { Content } from ".";

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
  return (
    <Container>
      <Content>
        <FlexColumnLayout gap="s-8" align="start" justify="start">
          {children}
        </FlexColumnLayout>
      </Content>
    </Container>
  );
};

const Container = styled.header`
  padding: var(--s-8) 0;
  background: var(--gray-50);
  margin-bottom: var(--s-8);
  box-shadow: var(--shadow-card);
`;
