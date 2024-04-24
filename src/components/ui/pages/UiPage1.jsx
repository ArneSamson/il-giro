import React from "react";

import useConfigStore from "../../../store/useConfigStore.jsx";

import MaterialCategorySelection from "../components/MaterialCategorySelection.jsx";
import TableTopMaterialSelection from "../components/TableTopMaterialSelection.jsx";

import ColorPicker from "../components/color/ColorPicker.jsx";

import DetailWithMaterials from "../components/DetailWithMaterials.jsx";

export default function UiPage1() {
  const {
    allCategories,
    mainMaterial,
    setMainMaterial,
    mainMaterialCategory,
    accentMaterial,
    setAccentMaterial,
  } = useConfigStore((state) => ({
    allCategories: state.allCategories,
    mainMaterial: state.mainMaterial,
    setMainMaterial: state.setMainMaterial,
    mainMaterialCategory: state.mainMaterialCategory,
    accentMaterial: state.accentMaterial,
    setAccentMaterial: state.setAccentMaterial,
  }));

  return (
    <>
      <div className='config-ui__title'>
        <span>
          <h2>Materials</h2>
        </span>
      </div>

      <div className='config-ui__options'>
        <MaterialCategorySelection />

        <>
          <DetailWithMaterials
            header={"Choices in " + mainMaterialCategory + ": "}
            materials={allCategories[mainMaterialCategory]}
            selectedMaterial={mainMaterial.name}
            setMaterial={setMainMaterial}
            open={true}
          />
        </>

        {(mainMaterial.name === "paintwork" ||
          mainMaterial.name === "microtopping with ral") && <ColorPicker />}

        <TableTopMaterialSelection />

        <DetailWithMaterials
          header='Accent material: '
          materials={allCategories.metal}
          selectedMaterial={accentMaterial.name}
          setMaterial={setAccentMaterial}
          open={true}
          extraMessage='*The sink will always be inox if the countertop is inox.'
        />
      </div>
    </>
  );
}
