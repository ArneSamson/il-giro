import React, { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import * as THREE from "three";

import Scene from "./components/Scene.jsx";
import Lights from "./components/lighting&shadows/Lights.jsx";
import Env from "./components/lighting&shadows/Env.jsx";

import useScene from "./store/useScene.jsx";
import useConfig from "./store/useConfigStore.jsx";
import useUIStore from "./store/useUIStore.jsx";

import { Perf } from "r3f-perf";

export default function Experience() {
    const camera = useRef();
    const [cameraPosition, setCameraPosition] = useState(null);

    const {
        cameraFocus,
        setCameraFocus,
        isFocussedOnIsland,
        setIsFocussedOnIsland,
    } = useScene((state) => ({
        cameraFocus: state.cameraFocus,
        setCameraFocus: state.setCameraFocus,
        isFocussedOnIsland: state.isFocussedOnIsland,
        setIsFocussedOnIsland: state.setIsFocussedOnIsland,
    }));
    const isDragging = useConfig((state) => state.isDragging);
    const { currentPage, setCurrentPage } = useUIStore((state) => ({
        currentPage: state.currentPage,
        setCurrentPage: state.setCurrentPage,
    }));

    useEffect(() => {
        camera.current.moveTo(...cameraFocus, true);

        updateViewOffset();

        window.addEventListener("resize", updateViewOffset);

        return () => {
            window.removeEventListener("resize", updateViewOffset);
        };
    }, [cameraFocus, setCameraFocus]);

    useEffect(() => {
        if (camera.current) {
            camera.current.dollyTo(4, false);
        }
    }, [camera.current]);

    const updateViewOffset = () => {
        if (window.innerWidth > 1000) {
            const widthOffset = window.innerWidth * 0.25 * devicePixelRatio;
            camera.current.camera.setViewOffset(
                window.innerWidth,
                window.innerHeight,
                widthOffset / 2,
                0,
                window.innerWidth,
                window.innerHeight
            );
            camera.current.camera.updateProjectionMatrix();
        } else {
            const heightOffset = window.innerHeight * 0.45 * devicePixelRatio;
            camera.current.camera.setViewOffset(
                window.innerWidth,
                window.innerHeight,
                0,
                heightOffset / 2,
                window.innerWidth,
                window.innerHeight
            );
            camera.current.camera.updateProjectionMatrix();
        }
    };

    const [prevCamDist, setPrevCamDist] = useState(4);

    return <>

        <Perf
            position="top-left"
            style={{ transform: 'translateX(15vw)' }}
        />

        <CameraControls
            ref={camera}
            draggingSmoothTime={0.2}
            maxPolarAngle={Math.PI / 2}
            maxZoom={4}
            maxDistance={4}
            minDistance={2}
        />

        <Lights />

        <Scene />

        <Env />
    </>
}
