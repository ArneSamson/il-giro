import { create } from "zustand";

export default create((set) => {
  let materialData;
  let categoryData;

  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      categoryData = data.categories;
      materialData = data.materials;
      // console.log('materialData:', materialData);
      // console.log('categoryData:', categoryData);

      const allCategories = {};
      Object.entries(categoryData).forEach(([category, materials]) => {
        allCategories[category] = materials.map((materialName) => ({
          name: materialName,
          url: materialData[materialName]?.url || "", // Get material URL from material data
        }));
      });

      const allMaterials = Object.entries(materialData).map(
        ([name, material]) => ({
          name,
          url: material.url,
        })
      );

      console.log("allMaterials:", allMaterials);
      console.log("allCategories:", allCategories);

      set({ allMaterials, allCategories });
    })
    .catch((error) => console.error("Error fetching texture:", error));

  return {
    //materials
    allMaterials: [],
    allCategories: [],

    //config settings_______________________________________________________________________________
    sinkChosen: true,
    cooktopChosen: true,
    towerChosen: true,
    tableChosen: false,

    sinkPosition: [0, 0, 0],
    sinkRotation: [0, 0, 0],

    cooktopPosition: [0, 0, 0],
    cooktopRotation: [0, 0, 0],

    towerPosition: [0, 0, 0],
    towerRotation: [0, 0, 0],

    tablePosition: [0, 0, 0],
    tableRotation: [0, 0, 0],

    mainMaterial: "./placeholder/",
    accentMaterial: "./placeholder/",
    tableTopMaterial: "./placeholder/",
    tableTopMaterialCategory: "dekton",
    mainMaterialCategory: "oak veneer",

    ralColor: {
      code: "1001",
      name: "Beige",
      rgb: "217-186-140",
      hex: "#C2B078",
    },

    allBevelled: false,

    tapType: 1,

    stoveType: 1,

    applianceType: "fridge",
    wineStandSize: "medium",

    mainDrawers: false,

    showChairs: false,

    edgeFinish: "square",

    tableTopInset: true,

    tableTopRounded: true,

    tableTopHeight: 0.5,

    doorOpeningRotation: 1.5,

    //for PDF
    visibleForPDF: true,

    //Setters_______________________________________________________________________________________

    //are the modules chosen or not
    setSinkChosen: (chosen) => set({ sinkChosen: chosen }),
    setCooktopChosen: (chosen) => set({ cooktopChosen: chosen }),
    setTowerChosen: (chosen) => set({ towerChosen: chosen }),
    setTableChosen: (chosen) => set({ tableChosen: chosen }),

    //position of the modules
    setSinkPosition: (position) => set({ sinkPosition: position }),
    setSinkRotation: (rotation) => set({ sinkRotation: rotation }),

    setCooktopPosition: (position) => set({ cooktopPosition: position }),
    setCooktopRotation: (rotation) => set({ cooktopRotation: rotation }),

    setTowerPosition: (position) => set({ towerPosition: position }),
    setTowerRotation: (rotation) => set({ towerRotation: rotation }),

    setTablePosition: (position) => set({ tablePosition: position }),
    setTableRotation: (rotation) => set({ tableRotation: rotation }),

    //all materials
    setMainMaterial: (material) => set({ mainMaterial: material }),
    setAccentMaterial: (material) => set({ accentMaterial: material }),
    setTableTopMaterial: (material) => set({ tableTopMaterial: material }),
    setTableTopMaterialCategory: (category) =>
      set({ tableTopMaterialCategory: category }),
    setMainMaterialCategory: (category) =>
      set({ mainMaterialCategory: category }),

    //ral color
    setRalColor: (color) => set({ ralColor: color }),

    //bevel
    setAllBevelled: (bevelled) => set({ allBevelled: bevelled }),

    //tap
    setTapType: (type) => set({ tapType: type }),

    //stove
    setStoveType: (type) => set({ stoveType: type }),

    //appliances and winestand in tower
    setApplianceType: (type) => set({ applianceType: type }),
    setWineStandSize: (size) => set({ wineStandSize: size }),

    //main drawers
    setMainDrawers: (drawers) => set({ mainDrawers: drawers }),

    //chairs
    setShowChairs: (show) => set({ showChairs: show }),

    //edge finish
    setEdgeFinish: (finish) => set({ edgeFinish: finish }),

    //table top inset
    setTableTopInset: (inset) => set({ tableTopInset: inset }),

    //table top rounded
    setTableTopRounded: (rounded) => set({ tableTopRounded: rounded }),

    //table top height
    setTableTopHeight: (height) => set({ tableTopHeight: height }),

    //door opening
    setDoorOpeningRotation: (rotation) =>
      set({ doorOpeningRotation: rotation }),

    setVisibleForPDF: (visible) => set({ visibleForPDF: visible }),
  };
});
