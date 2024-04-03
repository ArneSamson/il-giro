import React, { useRef, useState } from "react";
import { useCursor } from "@react-three/drei";

import BaseIsland from "./BaseIsland.jsx";

import TableTop from "./accessoires/TableTop.jsx";

import GasStove from "./accessoires/GasStove.jsx";
import ElectricStove from "./accessoires/ElectricStove.jsx";

import useScene from "../../store/useScene.jsx";
import useConfig from "../../store/useConfigStore.jsx";
import useUIStore from "../../store/useUIStore.jsx";

export default function Cooktop() {
    const {
        tableTopMaterial,

        cooktopPosition,
        cooktopRotation,

        stoveType,
    } = useConfig(
        (state) => ({
            tableTopMaterial: state.tableTopMaterial,

            cooktopPosition: state.cooktopPosition,
            cooktopRotation: state.cooktopRotation,

            stoveType: state.stoveType,
        })
    );

    const { setCurrentPage } = useUIStore(
        (state) => ({
            setCurrentPage: state.setCurrentPage,
        })
    );

    const { setCameraFocus, setIsFocussedOnIsland } =
        useScene(
            (state) => ({
                setCameraFocus: state.setCameraFocus,
                setIsFocussedOnIsland: state.setIsFocussedOnIsland,
            })
        );

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer");

    const cookTopRef = useRef();

    const handleClick = () => {
        // setCurrentPage(4);
        setCameraFocus([
            cooktopPosition[0],
            cooktopPosition[1] + 1,
            cooktopPosition[2],
        ]);
        // setIsFocussedOnIsland(false, true, false);
    };

    const handlePointerOver = () => {
        setNeedPointer(true);
    };

    const handlePointerOut = () => {
        setNeedPointer(false);
    };

    const handlePointerMissed = () => {
        setIsFocussedOnIsland(false, false, false);
    };

    return (
        <>
            <group
                name="cooktop-group"
                ref={cookTopRef}
                rotation={cooktopRotation}
                position={cooktopPosition}
                dispose={null}
            >
                <group
                    name="cooktop-hovers-group"
                    // onPointerOver={(e) => {
                    //     handlePointerOver();
                    //     e.stopPropagation();
                    // }}
                    // onPointerOut={(e) => {
                    //     handlePointerOut();
                    //     e.stopPropagation();
                    // }}
                    onClick={(e) => {
                        handleClick();
                        e.stopPropagation();
                    }}
                // onPointerMissed={(e) => {
                //     handlePointerMissed();
                //     e.stopPropagation();
                // }}
                >
                    <BaseIsland />

                    <TableTop
                        props={{
                            position: [0, 0, 0],
                            rotation: [0, 0, 0],
                        }}
                    />

                    {stoveType === 1 && (
                        <GasStove
                            props={{
                                position: [0, 0, 0],
                            }}
                        />
                    )}

                    {stoveType === 2 && (
                        <ElectricStove
                            props={{
                                position: [0, 0.97, 0.1],
                                scale: [0.9, 0.9, 0.9],
                                rotation: [0, 0, 0],
                            }}
                        />
                    )}
                </group>
            </group>
        </>
    );
}
