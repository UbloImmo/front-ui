import { Meta, StoryObj } from "@storybook/react";
import { Nullable, isString, objectEntries } from "@ubloimmo/front-util";
import styled from "styled-components";

import { Tooltip } from "./Tooltip.component";
import { TooltipDirection, TooltipProps } from "./Tooltip.types";
import { Badge } from "../Badge";
import { Text } from "../Text";

import { ComponentVariants } from "@docs/blocks";
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

const TooltipIntersectionRenderer = (props: TooltipProps) => {
  const rootId = isString(props.intersectionRoot)
    ? props.intersectionRoot.replace("#", "")
    : undefined;
  return (
    <TooltipIntersectionContainer id={rootId}>
      <TooltipPaddedContainer>
        <Tooltip {...props} />
      </TooltipPaddedContainer>
    </TooltipIntersectionContainer>
  );
};

const TooltipIntersectionContainer = styled.div`
  max-height: 8rem;
  height: 8rem;
  overflow: auto;
  border-radius: var(--s-05);
  background: white;
  position: relative;
`;

const TooltipPaddedContainer = styled.div`
  padding: 30% 100%;
  position: static;
`;

const intersectionRoots = [null, "#intersection-root"];
export const IntersectionRoots = (props: Partial<TooltipProps>) => {
  const defaultProps = useMergedProps(Tooltip.defaultProps, {
    ...props,
    direction: props.direction ?? "bottom",
  });

  return (
    <ComponentVariants
      for="intersectionRoot"
      of={TooltipIntersectionRenderer}
      variants={intersectionRoots}
      defaults={defaultProps}
      scaling={1}
      columns={2}
      propLabels
    />
  );
};
