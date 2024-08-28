import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import {
  caretContainerStyles,
  collapsibleContainerStyles,
} from "./Collapsible.styles";
import {
  type CollapsibleProps,
  type CollapsibleDefaultProps,
  CollapsibleCaretStyleProps,
  type CollapsibleContainerStyleProps,
} from "./Collapsible.types";
import { Icon } from "../Icon";

import { FlexRowLayout } from "@layouts";
import { useTestId, useMergedProps } from "@utils";

import type { TestIdProps } from "@types";

const defaultCollapsibleProps: CollapsibleDefaultProps = {
  isOpen: false,
  onOpenChange: false,
  disabled: false,
  compact: false,
  children: null,
  subCollapsibles: null,
};

/**
 * An expandable component that allow users to reveal or hide sub content by clicking on its headers.
 *
 * @version 0.0.1
 *
 * @param {CollapsibleProps & TestIdProps} props - Collapsible component props
 * @returns {JSX.Element}
 */
const Collapsible = (props: CollapsibleProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultCollapsibleProps, props);
  const { disabled, subCollapsibles, compact, children } = mergedProps;
  const [isOpen, setIsOpen] = useState(mergedProps.isOpen);
  const testId = useTestId("collapsible", props);

  const iconColor = useMemo(() => {
    return disabled ? "gray-400" : "gray-900";
  }, [disabled]);

  const openCollapsible = useCallback(() => {
    if (disabled) return;
    if (!subCollapsibles) return;

    setIsOpen(!isOpen);
  }, [isOpen, disabled, subCollapsibles]);

  return (
    <>
      <CollapsibleContainer
        testId={testId}
        overrideTestId
        align="center"
        fill
        $compact={compact}
        $disabled={disabled}
        {...mergedProps}
      >
        <CaretContainer onClick={openCollapsible} $isOpen={isOpen}>
          <Icon name="CaretRightFill" size="s-2" color={iconColor} />
        </CaretContainer>
        {children}
      </CollapsibleContainer>

      {subCollapsibles && isOpen && (
        <SubCollapsibleContainer>
          {subCollapsibles.map((collapsible, index) => (
            <Collapsible key={index} {...collapsible} compact={compact} />
          ))}
        </SubCollapsibleContainer>
      )}
    </>
  );
};
Collapsible.defaultProps = defaultCollapsibleProps;

export { Collapsible };

const CollapsibleContainer = styled(
  FlexRowLayout
)<CollapsibleContainerStyleProps>`
  ${collapsibleContainerStyles}
`;

const CaretContainer = styled.div<CollapsibleCaretStyleProps>`
  ${caretContainerStyles}
`;

const SubCollapsibleContainer = styled.div`
  padding-left: var(--s-4);
`;
