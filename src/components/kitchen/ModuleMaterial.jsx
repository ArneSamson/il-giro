import React, { useEffect, useState } from "react";

import { useTexture } from "../../helper/useTexture";
import useConfigStore from "../../store/useConfigStore";
import { NoColorSpace, RepeatWrapping, SRGBColorSpace, Vector2 } from "three";

export default function ModuleMaterial({ ambientOcclusion, type }) {
    const {
        mainMaterial,
        accentMaterial,
        tableTopMaterial,
    } = useConfigStore((state) => ({
        mainMaterial: state.mainMaterial,
        accentMaterial: state.accentMaterial,
        tableTopMaterial: state.tableTopMaterial,
    }));

    let materialObject = null;

    switch (type) {
        case "main":
            console.log("main");
            materialObject = mainMaterial;
            break;
        case "accent":
            console.log("accent");
            materialObject = accentMaterial;
            break;
        case "tableTop":
            console.log("tableTop");
            materialObject = tableTopMaterial;
            break;
        default:
            break;
    }

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] =
        useTexture([
            materialObject.url + "albedo.jpg",
            materialObject.url + "normal.jpg",
            materialObject.url + "roughness.jpg",
            materialObject.url + "metallic.jpg",
        ]);


    if (albedoTexture.wrapS !== RepeatWrapping) {
        albedoTexture.repeat.set(2.5, 2.5);
        albedoTexture.wrapS = RepeatWrapping;
        albedoTexture.wrapT = RepeatWrapping;
        albedoTexture.needsUpdate = true;
    }

    useEffect(() => {

        albedoTexture.anisotropy = 16;
        albedoTexture.colorSpace = SRGBColorSpace;
        albedoTexture.needsUpdate = true;

        metallnessTexture.anisotropy = 16;
        metallnessTexture.colorSpace = NoColorSpace;
        metallnessTexture.needsUpdate = true;

        roughnessTexture.anisotropy = 16;
        roughnessTexture.colorSpace = NoColorSpace;
        roughnessTexture.needsUpdate = true;

        normalTexture.anisotropy = 16;
        normalTexture.colorSpace = NoColorSpace;
        normalTexture.needsUpdate = true;

    }, [mainMaterial]);

    let aoMap = null;
    if (ambientOcclusion) {
        aoMap = useTexture(ambientOcclusion);
        aoMap.flipY = false;
    }

    return (
        <meshStandardMaterial
            map={albedoTexture}
            roughnessMap={roughnessTexture}
            normalMap={normalTexture}
            normalScale={new Vector2(0.3, 0.3)}
            metalnessMap={metallnessTexture}
            roughness={1}
            metalness={1}
            aoMap={aoMap}
            aoMapIntensity={0.8}
        />
    );
}