import React, { useRef } from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { useTexture } from '../../../helper/useTexture.tsx';

import useConfig from '../../../store/useConfigStore.jsx';

export default function TableTopCutOut({ props }) {

    const {
        tableTopMaterial,
    } = useConfig(
        state => ({
            tableTopMaterial: state.tableTopMaterial,
        })
    );

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        tableTopMaterial.url + "albedo.jpg",
        tableTopMaterial.url + "normal.jpg",
        tableTopMaterial.url + "roughness.jpg",
        tableTopMaterial.url + "metallic.jpg"
    ]);

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 0.5,
    });


    const { nodes, materials } = useGLTF("./models/table-top-cut-out.glb");
    return (
        <group
            name='tabletop'
            {...props}
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['table-top-cut-out'].geometry}
                material={material}
            />
        </group>
    );
}

useGLTF.preload('./models/table-top-cut-out.glb')