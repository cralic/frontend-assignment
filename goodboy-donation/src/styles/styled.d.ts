import "styled-components";
import type { AppTokens } from "./tokens";

declare module "styled-components" {
  export interface DefaultTheme extends AppTokens {}
}
