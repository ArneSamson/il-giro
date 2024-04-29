import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei'

import NewMaterial from '../../../helper/NewMaterial.jsx';


export default function Tap1({ props }) {

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
                position={[-0.029, 0.883, -0.026]}
            >
                <NewMaterial
                    type={"accent"}
                    ralExclude={true}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['3DGeom~3771_(C-3DGeom~3771_Defintion#3)'].geometry}
                position={[-0.029, 0.874, -0.026]}
                scale={1}
            >
                <NewMaterial
                    type={"accent"}
                    ralExclude={true}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['3DGeom~5954_(C-3DGeom~5954_Defintion#4)'].geometry}
                position={[-0.029, 0.874, -0.026]}
                scale={1}
            >
                <NewMaterial
                    type={"accent"}
                    ralExclude={true}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('/models/tap1.glb')