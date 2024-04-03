import React, { useRef } from "react";
import * as THREE from 'three'
import { useGLTF } from "@react-three/drei";

import useConfig from '../../../store/useConfigStore.jsx';

import { useTexture } from '../../../helper/useTexture.tsx';


export default function Reginox({ props }) {

    const {
        accentMaterial,

    } = useConfig();

    console.log(accentMaterial);

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        accentMaterial.url + "albedo.jpg",
        accentMaterial.url + "normal.jpg",
        accentMaterial.url + "roughness.jpg",
        accentMaterial.url + "metallic.jpg"
    ]);

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 0,
    });


    const { nodes, materials } = useGLTF("./models/Reginox.glb");

    return (
        <group
            name="sink-bowl-group"
            {...props}
            dispose={null}
        >
            <mesh
                name="sink-bowl-mesh"
                castShadow
                receiveShadow
                geometry={nodes.Reginox.geometry}
                material={material}
                position={[0, 0.782, 0.242]}
            />
        </group>
    );
}

useGLTF.preload("./models/Reginox.glb");