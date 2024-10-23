import { useCallback, useEffect, useMemo, useState } from "react";
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
  open: false,
  defaultOpen: false,
  onOpenChange: null,
  disabled: false,
  compact: false,
  children: null,
  subCollapsibles: null,
};

/**
 * An expandable component that allow users to reveal or hide sub content on click.
 *
 * @version 0.0.3
 *
 * @param {CollapsibleProps & TestIdProps} props - Collapsible component props
 * @returns {JSX.Element}
 */
const Collapsible = (props: CollapsibleProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultCollapsibleProps, props);
  const { disabled, subCollapsibles, compact, children, onOpenChange } =
    mergedProps;
  const [isOpen, setIsOpen] = useState(
    mergedProps.defaultOpen || mergedProps.open
  );
  const testId = useTestId("collapsible", props);

  const iconColor = useMemo(() => {
    return disabled ? "gray-400" : "gray-900";
  }, [disabled]);

  const toggleCollapsible = useCallback(() => {
    if (disabled) return;
    if (!subCollapsibles) return;

    const newIsOpen = !isOpen;

    if (onOpenChange) onOpenChange(newIsOpen);
    setIsOpen(newIsOpen);
  }, [isOpen, disabled, subCollapsibles, onOpenChange]);

  useEffect(() => {
    if (mergedProps.open !== isOpen) setIsOpen(mergedProps.open);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.open]);

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
          onClick={toggleCollapsible}
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
  width: 100%;
  max-width: 100%;
`;
