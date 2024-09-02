import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import {
  caretContainerStyles,
  collapsibleContainerStyles,
} from "./Collapsible.styles";
import {
  type CollapsibleProps,
  type CollapsibleDefaultProps,
  type CollapsibleContainerStyleProps,
} from "./Collapsible.types";
import { Icon } from "../Icon";

import { FlexRowLayout } from "@layouts";
import { useTestId, useMergedProps } from "@utils";

import type { TestIdProps } from "@types";

const defaultCollapsibleProps: CollapsibleDefaultProps = {
  isOpen: false,
  onOpenChange: null,
  disabled: false,
  compact: false,
  children: null,
  subCollapsibles: null,
};

/**
 * An expandable component that allow users to reveal or hide sub content on click.
 *
 * @version 0.0.1
 *
 * @param {CollapsibleProps & TestIdProps} props - Collapsible component props
 * @returns {JSX.Element}
 */
const Collapsible = (props: CollapsibleProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultCollapsibleProps, props);
  const { disabled, subCollapsibles, compact, children, onOpenChange } =
    mergedProps;
  const [isOpen, setIsOpen] = useState(mergedProps.isOpen);
  const testId = useTestId("collapsible", props);

  const iconColor = useMemo(() => {
    return disabled ? "gray-400" : "gray-900";
  }, [disabled]);

  const openCollapsible = useCallback(() => {
    if (disabled) return;
    if (!subCollapsibles) return;

    if (onOpenChange) onOpenChange(!isOpen);

    setIsOpen(!isOpen);
  }, [isOpen, disabled, subCollapsibles, onOpenChange]);

  return (
    <>
      <CollapsibleContainer
        testId={testId}
        overrideTestId
        align="center"
        fill
        aria-expanded={isOpen}
        $compact={compact}
        $disabled={disabled}
        {...mergedProps}
      >
        <CaretContainer
          aria-expanded={isOpen}
          data-testid={`${testId}-caret`}
          onClick={openCollapsible}
          aria-disabled={disabled}
          disabled={disabled}
          type="button"
        >
          <Icon name="CaretRightFill" size="s-2" color={iconColor} />
        </CaretContainer>
        {children}
      </CollapsibleContainer>

      {subCollapsibles && isOpen && (
        <SubCollapsibleContainer>
          {subCollapsibles.map((collapsible, index) => {
            const subCollapsibleTestId = `sub${testId}-${index}`;

            return (
              <Collapsible
                key={subCollapsibleTestId}
                testId={subCollapsibleTestId}
                overrideTestId
                {...collapsible}
                compact={compact}
              />
            );
          })}
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

const CaretContainer = styled.button`
  ${caretContainerStyles}
`;

const SubCollapsibleContainer = styled.div`
  padding-left: var(--s-4);
`;
