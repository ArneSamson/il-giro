import React from "react";

import { useShallow } from "zustand/react/shallow";
import useConfigStore from "../../../store/useConfigStore.jsx";

export default function DetailWithButtons({
  summary,
  options,
  selectedOption,
  setOption,
}) {
  const {
    allBevelled,

    setMainMaterialCategory,
    setMainMaterial,
    allCategories,
  } = useConfigStore(
    useShallow((state) => ({
      allBevelled: state.allBevelled,

      setMainMaterialCategory: state.setMainMaterialCategory,
      setMainMaterial: state.setMainMaterial,
      allCategories: state.allCategories,
    }))
  );
  return (
    <details
      open={true}
      className='config-ui__details'
      onClick={(e) => e.preventDefault()}
    >
      <summary>
        {summary}
        {/* <span>{selectedOption}</span> */}
      </summary>
      <div className='config-ui__selection-buttons'>
        {options.map((option, index) => (
          <button
            key={index}
            className={
              selectedOption === option.label ? "active-selection-button" : ""
            }
            onClick={() => {
              setOption(option.value);
              if (option.label === "Curved") {
                if (!allBevelled) {
                  setMainMaterial(allCategories["metallook"][0]);
                  setMainMaterialCategory("metallook");
                } else {
                  return;
                }
              }
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </details>
  );
}
