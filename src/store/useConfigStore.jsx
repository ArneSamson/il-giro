import { create } from 'zustand';

export default create((set) => {
    let materialData;
    let categoryData;

    fetch('/data.json')
        .then(response => response.json())
        .then(data => {
            categoryData = data.categories;
            materialData = data.materials;
            // console.log('materialData:', materialData);
            // console.log('categoryData:', categoryData);

            const allCategories = {};
            Object.entries(categoryData).forEach(([category, materials]) => {
                allCategories[category] = materials.map(materialName => ({
                    name: materialName,
                    url: materialData[materialName]?.url || '' // Get material URL from material data
                }));
            });

            const allMaterials = Object.entries(materialData).map(([name, material]) => ({
                name,
                url: material.url
            }));

            // console.log('allMaterials:', allMaterials);
            console.log('allCategories:', allCategories);

            set({ allMaterials, allCategories });
        })
        .catch(error => console.error('Error fetching texture:', error));

    return {
        //materials
        allMaterials: [],
        allCategories: [],

        //config settings_______________________________________________________________________________
        sinkChosen: true,
        cooktopChosen: true,
        towerChosen: true,
        tableChosen: true,

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
        mainMaterialCategory: 'wood',

        allBevelled: false,

        tapType: 1,

        stoveType: 1,

        applianceType: 'fridge',
        wineStandSize: 'medium',

        mainDrawers: false,

        edgeFinish: 'square',

        doorOpeningRotation: 1.5,

        dragMode: false,
        isDragging: false,

        isDraggingSink: false,
        isDraggingCooktop: false,
        isDraggingTower: false,

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
        setMainMaterialCategory: (category) => set({ mainMaterialCategory: category }),

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

        //edge finish
        setEdgeFinish: (finish) => set({ edgeFinish: finish }),

        //door opening
        setDoorOpeningRotation: (rotation) => set({ doorOpeningRotation: rotation }),

    }
})