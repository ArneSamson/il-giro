import React, { useRef, useEffect } from "react";
import { BufferAttribute } from "three";
import { useGLTF } from "@react-three/drei";

import { BakePlaneSmall } from "../lighting&shadows/ShadowPlanes.jsx";
import NewMaterial from "../../helper/NewMaterial.jsx";

import useConfigStore from "../../store/useConfigStore.jsx";

import Drawers from "./accessoires/Drawers.jsx";

export default function BaseIsland({ props, needsDrawers }) {
  const { allBevelled } = useConfigStore((state) => ({
    allBevelled: state.allBevelled,
  }));

  const { nodes } = useGLTF(
    needsDrawers
      ? "./models/base-island-drawers.glb"
      : "./models/base-island.glb"
  );

  const meshRef = useRef();

  useEffect(() => {
    if (meshRef.current && nodes) {
      const geometry = meshRef.current.geometry;

      const uvAttributeName = allBevelled ? "uv1" : "uv2";
      const uvAttribute = geometry.getAttribute(uvAttributeName);

      if (uvAttribute) {
        const uvBufferAttribute = new BufferAttribute(
          uvAttribute.array,
          uvAttribute.itemSize
        );

        geometry.setAttribute("uv", uvBufferAttribute);
      }
    }
  }, [nodes, allBevelled]);

  return (
    <>
      {needsDrawers && (
        <>
          <mesh
            name='base-island-mesh'
            ref={meshRef}
            castShadow
            receiveShadow
            geometry={nodes["island-low001"].geometry}
            {...props}
          >
            <NewMaterial type={"main"} />
            <mesh
              visible={allBevelled}
              castShadow
              receiveShadow
              geometry={nodes.bevel003.geometry}
              rotation={[Math.PI, -1.561, Math.PI]}
            >
              <NewMaterial type={"main"} />
            </mesh>
            <mesh
              visible={!allBevelled}
              castShadow
              receiveShadow
              geometry={nodes.straight003.geometry}
              rotation={[Math.PI, -1.561, Math.PI]}
            >
              <NewMaterial type={"main"} />
            </mesh>
            <Drawers />
          </mesh>
        </>
      )}

      {!needsDrawers && (
        <>
          <mesh
            name='base-island-mesh'
            ref={meshRef}
            castShadow
            receiveShadow
            geometry={nodes["island-low"].geometry}
            {...props}
            rotation={[0, Math.PI / 2, 0]}
          >
            <NewMaterial type={"main"} />

            <mesh
              visible={allBevelled}
              castShadow
              receiveShadow
              geometry={nodes.bevel.geometry}
            >
              <NewMaterial type={"main"} />
            </mesh>
            <mesh
              visible={!allBevelled}
              castShadow
              receiveShadow
              geometry={nodes.straight.geometry}
            >
              <NewMaterial type={"main"} />
            </mesh>
          </mesh>
        </>
      )}

      <BakePlaneSmall props={{ ...props }} />
    </>
  );
}

useGLTF.preload("./models/base-island.glb");
