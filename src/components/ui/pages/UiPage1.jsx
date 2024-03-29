import React from "react";

import useConfigStore from "../../../store/useConfigStore.jsx";

import MaterialCategorySelection from "../components/MaterialCategorySelection.jsx";
import TableTopMaterialSelection from "../components/TableTopMaterialSelection.jsx";

import DetailWithButtons from "../components/DetailWithButtons.jsx";
import DetailWithMaterials from "../components/DetailWithMaterials.jsx";

export default function UiPage1() {

    const {
        allCategories,
        setMainMaterial,
        setMainMaterialCategory,
        mainMaterialCategory,
        mainMaterial,
        accentMaterial,
        setAccentMaterial,
        tableTopMaterial,
        setTableTopMaterial,
    } = useConfigStore();

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>1. Materials</h2></span>
        </div>

        <div
            className='config-ui__options'
        >

            <MaterialCategorySelection

            />

            <DetailWithMaterials
                header="Choices in "
                materials={allCategories[mainMaterialCategory]}
                selectedMaterial={mainMaterialCategory}
                setMaterial={setMainMaterial}
                open={true}
            />

            <TableTopMaterialSelection

            />

            <DetailWithMaterials
                header="Accent material: "
                materials={allCategories.metal}
                selectedMaterial={accentMaterial.split("/").slice(-2, -1)[0]}
                setMaterial={setAccentMaterial}
                open={false}
            />

        </div>
    </>
}