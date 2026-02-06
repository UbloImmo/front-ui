import { useCallback } from "react";
import { useDayPicker, type NavProps } from "react-day-picker";

import styles from "../Calendar.module.scss";

import { Button } from "@/components/Button";
import { useCssClasses } from "@utils";

export const CalendarNav = ({ className: cn, ...props }: NavProps) => {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const goToNextMonth = useCallback(() => {
    if (nextMonth) goToMonth(nextMonth);
  }, [goToMonth, nextMonth]);

  const goToPreviousMonth = useCallback(() => {
    if (previousMonth) goToMonth(previousMonth);
  }, [goToMonth, previousMonth]);
  const className = useCssClasses(styles["calendar-nav"], cn);
  return (
    <nav className={className} {...props}>
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
    </nav>
  );
};
