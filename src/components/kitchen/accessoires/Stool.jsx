import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei'
import { useSpring, a } from '@react-spring/three'

import useConfigStore from '../../../store/useConfigStore';

export default function Stool({ props }) {


    const {
        showChairs,
    } = useConfigStore(
        state => ({
            showChairs: state.showChairs
        })
    );

    const { nodes, materials } = useGLTF("/models/stool.glb");

    const [isVisible, setIsVisible] = useState(showChairs);

    // Define spring animation for stool scale
    const [stoolScale, setStoolScale] = useSpring(() => ({
        scale: [0.01, 0.01, 0.01],
        config: { duration: 250 },
        reverse: !showChairs,
        onRest: () => {
            setIsVisible(showChairs);
        }
    }));

    useEffect(() => {
        setStoolScale({
            scale: showChairs ? [1, 1, 1] : [0.01, 0.01, 0.01],
            reverse: !showChairs,
        });
    }, [showChairs, setStoolScale]);

    return isVisible ? (
        <a.group
            name="stool-group-container"
            scale={stoolScale.scale}
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
        </a.group>
    ) : null;
}

useGLTF.preload('/models/stool.glb')