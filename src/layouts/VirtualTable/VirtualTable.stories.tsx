import { faker as VirtualTableStories } from "@faker-js/faker";

import { defaultVirtualTableProps } from "./VirtualTable.defaults";
import { VirtualTable } from "./VirtualTable.layout";
import { FlexRowLayout } from "../Flex";
import { TableHeaderCell, type TableStyle } from "../Table";
import styles from "./VirtualTable.stories.module.scss";

import { ComponentVariants } from "@docs/blocks";
import { componentSourceFactory } from "@docs/docs.utils";
import { arrayOf } from "@utils";

import { Avatar, Button, Icon, Text } from "@components";

import type {
  VirtualTableColumnCellProps,
  VirtualTableColumnProps,
  VirtualTableDefaultProps,
  VirtualTableOverscan,
  VirtualTableProps,
} from "./VirtualTable.types";
import type { Meta } from "@storybook/react-vite";

const STORY_DATA_LENGTH = 1000;
const WINDOW_SCROLL_DATA_LENGTH = 200;
const STRESS_TEST_DATA_LENGTH = 150_000;

type StoryData = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
};

const componentSource = componentSourceFactory<VirtualTableProps<StoryData>>(
  "VirtualTable",
  {
    data: [],
    columns: [],
  },
  defaultVirtualTableProps as VirtualTableDefaultProps<StoryData>
);

const generateStoryData = (length: number): StoryData[] =>
  arrayOf(
    length,
    (index): StoryData => ({
      id: index,
      firstName: VirtualTableStories.person.firstName(),
      lastName: VirtualTableStories.person.lastName(),
      age: VirtualTableStories.number.int({ min: 18, max: 80 }),
    })
  );

const storyProps: VirtualTableProps<StoryData> = {
  data: generateStoryData(STORY_DATA_LENGTH),
  columns: [
    {
      HeaderContent: () => null,
      CellContent: ({
        item: { lastName, firstName },
      }: VirtualTableColumnCellProps<StoryData>) => (
        <Avatar size="m" lastName={lastName} firstName={firstName} />
      ),
      fixedWidth: "s-11",
      colSpan: 1,
    },
    {
      HeaderContent: "Last name",
      CellContent: ({
        item: { lastName },
      }: VirtualTableColumnCellProps<StoryData>) => <Text>{lastName}</Text>,
      colSpan: 2,
      fixedWidth: "50%",
    },
    {
      HeaderContent: "First name",
      CellContent: ({
        item: { firstName },
      }: VirtualTableColumnCellProps<StoryData>) => <Text>{firstName}</Text>,
      colSpan: 2,
      fixedWidth: "50%",
    },
    {
      HeaderContent: "Age",
      CellContent: ({
        item: { age },
      }: VirtualTableColumnCellProps<StoryData>) => (
        <Text>{age} years old</Text>
      ),
      fixedWidth: "150px",
      colSpan: 1,
    },
  ],
  EmptyState: {
    title: "No data",
    description: "No data found",
    asset: "EmptyBox",
    icon: "Person",
  },
  paddedCells: true,
  height: "300px",
  layout: "auto",
};

const meta = {
  component: VirtualTable<StoryData>,
  title: "Layouts/VirtualTable/Stories",
  args: storyProps,
  parameters: {
    docs: componentSource([storyProps]),
  },
} satisfies Meta<typeof VirtualTable<StoryData>>;

export default meta;

export const Default = {
  args: storyProps,
  parameters: {
    docs: componentSource([storyProps]),
  },
};

const emptyProps: VirtualTableProps<StoryData> = {
  ...storyProps,
  height: "16rem",
  data: [],
};

export const Empty = {
  args: emptyProps,
  parameters: {
    docs: componentSource([emptyProps]),
  },
};

const loadingProps: VirtualTableProps<StoryData> = {
  ...storyProps,
  height: "s-11",
  data: [],
  loading: true,
};

export const Loading = {
  args: loadingProps,
  parameters: {
    docs: componentSource([loadingProps]),
  },
};

const useWindowScrollProps: VirtualTableProps<StoryData> = {
  ...storyProps,
  data: generateStoryData(WINDOW_SCROLL_DATA_LENGTH),
  useWindowScroll: true,
  onItemClick: (_item) => {},
  height: null,
};

export const UseWindowScroll = {
  args: useWindowScrollProps,
  parameters: {
    docs: componentSource([useWindowScrollProps]),
  },
};

const overscans: VirtualTableOverscan[] = [
  0,
  "400px",
  { top: "0px", bottom: "400px" },
];
export const Overscan = () => (
  <ComponentVariants
    defaults={storyProps}
    of={VirtualTable<StoryData>}
    variants={overscans}
    for="overscan"
    columns={1}
    propLabels
  />
);
Overscan.parameters = {
  docs: componentSource(
    overscans.map((overscan) => ({
      ...storyProps,
      overscan,
    }))
  ),
};

const tableStyles: TableStyle[] = ["list", "form"];

export const Styles = () => (
  <ComponentVariants
    defaults={storyProps}
    of={VirtualTable<StoryData>}
    variants={tableStyles}
    for="style"
    columns={1}
    propLabels
  />
);
Styles.parameters = {
  docs: componentSource(
    tableStyles.map((style) => ({
      ...storyProps,
      style,
    }))
  ),
};

const headerProps: VirtualTableProps<StoryData> = {
  ...storyProps,
  data: [],
  EmptyState: null,
  height: "s-10",
  columns: [
    {
      HeaderContent: "String header",
      CellContent: () => null,
    },
    {
      HeaderContent: {
        label: "Labeled object header",
        tooltip: {
          content: "With tooltip",
          children: null,
        },
      },
      CellContent: () => <Text />,
    },
    {
      HeaderContent: () => (
        <Text color="warning-medium" weight="bold" underline>
          Component Header
        </Text>
      ),
      CellContent: () => null,
    },
    {
      HeaderContent: {
        ReplacementCell: () => (
          <TableHeaderCell className={styles["custom-header-cell"]}>
            <FlexRowLayout align="center" fill="row" justify="start" gap="s-1">
              <Icon name="Stars" color="success-medium" size="s-3" />
              <Text color="success-dark" italic weight="bold">
                Replaced cell
              </Text>
            </FlexRowLayout>
          </TableHeaderCell>
        ),
      },
      CellContent: () => null,
    },
  ],
};

export const Headers = {
  args: headerProps,
  parameters: {
    docs: componentSource([headerProps]),
  },
};

const cellProps: VirtualTableProps<StoryData> = {
  ...headerProps,
  data: generateStoryData(1),
  height: "6rem",
  columns: [
    {
      HeaderContent: "Empty cell",
      CellContent: () => null,
    },
    {
      HeaderContent: "Text",
      // eslint-disable-next-line react/prop-types
      CellContent: ({ item }) => <Text>{item.firstName}</Text>,
    },
    {
      HeaderContent: "Button",
      CellContent: () => <Button>Click me</Button>,
    },
    {
      HeaderContent: "Icon",
      CellContent: () => <Icon name="Person" />,
    },
  ],
};

export const Cells = {
  args: cellProps,
  parameters: {
    docs: componentSource([cellProps]),
  },
};

const singleColumnProps = (
  column: VirtualTableColumnProps<StoryData>
): VirtualTableProps<StoryData> => ({
  ...cellProps,
  columns: [column],
});

const singleColumnDefault = singleColumnProps({
  HeaderContent: "Cell",
  CellContent: () => <Text>Cell content</Text>,
});

const bools = [false, true];

export const PaddedCells = () => (
  <ComponentVariants
    defaults={singleColumnDefault}
    of={VirtualTable<StoryData>}
    variants={bools}
    for="paddedCells"
    columns={2}
    propLabels
  />
);
PaddedCells.parameters = {
  docs: componentSource(
    bools.map((paddedCells) => ({
      ...singleColumnDefault,
      paddedCells,
    }))
  ),
};

const stressTestProps: VirtualTableProps<StoryData> = {
  ...storyProps,
  data: generateStoryData(STRESS_TEST_DATA_LENGTH),
  height: null,
  useWindowScroll: true,
  overscan: "1000px",
};

export const StressTest = {
  args: stressTestProps,
  parameters: {
    docs: componentSource([stressTestProps]),
  },
};
