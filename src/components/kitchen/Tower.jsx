import React, { useRef, useEffect } from "react";
import { MeshBasicMaterial, BufferAttribute } from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import WineStand from "./accessoires/WineStand.jsx";

import { BakePlane } from "../lighting&shadows/ShadowPlanes.jsx";

import NewMaterial from "../../helper/NewMaterial.jsx";

import useScene from "../../store/useScene.jsx";
import useConfig from "../../store/useConfigStore.jsx";

export default function Tower({ props }) {
  const {
    towerPosition,
    towerRotation,

    applianceType,
    doorOpeningRotation,

    allBevelled,
  } = useConfig((state) => ({
    mainMaterial: state.mainMaterial,
    mainMaterialCategory: state.mainMaterialCategory,

    towerPosition: state.towerPosition,
    towerRotation: state.towerRotation,

    applianceType: state.applianceType,
    doorOpeningRotation: state.doorOpeningRotation,

    allBevelled: state.allBevelled,
  }));

  const towerAOMap = "/images/bakes/tower-ao.jpg";

  const towerAOMapBevelled = "/images/bakes/tower-ao2.jpg";

  const fridgeMaterial = new MeshBasicMaterial({
    color: 0x000000,
  });

  const { nodes, materials } = useGLTF("./models/base-island-high.glb");

  const { setCameraFocus } = useScene((state) => ({
    setCameraFocus: state.setCameraFocus,
  }));

  const towerRef = useRef();
  const cabinetRef = useRef();
  const doorRef = useRef();
  const coolerRef = useRef();
  const drawersRef = useRef();

  useEffect(() => {
    if (cabinetRef.current && doorRef.current) {
      const cabinetGeometry = cabinetRef.current.geometry;
      const doorGeometry = doorRef.current.geometry;

      const uvAttributeName = allBevelled ? "uv1" : "uv2";

      const uvAttributeCabinet = cabinetGeometry.getAttribute(uvAttributeName);
      const uvAttributeDoor = doorGeometry.getAttribute(uvAttributeName);

      if (uvAttributeCabinet && uvAttributeDoor) {
        const uvBufferAttribute = new BufferAttribute(
          uvAttributeCabinet.array,
          uvAttributeCabinet.itemSize
        );
        const uvBufferAttributeDoor = new BufferAttribute(
          uvAttributeDoor.array,
          uvAttributeDoor.itemSize
        );

        cabinetGeometry.setAttribute("uv", uvBufferAttribute);
        doorGeometry.setAttribute("uv", uvBufferAttributeDoor);
      }
    }
  }, [nodes, allBevelled]);

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  useFrame((state, delta) => {
    if (delta > 1) {
      return;
    }

    if (doorOpeningRotation === 0) {
      if (doorRef.current) {
        if (doorRef.current.rotation.y < 0.001) {
          return;
        } else {
          doorRef.current.rotation.y = lerp(
            doorRef.current.rotation.y,
            doorOpeningRotation,
            delta * 2
          );
        }
      }
      if (drawersRef.current) {
        if (drawersRef.current.children[0].position.z < 0.06) {
          return;
        } else {
          drawersRef.current.children[0].position.z = lerp(
            drawersRef.current.children[0].position.z,
            0.059,
            delta * 2
          );
          drawersRef.current.children[1].position.z = lerp(
            drawersRef.current.children[1].position.z,
            0.059,
            delta * 2
          );
          drawersRef.current.children[2].position.z = lerp(
            drawersRef.current.children[2].position.z,
            0.059,
            delta * 2
          );
        }
      }
    } else if (doorOpeningRotation === 1.5) {
      if (doorRef.current) {
        if (doorRef.current.rotation.y > 1.49) {
          return;
        } else {
          doorRef.current.rotation.y = lerp(
            doorRef.current.rotation.y,
            doorOpeningRotation,
            delta * 2
          );
        }
      }
      if (drawersRef.current) {
        if (drawersRef.current.children[0].position.z > 0.425) {
          return;
        } else {
          const bottomShelfZ = doorOpeningRotation / 3.5;
          const middleShelfZ = doorOpeningRotation / 3.5 - 0.1; // Adjust as needed
          const topShelfZ = doorOpeningRotation / 3.5 - 0.2; // Adjust as needed

          drawersRef.current.children[0].position.z = lerp(
            drawersRef.current.children[0].position.z,
            bottomShelfZ,
            delta * 2
          );
          drawersRef.current.children[1].position.z = lerp(
            drawersRef.current.children[1].position.z,
            middleShelfZ,
            delta * 2
          );
          drawersRef.current.children[2].position.z = lerp(
            drawersRef.current.children[2].position.z,
            topShelfZ,
            delta * 2
          );
        }
      }
    }
  });

  const handleClick = () => {
    setCameraFocus([
      towerPosition[0],
      towerPosition[1] + 1.5,
      towerPosition[2],
    ]);
  };

  return (
    <>
      <group
        name='tower-group'
        ref={towerRef}
        {...props}
        position={towerPosition}
        rotation={towerRotation}
        dispose={null}
      >
        <group
          name='tower-hovers-group'
          onClick={(e) => {
            handleClick();
            e.stopPropagation();
          }}
        >
          <mesh
            name='cabinet'
            ref={cabinetRef}
            castShadow
            receiveShadow
            geometry={nodes.tower.geometry}
          >
            <NewMaterial
              ambientOcclusion={allBevelled ? towerAOMapBevelled : towerAOMap}
              type={"main"}
            />
            <mesh
              name='tower-bevel'
              visible={allBevelled}
              castShadow
              receiveShadow
              geometry={nodes["tower-bevel"].geometry}
            >
              <NewMaterial type={"main"} />
            </mesh>
            <mesh
              name='tower-sraight'
              visible={!allBevelled}
              castShadow
              receiveShadow
              geometry={nodes["tower-sraight"].geometry}
            >
              <NewMaterial type={"main"} />
            </mesh>

            <mesh
              name='door'
              ref={doorRef}
              castShadow
              receiveShadow
              geometry={nodes.door.geometry}
              position={[0.425, 1.185, 0.339]}
              rotation={[0, 1, 0]}
            >
              <NewMaterial type={"main"} />
              <mesh
                name='door-bevel'
                visible={allBevelled}
                castShadow
                receiveShadow
                geometry={nodes["door-bevel"].geometry}
                rotation={[Math.PI, -0.646, Math.PI]}
              >
                <NewMaterial type={"main"} />
              </mesh>
              <mesh
                name='door-straight'
                visible={!allBevelled}
                castShadow
                receiveShadow
                geometry={nodes["door-straight"].geometry}
                rotation={[Math.PI, -0.646, Math.PI]}
              >
                <NewMaterial type={"main"} />
              </mesh>
            </mesh>

            {applianceType === "fridge" && (
              <>
                <mesh
                  name='cooler'
                  castShadow
                  receiveShadow
                  geometry={nodes["inside-cooler"].geometry}
                >
                  <NewMaterial type={"main"} />
                  <mesh
                    name='cooler-bevel'
                    visible={allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["cooler-bevel"].geometry}
                  >
                    <NewMaterial type={"main"} />
                  </mesh>
                  <mesh
                    name='cooler-straight'
                    visible={!allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["cooler-straight"].geometry}
                  >
                    <NewMaterial type={"main"} />
                  </mesh>

                  <mesh
                    name='grill'
                    castShadow
                    receiveShadow
                    geometry={nodes.grill002.geometry}
                    material={materials["[Metal_Aluminum_Anodized]"]}
                    position={[-0.304, 0.055, 0.291]}
                  />
                  <group
                    name='cooler-door'
                    position={[-0.053, 0.01, -0.026]}
                    rotation={[0, -1.571, 0]}
                    scale={[1, 1.008, 1]}
                  >
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes["C-865mm_1-Door-cabinet"].geometry}
                      material={materials.Steel_med}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes["C-865mm_1-Door-cabinet_1"].geometry}
                      material={materials[" Steel_light"]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes["C-865mm_1-Door-cabinet_2"].geometry}
                      material={materials["[0136_Charcoal]"]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes["C-865mm_1-Door-cabinet_3"].geometry}
                      material={materials.Material}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes["C-865mm_1-Door-cabinet_4"].geometry}
                      material={materials["[0133_Gray]"]}
                    />
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes["C-865mm_1-Door-cabinet_5"].geometry}
                      material={materials["[0129_WhiteSmoke]"]}
                    />
                    <group
                      ref={coolerRef}
                      position={[0.313, 0.894, 0.233]}
                      scale={[1, 0.992, 1]}
                      rotation={[0, 0, 0]}
                    >
                      <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes["G-Object070"].geometry}
                        material={fridgeMaterial}
                      />
                      <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes["G-Object070_1"].geometry}
                        material={materials["[Translucent_Glass_Gray]"]}
                      />
                      <mesh
                        castShadow
                        receiveShadow
                        geometry={nodes["G-Object070_2"].geometry}
                        material={materials[" Steel_light"]}
                      />
                    </group>
                  </group>
                </mesh>
              </>
            )}

            {applianceType === "drawers" && (
              <>
                <mesh
                  name='drawers'
                  castShadow
                  receiveShadow
                  geometry={nodes["inside-shelf"].geometry}
                  position={[0, -0.048, 0]}
                >
                  <NewMaterial type={"main"} />
                  <mesh
                    name='shelf-bevel'
                    visible={allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["shelf-bevel"].geometry}
                  >
                    <NewMaterial type={"main"} />
                  </mesh>
                  <mesh
                    name='shelf-straight'
                    visible={!allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["shelf-straight"].geometry}
                  >
                    <NewMaterial type={"main"} />
                  </mesh>
                  <group name='drawers-group' ref={drawersRef}>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes["shelf-bottom"].geometry}
                      material={nodes["inside-shelf"].material}
                      position={[0, 0.301, 0.059]}
                      rotation={[0, -1.571, 0]}
                    >
                      <NewMaterial type={"main"} />
                    </mesh>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes["shelf-middle"].geometry}
                      material={nodes["inside-shelf"].material}
                      position={[
                        0,
                        0.544,
                        drawersRef.current
                          ? drawersRef.current.position.z
                          : 0.059,
                      ]}
                      rotation={[0, -1.571, 0]}
                    >
                      <NewMaterial type={"main"} />
                    </mesh>
                    <mesh
                      castShadow
                      receiveShadow
                      geometry={nodes["shelf-top"].geometry}
                      material={nodes["inside-shelf"].material}
                      position={[
                        0,
                        0.788,
                        drawersRef.current
                          ? drawersRef.current.position.z
                          : 0.059,
                      ]}
                      rotation={[0, -1.571, 0]}
                    >
                      <NewMaterial type={"main"} />
                    </mesh>
                  </group>
                </mesh>
              </>
            )}
          </mesh>

          <WineStand
            props={{
              position: [0, 0, 0],
              rotation: [0, 0, 0],
              scale: [1, 1, 1],
            }}
          />
        </group>
      </group>

      <BakePlane
        props={{
          position: [towerPosition[0], 0.001, towerPosition[2]],
        }}
      />
    </>
  );
}

useGLTF.preload("./models/base-island-high.glb");
