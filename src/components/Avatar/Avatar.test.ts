import { VoidFn } from "@ubloimmo/front-util";
import { Mock, expect, mock } from "bun:test";

import { Avatar } from "./Avatar.component";

import { testComponentFactory } from "@/tests";

const testAvatar = testComponentFactory("Avatar", Avatar);

testAvatar({ firstName: "Testing", lastName: "User" })(
  "should render with properties firstName and lastName",
  ({ queryByTestId }) => {
    expect(queryByTestId("avatar")).not.toBeNull();
  },
);

testAvatar({ name: "Testing User" })(
  "should render with property name",
  ({ queryByTestId }) => {
    expect(queryByTestId("avatar")).not.toBeNull();
  },
);

testAvatar({ count: 2 })(
  "should render with count name",
  ({ queryByTestId }) => {
    expect(queryByTestId("avatar")).not.toBeNull();
  },
);

testAvatar({ firstName: "Testing", lastName: "User" })(
  "should render with only the initials with firstName and lastName properties",
  ({ queryByTestId }) => {
    expect(queryByTestId("avatar")).not.toBeNull();
    expect(queryByTestId("avatar-text")?.textContent).toBe("TU");
  },
);

testAvatar({
  avatarUrl: "https://t.ly/lJMVh",
  firstName: "Testing",
  lastName: "User",
})("should render with property avatarUrl", ({ queryByTestId }) => {
  expect(queryByTestId("avatar")).not.toBeNull();
  expect(queryByTestId("avatar-image")).not.toBeNull();
});

testAvatar({ name: "Testing User" })(
  "should render with only the initials with name property with a space in the middle",
  ({ queryByTestId }) => {
    expect(queryByTestId("avatar")).not.toBeNull();
    expect(queryByTestId("avatar-text")?.textContent).toBe("TU");
  },
);

testAvatar({ name: "Testing" })(
  "should render with only the initials with name property without a space in the middle",
  ({ queryByTestId }) => {
    expect(queryByTestId("avatar")).not.toBeNull();
    expect(queryByTestId("avatar-text")?.textContent).toBe("T");
  },
);

testAvatar({ size: "xl", name: "Testing" })(
  "should render properly in bigger size",
  ({ queryByTestId }) => {
    expect(queryByTestId("avatar")).not.toBeNull();
    expect(queryByTestId("avatar-text")).not.toBeNull();
    expect(queryByTestId("avatar-text")?.textContent).toBe("T");
  },
);

global.console.warn = mock(() => {});

testAvatar({ count: 0 })(
  "should warn and not render when count property is not a positive number",
  ({ queryByTestId }) => {
    expect(queryByTestId("avatar")).toBeNull();
    expect(queryByTestId("avatar-text")).toBeNull();
    expect(global.console.warn).toHaveBeenCalled();
    (global.console.warn as Mock<VoidFn>).mockReset();
  },
);
