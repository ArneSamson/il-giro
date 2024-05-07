import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

import useConfigStore from "../../../store/useConfigStore.jsx";

import NewMaterial from "../../../helper/NewMaterial.jsx";

import { GlassBottleWhiskey, WineBottle, Wodka } from "./extras/Alcohol.jsx";

export default function WineStand({ props }) {
  const { wineStandSize } = useConfigStore((state) => ({
    wineStandSize: state.wineStandSize,
  }));

  const [alcoholHeight, setAlcoholHeight] = useState(1.855);
  const [heightOffset, setHeighOffset] = useState(0.05);

  useEffect(() => {
    switch (wineStandSize) {
      case "tall":
        setAlcoholHeight(1.37);
        setHeighOffset(0.4);
        break;
      case "medium":
        setAlcoholHeight(1.55);
        setHeighOffset(0.301);
        break;
      case "small":
        setAlcoholHeight(1.68);
        setHeighOffset(0);
        break;
      default:
        break;
    }
  }, [wineStandSize]);

  const { nodes } = useGLTF("./models/winestand.glb");
  return (
    <group name='liquorStand' {...props} dispose={null}>
      {wineStandSize === "tall" && (
        <mesh castShadow receiveShadow geometry={nodes["tall-stand"].geometry}>
          <NewMaterial type={"accent"} ralExclude={true} envIntensity={0.3} />
        </mesh>
      )}
      {wineStandSize === "medium" && (
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["medium-stand"].geometry}
        >
          <NewMaterial type={"accent"} ralExclude={true} envIntensity={0.3} />
        </mesh>
      )}
      {wineStandSize === "small" && (
        <mesh castShadow receiveShadow geometry={nodes["small-stand"].geometry}>
          <NewMaterial type={"accent"} ralExclude={true} envIntensity={0.3} />
        </mesh>
      )}

      <GlassBottleWhiskey
        position={[-0.08, alcoholHeight, -0.05]}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, 0, 0]}
      />

      {/* <WineBottle
        position={[0.1, alcoholHeight + heightOffset, 0.05]}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, 0, 0]}
      /> */}

      <Wodka
        position={[-0.05, alcoholHeight + heightOffset, 0.1]}
        scale={[0.8, 0.8, 0.8]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
}

useGLTF.preload("./models/winestand.glb");
