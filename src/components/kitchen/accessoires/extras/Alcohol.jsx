import React, { useRef } from 'react';
import { Color, MeshStandardMaterial } from 'three'
import { useTexture, useGLTF, MeshTransmissionMaterial } from '@react-three/drei'

const wineBottleMaterial = new MeshStandardMaterial({
    color: new Color("#19191B"),
    roughness: 0.0,
    metalness: 0.5,
    envMapIntensity: 0.5,
})

const whiskeyMaterial = new MeshStandardMaterial({
    color: new Color("#D14E30"),
    roughness: 0.0,
    metalness: 0,
    envMapIntensity: 0.5,
})

const wodkaMaterial = new MeshStandardMaterial({
    color: new Color("#ffffff"),
    roughness: 0.9,
    metalness: 1,
    envMapIntensity: 0.5,
})


export function GlassBottleWhiskey(props) {
    const { nodes, materials } = useGLTF('./models/glass-bottle-whiskey.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Glasses-Whisky_01_Flask001'].geometry}
                // material={materials['Whisky.001']}
                material={whiskeyMaterial}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Glasses-Whisky_01_Flask002'].geometry}
            >
                <MeshTransmissionMaterial
                    isMeshPhysicalMaterial={false}
                    transmission={0.9}
                    background={new Color(0x000000)}
                    backside={false}
                    samples={1}
                    roughness={0.0}
                    thickness={0.2}
                    chromaticAberration={0.06}
                    anisotropy={0.1}
                    distortion={0.0}
                    distortionScale={0.3}
                    envMapIntensity={0.5}
                />
            </mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Glasses-Whisky_01_Flask003'].geometry}
                // material={materials.Whisky}
                material={whiskeyMaterial}
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
                geometry={nodes['Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1008'].geometry}
                material={wineBottleMaterial}
            ></mesh>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1010'].geometry}
                material={materials['Metal_Steel_Dirty_4k.001']}
                position={[0, 0.289, 0]}
                scale={1.04}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1011'].geometry}
                material={materials['MULLED-WINE_back']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['Food-Drink_Alcohol_Bottles-Wine-Red_01_Bottle1012'].geometry}
                material={materials['MULLED-WINE']}
            />
        </group>
    )
}

export function Wodka(props) {
    const { nodes, materials } = useGLTF('./models/wodka.glb')
    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['back-label'].geometry}
                material={materials['vodka_face_back.001']}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.top.geometry}
                material={materials.Material}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['front-label'].geometry}
                material={materials.vodka_face}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.wodka001.geometry}
                // material={nodes.wodka001.material}
                material={wodkaMaterial}

            ></mesh>
        </group>
    )
}

useGLTF.preload('./models/glass-bottle-whiskey.glb')
useGLTF.preload('./models/wine-bottle.glb')
useGLTF.preload('./models/wodka.glb')