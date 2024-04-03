import React, { useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei'
import { useSpring, a, easings } from '@react-spring/three'

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

    const [stoolScale, setStoolScale] = useSpring(() => ({
        scale: showChairs ? [1, 1, 1] : [0.01, 0.01, 0.01],
        config: {
            duration: 250,
            easing: easings.easeOutExpo
        },
        reverse: !showChairs,
        onStart: () => {
            setIsVisible(true);
        },
        onRest: () => {
            if (showChairs === false && isVisible === true) {
                setIsVisible(false);
            }
        }
    }));

    useEffect(() => {
        setStoolScale({
            scale: showChairs ? [1, 1, 1] : [0.01, 0.01, 0.01],
        });

        // console.log('showChairs:', showChairs, 'isVisible:', isVisible);
    }, [showChairs, setStoolScale]);

    // useEffect(() => {
    //     console.log('isvisble', isVisible);
    //     console.log(showChairs);
    // }, [isVisible]);

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