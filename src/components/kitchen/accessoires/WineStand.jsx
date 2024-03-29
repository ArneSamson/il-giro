import React, { useRef } from 'react';
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'

import useConfig from '../../../store/useConfigStore.jsx';

import { useTexture } from '../../../helper/useTexture.tsx';

export default function WineStand({ props }) {


    const {
        accentMaterial,
        wineStandSize,

    } = useConfig();

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        accentMaterial + "albedo.jpg",
        accentMaterial + "normal.jpg",
        accentMaterial + "roughness.jpg",
        accentMaterial + "metallic.jpg"
    ]);

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 0.5,
        roughness: 0,

    });


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
                    material={material}
                />
            }
            {wineStandSize === 'medium' &&
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['medium-stand'].geometry}
                    material={material}
                />
            }
            {wineStandSize === 'small' &&
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes['small-stand'].geometry}
                    material={material}
                />
            }
        </group>
    );
}

useGLTF.preload('./models/winestand.glb')