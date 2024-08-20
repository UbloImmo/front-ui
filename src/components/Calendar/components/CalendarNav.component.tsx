import { useCallback } from "react";
import { useDayPicker, type NavProps } from "react-day-picker";
import styled from "styled-components";

import { Button } from "@components";

export const CalendarNav = (props: NavProps) => {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const goToNextMonth = useCallback(() => {
    if (nextMonth) goToMonth(nextMonth);
  }, [goToMonth, nextMonth]);

  const goToPreviousMonth = useCallback(() => {
    if (previousMonth) goToMonth(previousMonth);
  }, [goToMonth, previousMonth]);
  return (
    <Nav {...props}>
      <Button
        icon="ChevronLeft"
        color="clear"
        onClick={goToPreviousMonth}
        testId="calendar-previous-month"
      />
      <Button
        icon="ChevronRight"
        color="clear"
        onClickNative={goToNextMonth}
        testId="calendar-next-month"
      />
    </Nav>
  );
};

const Nav = styled.nav`
  position: absolute;
  inset-block-start: 0;
  inset-inline-end: 0;
  display: flex;
  align-items: center;
  gap: var(--s-2);
  height: var(--rdp-nav-height);
`;
