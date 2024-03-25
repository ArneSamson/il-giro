import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three'
import { useGLTF, useCursor } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three';
import { useDrag } from "@use-gesture/react";

import Tap1 from './accessoires/Tap1.jsx';
import Tap2 from './accessoires/Tap2.jsx';

import Reginox from './accessoires/ReginoxBowl.jsx';

import TableTop from './accessoires/TableTop.jsx';
import TableTopCutFilled from './accessoires/TableTopCutFilled.jsx';
import TableTopCutOut from './accessoires/TableTopCutOut.jsx';

import { BakePlaneSmall } from '../lighting&shadows/ShadowPlanes.jsx'

import { useTexture } from '../../helper/useTexture.tsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfig.jsx';

export default function Sink({ props }) {

    const {
        mainMaterial,
        tableTopMaterial,

        sinkPosition,

        allBevelled,

        tapType,

        setCurrentPage,

        dragMode,
        isDraggingSink,
        setIsDraggingSink,
        setIsDragging
    } = useConfig();

    const [albedoTexture, normalTexture, roughnessTexture, metallnessTexture] = useTexture([
        mainMaterial + "albedo.jpg",
        mainMaterial + "normal.jpg",
        mainMaterial + "roughness.jpg",
        mainMaterial + "metallic.jpg"
    ]);

    albedoTexture.anisotropy = 16;

    metallnessTexture.name = "metalnessMap";

    albedoTexture.colorSpace = THREE.SRGBColorSpace;

    const material = new THREE.MeshStandardMaterial({
        map: albedoTexture,
        normalMap: normalTexture,
        roughnessMap: roughnessTexture,
        metalnessMap: metallnessTexture,
        metalness: 1,
        roughness: 1,
    });

    const { nodes, materials } = useGLTF("./models/base-island.glb");


    const meshRef = useRef();

    useEffect(() => {

        if (meshRef.current) {
            const geometry = meshRef.current.geometry;

            const uvAttributeName = allBevelled ? "uv1" : "uv2";
            const uvAttribute = geometry.getAttribute(uvAttributeName);

            if (uvAttribute) {
                const uvBufferAttribute = new THREE.BufferAttribute(uvAttribute.array, uvAttribute.itemSize);

                geometry.setAttribute('uv', uvBufferAttribute);
            }
        }
    }, [nodes, allBevelled]);

    const { cameraFocus, setCameraFocus, setIsFocussedOnIsland } = useScene();

    const [hovered, setHover] = useState(null);

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const sinkRef = useRef();


    //animate sink and dragging_____________________________________________________________________________________
    const springProps = useSpring({
        position: hovered ? [sinkPosition[0], 0.1, sinkPosition[2]] : [sinkPosition[0], 0, sinkPosition[2]],
        rotation: isDraggingSink ? [0, 0, 0] : [0, 0.5, 0],
        scale: isDraggingSink ? [1.1, 1.1, 1.1] : [1, 1, 1],
        config: {
            tension: 250,
            friction: 50,
        }
    });

    const planeIntersectPoint = new THREE.Vector3();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

    const dragPos = useDrag(
        ({ active, event }) => {
            setIsDraggingSink(active);
            setIsDragging(active);

            if (active) {
                event.ray.intersectPlane(floorPlane, planeIntersectPoint);
                let newPosition = ([planeIntersectPoint.x, 0, planeIntersectPoint.z]);

                newPosition[0] = THREE.MathUtils.clamp(newPosition[0], -4.5, 4.5);
                newPosition[2] = THREE.MathUtils.clamp(newPosition[2], -4.5, 4.5);

                setPosition(newPosition);
            }

            event.stopPropagation();

            return;
        }
    );
    //_____________________________________________________________________________________________________________

    console.log('sink', sinkPosition, cameraFocus);

    return <>
        <a.group
            name='sink-group'
            ref={sinkRef}
            {...props}
            position={sinkPosition}
            dispose={null}
            {...springProps}
        >
            <group
                name='sink-hovers-group'
                onPointerOver={
                    (e) => {
                        setNeedPointer(true);
                        if (dragMode) return;
                        setHover(true);
                        e.stopPropagation();
                    }
                }
                onPointerOut={
                    (e) => {
                        setNeedPointer(false);
                        setHover(false);
                        e.stopPropagation();
                    }
                }
                onClick={
                    (e) => {
                        if (dragMode) return;
                        setCurrentPage(3);
                        setCameraFocus([sinkPosition[0], sinkPosition[1] + 1, sinkPosition[2]]);
                        setIsFocussedOnIsland(true);
                        e.stopPropagation();
                    }
                }
                {...(dragMode ? dragPos() : {})}

            >
                <mesh
                    ref={meshRef}
                    castShadow
                    receiveShadow
                    geometry={nodes['island-low'].geometry}
                    material={material}
                >
                    <mesh
                        visible={allBevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes.bevel.geometry}
                        material={material}
                    />
                    <mesh
                        visible={!allBevelled}
                        castShadow
                        receiveShadow
                        geometry={nodes.straight.geometry}
                        material={material}
                    />
                </mesh>

                <>
                    <TableTopCutOut
                        props={
                            {
                                position: [0, 0, 0],
                                rotation: [0, 0, 0],
                            }
                        }
                        materialUrl={tableTopMaterial}
                    />

                    <Reginox
                        props={
                            {
                                position: [0, 0, 0],
                                rotation: [0, 0, 0],
                            }
                        }
                    />
                </>


                {tapType === '1' &&
                    <Tap1
                        props={
                            {
                                position: [0, 0.01, 0],
                                rotation: [0, 0, 0],
                            }
                        }
                    />
                }

                {tapType === '2' &&

                    <Tap2
                        props={
                            {
                                position: [0, 0, 0],
                                rotation: [0, 0, 0],
                            }
                        }
                    />
                }

            </group>

            <BakePlaneSmall
                props={
                    {
                        position: [0, 0, 0],
                        rotation: [0, -0.5, 0],
                    }
                }

            />
        </a.group>

    </>
}

useGLTF.preload('./models/base-island.glb')