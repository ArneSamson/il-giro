import React, { useRef } from 'react';

import BaseIsland from './BaseIsland.jsx';

import Tap1 from './accessoires/Tap1.jsx';
import Tap2 from './accessoires/Tap2.jsx';

import Reginox from './accessoires/ReginoxBowl.jsx';
import Drawers from './accessoires/Drawers.jsx';

import TableTopCutOut from './tabletops/TableTopCutOut.jsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';

export default function Sink({ props }) {

    const {
        sinkPosition,
        sinkRotation,

        tapType,

        mainDrawers,

        tableTopInset,
    } = useConfig(state => ({
        sinkPosition: state.sinkPosition,
        sinkRotation: state.sinkRotation,

        tapType: state.tapType,

        mainDrawers: state.mainDrawers,

        tableTopInset: state.tableTopInset,
    }));

    const {
        setCameraFocus,
    } = useScene(state => ({
        setCameraFocus: state.setCameraFocus,
    }));

    const sinkRef = useRef();

    const handleClick = () => {
        setCameraFocus([sinkPosition[0], sinkPosition[1] + 1, sinkPosition[2]]);
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
                onClick={
                    (e) => {
                        handleClick();
                        e.stopPropagation();
                    }
                }
            >
                <BaseIsland
                    needsDrawers={mainDrawers}
                />

                {mainDrawers &&
                    <Drawers />
                }

                <group
                    position={tableTopInset ? [0, 0, 0] : [0, 0.02, 0]}
                >
                    <group
                        scale={tableTopInset ? [1, 1, 1] : [1.05, 1, 1.05]}
                    >

                        <TableTopCutOut

                        />

                        <Reginox
                            props={
                                {
                                    position: [0, 0, 0],
                                    rotation: [0, 0, 0],
                                }
                            }
                        />
                    </group>


                    {tapType === 1 &&
                        <Tap1
                            props={
                                {
                                    position: [0, 0.01, 0],
                                    rotation: [0, 0, 0],
                                }
                            }
                        />
                    }

                    {tapType === 2 &&

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

        </group>
    </>
}