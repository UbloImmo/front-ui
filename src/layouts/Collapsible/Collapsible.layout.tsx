import { useCallback, useEffect, useMemo, useState } from "react";

import { useCollapsibleLayoutStyle } from "./Collapsible.styles";
import { Icon } from "../../components/Icon";
import { FlexRowLayout } from "../Flex";

import { useMergedProps, useTestId } from "@utils";

import type {
  CollapsibleDefaultProps,
  CollapsibleProps,
} from "./Collapsible.types";
import type { TestIdProps } from "@types";

const defaultCollapsibleProps: CollapsibleDefaultProps = {
  open: false,
  defaultOpen: false,
  onOpenChange: null,
  disabled: false,
  compact: false,
  children: null,
  subCollapsibles: null,
  content: null,
};

/**
 * An expandable layout that allow users to reveal or hide sub content on click.
 *
 * @version 0.0.4
 *
 * @param {CollapsibleProps & TestIdProps} props - Collapsible component props
 * @returns {JSX.Element}
 */
const Collapsible = (props: CollapsibleProps & TestIdProps): JSX.Element => {
  const mergedProps = useMergedProps(defaultCollapsibleProps, props);
  const {
    disabled,
    subCollapsibles,
    compact,
    children,
    onOpenChange,
    content,
  } = mergedProps;
  const [isOpen, setIsOpen] = useState(
    mergedProps.defaultOpen || mergedProps.open
  );
  const testId = useTestId("collapsible", props);

  const iconColor = useMemo(() => {
    return disabled ? "gray-400" : "gray-900";
  }, [disabled]);

  const toggleCollapsible = useCallback(() => {
    if (disabled) return;
    if (!subCollapsibles && !content) return;

    const newIsOpen = !isOpen;

    if (onOpenChange) onOpenChange(newIsOpen);
    setIsOpen(newIsOpen);
  }, [isOpen, disabled, subCollapsibles, onOpenChange, content]);

  useEffect(() => {
    if (mergedProps.open !== isOpen) setIsOpen(mergedProps.open);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mergedProps.open]);

  const styles = useCollapsibleLayoutStyle(mergedProps);

  return (
    <>
      <FlexRowLayout
        className={styles.collapsible}
        testId={testId}
        overrideTestId
        align="center"
        fill
        aria-expanded={isOpen}
      >
        <button
          className={styles.caret}
          aria-expanded={isOpen}
          data-testid={`${testId}-caret`}
          onClick={toggleCollapsible}
          aria-disabled={disabled}
          disabled={disabled}
          type="button"
        >
          <Icon name="CaretRightFill" size="s-2" color={iconColor} />
        </button>
        {children}
      </FlexRowLayout>

      {subCollapsibles && isOpen && (
        <div className={styles.subContainer}>
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
        </div>
      )}
      {content && isOpen && <>{content}</>}
    </>
  );
};
Collapsible.__DEFAULT_PROPS = defaultCollapsibleProps;

export { Collapsible };
