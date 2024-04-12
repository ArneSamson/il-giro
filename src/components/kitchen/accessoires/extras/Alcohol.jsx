import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, MeshTransmissionMaterial } from '@react-three/drei'


export function GlassBottleWhiskey(props) {
    const { nodes, materials } = useGLTF('./models/glass-bottle-whiskey.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Glasses-Whisky_01_Flask001'].geometry}
                material={materials['Whisky.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Glasses-Whisky_01_Flask002'].geometry}
            >
                <MeshTransmissionMaterial
                    transmission={0.8}
                    background={new THREE.Color(0x000000)}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Glasses-Whisky_01_Flask003'].geometry}
                material={materials.Whisky}
            />
        </group>
    )
}

export function WineBottle(props) {
    const { nodes, materials } = useGLTF('./models/wine-bottle.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1007'].geometry}
            // material={materials['Red Bottle | Advanced Glass .006']}
            >
                <MeshTransmissionMaterial
                    transmission={0.8}
                    background={new THREE.Color(0x00ff00)}
                // color={0x00ff00}
                />

            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1007_1'].geometry}
                material={materials['Red Wine | Advanced Glass .006']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1007_2'].geometry}
                material={materials['Metal_Steel_Dirty_4k.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1007_3'].geometry}
                material={materials['MULLED-WINE_back']}
            />
        </group>
    )
}

useGLTF.preload('./models/glass-bottle-whiskey.glb')
useGLTF.preload('./models/wine-bottle.glb')