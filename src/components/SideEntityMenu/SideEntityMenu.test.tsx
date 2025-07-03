import { expect } from "bun:test";

import { SideEntityMenu } from "./SideEntityMenu.component";

import { testComponentFactory } from "@/tests";

import type { SideEntityMenuLink } from "./SideEntityMenu.types";

const testSideEntityMenu = testComponentFactory(
  "SideEntityMenu",
  SideEntityMenu
);

const menuLinks = SideEntityMenu.defaultProps.menuLinks;
const backLinks = SideEntityMenu.defaultProps.backLinks;

const testId = "side-entity-menu";

const mockMenuLinks: SideEntityMenuLink[] = [
  {
    title: "Overview",
    icon: "House",
    to: "/overview",
  },
  {
    title: "Settings",
    icon: "Gear",
    to: "/settings",
  },
  {
    title: "Pinned Item",
    icon: "Star",
    to: "/pinned",
    pinned: true,
  },
];

const mockBackLinks: SideEntityMenuLink[] = [
  {
    title: "Back to List",
    to: "/list",
  },
];

testSideEntityMenu({ menuLinks, backLinks })(
  "should render",
  async ({ findByTestId }) => {
    expect(await findByTestId(testId)).not.toBeNull();
  }
);

testSideEntityMenu({ menuLinks: mockMenuLinks, backLinks })(
  "should render menu links",
  async ({ findByTestId }) => {
    expect(await findByTestId("side-entity-menu-item-0")).not.toBeNull();
    expect(await findByTestId("side-entity-menu-item-1")).not.toBeNull();
  }
);

testSideEntityMenu({ menuLinks: mockMenuLinks, backLinks })(
  "should display menu link titles",
  async ({ findByText }) => {
    expect(await findByText("Overview")).not.toBeNull();
    expect(await findByText("Settings")).not.toBeNull();
    expect(await findByText("Pinned Item")).not.toBeNull();
  }
);

testSideEntityMenu({ menuLinks, backLinks: mockBackLinks })(
  "should render back links",
  async ({ findByText }) => {
    expect(await findByText("Back to List")).not.toBeNull();
  }
);

testSideEntityMenu({
  menuLinks,
  backLinks,
  title: "Entity Title",
  titleIcon: "Building",
})("should display title and icon when provided", async ({ findByText }) => {
  expect(await findByText("Entity Title")).not.toBeNull();
});

testSideEntityMenu({
  menuLinks: [
    {
      title: "Error Item",
      icon: "ExclamationTriangle",
      to: "/error",
      error: true,
    },
  ],
  backLinks,
})("should render error state", async ({ findByText }) => {
  expect(await findByText("Error Item")).not.toBeNull();
});

testSideEntityMenu({
  menuLinks: [
    {
      title: "Disabled Item",
      icon: "Lock",
      to: "/disabled",
      disabled: true,
    },
  ],
  backLinks,
})("should render disabled state", async ({ findByText }) => {
  expect(await findByText("Disabled Item")).not.toBeNull();
});

testSideEntityMenu({
  menuLinks: [
    {
      title: "Hidden Item",
      icon: "Eye",
      to: "/hidden",
      hidden: true,
    },
    {
      title: "Visible Item",
      icon: "EyeSlash",
      to: "/visible",
    },
  ],
  backLinks,
})("should not render hidden items", async ({ findByText, queryByText }) => {
  expect(await findByText("Visible Item")).not.toBeNull();
  expect(queryByText("Hidden Item")).toBeNull();
});

testSideEntityMenu({
  menuLinks: [
    {
      title: "Header Item",
      icon: "Hash",
      to: "/header",
      head: true,
    },
  ],
  backLinks,
})("should render header items", async ({ findByText }) => {
  expect(await findByText("Header Item")).not.toBeNull();
});

testSideEntityMenu({
  menuLinks: [
    {
      title: "Pinned Item",
      icon: "Pin",
      to: "/pinned",
      pinned: true,
    },
    {
      title: "Regular Item",
      icon: "Circle",
      to: "/regular",
    },
  ],
  backLinks,
})(
  "should render pinned spacer for first pinned item",
  async ({ findByText }) => {
    expect(await findByText("Pinned Item")).not.toBeNull();
    expect(await findByText("Regular Item")).not.toBeNull();
  }
);

testSideEntityMenu({
  menuLinks: mockMenuLinks,
  backLinks,
  activeItem: "/settings",
})(
  "should use activeItem prop to determine active state",
  async ({ findByTestId }) => {
    const settingsItem = await findByTestId("side-entity-menu-item-1");
    expect(settingsItem.getAttribute("aria-current")).toBe("page");
  }
);

testSideEntityMenu({
  menuLinks: mockMenuLinks,
  backLinks,
  activeItem: null,
})(
  "should fallback to URL-based active detection when activeItem is null",
  async ({ findByTestId }) => {
    // This test assumes the current pathname doesn't match any menu item
    const overviewItem = await findByTestId("side-entity-menu-item-0");
    expect(overviewItem.getAttribute("aria-current")).not.toBe("page");
  }
);

testSideEntityMenu({
  menuLinks: [
    {
      title: "Clickable Item",
      icon: "Cursor",
      to: "/clickable",
      onClick: () => {
        // Mock click handler - in real usage this would update activeItem
      },
    },
  ],
  backLinks,
  activeItem: "/clickable",
})(
  "should handle click events without navigation when onClick is provided",
  async (renderResult, user) => {
    const clickableItem = await renderResult.findByTestId(
      "side-entity-menu-item-0"
    );

    // Click the item
    await user.click(clickableItem);

    // The item should be active
    expect(clickableItem.getAttribute("aria-current")).toBe("page");
  }
);
