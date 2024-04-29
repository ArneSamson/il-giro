import { create } from "zustand";

export default create((set) => {
  return {
    toolTip: {
      target: null,
      content: "",
      active: false,
    },
    currentPage: 0,
    isSecondDetailsOpen: false,
    landingPageVisible: true,
    textureIsLoading: false,

    setToolTip: (target, content, active) =>
      set((state) => ({
        toolTip: {
          target,
          content,
          active,
        },
      })),
    setCurrentPage: (page) => set({ currentPage: page }),
    setIsSecondDetailsOpen: (open) => set({ isSecondDetailsOpen: open }),
    setLandingPageVisible: (visible) => set({ landingPageVisible: visible }),
    setTextureIsLoading: (loading) => set({ textureIsLoading: loading }),
  };
});
