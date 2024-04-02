import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture, useGLTF } from '@react-three/drei'

import useConfig from '../../../store/useConfigStore.jsx';

export default function Drawers(props) {

    const {
        doorOpeningRotation,
    } = useConfig((state) => ({
        doorOpeningRotation: state.doorOpeningRotation,
    }));

    const drawersRef = useRef();

    function lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }

    useFrame((state, delta) => {
        if (delta > 1) {
            return;
        };
        if (drawersRef.current) {
            if (doorOpeningRotation === 0) {
                if (drawersRef.current.children[0].position.z < 0.0001) {
                    return;
                } else {
                    drawersRef.current.children[0].position.z = lerp(
                        drawersRef.current.children[0].position.z,
                        0,
                        delta * 2
                    );
                    drawersRef.current.children[1].position.z = lerp(
                        drawersRef.current.children[1].position.z,
                        0,
                        delta * 2
                    );
                    drawersRef.current.children[2].position.z = lerp(
                        drawersRef.current.children[2].position.z,
                        0,
                        delta * 2
                    );
                }

                console.log("closing", drawersRef.current.children[0].position.z);
            } else if (doorOpeningRotation === 1.5) {
                if (drawersRef.current.children[0].position.z > 0.034) {
                    return;
                } else {
                    const bottomShelfZ = doorOpeningRotation / 8;
                    const middleShelfZ = doorOpeningRotation / 8 - 0.08; // Adjust as needed
                    const topShelfZ = doorOpeningRotation / 7 - 0.18; // Adjust as needed

                    drawersRef.current.children[2].position.z = lerp(
                        drawersRef.current.children[2].position.z,
                        bottomShelfZ,
                        delta * 2
                    );
                    drawersRef.current.children[1].position.z = lerp(
                        drawersRef.current.children[1].position.z,
                        middleShelfZ,
                        delta * 2
                    );
                    drawersRef.current.children[0].position.z = lerp(
                        drawersRef.current.children[0].position.z,
                        topShelfZ,
                        delta * 2
                    );
                }
                console.log("opening", drawersRef.current.children[0].position.z);
            }
        }
    });

    const { nodes, materials } = useGLTF("./models/drawers.glb");
    return (
        <group
            ref={drawersRef}
            {...props}
            dispose={null}
            rotation={[0, Math.PI, 0]}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.drawer008.geometry}
                material={nodes.drawer008.material}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.drawer007.geometry}
                material={nodes.drawer007.material}
                position={[0, -0.252, 0]}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.drawer006.geometry}
                material={nodes.drawer006.material}
                position={[0, -0.504, 0]}
            />
        </group>
    )

}

useGLTF.preload('./models/drawers.glb')