//Custom written SwatchesPicker component to replace the SwatchesPicker component from react-color
//This component is used to display the color swatches for RAL colors

import React from "react";

export default function SwatchesPicker({
  colors,
  onClick,
  errorMessage = "",
  containerStyle = {},
  groupStyle = {},
  swatchStyle = {},
  tooltipStyle = {},
}) {
  return (
    <div style={{ ...containerStyle }}>
      <p
        style={{
          color: "red",
          fontSize: 12,
          marginTop: 10,
          marginBottom: 10,
          width: "100%",
          textAlign: "center",
        }}
      >
        {errorMessage}
      </p>
      {Object.keys(colors).map((key, index) => (
        <div key={index} style={{ ...groupStyle }}>
          <div
            key={key}
            style={{
              backgroundColor: colors[key].hex,
              ...swatchStyle,
            }}
            className='colorpicker__color-swatch'
            onClick={() => onClick(colors[key])}
          >
            <span
              className='colorpicker__color-tooltip'
              style={{
                ...tooltipStyle,
              }}
            >
              {colors[key].code}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
