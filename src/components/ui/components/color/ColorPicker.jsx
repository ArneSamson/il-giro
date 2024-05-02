import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { ralData } from "./dataColors.js";
import SwatchesPicker from "./SwatchesPicker.jsx";

import useConfigStore from "../../../../store/useConfigStore.jsx";

// function organizeRalColors(ralData) {
//   const ralColors = {};

//   Object.values(ralData).forEach((color) => {
//     const group = color.code.substring(0, 1) + "000";
//     if (!ralColors[group]) {
//       ralColors[group] = [];
//     }
//     ralColors[group].push(color.hex);
//   });

//   return Object.values(ralColors);
// }

function organizeRalColorsByHex(ralData) {
  const ralColorsByHex = {};

  Object.values(ralData).forEach((color) => {
    ralColorsByHex[color.hex] = color;
  });

  return ralColorsByHex;
}

// const ralColors = organizeRalColors(ralData);

const ralColorsByHex = organizeRalColorsByHex(ralData);

export default function ColorPicker() {
  const { ralColor, setRalColor } = useConfigStore(
    useShallow((state) => ({
      ralColor: state.ralColor,
      setRalColor: state.setRalColor,
    }))
  );

  const [colorError, setColorError] = useState("");

  const handleInput = (value) => {
    if (value.length !== 4) {
      return;
    } else {
      const color = ralData[value]; //compare the value with the ralData
      if (color) {
        setRalColor(color);
        setColorError("");
      } else {
        setColorError("Code is not a RAL Classic code.");
      }
    }
  };

  const handleColorChange = (color) => {
    // console.log("color", color);

    const selectedColorHex = color.hex.toUpperCase();

    const newColor = ralColorsByHex[selectedColorHex];

    if (newColor) {
      setRalColor(newColor);
      setColorError("");
    }
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    border: "1px solid #4d4d4d",
    borderRadius: 20,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTop: "0px",
    paddingTop: 25,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    transform: "translateY(-25px)",
  };

  const groupStyle = {
    display: "flex",
    flexWrap: "wrap",
  };

  const swatchStyle = {
    width: 30,
    height: 30,
    margin: 2,
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: 5,
    position: "relative",
  };

  const tooltipStyle = {
    padding: 5,
    color: "white",
    backgroundColor: "black",
    borderRadius: 5,
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: "105%",
  };

  return (
    <>
      <div
        style={{
          marginTop: 10,
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
            paddingLeft: 5,
            paddingRight: 10,
            marginBottom: 10,
            zIndex: 100,
          }}
        >
          <input
            className='colorpicker__color-input'
            type='text'
            placeholder='Enter RAL Classic code'
            maxLength={4}
            pattern='[0-9]*'
            onBlur={(e) => handleInput(e.target.value)}
            onChange={(e) => handleInput(e.target.value)}
          />
          <SwatchesPicker
            selectedColor={ralColor}
            colors={ralData}
            onClick={(color) => handleColorChange(color)}
            errorMessage={colorError}
            containerStyle={containerStyle}
            groupStyle={groupStyle}
            swatchStyle={swatchStyle}
            tooltipStyle={tooltipStyle}
          />
        </div>
      </div>
    </>
  );
}
