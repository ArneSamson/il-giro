import React from "react";

export default function DetailWithMaterials({
    header,
    materials,
    selectedMaterial,
    setMaterial,
    open
}) {

    console.log(selectedMaterial)
    return (
        <details
            className="config-ui__details"
            open={open}
        >
            <summary>
                {header}
                <span>{selectedMaterial}</span>
            </summary>
            <div className="config-ui__material-options">
                {materials.map((material, index) => (
                    <div
                        key={index}
                        className={`config-ui__material-options__option ${selectedMaterial === material.url ? "selected-material-n-category" : ""
                            }`}
                        onClick={() => setMaterial(material.url)}
                        style={{ backgroundImage: `url(${material.url}albedo.jpg)` }}
                    ></div>
                ))}
            </div>
        </details>
    );
}
