import React, { useRef, useEffect } from 'react';
import { useTexture, useGLTF } from '@react-three/drei'

export function BakePlane({ props }) {

    const { nodes } = useGLTF("./models/bake-plat.glb");

    const alphaMap1 = useTexture('./images/bakes/bake.jpg');
    alphaMap1.flipY = false;

    const bigPlaneRef = useRef();

    useEffect(() => {
        if (bigPlaneRef.current) {
            bigPlaneRef.current.rotation.y = - bigPlaneRef.current.parent.rotation.y;
        }
    }, [props]);

    return (
        <group
            name='bakePlane-group'
            ref={bigPlaneRef}
            {...props}
            dispose={null}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <mesh
                name='bakePlane-mesh'
                geometry={nodes.Plane002.geometry}
                renderOrder={1}
            >
                <meshBasicMaterial
                    attach="material"
                    alphaMap={alphaMap1}
                    color="#000"
                    metalness={0}
                    roughness={1}
                    transparent
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

export function BakePlaneSmall({ props }) {

    const { nodes, materials } = useGLTF("./models/bake-plat.glb");

    const alphaMap1 = useTexture('./images/bakes/bake2.jpg');
    alphaMap1.flipY = false;

    const smallPlaneRef = useRef();


    useEffect(() => {
        if (smallPlaneRef.current) {
            smallPlaneRef.current.rotation.y = - smallPlaneRef.current.parent.parent.rotation.y;
        }
    }, [props]);

    return (
        <group
            name='bakePlaneSmall-group'
            ref={smallPlaneRef}
            {...props}
            dispose={null}
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <mesh
                name='bakePlaneSmall-mesh'
                geometry={nodes.Plane002.geometry}
            >
                <meshBasicMaterial
                    attach="material"
                    alphaMap={alphaMap1}
                    color="#000"
                    metalness={0}
                    roughness={1}
                    transparent
                    depthWrite={false}

                />
            </mesh>
        </group>
    );
}

useGLTF.preload('./models/bake-plat.glb');