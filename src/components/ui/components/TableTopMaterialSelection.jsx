import React from "react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import useConfigStore from "../../../store/useConfigStore.jsx";

export default function AccentMaterialSelection({ extraMessage }) {
  const {
    allCategories,
    tableTopMaterial,
    setTableTopMaterial,
    tableTopMaterialCategory,
    setTableTopMaterialCategory,
    mainMaterialCategory,
  } = useConfigStore(
    useShallow((state) => ({
      allCategories: state.allCategories,
      tableTopMaterial: state.tableTopMaterial,
      setTableTopMaterial: state.setTableTopMaterial,
      tableTopMaterialCategory: state.tableTopMaterialCategory,
      setTableTopMaterialCategory: state.setTableTopMaterialCategory,
      mainMaterialCategory: state.mainMaterialCategory,
    }))
  );

  return (
    <>
      <details
        open={true}
        className='config-ui__details'
        onClick={(e) => e.preventDefault()}
      >
        <summary>
          Countertop material:
          <span>{" " + tableTopMaterial.name}</span>
        </summary>

        {mainMaterialCategory !== "dekton" && (
          <>
            <div className='config-ui__material-options '>
              {allCategories["dekton"].map((material, index) => (
                <div
                  key={index}
                  className={`config-ui__material-options__option ${
                    tableTopMaterial === material
                      ? "selected-material-n-category"
                      : ""
                  }`}
                  onClick={() => {
                    setTableTopMaterial(material);
                    setTableTopMaterialCategory("dekton");
                  }}
                  style={{
                    backgroundImage: `url(${material.url}preview.webp)`,
                  }}
                ></div>
              ))}
            </div>
          </>
        )}

        {mainMaterialCategory !== "natural stone" && (
          <>
            <div className='config-ui__material-options '>
              {allCategories["natural stone"].map((material, index) => (
                <div
                  key={index}
                  className={`config-ui__material-options__option ${
                    tableTopMaterial === material
                      ? "selected-material-n-category"
                      : ""
                  }`}
                  onClick={() => {
                    setTableTopMaterial(material);
                    setTableTopMaterialCategory("natural stone");
                  }}
                  style={{
                    backgroundImage: `url(${material.url}preview.webp)`,
                  }}
                ></div>
              ))}
            </div>
          </>
        )}

        {mainMaterialCategory !== "metallook" && (
          <>
            <div className='config-ui__material-options '>
              {allCategories["metallook"].map(
                (material, index) =>
                  material.url.includes("inox") && (
                    <div
                      key={index}
                      className={`config-ui__material-options__option ${
                        tableTopMaterial === material
                          ? "selected-material-n-category"
                          : ""
                      }`}
                      onClick={() => {
                        setTableTopMaterial(material);
                        setTableTopMaterialCategory("metallook");
                      }}
                      style={{
                        backgroundImage: `url(${material.url}preview.webp)`,
                      }}
                    ></div>
                  )
              )}
            </div>
          </>
        )}
        <p className='config-ui__details__extra-message'>{extraMessage}</p>
      </details>
    </>
  );
}
