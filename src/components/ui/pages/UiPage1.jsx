import React from "react";
import { useShallow } from "zustand/react/shallow";

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
    tableTopMaterialCategory,
    tableTopHeight,
  } = useConfigStore(
    useShallow((state) => ({
      allCategories: state.allCategories,
      mainMaterial: state.mainMaterial,
      setMainMaterial: state.setMainMaterial,
      mainMaterialCategory: state.mainMaterialCategory,
      accentMaterial: state.accentMaterial,
      setAccentMaterial: state.setAccentMaterial,
      tableTopMaterialCategory: state.tableTopMaterialCategory,
      tableTopHeight: state.tableTopHeight,
    }))
  );

  let counterTopHeight;

  if (tableTopMaterialCategory === "dekton") {
    if (tableTopHeight === 0.5) {
      counterTopHeight = "20mm";
    }
    if (tableTopHeight === 0.3) {
      counterTopHeight = "12mm";
    }
  } else if (tableTopMaterialCategory === "natural stone") {
    counterTopHeight = "40mm";
  } else if (tableTopMaterialCategory === "metal") {
    counterTopHeight = "5mm";
  }

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

        <TableTopMaterialSelection
          extraMessage={
            <>
              *This material has a standard thickness of
              <span> {counterTopHeight}.</span>
            </>
          }
        />

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
