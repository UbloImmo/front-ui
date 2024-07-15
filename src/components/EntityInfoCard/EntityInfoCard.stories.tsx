import { EntityInfoCard } from "./EntityInfoCard.component";

import { componentSourceFactory } from "@docs/docs.utils";

import type { InfoBoxProps, CopyClipboardInfoCardProps } from "@components";

import type { EntityInfoCardProps } from "./EntityInfoCard.types";
import type { Meta, StoryObj } from "@storybook/react";

const componentSource =
  componentSourceFactory<EntityInfoCardProps>("EntityInfoCard");

const infoCards: CopyClipboardInfoCardProps[] = [
  {
    icon: "Envelope",
    info: "contact@actionlogement.fr",
    href: "mailto:contact@actionlogement.fr",
  },
  {
    icon: "Telephone",
    info: "+33 6 00 00 00 00",
    href: "tel:+33 6 00 00 00 00",
  },
  {
    icon: "GeoAlt",
    info: "32 rue des Violettes,\n\n75004 Paris",
  },
  {
    icon: "Cursor",
    info: "actionlogement.fr",
    href: "actionlogement.fr",
  },
  {
    icon: "Award",
    info: "Mathilde Carbonet",
  },
];

const infoBoxes: InfoBoxProps[] = [
  {
    icon: "HouseHeart",
    label: "Famille",
    info: "Marié(e)",
  },
  {
    icon: "Briefcase",
    label: "Profession",
    info: "Employé(e) CDI",
  },
  {
    icon: "CashStack",
    label: "Ressources",
    info: "1 800,00 €",
  },
  {
    icon: "PiggyBank",
    label: "Allocations",
    info: "350,00 €",
  },
];

const moralProfileEntityCardProps: EntityInfoCardProps = {
  name: "Action Logement",
  state: {
    label: "Personne morale créée le [jj/mm/yyyy]",
    icon: "Bank",
    color: "primary",
  },
  action: {
    title: "Supprimer",
    icon: "Trash3",
    color: "error",
  },
  infoCards,
};

const personalProfileEntityCardProps: EntityInfoCardProps = {
  name: "Mathilde Carbonet",
  state: {
    label: "Personne physique créée le [jj/mm/yyyy]",
    icon: "EmojiSmile",
    color: "primary",
  },
  action: {
    title: "Supprimer",
    icon: "Trash3",
    color: "error",
  },
  infoCards: [...infoCards.slice(0, 3)],
  infoBoxes,
};

const meta = {
  component: EntityInfoCard,
  title: "Components/EntityInfoCard/Stories",
  args: {
    // TODO
    name: "[Name]",
    infoCards: [
      {
        info: null,
        icon: "Envelope",
      },
      {
        info: null,
        icon: "Telephone",
      },
    ],
  },
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof EntityInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} as Story;

export const MoralProfile: Story = {
  args: moralProfileEntityCardProps,
};

export const PersonalProfile: Story = {
  args: personalProfileEntityCardProps,
};
