import React from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { useTexture } from '../../helper/useTexture.tsx';

import useConfig from '../../store/useConfigStore.jsx';

export default function BaseIsland({ props }) {

    const {
        tableTopMaterial,
    } = useConfig(
        state => ({
            tableTopMaterial: state.tableTopMaterial,
        })
    );


    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        tableTopMaterial + "albedo.jpg",
        tableTopMaterial + "normal.jpg",
        tableTopMaterial + "roughness.jpg",
        tableTopMaterial + "metallic.jpg"
    ]);

    albedoTexture.anisotropy = 16;

    metallnessTexture.name = "metalnessMap";

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 1,
    });

    const { nodes } = useGLTF("./models/table.glb");


    return <>

        <group

        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.table.geometry}
                material={material}
                position={[0.008, 0, 0]}
                rotation={[0, Math.PI / 2, 0]}
            />
        </group>

    </>
}

useGLTF.preload('./models/table.glb')