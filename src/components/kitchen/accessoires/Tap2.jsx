import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei'

import NewMaterial from '../../../helper/NewMaterial.jsx';

export default function Tap1({ props }) {

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
            >
                <NewMaterial
                    type={"accent"}
                    ralExclude={true}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('/models/tap2.glb')