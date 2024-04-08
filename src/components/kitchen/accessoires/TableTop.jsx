import React, { useRef } from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { useTexture } from '../../../helper/useTexture.tsx';

import useConfigStore from '../../../store/useConfigStore.jsx';

export default function TableTop({ props }) {

    const {
        tableTopMaterial,
    } = useConfigStore(
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
        roughness: 1,
    });


    const { nodes, materials } = useGLTF("./models/table-top.glb");
    return (
        <group
            name='tabletop'
            {...props}
            dispose={null}
        >
            <mesh
                name='tabletopMesh'
                castShadow
                receiveShadow
                geometry={nodes.tabletop002.geometry}
                material={material}
            />
        </group>
    );
}

useGLTF.preload('./models/table-top.glb')