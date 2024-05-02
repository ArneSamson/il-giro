import React, { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";

import useConfigStore from "../../../store/useConfigStore.jsx";

import NewMaterial from "../../../helper/NewMaterial.jsx";

export default function Reginox({ props }) {
  const { tableTopMaterial } = useConfigStore((state) => ({
    tableTopMaterial: state.tableTopMaterial,
  }));

  const { nodes } = useGLTF(
    tableTopMaterial.name === "inox"
      ? "./models/Reginox-solid.glb"
      : "./models/Reginox.glb"
  );

  return (
    <group name='sink-bowl-group' {...props} dispose={null}>
      {tableTopMaterial.name !== "inox" && (
        <mesh
          name='sink-bowl-mesh'
          castShadow
          receiveShadow
          geometry={nodes.Reginox.geometry}
          position={[0, 0.782, 0.242]}
        >
          <NewMaterial type={"accent"} ralExclude={true} />
        </mesh>
      )}
      {tableTopMaterial.name === "inox" && (
        <mesh
          name='sink-bowl-solid-mesh'
          castShadow
          receiveShadow
          geometry={nodes.Reginox002.geometry}
          position={[0, 0.765, 0.242]}
        >
          <NewMaterial type={"tableTop"} ralExclude={true} />
        </mesh>
      )}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.77, 0.1]}
        scale={[0.3, 0.3, 0.3]}
      >
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color='black' />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/Reginox.glb");
useGLTF.preload("./models/Reginox-solid.glb");
