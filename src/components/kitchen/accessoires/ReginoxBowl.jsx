import React, { useState, useEffect } from "react";
import * as THREE from 'three'
import { useGLTF } from "@react-three/drei";

import useConfig from '../../../store/useConfigStore.jsx';

import { useTexture } from '../../../helper/useTexture.tsx';


export default function Reginox({ props }) {

    const {
        accentMaterial,
        tableTopMaterial,
        allMaterials,
    } = useConfig(
        state => ({
            accentMaterial: state.accentMaterial,
            tableTopMaterial: state.tableTopMaterial,
            allMaterials: state.allMaterials,
        })
    );

    const [bowlMaterial, setBowlMaterial] = useState(accentMaterial);

    useEffect(() => {
        if (tableTopMaterial.name === 'inox') {
            setBowlMaterial(allMaterials.find(material => material.name === 'inox'));
        } else {
            setBowlMaterial(accentMaterial);
        }
    }, [accentMaterial]);



    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        bowlMaterial.url + "albedo.jpg",
        bowlMaterial.url + "normal.jpg",
        bowlMaterial.url + "roughness.jpg",
        bowlMaterial.url + "metallic.jpg"
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