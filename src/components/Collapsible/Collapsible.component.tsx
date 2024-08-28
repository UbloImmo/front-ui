import { useCallback, useMemo, useState } from "react";
import styled from "styled-components";

import {
  caretContainerStyles,
  collapsibleContainerStyles,
} from "./Collapsible.styles";
import { Icon } from "../Icon";

import { FlexRowLayout } from "@layouts";
import { useLogger, useTestId, useMergedProps } from "@utils";

import type {
  CollapsibleProps,
  CollapsibleDefaultProps,
} from "./Collapsible.types";
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
 * Can have several sub collapsibles layers.
 *
 * @version 0.0.1
 *
 * @param {CollapsibleProps & TestIdProps} props - Collapsible component props
 * @returns {JSX.Element}
 */
const Collapsible = (props: CollapsibleProps & TestIdProps): JSX.Element => {
  const { log } = useLogger("Collapsible");

  const mergedProps = useMergedProps(defaultCollapsibleProps, props);
  const [isOpen, setIsOpen] = useState(mergedProps.isOpen);
  const testId = useTestId("collapsible", props);

  log(mergedProps);

  const iconColor = useMemo(() => {
    return mergedProps.disabled ? "gray-400" : "gray-900";
  }, [mergedProps.disabled]);

  const openCollapsible = useCallback(() => {
    if (mergedProps.disabled) return;

    setIsOpen(!isOpen);
  }, [isOpen, mergedProps.disabled]);

  return (
    <>
      <CollapsibleContainer data-testid={testId} align="center" fill>
        <CaretContainer onClick={openCollapsible}>
          <Icon name="CaretRightFill" size="s-2" color={iconColor} />
        </CaretContainer>
        {mergedProps.children}
      </CollapsibleContainer>

      {mergedProps.subCollapsibles && isOpen && (
        <SubCollapsibleContainer>
          {mergedProps.subCollapsibles.map((collapsible, index) => (
            <Collapsible key={index} {...collapsible} />
          ))}
        </SubCollapsibleContainer>
      )}
    </>
  );
};
Collapsible.defaultProps = defaultCollapsibleProps;

export { Collapsible };

const CollapsibleContainer = styled(FlexRowLayout)`
  ${collapsibleContainerStyles}
`;

const CaretContainer = styled.div`
  ${caretContainerStyles}
`;

const SubCollapsibleContainer = styled.div`
  padding-left: var(--s-4);
`;
