import { css } from "styled-components";

import {
  EnergyLabelProps,
  EnergyLabelType,
  EnergyLabelValue,
} from "./EnergyLabel.types";

import { HexColorOpaque, StyleProps } from "@types";
import { cssVarUsage, fromStyleProps } from "@utils";

type EnergyLabelColors = Record<
  EnergyLabelType,
  Record<EnergyLabelValue, HexColorOpaque>
>;

const colors: EnergyLabelColors = {
  DPE: {
    A: "#009C6D",
    B: "#52B153",
    C: "#78BD76",
    D: "#E3D600",
    E: "#F0B50F",
    F: "#EB8235",
    G: "#D7221F",
  },
  GES: {
    A: "#A4DBF8",
    B: "#8CB4D3",
    C: "#7792B1",
    D: "#606F8F",
    E: "#4D5271",
    F: "#393551",
    G: "#281B35",
  },
};
const getBackgroundColor = (type: EnergyLabelType, value: EnergyLabelValue) => {
  return colors[type][value];
};

export const energyLabelStyle = (props: StyleProps<EnergyLabelProps>) => {
  const { type, value, state } = fromStyleProps<EnergyLabelProps>(props);

  const activeState = state === "active" && value;

  const backgroundColor = activeState
    ? getBackgroundColor(type, value)
    : "#F9F9FD";

  const textColor = activeState ? "white" : cssVarUsage("gray-600");

  return css`
    width: var(--s-6);
    height: var(--s-8);
    display: flex;
    align-items: center;
    justify-content: center;
    span[data-testid="energy-label-value"] {
      color: ${textColor};
    }
    background-color: ${backgroundColor};
    border-radius: var(--s-1);
    user-select: none;
    ${!activeState &&
    css`
      border: 1px solid var(--gray-300);
    `}
  `;
};
