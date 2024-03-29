import React from "react";

import useConfigStore from "../../../store/useConfigStore.jsx";

import ModuleSelectionButtons from "../components/ModuleSelectionButtons.jsx";
import BevelledSelection from "../components/BevelledSelection.jsx";

export default function ModuleSelectionPage() {

    const {
        sinkChosen,
        cooktopChosen,
        towerChosen,
        tableChosen,

        setSinkChosen,
        setCooktopChosen,
        setTowerChosen,
        setTableChosen,
    } = useConfigStore(
        state => ({
            sinkChosen: state.sinkChosen,
            cooktopChosen: state.cooktopChosen,
            towerChosen: state.towerChosen,
            tableChosen: state.tableChosen,

            setSinkChosen: state.setSinkChosen,
            setCooktopChosen: state.setCooktopChosen,
            setTowerChosen: state.setTowerChosen,
            setTableChosen: state.setTableChosen,
        })
    );

    const moduleOptions = [
        { label: "Sink", value: "sink", chosen: sinkChosen, setChosen: setSinkChosen },
        { label: "Cooktop", value: "cooktop", chosen: cooktopChosen, setChosen: setCooktopChosen },
        { label: "Tower", value: "tower", chosen: towerChosen, setChosen: setTowerChosen },
        { label: "Table", value: "table", chosen: tableChosen, setChosen: setTableChosen },
    ];
    const anyModuleChosen = moduleOptions.some(option => option.chosen);

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>Choose your modules</h2></span>
        </div>

        <div
            className='config-ui__options'
        >
            <div
                style={anyModuleChosen ? { border: "none" } : { border: "2px dashed var(--off-black)", borderWidth: "2px", animation: "pulse 1s infinite" }}
            >
                <ModuleSelectionButtons
                    summary="Select module(s): "
                    options={moduleOptions}
                />
            </div>

            <BevelledSelection />


        </div >
    </>
}