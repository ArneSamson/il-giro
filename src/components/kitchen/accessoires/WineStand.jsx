import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei'

import useConfig from '../../../store/useConfigStore.jsx';

import NewMaterial from '../../../helper/NewMaterial.jsx';

import { GlassBottleWhiskey, WineBottle } from './extras/Alcohol.jsx';


export default function WineStand({ props }) {


    const {
        wineStandSize,

    } = useConfig(
        state => ({
            wineStandSize: state.wineStandSize,
        })
    );

    const { nodes } = useGLTF("./models/winestand.glb");
    return (
        <group
            name='liquorStand'
            {...props}
            dispose={null}
        >
            {wineStandSize === 'tall' &&
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['tall-stand'].geometry}
                >
                    <NewMaterial
                        type={"accent"}
                        ralExclude={true}
                    />
                </mesh>
            }
            {wineStandSize === 'medium' &&
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['medium-stand'].geometry}
                >
                    <NewMaterial
                        type={"accent"}
                        ralExclude={true}
                        envIntensity={0.45}
                    />
                </mesh>
            }
            {wineStandSize === 'small' &&
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['small-stand'].geometry}
                >
                    <NewMaterial
                        type={"accent"}
                        ralExclude={true}
                    />
                </mesh>
            }

            <GlassBottleWhiskey
                position={[-0.05, 1.855, -0.05]}
                scale={[0.8, 0.8, 0.8]}
                rotation={[0, 0, 0]}
            />

            <WineBottle
                position={[0.05, 1.855, -0.05]}
                scale={[0.8, 0.8, 0.8]}
                rotation={[0, Math.PI, 0]}
            />

        </group>
    );
}

useGLTF.preload('./models/winestand.glb')