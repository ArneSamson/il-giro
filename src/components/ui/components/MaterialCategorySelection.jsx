import React from "react";
import { useShallow } from "zustand/react/shallow";

import useConfigStore from "../../../store/useConfigStore.jsx";
import useUIStore from "../../../store/useUIStore.jsx";

export default function MaterialCategorySelection() {
  const {
    allCategories,
    setMainMaterial,
    setTableTopMaterial,
    mainMaterialCategory,
    setMainMaterialCategory,
  } = useConfigStore(
    useShallow((state) => ({
      allCategories: state.allCategories,
      setMainMaterial: state.setMainMaterial,
      setTableTopMaterial: state.setTableTopMaterial,
      mainMaterialCategory: state.mainMaterialCategory,
      setMainMaterialCategory: state.setMainMaterialCategory,
    }))
  );

  const { setIsSecondDetailsOpen } = useUIStore((state) => ({
    setIsSecondDetailsOpen: state.setIsSecondDetailsOpen,
  }));

  return (
    <>
      <details
        open={true}
        className='config-ui__details'
        onClick={(e) => e.preventDefault()}
      >
        <summary>
          Base material:
          <span>{" " + mainMaterialCategory}</span>
        </summary>

        <div className='config-ui__material-options'>
          {Object.entries(allCategories).map(([category, materials]) => (
            <div
              key={category}
              className={`config-ui__material-options__option ${
                mainMaterialCategory === category
                  ? "selected-material-n-category"
                  : ""
              }`}
              onClick={() => {
                setMainMaterialCategory(category);
                setIsSecondDetailsOpen(true);
                setMainMaterial(materials[0]);

                switch (category) {
                  case "metal":
                    setTableTopMaterial(allCategories["dekton"][0]);
                    break;
                  case "dekton":
                    setTableTopMaterial(allCategories["natural stone"][0]);
                    break;
                  case "natural stone":
                    setTableTopMaterial(allCategories["metal"][0]);
                    break;
                }
              }}
              style={{
                backgroundImage: `url(${materials[0].url}preview.webp)`,
                backgroundSize: "cover",
              }}
            ></div>
          ))}
        </div>
      </details>
    </>
  );
}
