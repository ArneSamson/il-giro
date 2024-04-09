import React, { useRef } from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import useConfig from '../../../store/useConfigStore.jsx';

import { useTexture } from '../../../helper/useTexture.tsx';


export default function Tap1({ props }) {

    const {
        accentMaterial,

    } = useConfig(
        state => ({
            accentMaterial: state.accentMaterial,
        })
    );

    const [albedoTexture, metallnessTexture] = useTexture([
        accentMaterial.url + "albedo.jpg",
        accentMaterial.url + "metallic.jpg"
    ]);

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 0

    });

    const { nodes } = useGLTF("/models/tap1.glb");

    return (
        <group
            name="tap1-group"
            {...props}
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['3DGeom~3529_(C-3DGeom~3529_Defintion#3)'].geometry}
                material={material}
                position={[-0.029, 0.883, -0.026]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['3DGeom~3771_(C-3DGeom~3771_Defintion#3)'].geometry}
                material={material}
                position={[-0.029, 0.874, -0.026]}
                scale={1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['3DGeom~5954_(C-3DGeom~5954_Defintion#4)'].geometry}
                material={material}
                position={[-0.029, 0.874, -0.026]}
                scale={1}
            />
        </group>
    );
}

useGLTF.preload('/models/tap1.glb')