import { Meta, StoryObj } from "@storybook/react";
import { Nullable, objectEntries } from "@ubloimmo/front-util";
import styled from "styled-components";

import { Tooltip } from "./Tooltip.component";
import { TooltipDirection, TooltipProps } from "./Tooltip.types";
import { Badge } from "../Badge";
import { Text } from "../Text";

import { useMergedProps } from "@utils";

const Container = styled.div`
  height: 6rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip/Stories",
  component: Tooltip,
  argTypes: {
    direction: {
      options: ["top", "bottom", "left", "right"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const directions: TooltipDirection[] = ["top", "bottom", "left", "right"];

export const Directions = (props: Partial<TooltipProps>) => {
  const defaultProps = useMergedProps(Tooltip.defaultProps, props);
  return (
    <Container>
      {directions.map((direction) => (
        <Tooltip {...defaultProps} direction={direction} key={direction} />
      ))}
    </Container>
  );
};

const contents = ["Some hint", "A much longer and much more descriptive hint"];

export const Content = (props: Partial<TooltipProps>) => {
  const defaultProps = useMergedProps(Tooltip.defaultProps, props);
  return (
    <Container>
      {contents.map((content) => (
        <Tooltip {...defaultProps} content={content} key={content} />
      ))}
    </Container>
  );
};

const children: Record<string, Nullable<JSX.Element>> = {
  null: null,
  badge: <Badge />,
  text: <Text>Text</Text>,
};

export const Children = (props: Partial<TooltipProps>) => {
  const defaultProps = useMergedProps(Tooltip.defaultProps, props);
  return (
    <Container>
      {objectEntries(children).map(([key, child]) => (
        <Tooltip {...defaultProps} key={key}>
          {child}
        </Tooltip>
      ))}
    </Container>
  );
};
