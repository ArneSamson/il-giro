import React, { useRef } from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import useConfig from '../../../store/useConfigStore.jsx';

import { useTexture } from '../../../helper/useTexture.tsx';


export default function Tap1({ props }) {

    const {
        accentMaterial,

    } = useConfig();

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

    const { nodes, materials } = useGLTF("/models/tap2.glb");

    return (
        <group
            name="tap2-group-container"
            {...props}
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Bridge.geometry}
                material={material}
            />
        </group>
    );
}

useGLTF.preload('/models/tap2.glb')