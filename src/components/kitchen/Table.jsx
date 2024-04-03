import React, { useRef, useState } from 'react';
import { useCursor } from '@react-three/drei'

import BaseIsland from './BaseIsland.jsx';
import TableFlat from './TableFlat.jsx';
import Stool from './accessoires/Stool.jsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';
import useUIStore from '../../store/useUIStore.jsx';

export default function Table({ props }) {

    const {
        tablePosition,
        tableRotation,
        showChairs,
    } = useConfig(
        state => ({
            tablePosition: state.tablePosition,
            tableRotation: state.tableRotation,
            showChairs: state.showChairs
        })
    );

    const { setCurrentPage } = useUIStore(
        state => ({
            setCurrentPage: state.setCurrentPage
        })
    );

    const { setCameraFocus, setIsFocussedOnIsland } = useScene(
        state => ({
            setCameraFocus: state.setCameraFocus,
            setIsFocussedOnIsland: state.setIsFocussedOnIsland
        })
    );

    const [needPointer, setNeedPointer] = useState(false);

    useCursor(needPointer, "pointer")

    const tableRef = useRef();

    const handleClick = () => {
        // setCurrentPage(2);
        setCameraFocus([tablePosition[0], tablePosition[1] + 1, tablePosition[2]]);
        // setIsFocussedOnIsland(true, false, false);
    }

    const handlePointerOver = () => {
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
            name='table-group'
            ref={tableRef}
            position={tablePosition}
            rotation={tableRotation}
            dispose={null}
        >
            <group
                name='table-hovers-group'
                // onPointerOver={
                //     (e) => {
                //         handlePointerOver();
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
                <TableFlat
                    props={{

                    }}
                />
                <BaseIsland
                    props={{
                        position: [0.995, 0, -0.005]
                    }}
                />

                <BaseIsland
                    props={{
                        position: [-0.995, 0, -0.005]
                    }}
                />

                {showChairs && <>
                    <Stool
                        props={{
                            position: [0.5, 0, 0.7],
                            rotation: [0, Math.PI, 0]
                        }}
                    />

                    <Stool
                        props={{
                            position: [-0.5, 0, 0.7],
                            rotation: [0, Math.PI, 0]
                        }}
                    />

                    <Stool
                        props={{
                            position: [0.5, 0, -0.7],
                            rotation: [0, 0, 0]
                        }}
                    />

                    <Stool
                        props={{
                            position: [-0.5, 0, -0.7],
                            rotation: [0, 0, 0]
                        }}
                    />
                </>}


            </group>

        </group>

    </>
}