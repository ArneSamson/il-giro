import React from "react";
import { useEffect, useState } from "react";

import useConfig from "../../../store/useConfigStore.jsx";

export default function AccentMaterialSelection() {

    const {
        allCategories,
        tableTopMaterial,
        setTableTopMaterial,
        mainMaterialCategory
    } = useConfig(
        state => ({
            allCategories: state.allCategories,
            tableTopMaterial: state.tableTopMaterial,
            setTableTopMaterial: state.setTableTopMaterial,
            mainMaterialCategory: state.mainMaterialCategory
        })
    );


    return <>
        <details
            open={true}
            className='config-ui__details'
            onClick={(e) => e.preventDefault()}
        >
            <summary>Tabletop material:
                <span>
                    {' ' + tableTopMaterial.name}
                </span>
            </summary>

            {mainMaterialCategory !== 'dekton' && <>
                <div className="config-ui__material-options ">
                    {allCategories['dekton'].map((material, index) => (
                        <div
                            key={index}
                            className={`config-ui__material-options__option ${tableTopMaterial === material ? 'selected-material-n-category' : ""}`}
                            onClick={() => {
                                setTableTopMaterial(material)
                            }}
                            style={{
                                backgroundImage: `url(${material.url}preview.jpg)`,
                            }}
                        ></div>
                    ))}
                </div>
            </>}

            {mainMaterialCategory !== 'natural stone' && <>
                <div className="config-ui__material-options ">
                    {allCategories['natural stone'].map((material, index) => (
                        <div
                            key={index}
                            className={`config-ui__material-options__option ${tableTopMaterial === material ? 'selected-material-n-category' : ""}`}
                            onClick={() => {
                                setTableTopMaterial(material)
                            }}
                            style={{
                                backgroundImage: `url(${material.url}preview.jpg)`,
                            }}
                        ></div>
                    ))}
                </div>
            </>}

            {mainMaterialCategory !== 'metal' && <>

                <div className="config-ui__material-options ">
                    {allCategories['metal'].map((material, index) => (
                        material.url.includes('inox') &&
                        <div
                            key={index}
                            className={`config-ui__material-options__option ${tableTopMaterial === material ? 'selected-material-n-category' : ""}`}
                            onClick={() => {
                                setTableTopMaterial(material)
                            }}
                            style={{
                                backgroundImage: `url(${material.url}preview.jpg)`,
                            }}
                        ></div>
                    ))}
                </div>
            </>}



        </details>
    </>
}