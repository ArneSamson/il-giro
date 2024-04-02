// ModuleSelectionButtons.jsx
import React, { useEffect, useState } from "react";

import useConfigStore from "../../../store/useConfigStore";

export default function ModuleSelectionButtons({ summary, options }) {

    const {
        sinkChosen,
        cooktopChosen,
        towerChosen,
        tableChosen,

        setSinkPosition,
        setSinkRotation,
        setCooktopPosition,
        setCooktopRotation,

        setTowerPosition,
        setTowerRotation,

        setTablePosition,
        setTableRotation,
    } = useConfigStore(
        state => ({
            sinkChosen: state.sinkChosen,
            cooktopChosen: state.cooktopChosen,
            towerChosen: state.towerChosen,
            tableChosen: state.tableChosen,

            setSinkPosition: state.setSinkPosition,
            setSinkRotation: state.setSinkRotation,

            setCooktopPosition: state.setCooktopPosition,
            setCooktopRotation: state.setCooktopRotation,

            setTowerPosition: state.setTowerPosition,
            setTowerRotation: state.setTowerRotation,

            setTablePosition: state.setTablePosition,
            setTableRotation: state.setTableRotation,
        })
    );

    function handleClick(option, e) {

        let activeCount = options.filter(option => option.chosen).length;

        if (option.chosen && activeCount === 1) {
            return;
        } else {
            option.setChosen(!option.chosen);
            setPositions();
        }
    }

    function setPositions() {
        switch (true) {
            case sinkChosen && cooktopChosen && towerChosen && tableChosen:
                setSinkPosition([-1.7, 0, 0.5]);
                setSinkRotation([0, 1, 0]);

                setCooktopPosition([-0.8, 0, -0.5]);
                setCooktopRotation([0, 0.6, 0]);

                setTowerPosition([0.5, 0, -1]);
                setTowerRotation([0, 0, 0]);

                setTablePosition([2.2, 0, 0.5]);
                setTableRotation([0, -1.4, 0]);
                break;
            case sinkChosen && cooktopChosen && towerChosen:
                setSinkPosition([-1.5, 0, 0]);
                setSinkRotation([0, 0.5, 0]);

                setCooktopPosition([1.5, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);

                setTowerPosition([0, 0, -1]);
                setTowerRotation([0, 0, 0]);
                break;
            case sinkChosen && cooktopChosen && tableChosen:
                setSinkPosition([-1.5, 0, 0]);
                setSinkRotation([0, 0.5, 0]);

                setCooktopPosition([1.5, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);

                setTablePosition([0, 0, 0]);
                setTableRotation([0, 1.53, 0]);
                break;
            case sinkChosen && towerChosen && tableChosen:
                setSinkPosition([-1, 0, 0]);
                setSinkRotation([0, 0.5, 0]);

                setTowerPosition([0.5, 0, -1.5]);
                setTowerRotation([0, 0, 0]);

                setTablePosition([2.3, 0, 0]);
                setTableRotation([0, -1.3, 0]);
                break;
            case cooktopChosen && towerChosen && tableChosen:
                setCooktopPosition([-1, 0, 0]);
                setCooktopRotation([0, 0.5, 0]);

                setTowerPosition([0.5, 0, -1.5]);
                setTowerRotation([0, 0, 0]);

                setTablePosition([2.3, 0, 0]);
                setTableRotation([0, -1.3, 0]);
                break;
            case sinkChosen && cooktopChosen:
                setSinkPosition([-1, 0, 0]);
                setSinkRotation([0, 0.5, 0]);

                setCooktopPosition([1, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);
                break;
            case sinkChosen && towerChosen:
                setSinkPosition([-1, 0, 0]);
                setSinkRotation([0, 0.5, 0]);

                setTowerPosition([1, 0, 0]);
                setTowerRotation([0, 0, 0]);
                break;
            case sinkChosen && tableChosen:
                setSinkPosition([-1, 0, 0]);
                setSinkRotation([0, 0.5, 0]);

                setTablePosition([1, 0, 0]);
                setTableRotation([0, -0.8, 0]);
                break;
            case cooktopChosen && towerChosen:
                setCooktopPosition([-1, 0, 0]);
                setCooktopRotation([0, -0.5, 0]);

                setTowerPosition([1, 0, 0]);
                setCooktopRotation([0, 0.5, 0]);
                break;
            case cooktopChosen && tableChosen:
                setCooktopPosition([-1, 0, 0]);
                setCooktopRotation([0, 0.5, 0]);

                setTablePosition([1, 0, 0]);
                setTableRotation([0, -0.8, 0]);
                break;
            case towerChosen && tableChosen:
                setTowerPosition([-1, 0, 0]);
                setTowerRotation([0, 0.5, 0]);

                setTablePosition([1.5, 0, 0]);
                setTableRotation([0, -0.8, 0]);
                break;
            case sinkChosen:
                setSinkPosition([0, 0, 0]);
                setSinkRotation([0, 0, 0]);
                break;
            case cooktopChosen:
                setCooktopPosition([0, 0, 0]);
                setCooktopRotation([0, 0, 0]);
                break;
            case towerChosen:
                setTowerPosition([0, 0, 0]);
                setTowerRotation([0, 0, 0]);
                break;
            case tableChosen:
                setTablePosition([0, 0, 0]);
                setTableRotation([0, 0, 0]);
                break;
        }

    }

    useEffect(() => {
        setPositions()
    }, [sinkChosen, cooktopChosen, towerChosen, tableChosen]);


    return (
        <details
            open
            className="config-ui__details"
        >
            <summary>
                {summary}
            </summary>
            <div className="config-ui__selection-buttons">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className={option.chosen ? "active-selection-button" : ""}
                        onClick={(e) => {
                            handleClick(option, e)
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </details>
    );
}
