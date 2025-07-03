import { useState } from "react";

import { SideEntityMenu } from "./SideEntityMenu.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type {
  SideEntityMenuProps,
  SideEntityMenuLink,
} from "./SideEntityMenu.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource =
  componentSourceFactory<SideEntityMenuProps>("SideEntityMenu");

// Mock data for the menu links
const mockMenuLinks: SideEntityMenuLink[] = [
  {
    title: "Dossier 1234",
    icon: "Folder2",
    to: "/",
    head: true,
  },
  {
    title: "Journal du solde",
    icon: "Abacus",
    to: "/journal",
    pinned: true,
  },
  {
    title: "Appels de fonds & facturation",
    icon: "Invoices2",
    to: "/invoice",
    pinned: true,
  },
  {
    title: "Informations de paiement",
    icon: "CreditCard",
    to: "/payment",
    pinned: true,
  },
  {
    title: "Locataires et tiers",
    icon: "EmojiSmile",
    to: "/tenants",
  },
  {
    title: "Lots",
    icon: "Buildings",
    to: "/lots",
  },
  {
    title: "Loyer",
    icon: "Coins",
    to: "/rent",
  },
  {
    title: "Indexation du loyer",
    icon: "GraphUpArrow",
    to: "/indexation",
  },
  {
    title: "Contrat de location",
    icon: "JournalMedical",
    to: "/contract",
  },
  {
    title: "Paramètres de facturation",
    icon: "Sliders",
    to: "/billing-settings",
  },
  {
    title: "Assurances",
    icon: "ShieldCheck",
    to: "/insurance",
  },
  {
    title: "États des lieux",
    icon: "Search",
    to: "/inspections",
  },
  {
    title: "Accès portail locataire",
    icon: "DoorOpen",
    to: "/portal-access",
  },
];

const mockMenuLinksWithNonClickableTitle: SideEntityMenuLink[] = [
  {
    title: "Identité administrative",
    to: "/info",
    icon: "InfoCircle",
  },
];

const mockBackLinks: SideEntityMenuLink[] = [
  {
    title: "Dossiers de location",
    to: "/folders",
  },
];

const defaultEntityMenuProps: SideEntityMenuProps = {
  menuLinks: mockMenuLinks,
  backLinks: mockBackLinks,
};

const meta: Meta<typeof SideEntityMenu> = {
  title: "Components/Navigation/SideEntityMenu/Stories",
  component: SideEntityMenu,
  parameters: {
    docs: componentSource(),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState<string>("/");

    const menuLinksWithOnClick = args.menuLinks.map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    const backLinksWithOnClick = (args.backLinks || []).map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    return (
      <SideEntityMenu
        {...args}
        menuLinks={menuLinksWithOnClick}
        backLinks={backLinksWithOnClick}
        activeItem={activeItem}
      />
    );
  },
  args: defaultEntityMenuProps,
  parameters: {
    docs: componentSource([defaultEntityMenuProps]),
  },
};

export const WithoutBackLinks: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState<string>("/");

    const menuLinksWithOnClick = args.menuLinks.map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    return (
      <SideEntityMenu
        {...args}
        menuLinks={menuLinksWithOnClick}
        activeItem={activeItem}
      />
    );
  },
  args: {
    menuLinks: mockMenuLinks,
    backLinks: [],
  },
};

export const WithErrorState: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState<string>(
      "/configuration-error"
    );

    const menuLinksWithOnClick = args.menuLinks.map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    const backLinksWithOnClick = (args.backLinks || []).map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    return (
      <SideEntityMenu
        {...args}
        menuLinks={menuLinksWithOnClick}
        backLinks={backLinksWithOnClick}
        activeItem={activeItem}
      />
    );
  },
  args: {
    menuLinks: [
      ...mockMenuLinks.slice(0, 3),
      {
        title: "Configuration Error",
        icon: "ExclamationTriangle",
        error: true,
        to: "/configuration-error",
      },
      ...mockMenuLinks.slice(3, 6),
    ],
    backLinks: mockBackLinks,
  },
};

export const WithNonClickableTitle: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState<string>("/info");

    const menuLinksWithOnClick = args.menuLinks.map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    const backLinksWithOnClick = (args.backLinks || []).map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    return (
      <SideEntityMenu
        {...args}
        menuLinks={menuLinksWithOnClick}
        backLinks={backLinksWithOnClick}
        activeItem={activeItem}
      />
    );
  },
  args: {
    menuLinks: mockMenuLinksWithNonClickableTitle,
    title: "Organisation & collaborateurs",
    titleIcon: "BusinessUnitFill2",
    backLinks: mockBackLinks,
  },
};

export const WithHiddenItems: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState<string>("/journal");

    const menuLinksWithOnClick = args.menuLinks.map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    const backLinksWithOnClick = (args.backLinks || []).map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    return (
      <SideEntityMenu
        {...args}
        menuLinks={menuLinksWithOnClick}
        backLinks={backLinksWithOnClick}
        activeItem={activeItem}
      />
    );
  },
  args: {
    backLinks: mockBackLinks,
    menuLinks: mockMenuLinks.map((link, index) => ({
      ...link,
      hidden: index % 3 === 0,
    })),
  },
};

export const WithIndividualDisabledItems: Story = {
  render: (args) => {
    const [activeItem, setActiveItem] = useState<string>("/");

    const menuLinksWithOnClick = args.menuLinks.map((link) => ({
      ...link,
      onClick: link.disabled ? undefined : () => setActiveItem(link.to),
    }));

    const backLinksWithOnClick = (args.backLinks || []).map((link) => ({
      ...link,
      onClick: () => setActiveItem(link.to),
    }));

    return (
      <SideEntityMenu
        {...args}
        menuLinks={menuLinksWithOnClick}
        backLinks={backLinksWithOnClick}
        activeItem={activeItem}
      />
    );
  },
  args: {
    menuLinks: mockMenuLinks.map((link) => ({
      ...link,
      disabled: link.title === "Paramètres de facturation",
    })),
    backLinks: mockBackLinks,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows individual menu items can be disabled while others remain active.",
      },
    },
  },
};
