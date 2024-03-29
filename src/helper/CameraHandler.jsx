import React from 'react';
import { CameraControls } from '@react-three/drei';
import { useRef, useEffect } from 'react';

import useScene from '../store/useScene';

export default function CameraHandler() {

    const camera = useRef();

    const {
        cameraFocus,
        setCameraFocus,
    } = useScene((state) => ({
        cameraFocus: state.cameraFocus,
        setCameraFocus: state.setCameraFocus,
    }));

    useEffect(() => {
        camera.current.moveTo(...cameraFocus, true);

        updateViewOffset();

        window.addEventListener("resize", updateViewOffset);

        return () => {
            window.removeEventListener("resize", updateViewOffset);
        };
    }, [cameraFocus, setCameraFocus]);

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

    useEffect(() => {
        if (camera.current) {
            camera.current.dollyTo(4, false);
        }
    }, [camera.current]);

    return (
        <CameraControls
            ref={camera}
            draggingSmoothTime={0.2}
            maxPolarAngle={Math.PI / 2}
            maxZoom={4}
            maxDistance={4}
            minDistance={2}
        />
    )
}