import { create } from "zustand";

export default create((set) => {
  return {
    cameraCoords: [0, 2, 0],

    cameraFocus: [0, 1, 0],

    needsToDolly: false,

    isHovering: false,

    isFocussedOnIsland: {
      sink: false,
      cooktop: false,
      tower: false,
    },

    setCameraCoords: (coords) => set({ cameraCoords: coords }),
    setCameraFocus: (coords) => set({ cameraFocus: coords }),
    setNeedsToDolly: (bool) => set({ needsToDolly: bool }),
    setIsHovering: (bool) => set({ isHovering: bool }),
    setIsFocussedOnIsland: (sink, cooktop, tower) =>
      set((state) => ({
        isFocussedOnIsland: {
          sink,
          cooktop,
          tower,
        },
      })),
  };
});
