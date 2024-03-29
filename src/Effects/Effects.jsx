import React from "react";
import { BrightnessContrast, EffectComposer, N8AO } from "@react-three/postprocessing";
import { useControls } from "leva";

export default function Effects() {
    const {
        levaAOIntensity,
        levaAORadius,
        levaAODistanceFalloff,
        levaAOScreenSpaceRadius,
        levaAOHalfRes,
        levaColor,
    } = useControls("AO", {
        levaAOIntensity: {
            value: 8,
            min: 0,
            max: 10,
            step: 0.1,
            label: "Intensity",
        },
        levaAORadius: {
            value: 50,
            min: 0,
            max: 100,
            step: 1,
            label: "Radius",
        },
        levaAODistanceFalloff: {
            value: 0.2,
            min: 0,
            max: 1,
            step: 0.01,
            label: "Distance Falloff",
        },
        levaAOScreenSpaceRadius: {
            value: true,
            label: "Screen Space Radius",
        },
        levaAOHalfRes: {
            value: true,
            label: "Half Res",
        },
        levaColor: {
            value: "#0c0048",
        },
    });

    return (
        <>
            <EffectComposer disableNormalPass multisampling={8}>
                {/* <N8AO
                    intensity={levaAOIntensity}
                    aoRadius={levaAORadius}
                    distanceFalloff={levaAODistanceFalloff}
                    screenSpaceRadius={levaAOScreenSpaceRadius}
                    halfRes={levaAOHalfRes}
                    color={levaColor}
                />
                <BrightnessContrast contrast={0} brightness={0}/> */}
            </EffectComposer>
        </>
    );
}
