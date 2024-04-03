import React from 'react';
import { useGLTF } from '@react-three/drei'

export default function Stool({ props }) {


    const { nodes, materials } = useGLTF("/models/stool.glb");

    return (
        <group
            name="stool-group-container"
            {...props}
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.stool.geometry}
                material={materials.velvet}
            >
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.stand_1.geometry}
                    material={materials['Material.001']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.stand_2.geometry}
                    material={materials['Material1 metal']}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.stand_3.geometry}
                    material={materials['Material2 plastic']}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('/models/stool.glb')