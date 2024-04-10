import React, { useRef, useState, useEffect } from 'react';

import { RepeatWrapping, SRGBColorSpace, NoColorSpace, BufferAttribute, Vector2, MeshStandardMaterial } from 'three';

import { useGLTF } from '@react-three/drei'
import { useTexture } from "../../helper/useTexture";

import { BakePlaneSmall } from '../lighting&shadows/ShadowPlanes.jsx'

import NewMaterial from '../../helper/NewMaterial.jsx';

import useConfig from '../../store/useConfigStore.jsx';

export default function BaseIsland({ props, needsDrawers }) {

    const {
        mainMaterial,
        allBevelled,
    } = useConfig(
        state => ({
            mainMaterial: state.mainMaterial,
            allBevelled: state.allBevelled,
        })
    );

    const { nodes } = useGLTF(needsDrawers ? './models/base-island-drawers.glb' : './models/base-island.glb');

    const meshRef = useRef();

    useEffect(() => {

        if (meshRef.current && nodes) {
            const geometry = meshRef.current.geometry;

            const uvAttributeName = allBevelled ? "uv1" : "uv2";
            const uvAttribute = geometry.getAttribute(uvAttributeName);

            if (uvAttribute) {
                const uvBufferAttribute = new BufferAttribute(uvAttribute.array, uvAttribute.itemSize);

                geometry.setAttribute('uv', uvBufferAttribute);
            }
        }
    }, [nodes, allBevelled]);


    return <>

        {needsDrawers && <>
            <mesh
                name='base-island-mesh'
                ref={meshRef}
                castShadow
                receiveShadow
                geometry={nodes['island-low-drawers'].geometry}
                rotation={[0, Math.PI / 2, 0]}
                {...props}
            >
                <NewMaterial
                    type={"main"}
                />
                <mesh
                    visible={allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes.bevel.geometry}
                >
                    <NewMaterial
                        type={"main"}
                    />
                </mesh>
                <mesh
                    visible={!allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes.straight.geometry}
                >
                    <NewMaterial
                        type={"main"}
                    />
                </mesh>
            </mesh>
        </>}

        {!needsDrawers && <>
            <mesh
                name='base-island-mesh'
                ref={meshRef}
                castShadow
                receiveShadow
                geometry={nodes['island-low'].geometry}
                {...props}
                rotation={[0, Math.PI / 2, 0]}
            >
                <NewMaterial
                    type={"main"}
                />

                <mesh
                    visible={allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes.bevel.geometry}
                >
                    <NewMaterial
                        type={"main"}
                    />
                </mesh>
                <mesh
                    visible={!allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes.straight.geometry}
                >
                    <NewMaterial
                        type={"main"}
                    />
                </mesh>
            </mesh>
        </>}

        <BakePlaneSmall
            props={{ ...props }}
        />

    </>
}

useGLTF.preload('./models/base-island.glb')