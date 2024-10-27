export const useAnimation = () => {
  const headerAnimations = useState<
    {
      element: HTMLElement;
      class: string;
      timeout: number;
    }[]
  >("headerAnimations", () => []);

  const setHeaderAnimation = (headerAnimation: {
    element: HTMLElement;
    class: string;
    timeout: number;
  }) => {
    headerAnimations.value.push(headerAnimation);
  };

  return {
    headerAnimations,
    setHeaderAnimation,
  };
};
