import { fn } from "@storybook/test";

import { EntityInfoCard } from "./EntityInfoCard.component";

import { ComponentVariants, type PropVariant } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { FlexColumnLayout, FlexRowLayout } from "@layouts";
import { useMergedProps } from "@utils";

import {
  type InfoBoxProps,
  type CopyClipboardInfoCardProps,
  Avatar,
  Heading,
  Badge,
  type StateIndicatorProps,
  type ActionIconProps,
} from "@components";

import type {
  EntityAction,
  EntityActionIcon,
  EntityInfoCardProps,
  EntityStatusRow,
} from "./EntityInfoCard.types";
import type { Meta, StoryObj } from "@storybook/react";
import type { Nullable } from "@ubloimmo/front-util";

const componentSource = componentSourceFactory<EntityInfoCardProps>(
  "EntityInfoCard",
  {
    state: EntityInfoCard.defaultProps.state,
    accountBalance: EntityInfoCard.defaultProps.accountBalance,
  },
  EntityInfoCard.defaultProps
);

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
    info: null,
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
    info: null,
  },
];

const statusRows: EntityStatusRow[] = [
  {
    label: "Contrat de location :",
    badge: {
      label: "Expiré",
      color: "error",
      icon: "ExclamationCircleFill",
    },
  },
  {
    label: "Assurance :",
    badge: {
      label: "Valide",
      color: "success",
      icon: "CheckCircleFill",
    },
  },
];

const actions: EntityAction[] = [
  {
    label: "Planifier la sortie",
    icon: "Clock",
  },
];

const actionIcon: EntityActionIcon = {
  title: "Supprimer",
  icon: "Trash3",
  color: "error",
};

const defaultEntityCardProps: EntityInfoCardProps = {
  name: "[Name]",
  state: {
    label: "[State]",
    icon: "Circle",
  },
  infoCards: [...infoCards].slice(0, 2).map((card) => ({
    ...card,
    info: null,
  })),
};

const moralProfileEntityCardProps: EntityInfoCardProps = {
  name: "Action Logement",
  state: {
    label: "Personne morale créée le [jj/mm/yyyy]",
    icon: "Bank",
    color: "primary",
  },
  actionIcon,
  infoCards,
  onInfoCopied: fn(),
};

const personalProfileEntityCardProps: EntityInfoCardProps = {
  name: "Mathilde Carbonet",
  state: {
    label: "Personne physique créée le [jj/mm/yyyy]",
    icon: "EmojiSmile",
    color: "primary",
  },
  actionIcon,
  infoCards: [...infoCards].slice(0, 3),
  infoBoxes,
  onInfoCopied: fn(),
};

const rentalFolderEntityCardProps: EntityInfoCardProps = {
  state: {
    label: "Location active depuis le [jj/mm/yyyy]",
    icon: "CircleFill",
    color: "success",
  },
  actionIcon,
  statusRows,
  actions,
  onInfoCopied: fn(),
};

const agencEntityCardProps: EntityInfoCardProps = {
  name: "[Agency]",
  state: {
    label: "Agence crée le [jj/mm/yyyy]",
    icon: "Shop",
  },
  actionIcon,
  infoCards: [...infoCards].slice(0, 4),
  onInfoCopied: fn(),
};

const meta = {
  component: EntityInfoCard,
  title: "Components/Entity/EntityInfoCard/Stories",
  parameters: {
    docs: componentSource(),
  },
} satisfies Meta<typeof EntityInfoCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {
  args: defaultEntityCardProps,
  parameters: {
    docs: componentSource([defaultEntityCardProps]),
  },
} as Story;

export const MoralProfile: Story = {
  args: moralProfileEntityCardProps,
  parameters: {
    docs: componentSource([moralProfileEntityCardProps]),
  },
};

export const PersonalProfile: Story = {
  args: personalProfileEntityCardProps,
  parameters: {
    docs: componentSource([personalProfileEntityCardProps]),
  },
};

export const RentalFolder: Story = {
  args: rentalFolderEntityCardProps,
  parameters: {
    docs: componentSource([rentalFolderEntityCardProps]),
  },
};

export const Agency: Story = {
  args: agencEntityCardProps,
  parameters: {
    docs: componentSource([agencEntityCardProps]),
  },
};

const exampleVariants = [
  {
    ...agencEntityCardProps,
    __propVariantLabel: "Agency",
  },
  {
    ...rentalFolderEntityCardProps,
    __propVariantLabel: "Rental folder",
  },
  {
    ...personalProfileEntityCardProps,
    __propVariantLabel: "Personal profile",
  },
  {
    ...moralProfileEntityCardProps,
    __propVariantLabel: "Moral profile",
  },
];

export const Examples = (props: EntityInfoCardProps) => {
  const mergedProps = useMergedProps(EntityInfoCard.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={exampleVariants}
      of={EntityInfoCard}
      scaling={1}
    />
  );
};
Examples.parameters = {
  docs: componentSource([
    agencEntityCardProps,
    rentalFolderEntityCardProps,
    personalProfileEntityCardProps,
    moralProfileEntityCardProps,
  ]),
};

export const InfoCards = (props: EntityInfoCardProps) => {
  const mergedProps = useMergedProps(EntityInfoCard.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={[[], infoCards]}
      for="infoCards"
      of={EntityInfoCard}
      scaling={1}
    />
  );
};

const sharedInfos = [
  {
    label: "Label 1",
    icon: "CircleFill",
    color: "primary",
    info: "Info 1",
  },
  {
    label: "Label 2",
    icon: "SquareFill",
    color: "primary",
    info: "Info 2",
  },
  {
    label: "Label 3",
    icon: "TriangleFill",
    color: "primary",
    info: "Info 3",
  },
] as const;

const infoStyleVariants = [
  {
    __propVariantLabel: "InfoBox",
    infoBoxes: sharedInfos.map(
      (info): InfoBoxProps => ({
        label: info.label,
        icon: info.icon,
        info: info.info,
      })
    ),
  },
  {
    __propVariantLabel: "CopyClipboardInfoCard",
    infoCards: sharedInfos.map(
      (info): CopyClipboardInfoCardProps => ({
        info: info.info,
        icon: info.icon,
      })
    ),
  },
  {
    __propVariantLabel: "StatusRow with Badge",
    statusRows: sharedInfos.map(
      (info): EntityStatusRow => ({
        label: info.label,
        badge: {
          label: info.info,
          color: info.color,
          icon: info.icon,
        },
      })
    ),
  },
  {
    __propVariantLabel: "All",
    infoBoxes: sharedInfos.map(
      (info): InfoBoxProps => ({
        label: info.label,
        icon: info.icon,
        info: info.info,
      })
    ),
    infoCards: sharedInfos.map(
      (info): CopyClipboardInfoCardProps => ({
        info: info.info,
        icon: info.icon,
      })
    ),
    statusRows: sharedInfos.map(
      (info): EntityStatusRow => ({
        label: info.label,
        badge: {
          label: info.info,
          color: info.color,
          icon: info.icon,
        },
      })
    ),
  },
];

export const InfoStyles = (props: EntityInfoCardProps) => {
  const mergedProps = useMergedProps(EntityInfoCard.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={infoStyleVariants}
      of={EntityInfoCard}
      scaling={1}
    />
  );
};
InfoStyles.parameters = {
  docs: componentSource(
    infoStyleVariants.map(
      ({ __propVariantLabel, ...variant }): EntityInfoCardProps => ({
        ...EntityInfoCard.defaultProps,
        ...variant,
      })
    )
  ),
};

const contentVariants = [
  {
    __propVariantLabel: "Name",
    name: "[Name]",
  },
  {
    __propVariantLabel: "Custom content",
    state: {
      icon: "Wallet",
      label: "[State]",
    } as StateIndicatorProps,
    children: (
      <FlexRowLayout fill gap="s-2" align="center">
        <Avatar name="Mathilde Carbonet" size="xl" />
        <FlexColumnLayout fill gap="s-1">
          <Heading size="h2" weight="bold">
            Mathilde Carbonet
          </Heading>
          <Badge icon="Box" label="2 lots" color="gray" />
        </FlexColumnLayout>
      </FlexRowLayout>
    ),
  },
];

export const MainContent = (props: EntityInfoCardProps) => {
  const mergedProps = useMergedProps(EntityInfoCard.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={contentVariants}
      of={EntityInfoCard}
      scaling={1}
    />
  );
};
MainContent.parameters = {
  docs: componentSource(
    contentVariants.map(
      ({ __propVariantLabel, ...variant }): EntityInfoCardProps => ({
        ...EntityInfoCard.defaultProps,
        ...variant,
      })
    )
  ),
};

const states = [agencEntityCardProps.state, rentalFolderEntityCardProps.state];
export const State = (props: EntityInfoCardProps) => {
  const mergedProps = useMergedProps(EntityInfoCard.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={states}
      for="state"
      of={EntityInfoCard}
    />
  );
};
State.parameters = {
  docs: componentSource(
    states.map((state) => ({
      ...EntityInfoCard.defaultProps,
      state,
    }))
  ),
};

const actionIcons: Nullable<ActionIconProps>[] = [
  actionIcon,
  {
    title: "Duplicate",
    icon: "Copy",
    color: "white",
  },
];
export const ActionIcon = (props: EntityInfoCardProps) => {
  const mergedProps = useMergedProps(EntityInfoCard.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={actionIcons}
      for="actionIcon"
      of={EntityInfoCard}
    />
  );
};
ActionIcon.parameters = {
  docs: componentSource(
    actionIcons.map((actionIcon) => ({
      ...EntityInfoCard.defaultProps,
      actionIcon,
    }))
  ),
};

const contextMenus: PropVariant<Partial<EntityInfoCardProps>>[] = [
  { actionIcon, contextMenu: null, __propVariantLabel: "No context menu" },
  {
    __propVariantLabel: "With Context menu",
    actionIcon,
    contextMenu: {
      items: [
        {
          label: "Item 1",
        },
        {
          label: "Item 2 lorem ipsum dolor sit amet",
          icon: "Alarm",
          badgeLabel: "new",
          disabled: true,
        },
      ],
    },
  },
];
export const ContextMenu = (props: EntityInfoCardProps) => {
  const mergedProps = useMergedProps(EntityInfoCard.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={contextMenus}
      of={EntityInfoCard}
    />
  );
};
ContextMenu.parameters = {
  docs: componentSource(
    contextMenus.map(({ __propVariantLabel, ...variant }) => ({
      ...EntityInfoCard.defaultProps,
      ...variant,
    }))
  ),
};

const accountBalanceVariants: PropVariant<Partial<EntityInfoCardProps>>[] = [
  {
    __propVariantLabel: "With state indicator",
    state: {
      label: "State",
      icon: "Circle",
    },
  },
  {
    __propVariantLabel: "With account balance",
    accountBalance: {
      title: "Account Balance",
      value: 12300,
    },
  },
];

export const AccountBalance = (props: EntityInfoCardProps) => {
  const mergedProps = useMergedProps(EntityInfoCard.defaultProps, props);

  return (
    <ComponentVariants
      columns={2}
      defaults={mergedProps}
      variants={accountBalanceVariants}
      of={EntityInfoCard}
    />
  );
};
