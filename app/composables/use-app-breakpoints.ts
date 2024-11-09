import { breakpointsTailwind } from "@vueuse/core";

export const useAppBreakpoints = () => {
  const breakpoints = {
    "2xs": 320,
    xs: 475,
    ...breakpointsTailwind,
  };
  return useBreakpoints(breakpoints);
};
