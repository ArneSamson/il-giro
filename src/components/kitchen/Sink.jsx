import React, { useRef, useEffect, useState } from 'react';

import BaseIsland from './BaseIsland.jsx';

import Tap1 from './accessoires/Tap1.jsx';
import Tap2 from './accessoires/Tap2.jsx';

import Reginox from './accessoires/ReginoxBowl.jsx';
import Drawers from './accessoires/Drawers.jsx';

import TableTopCutOut from './tabletops/TableTopCutOut.jsx';
import TableTopCutRound from './tabletops/TableTopCutRound.jsx';

import useScene from '../../store/useScene.jsx';
import useConfig from '../../store/useConfigStore.jsx';

export default function Sink({ props }) {

    const {
        sinkPosition,
        sinkRotation,

        tapType,

        mainDrawers,

        tableTopInset,
        tableTopRounded,
        setTableTopRounded,

        tableTopMaterialCategory,
        tableTopHeight,
    } = useConfig(state => ({
        sinkPosition: state.sinkPosition,
        sinkRotation: state.sinkRotation,

        tapType: state.tapType,

        mainDrawers: state.mainDrawers,

        tableTopInset: state.tableTopInset,
        tableTopRounded: state.tableTopRounded,
        setTableTopRounded: state.setTableTopRounded,

        tableTopMaterialCategory: state.tableTopMaterialCategory,
        tableTopHeight: state.tableTopHeight,
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

    const [bowlPosition, setBowlPosition] = useState([0, 0, 0]);

    const [tableTopPosition, setTableTopPosition] = useState([0, 0, 0]);
    const [tableTopScale, setTableTopScale] = useState([1, 1, 1]);

    useEffect(() => {
        if (tableTopInset) {
            setTableTopRounded(false);
            setTableTopPosition([0, -0.005, 0]);
            setTableTopScale([1, 1, 1]);
        } else if (!tableTopInset) {
            setTableTopPosition([0, 0.047, 0]);
            setTableTopScale([1.05, 1, 1.05]);
        }
    }, [tableTopInset]);

    useEffect(() => {
        switch (tableTopMaterialCategory) {
            case "dekton":
                if (tableTopInset) {
                    setTableTopScale([1, 1, 1]);
                    setTableTopPosition([0, 0.905, 0]);
                    setBowlPosition([0, -0.005, 0]);
                } else {
                    if (tableTopHeight === 0.5) {
                        setTableTopScale([1.05, 0.5, 1.05]);
                        setTableTopPosition([0, 0.96, 0]);
                        setBowlPosition([0, 0.03, 0]);
                    } else if (tableTopHeight === 0.3) {
                        setTableTopScale([1.05, 0.3, 1.05]);
                        setTableTopPosition([0, 0.96, 0]);
                        setBowlPosition([0, 0.02, 0]);
                    }
                }
                break;
            case "natural stone":
                if (tableTopInset) {
                    setTableTopScale([1, 1, 1]);
                    setTableTopPosition([0, 0.905, 0]);
                    setBowlPosition([0, -0.005, 0]);
                }
                else {
                    setTableTopScale([1.05, 1, 1.05]);
                    setTableTopPosition([0, 0.96, 0]);
                    setBowlPosition([0, 0.048, 0]);
                }
                break;
            case "metal":
                if (tableTopInset) {
                    setTableTopScale([1, 1, 1]);
                    setTableTopPosition([0, 0.905, 0]);
                    setBowlPosition([0, -0.005, 0]);
                }
                else {
                    setTableTopScale([1.05, 0.125, 1.05]);
                    setTableTopPosition([0, 0.96, 0]);
                    setBowlPosition([0, 0.01, 0]);
                }
                break;
        }
    }, [tableTopMaterialCategory, tableTopInset, tableTopRounded, tableTopHeight]);


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

                {tableTopRounded &&
                    <group
                    >
                        <TableTopCutRound
                            props={{
                                scale: [1, tableTopScale[1], 1],
                            }}
                        />

                        <Reginox
                            props={
                                {
                                    position: bowlPosition,
                                }
                            }
                        />


                        {tapType === 1 &&
                            <Tap1
                                props={
                                    {
                                        position: bowlPosition,
                                    }
                                }
                            />
                        }

                        {tapType === 2 &&

                            <Tap2
                                props={
                                    {
                                        position: bowlPosition,
                                    }
                                }
                            />
                        }

                    </group>

                }

                {!tableTopRounded &&
                    <group
                    >
                        <TableTopCutOut
                            props={{
                                position: tableTopPosition,
                                scale: tableTopScale,
                            }}
                        />

                        <Reginox
                            props={
                                {
                                    position: bowlPosition,
                                    scale: [tableTopScale[0], 1, tableTopScale[2]],
                                }
                            }
                        />


                        {tapType === 1 &&
                            <Tap1
                                props={
                                    {
                                        position: bowlPosition,
                                    }
                                }
                            />
                        }

                        {tapType === 2 &&

                            <Tap2
                                props={
                                    {
                                        position: bowlPosition,
                                    }
                                }
                            />
                        }

                    </group>

                }

            </group>

        </group>
    </>
}