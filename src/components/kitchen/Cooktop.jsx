import React, { useRef } from "react";

import BaseIsland from "./BaseIsland.jsx";

import TableTop from "./tabletops/TableTop.jsx";
import TableTopRound from "./tabletops/TableTopRound.jsx";

import GasStove from "./accessoires/GasStove.jsx";
import ElectricStove from "./accessoires/ElectricStove.jsx";

import useScene from "../../store/useScene.jsx";
import useConfig from "../../store/useConfigStore.jsx";

export default function Cooktop() {
    const {
        cooktopPosition,
        cooktopRotation,

        stoveType,

        tableTopInset,
    } = useConfig(
        (state) => ({
            tableTopMaterial: state.tableTopMaterial,

            cooktopPosition: state.cooktopPosition,
            cooktopRotation: state.cooktopRotation,

            stoveType: state.stoveType,

            tableTopInset: state.tableTopInset,
        })
    );

    const {
        setCameraFocus,
    } = useScene(
        (state) => ({
            setCameraFocus: state.setCameraFocus,
            setIsFocussedOnIsland: state.setIsFocussedOnIsland,
        })
    );

    const cookTopRef = useRef();

    const handleClick = () => {
        setCameraFocus([
            cooktopPosition[0],
            cooktopPosition[1] + 1,
            cooktopPosition[2],
        ]);
    };

    const a = false;

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
                    onClick={(e) => {
                        handleClick();
                        e.stopPropagation();
                    }}
                >
                    <BaseIsland />


                    <group
                        position={tableTopInset ? [0, 0, 0] : [0, 0.02, 0]}
                    >

                        <TableTop
                            props={{
                                scale: tableTopInset ? [1, 1, 1] : [1.05, 1, 1.05],
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
            </group>
        </>
    );
}
