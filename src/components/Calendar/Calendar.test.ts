import { expect } from "bun:test";

import { Calendar } from "./Calendar.component";

import { testComponentFactory } from "@/tests";

const testId = "calendar";

const testCalendar = testComponentFactory("Calendar", Calendar);

testCalendar({})("should render", async ({ findByTestId }) => {
  expect(await findByTestId(testId)).not.toBeNull();
});
