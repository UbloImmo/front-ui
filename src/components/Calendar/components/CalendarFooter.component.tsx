import { isString } from "@ubloimmo/front-util";
import { Footer, type FooterProps } from "react-day-picker";

import { InputAssistiveText } from "@components";

export const CalendarFooter = ({ children, ...props }: FooterProps) => {
  return (
    <Footer {...props}>
      <InputAssistiveText
        testId="calendar-assistive-text"
        overrideTestId
        assistiveText={isString(children) ? children : null}
      />
    </Footer>
  );
};
