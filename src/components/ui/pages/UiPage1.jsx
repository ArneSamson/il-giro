import React from "react";

import useConfigStore from "../../../store/useConfigStore.jsx";

import MaterialCategorySelection from "../components/MaterialCategorySelection.jsx";
import TableTopMaterialSelection from "../components/TableTopMaterialSelection.jsx";

import DetailWithMaterials from "../components/DetailWithMaterials.jsx";

export default function UiPage1() {

    const {
        allCategories,
        setMainMaterial,
        mainMaterialCategory,
        accentMaterial,
        setAccentMaterial,
    } = useConfigStore(
        state => ({
            allCategories: state.allCategories,
            setMainMaterial: state.setMainMaterial,
            mainMaterialCategory: state.mainMaterialCategory,
            accentMaterial: state.accentMaterial,
            setAccentMaterial: state.setAccentMaterial,
        })
    );

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>2. Materials</h2></span>
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
                selectedMaterial={accentMaterial.name}
                setMaterial={setAccentMaterial}
                open={false}
            />

        </div>
    </>
}