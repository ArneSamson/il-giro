import React, { useState, useEffect } from "react";
import * as THREE from 'three'
import { useGLTF } from "@react-three/drei";

import useConfig from '../../../store/useConfigStore.jsx';

import NewMaterial from '../../../helper/NewMaterial.jsx';

export default function Reginox({ props }) {

    const {
        tableTopMaterial,
    } = useConfig(
        state => ({
            tableTopMaterial: state.tableTopMaterial,
        })
    );

    const [bowlMaterialType, setBowlMaterialType] = useState("accent");

    useEffect(() => {
        if (tableTopMaterial.name === 'inox') {
            setBowlMaterialType("tableTop");
        } else {
            setBowlMaterialType("accent");
        }
    }, [tableTopMaterial]);

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
                position={[0, 0.782, 0.242]}
            >
                <NewMaterial
                    type={bowlMaterialType}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload("./models/Reginox.glb");