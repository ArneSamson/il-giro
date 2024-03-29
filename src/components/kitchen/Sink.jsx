import React, { useRef, useState } from 'react';
import { useCursor } from '@react-three/drei'

import BaseIsland from './BaseIsland.jsx';

import Tap1 from './accessoires/Tap1.jsx';
import Tap2 from './accessoires/Tap2.jsx';

import Reginox from './accessoires/ReginoxBowl.jsx';

import TableTopCutOut from './accessoires/TableTopCutOut.jsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';
import useUIStore from '../../store/useUIStore.jsx';

export default function Sink({ props }) {

    const {
        tableTopMaterial,

        sinkPosition,
        sinkRotation,

        tapType,
    } = useConfig(state => ({
        tableTopMaterial: state.tableTopMaterial,

        sinkPosition: state.sinkPosition,
        sinkRotation: state.sinkRotation,

        tapType: state.tapType,
    }));

    const {
        setCurrentPage
    } = useUIStore(state => ({
        setCurrentPage: state.setCurrentPage
    }));

    const {
        setCameraFocus,
        setIsFocussedOnIsland
    } = useScene(state => ({
        setCameraFocus: state.setCameraFocus,
        setIsFocussedOnIsland: state.setIsFocussedOnIsland
    }));

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const sinkRef = useRef();

    const handleClick = () => {
        setCurrentPage(3);
        setCameraFocus([sinkPosition[0], sinkPosition[1] + 1, sinkPosition[2]]);
        setIsFocussedOnIsland(true, false, false);
    }

    const handlePointerOver = (e) => {
        setNeedPointer(true);
    }

    const handlePointerOut = () => {
        setNeedPointer(false);
    }

    const handlePointerMissed = () => {
        setIsFocussedOnIsland(false, false, false);
    }


    return <>
        <group
            name='sink-group'
            ref={sinkRef}
            rotation={sinkRotation}
            position={sinkPosition}
            dispose={null}
        >
            <group
                name='sink-hovers-group'
                // onPointerOver={
                //     (e) => {
                //         handlePointerOver(e);
                //         e.stopPropagation();
                //     }
                // }
                // onPointerOut={
                //     (e) => {
                //         handlePointerOut();
                //         e.stopPropagation();
                //     }
                // }
                onClick={
                    (e) => {
                        handleClick();
                        e.stopPropagation();
                    }
                }
            // onPointerMissed={
            //     (e) => {
            //         setIsFocussedOnIsland(false, false, false);
            //         e.stopPropagation();
            //     }

            // }
            >
                <BaseIsland />

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

        </group>
    </>
}