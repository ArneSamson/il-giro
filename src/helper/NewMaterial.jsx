import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useTexture } from "./useTexture";
import useConfigStore from "../store/useConfigStore";
import useUIStore from "../store/useUIStore";
import { NoColorSpace, RepeatWrapping, SRGBColorSpace, Vector2 } from "three";

export default function NewMaterial({
  ambientOcclusion,
  shadowTexture = null,
  type,
  ralExclude,
  envIntensity = 1,
}) {
  const {
    mainMaterial,
    mainMaterialCategory,
    accentMaterial,
    tableTopMaterial,
    ralColor,
  } = useConfigStore(
    useShallow((state) => ({
      mainMaterial: state.mainMaterial,
      mainMaterialCategory: state.mainMaterialCategory,
      accentMaterial: state.accentMaterial,
      tableTopMaterial: state.tableTopMaterial,
      ralColor: state.ralColor,
    }))
  );

  const { setTextureIsLoading } = useUIStore((state) => ({
    setTextureIsLoading: state.setTextureIsLoading,
  }));

  let materialObject = null;

  switch (type) {
    case "main":
      materialObject = mainMaterial;
      break;
    case "accent":
      materialObject = accentMaterial;
      break;
    case "tableTop":
      materialObject = tableTopMaterial;
      break;
    default:
      break;
  }

  const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] =
    useTexture(
      [
        materialObject.url + "albedo.jpg",
        materialObject.url + "normal.jpg",
        materialObject.url + "roughness.jpg",
        materialObject.url + "metallic.jpg",
      ],
      undefined,
      (loading) => {
        setTextureIsLoading(loading);
      }
    );

  if (albedoTexture.wrapS !== RepeatWrapping) {
    albedoTexture.repeat.set(5, 5);
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

  let lightMap = null;
  if (shadowTexture) {
    lightMap = useTexture(shadowTexture);
    lightMap.flipY = false;
  }

  if (
    !ralExclude &&
    (mainMaterial.name === "paintwork" ||
      mainMaterial.name === "microtopping with ral")
  ) {
    return (
      <meshStandardMaterial
        color={ralColor.hex}
        map={albedoTexture}
        roughnessMap={roughnessTexture}
        normalMap={normalTexture}
        normalScale={new Vector2(0.3, 0.3)}
        metalnessMap={metallnessTexture}
        roughness={1}
        metalness={1}
        aoMap={aoMap}
        aoMapIntensity={0.8}
        envIntensity={envIntensity}
        lightMap={lightMap}
      />
    );
  } else if (
    ralExclude &&
    (mainMaterial.name !== "paintwork" ||
      mainMaterial.name !== "microtopping with ral")
  ) {
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
        envMapIntensity={envIntensity}
        lightMap={lightMap}
      />
    );
  } else {
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
        envIntensity={envIntensity}
        lightMap={lightMap}
      />
    );
  }
}
