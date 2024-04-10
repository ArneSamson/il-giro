import React, { useEffect, useState } from "react";

import { useTexture } from "../../helper/useTexture";
import useConfigStore from "../../store/useConfigStore";
import { NoColorSpace, RepeatWrapping, SRGBColorSpace, Vector2 } from "three";

export default function ModuleMaterial({ ambientOcclusion }) {
    const {
        mainMaterial,
    } = useConfigStore((state) => ({
        mainMaterial: state.mainMaterial
    }));

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] =
        useTexture([
            mainMaterial.url + "albedo.jpg",
            mainMaterial.url + "normal.jpg",
            mainMaterial.url + "roughness.jpg",
            mainMaterial.url + "metallic.jpg",
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