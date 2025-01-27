// styled.d.ts
import "styled-components";

import { Theme } from "./theme.types";
declare module "styled-components" {
  export type DefaultTheme = Theme;
}
