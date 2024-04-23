import React from "react";

export default function SwatchesPicker({ colors, onClick, errorMessage }) {
  console.log(errorMessage);
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
