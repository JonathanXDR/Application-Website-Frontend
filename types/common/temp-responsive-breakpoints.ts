import type { Breakpoints } from "./Breakpoint";

type ResponsiveSizeTypeTailwind<T extends string> = T | string;
type ResponsiveSizeType<T extends string> =
  `${Breakpoints}:${ResponsiveSizeTypeTailwind<T>}`;

export type ResponsiveBreakpoints<T extends string> =
  | ResponsiveSizeTypeTailwind<T>
  | ResponsiveSizeType<T>;
