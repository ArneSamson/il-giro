import React, { useRef } from 'react';
import * as THREE from 'three'
import { useTexture, useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';

import Fridge from './accessoires/Fridge.jsx';
import Oven from './accessoires/Oven.jsx';
import LiquorStand from './accessoires/LiquorStand.jsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfig.jsx';

export default function Sink({materialUrl, bevelled, doorOpening, fridgeOrOven , props, accessoryMaterialUrl}){

    const albedoTexture = useTexture(materialUrl+"albedo.jpg");
    const normalTexture = useTexture(materialUrl+"normal.jpg");
    const roughnessTexture = useTexture(materialUrl+"roughness.jpg");
    const metallnesTexture = useTexture(materialUrl+"metallic.jpg");

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnesTexture,
        metalness: 1,
    });

    const { nodes, materials } = useGLTF("./models/kitchen-high-hollow.glb");

    const { setCurrentPage, currentPage } = useConfig();

    const { isHovering, setIsHovering } = useScene();

    let localHover = false;

    useCursor(isHovering, "hover")

    const towerRef = useRef();

    useFrame(() => {
        if (localHover){
            if(currentPage !== 3) {
                towerRef.current.position.y = Math.sin(performance.now() / 500) / 10 + 0.1;
            }
        } else {
            towerRef.current.position.y = 0;
        }
    })

    return <>
        <group 
            ref={towerRef}
            {...props} 
            dispose={null}
            onClick={
                (e) => {
                    setCurrentPage(3);
                    e.stopPropagation();
                }
            }
            onPointerOver={
                (e) => {
                    localHover = true;
                }
            }
            onPointerOut={
                (e) => {
                    localHover = false;
                }
            }
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes["tower-straight"].geometry}
                material={material}
            >
                {/* //door */}
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.door001.geometry}
                    material={material}
                    position={[0.388, 1.088, 0.316]}
                    scale={[1, 1.1, 1]}
                    rotation={[0, doorOpening, 0]}
                >
                    <mesh
                        visible={bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["door-bevel"].geometry}
                        material={material}
                    />
                    <mesh
                        visible={!bevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes["door-straight"].geometry}
                        material={material}
                    />
                </mesh>

                {/* tower underside */}
                <mesh
                    visible={bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["tower-bevel"].geometry}
                    material={material}
                />
                <mesh
                    visible={!bevelled}
                    castShadow
                    receiveShadow
                    geometry={nodes["tower-straight002"].geometry}
                    material={material}
                />
            </mesh>

            {fridgeOrOven === "fridge"
            && <Fridge/>
            }

            {fridgeOrOven === "oven"
            && <Oven/>
            }

            <LiquorStand
                materialUrl={accessoryMaterialUrl}
            />

        </group>
        

    </>
}

useGLTF.preload('./models/kitchen-high-hollow.glb')