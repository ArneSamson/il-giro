import React, { useRef, memo } from "react";
import { Color, MeshStandardMaterial } from "three";
import {
  useTexture,
  useGLTF,
  MeshTransmissionMaterial,
  Instances,
  Instance,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useShallow } from "zustand/react/shallow";
import useConfigStore from "../../../../store/useConfigStore";
import NewMaterial from "../../../../helper/NewMaterial";

export default function Hinge(props) {
  const { nodes, materials } = useGLTF("./models/hinge.glb");

  const rightHingeRef = useRef();
  const middleHingeRef = useRef();
  const rightHingeCapRef = useRef();

  const { doorOpeningRotation } = useConfigStore(
    useShallow((state) => ({
      doorOpeningRotation: state.doorOpeningRotation,
    }))
  );
  const material = new MeshStandardMaterial({
    color: new Color(0x000000),
    roughness: 0.5,
    metalness: 1,
    envMapIntensity: 1,
  });

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  useFrame((state, delta) => {
    if (delta > 1) {
      return;
    }

    if (doorOpeningRotation === 0) {
      if (rightHingeRef.current) {
        if (rightHingeRef.current.rotation.y < 0.001) {
          return;
        } else {
          rightHingeRef.current.rotation.y = lerp(
            rightHingeRef.current.rotation.y,
            doorOpeningRotation,
            delta * 2
          );
          middleHingeRef.current.rotation.y = rightHingeRef.current.rotation.y;
          rightHingeCapRef.current.rotation.y =
            rightHingeRef.current.rotation.y;
        }
      }
    } else if (doorOpeningRotation === 1.5) {
      if (rightHingeRef.current) {
        if (rightHingeRef.current.rotation.y <= 1.49) {
          rightHingeRef.current.rotation.y = lerp(
            rightHingeRef.current.rotation.y,
            doorOpeningRotation,
            delta * 2
          );
          middleHingeRef.current.rotation.y = rightHingeRef.current.rotation.y;
          rightHingeCapRef.current.rotation.y =
            rightHingeRef.current.rotation.y;
        }
      }
    }
  });

  return (
    <group {...props} dispose={null}>
      <Instances
        name='Hinge left'
        castShadow
        geometry={nodes["G3011972_A_|_FRAME_SLIDE_MCH_NEO_M61001"].geometry}
        material={material}
      >
        <Instance
          position={[0, -0.8, 0]}
          rotation={[0, 0, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, -0.25, 0]}
          rotation={[0, 0, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.25, 0]}
          rotation={[0, 0, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.8, 0]}
          rotation={[0, 0, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
      </Instances>

      <Instances
        name='Hinge cap left'
        castShadow
        geometry={nodes["G3011978_A_|_CAP_DOOR_MCH_NEO_M64001"].geometry}
        material={material}
      >
        <Instance
          position={[0, -0.8, 0]}
          rotation={[0, 0, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, -0.25, 0]}
          rotation={[0, 0, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.25, 0]}
          rotation={[0, 0, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.8, 0]}
          rotation={[0, 0, 0]}
          scale={[0.7, 0.7, 0.7]}
        />{" "}
      </Instances>

      <Instances
        ref={rightHingeRef}
        name='Hinge right'
        castShadow
        geometry={nodes["G3011972_A_|_FRAME_SLIDE_MCH_NEO_M61002"].geometry}
        material={material}
      >
        <Instance
          position={[0, -0.8, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, -0.25, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.25, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.8, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
      </Instances>

      <Instances
        ref={middleHingeRef}
        name='Hinge middle'
        castShadow
        geometry={nodes["G3011976_A_|_ARM_SMAL_2_MCH_NEO_M61001"].geometry}
        material={material}
      >
        <Instance
          position={[0, -0.8, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, -0.25, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.25, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.8, 0]}
          rotation={[0, -Math.PI / 2, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
      </Instances>

      <Instances
        ref={rightHingeCapRef}
        name='Hinge cap right'
        castShadow
        geometry={nodes["G3011978_A_|_CAP_DOOR_MCH_NEO_M64002"].geometry}
        material={material}
      >
        <Instance
          position={[0, -0.8, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, -0.25, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.25, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
        <Instance
          position={[0, 0.8, 0]}
          rotation={[0, Math.PI, 0]}
          scale={[0.7, 0.7, 0.7]}
        />
      </Instances>
    </group>
  );
}

useGLTF.preload("./models/hinge.glb");
