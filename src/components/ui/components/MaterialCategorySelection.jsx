import React from "react";
import { useEffect, useState } from "react";

import useConfig from "../../../store/useConfigStore.jsx";
import useScene from "../../../store/useScene.jsx";
import useUIStore from "../../../store/useUIStore.jsx";

export default function MaterialCategorySelection() {

    const {
        allCategories,
        setMainMaterial,
        setTableTopMaterial,
        mainMaterialCategory,
        setMainMaterialCategory,
    } = useConfig();

    const { setIsSecondDetailsOpen } = useUIStore();



    return <>
        <details
            open
            className='config-ui__details'
        >
            <summary>Base material:
                <span>
                    {' ' + mainMaterialCategory}
                </span>
            </summary>

            <div
                className="config-ui__material-options"
            >
                {Object.entries(allCategories).map(([category, materials]) => (
                    <div
                        key={category}
                        className={`config-ui__material-options__option ${mainMaterialCategory === category ? 'selected-material-n-category' : ""}`}
                        onClick={() => {
                            setMainMaterialCategory(category)
                            setIsSecondDetailsOpen(true)
                            setMainMaterial(materials[0].url)

                            switch (category) {
                                case 'metal':
                                    setTableTopMaterial(allCategories['dekton'][0].url)
                                    break;
                                case 'dekton':
                                    setTableTopMaterial(allCategories['natural stone'][0].url)
                                    break;
                                case 'natural stone':
                                    setTableTopMaterial(allCategories['metal'][0].url)
                                    break;
                            }
                        }}
                        style={{
                            backgroundImage: `url(${materials[0].url}albedo.jpg)`,
                        }}
                    ></div>
                ))}
            </div>
        </details>
    </>
}