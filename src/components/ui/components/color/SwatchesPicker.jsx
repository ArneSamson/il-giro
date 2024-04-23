//Custom written SwatchesPicker component to replace the SwatchesPicker component from react-color
//This is a simplified version, easily changeable to fit the needs of the project
//colors should be an array of arrays, each array containing the hex values of the colors

import React from "react";

export default function SwatchesPicker({ colors, onClick, errorMessage = "" }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <p
        style={{
          color: "red",
          fontSize: 12,
          marginBottom: 10,
          width: "100%",
          textAlign: "center",
        }}
      >
        {errorMessage}
      </p>
      {colors.map((group, index) => (
        <div key={index} style={{ display: "flex", flexWrap: "wrap" }}>
          {group.map((color, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: color,
                width: 30,
                height: 30,
                margin: 2,
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: 5,
              }}
              onClick={() => onClick({ hex: color })}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
