import React from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import { useTexture } from '../../../helper/useTexture.tsx';

import useConfig from '../../../store/useConfigStore.jsx';

export default function TableFlat({ props }) {

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


    //base is 40mm high in model

    return <>

        <group
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['table-tabletop001'].geometry}
                material={material}
                position={[0, 0.96, 0]}
                scale={[1, 1, 1]}
                {...props}
            />
        </group>

    </>
}

useGLTF.preload('./models/table.glb')