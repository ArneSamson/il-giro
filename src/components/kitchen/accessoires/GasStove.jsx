import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF } from '@react-three/drei'

export default function GasStove({ props }) {
    const { nodes, materials } = useGLTF("./models/gas-stove.glb");

    return (
        <group
            name='gas-stove-group'
            {...props}
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['gas-pit'].geometry}
                material={materials['Gun Metal']}
                rotation={[0, Math.PI / 4, 0]}
                scale={0.95}
            />
        </group>
    );
}

useGLTF.preload('/models/gas-stove.glb')