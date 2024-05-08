import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useGLTF } from "@react-three/drei";

import useConfigStore from "../../../store/useConfigStore.jsx";

import NewMaterial from "../../../helper/NewMaterial.jsx";

export default function CoffeeMachine(props) {
  const { nodes, materials } = useGLTF("/models/coffeeMachine.glb");
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes["G-Object385"].geometry}>
        <NewMaterial type={"main"} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes["G-Object387"].geometry}>
        <NewMaterial type={"main"} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes["G-Object001"].geometry}>
        <NewMaterial type={"main"} />
      </mesh>
      <mesh castShadow receiveShadow geometry={nodes["G-Object002"].geometry}>
        <NewMaterial type={"main"} />
      </mesh>
      <group>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-Fully_Auto_1"].geometry}
          material={materials["Glass  Standard"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-Fully_Auto_2"].geometry}
          material={materials["*2"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-Fully_Auto_3"].geometry}
          material={materials["Color - Storm"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-Fully_Auto_4"].geometry}
          material={materials["Chrome Polished"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-Fully_Auto_5"].geometry}
          material={materials["Black Metal Poli"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-Fully_Auto_6"].geometry}
          material={materials["Black Metal Brus"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes["C-Fully_Auto_7"].geometry}
          material={materials["Stainless Steel "]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/coffeeMachine.glb");
