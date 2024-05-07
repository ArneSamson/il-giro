import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture, useGLTF } from "@react-three/drei";

import useConfigStore from "../../../store/useConfigStore.jsx";

import NewMaterial from "../../../helper/NewMaterial.jsx";

export default function Drawers(props) {
  const { doorOpeningRotation } = useConfigStore((state) => ({
    doorOpeningRotation: state.doorOpeningRotation,
  }));

  const drawersRef = useRef();

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  useFrame((state, delta) => {
    if (delta > 1) {
      return;
    }
    if (drawersRef.current) {
      if (doorOpeningRotation === 0) {
        if (drawersRef.current.children[0].position.z < 0.0001) {
          return;
        } else {
          drawersRef.current.children[0].position.z = lerp(
            drawersRef.current.children[0].position.z,
            0,
            delta * 2
          );
          drawersRef.current.children[1].position.z = lerp(
            drawersRef.current.children[1].position.z,
            0,
            delta * 2
          );
          drawersRef.current.children[2].position.z = lerp(
            drawersRef.current.children[2].position.z,
            0,
            delta * 2
          );
        }
      } else if (doorOpeningRotation === 1.5) {
        if (drawersRef.current.children[0].position.z > 0.1) {
          return;
        } else {
          const bottomShelfZ = doorOpeningRotation / 8;
          const middleShelfZ = doorOpeningRotation / 8 - 0.08; // Adjust as needed
          const topShelfZ = doorOpeningRotation / 7 - 0.18; // Adjust as needed

          drawersRef.current.children[2].position.z = lerp(
            drawersRef.current.children[2].position.z,
            topShelfZ,
            delta * 2
          );
          drawersRef.current.children[1].position.z = lerp(
            drawersRef.current.children[1].position.z,
            bottomShelfZ,
            delta * 2
          );
          drawersRef.current.children[0].position.z = lerp(
            drawersRef.current.children[0].position.z,
            middleShelfZ,
            delta * 2
          );
        }
      }
    }
  });

  const { nodes, materials } = useGLTF("./models/drawers.glb");
  return (
    <group
      ref={drawersRef}
      position={props.position}
      dispose={null}
      rotation={[0, 0, 0]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.drawer_3002.geometry}
        material={nodes.drawer_3002.material}
      >
        <NewMaterial type={"main"} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.drawer_3003.geometry}
        material={nodes.drawer_3003.material}
      >
        <NewMaterial type={"main"} />
      </mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.drawer_3001.geometry}
        material={nodes.drawer_3001.material}
      >
        <NewMaterial type={"main"} />
      </mesh>
    </group>
  );
}

useGLTF.preload("./models/drawers.glb");
