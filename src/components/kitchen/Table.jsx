import React, { useRef } from 'react';

import BaseIsland from './BaseIsland.jsx';
import TableFlat from './tabletops/TableFlat.jsx';
import Stool from './accessoires/Stool.jsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';

export default function Table({ props }) {

    const {
        tablePosition,
        tableRotation,
    } = useConfig(
        state => ({
            tablePosition: state.tablePosition,
            tableRotation: state.tableRotation,
        })
    );

    const { setCameraFocus } = useScene(
        state => ({
            setCameraFocus: state.setCameraFocus,
        })
    );

    const tableRef = useRef();

    const handleClick = () => {
        setCameraFocus([tablePosition[0], tablePosition[1] + 1, tablePosition[2]]);
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
                onClick={
                    (e) => {
                        handleClick();
                        e.stopPropagation();
                    }
                }
            >
                <TableFlat
                    props={{

                    }}
                />
                <BaseIsland
                    props={{
                        position: [1.005, 0, 0]
                    }}
                />

                <BaseIsland
                    props={{
                        position: [-0.992, 0, 0]
                    }}
                />
                <>
                    <Stool
                        props={{
                            position: [0.3, 0, 0.7],
                            rotation: [0, Math.PI, 0]
                        }}
                    />

                    <Stool
                        props={{
                            position: [-0.3, 0, 0.7],
                            rotation: [0, Math.PI, 0]
                        }}
                    />

                    <Stool
                        props={{
                            position: [0.3, 0, -0.7],
                            rotation: [0, 0, 0]
                        }}
                    />

                    <Stool
                        props={{
                            position: [-0.3, 0, -0.7],
                            rotation: [0, 0, 0]
                        }}
                    />
                </>


            </group>

        </group>

    </>
}