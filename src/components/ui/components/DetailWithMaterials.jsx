import React from "react";

export default function DetailWithMaterials({
    header,
    materials,
    selectedMaterial,
    setMaterial,
    open,
    extraMessage,
}) {
    return (
        <details
            className="config-ui__details"
            open={true}
            onClick={(e) => e.preventDefault()}
        >
            <summary>
                {header}
                <span>{selectedMaterial}</span>
            </summary>
            <div className="config-ui__material-options">
                {materials.map((material, index) => (
                    <div
                        key={index}
                        className={`config-ui__material-options__option ${selectedMaterial === material.name ? "selected-material-n-category" : ""}`}
                        onClick={() => setMaterial(material)}
                        style={{
                            backgroundImage: `url(${material.url}preview.webp)`,
                            backgroundSize: "cover",
                            backgroundPosition: "center"
                        }}
                    ></div>
                ))}
            </div>
            <p
                className="config-ui__details__extra-message"
            >{extraMessage}</p>
        </details>
    );
}
