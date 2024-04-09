import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useTexture } from '../../helper/useTexture.tsx';

import { BakePlaneSmall } from '../lighting&shadows/ShadowPlanes.jsx'

import useConfig from '../../store/useConfigStore.jsx';

export default function BaseIsland({ props, needsDrawers }) {

    const {
        mainMaterial,
        mainMaterialCategory,

        allBevelled,

        ralColor,
    } = useConfig(
        state => ({
            mainMaterial: state.mainMaterial,
            mainMaterialCategory: state.mainMaterialCategory,

            allBevelled: state.allBevelled,
            ralColor: state.ralColor,
        })
    );

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        mainMaterial.url + "albedo.jpg",
        mainMaterial.url + "normal.jpg",
        mainMaterial.url + "roughness.jpg",
        mainMaterial.url + "metallic.jpg"
    ]);

    albedoTexture.anisotropy = 16;
    if (albedoTexture.wrapS !== THREE.RepeatWrapping) {
        albedoTexture.repeat.set(2.5, 2.5);
        albedoTexture.wrapS = THREE.RepeatWrapping;
        albedoTexture.wrapT = THREE.RepeatWrapping;
        albedoTexture.needsUpdate = true;
    }

    metallnessTexture.name = "metalnessMap";

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        color: mainMaterialCategory === 'paint work' ? ralColor : undefined,
        map: albedoTexture,
        normalMap: normalTexture,
        normalScale: new THREE.Vector2(0.5, 0.5),
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 1,
    });

    const { nodes } = useGLTF(needsDrawers ? './models/base-island-drawers.glb' : './models/base-island.glb');


    const meshRef = useRef();

    useEffect(() => {

        if (meshRef.current) {
            const geometry = meshRef.current.geometry;

            const uvAttributeName = allBevelled ? "uv1" : "uv2";
            const uvAttribute = geometry.getAttribute(uvAttributeName);

            if (uvAttribute) {
                const uvBufferAttribute = new THREE.BufferAttribute(uvAttribute.array, uvAttribute.itemSize);

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
                material={material}
                rotation={[0, Math.PI / 2, 0]}
                {...props}
            >
                <mesh
                    visible={allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes.bevel.geometry}
                    material={material}
                />
                <mesh
                    visible={!allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes.straight.geometry}
                    material={material}
                />
            </mesh>
        </>}

        {!needsDrawers && <>
            <mesh
                name='base-island-mesh'
                ref={meshRef}
                castShadow
                receiveShadow
                geometry={nodes['island-low'].geometry}
                material={material}
                {...props}
                rotation={[0, Math.PI / 2, 0]}
            >
                <mesh
                    visible={allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes.bevel.geometry}
                    material={material}
                />
                <mesh
                    visible={!allBevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes.straight.geometry}
                    material={material}
                />
            </mesh>
        </>}

        <BakePlaneSmall
            props={{ ...props }}
        />

    </>
}

useGLTF.preload('./models/base-island.glb')