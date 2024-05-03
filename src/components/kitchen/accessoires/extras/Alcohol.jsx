import React, { useRef, memo } from "react";
import { Color, MeshStandardMaterial } from "three";
import {
  useTexture,
  useGLTF,
  MeshTransmissionMaterial,
  Instances,
  Instance,
} from "@react-three/drei";
import { useShallow } from "zustand/react/shallow";
import useConfigStore from "../../../../store/useConfigStore";

const wineBottleMaterial = new MeshStandardMaterial({
  color: new Color("#19191B"),
  roughness: 0.0,
  metalness: 0.5,
  envMapIntensity: 0.5,
});

const whiskeyMaterial = new MeshStandardMaterial({
  color: new Color("#D14E30"),
  roughness: 0.0,
  metalness: 0,
  envMapIntensity: 0.5,
});

const wodkaMaterial = new MeshStandardMaterial({
  color: new Color("#ffffff"),
  roughness: 0.9,
  metalness: 1,
  envMapIntensity: 0.5,
});

const wineBottles = [];

for (let i = 0; i < 10; i++) {
  if (i < 5) {
    wineBottles.push(
      <WineBottle
        key={i}
        position={[-0.2 + i / 10, 0.43, -0.1]}
        scale={[1, 1, 1]}
        rotation={[Math.PI / 2, Math.PI, 0]}
      />
    );
  }
  if (i >= 5) {
    wineBottles.push(
      <WineBottle
        key={i}
        position={[-0.2 + (i - 5) / 10, 0.68, -0.1]}
        scale={[1, 1, 1]}
        rotation={[Math.PI / 2, Math.PI, 0]}
      />
    );
  }
}

export function GlassBottleWhiskey(props) {
  const { nodes, materials } = useGLTF("./models/glass-bottle-whiskey.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={
          nodes["Food-Drink_Alcohol_Glasses-Whisky_01_Flask001"].geometry
        }
        material={whiskeyMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={
          nodes["Food-Drink_Alcohol_Glasses-Whisky_01_Flask002"].geometry
        }
      >
        <MeshTransmissionMaterial
          isMeshPhysicalMaterial={false}
          transmission={0.9}
          background={new Color(0x000000)}
          backside={false}
          samples={1}
          roughness={0.0}
          thickness={0.2}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.0}
          distortionScale={0.3}
          envMapIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

export function WineBottle(props) {
  const { visibleForPDF } = useConfigStore(
    useShallow((state) => ({
      visibleForPDF: state.visibleForPDF,
    }))
  );
  const { nodes, materials } = useGLTF("./models/wine-bottle.glb");
  return (
    <Instances
      limit={props.limit}
      geometry={
        nodes["Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1008"].geometry
      }
      material={wineBottleMaterial}
    >
      {wineBottles.map((bottle, index) => (
        <Instance
          key={index}
          position={bottle.props.position}
          scale={bottle.props.scale}
          rotation={bottle.props.rotation}
        />
      ))}
      {/* <group {...props} dispose={null} visible={visibleForPDF}>
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1008"].geometry
          }
          material={wineBottleMaterial}
        ></mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1010"].geometry
          }
          material={materials["Metal_Steel_Dirty_4k.001"]}
          position={[0, 0.289, 0]}
          scale={1.04}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1011"].geometry
          }
          material={materials["MULLED-WINE_back"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={
            nodes["Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1012"].geometry
          }
          material={materials["MULLED-WINE"]}
        />
      </group> */}
    </Instances>
  );
}

export function Wodka(props) {
  const { nodes, materials } = useGLTF("./models/wodka.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["back-label"].geometry}
        material={materials["vodka_face_back.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.top.geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["front-label"].geometry}
        material={materials.vodka_face}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wodka001.geometry}
        // material={nodes.wodka001.material}
        material={wodkaMaterial}
      ></mesh>
    </group>
  );
}

useGLTF.preload("./models/glass-bottle-whiskey.glb");
useGLTF.preload("./models/wine-bottle.glb");
useGLTF.preload("./models/wodka.glb");
