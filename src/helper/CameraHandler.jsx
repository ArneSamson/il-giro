import React from 'react';
import { CameraControls } from '@react-three/drei';
import { useRef, useEffect, useState } from 'react';

import useScene from '../store/useScene';

export default function CameraHandler() {

    const camera = useRef();

    const [maxDistance, setMaxDistance] = useState(4);
    const [minDistance, setMinDistance] = useState(2);

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
            const widthOffset = window.innerWidth * 0.25;
            let heightOffset;
            if (cameraFocus[0] === 0 && cameraFocus[1] === 1 && cameraFocus[2] === 0) {
                heightOffset = 0;
            } else {
                heightOffset = 125;
            }
            camera.current.camera.setViewOffset(
                window.innerWidth,
                window.innerHeight,
                widthOffset / 2,
                heightOffset,
                window.innerWidth,
                window.innerHeight,
            );
            camera.current.camera.updateProjectionMatrix();
        } else {
            const heightOffset = window.innerHeight * 0.45;
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

        if (window.innerWidth < 1200) {
            setMaxDistance(4 + (1200 - window.innerWidth) / 150);
            setMinDistance(3.5)
        } else {
            setMaxDistance(4);
            setMinDistance(2);
        }

    };

    useEffect(() => {
        if (camera.current) {
            camera.current.dollyTo(maxDistance, false);
        }
    }, [camera.current]);

    return (
        <CameraControls
            ref={camera}
            draggingSmoothTime={0.2}
            maxPolarAngle={Math.PI / 2}
            maxZoom={4}
            maxDistance={maxDistance}
            minDistance={minDistance}
        />
    )
}