import React from "react";

import useConfigStore from "../../../store/useConfigStore.jsx";

import ModuleSelectionButtons from "../components/ModuleSelectionButtons.jsx";
import DetailWithButtons from "../components/DetailWithButtons.jsx";
import BevelledSelection from "../components/toggle/BevelledSelection.jsx";

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

        allBevelled,
        setAllBevelled,
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

            allBevelled: state.allBevelled,
            setAllBevelled: state.setAllBevelled,
        })
    );

    const moduleOptions = [
        { label: "Sink", value: "sink", chosen: sinkChosen, setChosen: setSinkChosen },
        { label: "Cooktop", value: "cooktop", chosen: cooktopChosen, setChosen: setCooktopChosen },
        { label: "Tower", value: "tower", chosen: towerChosen, setChosen: setTowerChosen },
        { label: "Table", value: "table", chosen: tableChosen, setChosen: setTableChosen },
    ];

    const bevelledOptions = [
        { label: "Curved", value: true, chosen: allBevelled, setChosen: setAllBevelled },
        { label: "Straight", value: false, chosen: !allBevelled, setChosen: setAllBevelled }
    ];

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>Choose your modules</h2></span>
        </div>

        <div
            className='config-ui__options'
        >
            <ModuleSelectionButtons
                summary="Select module(s): "
                options={moduleOptions}
            />

            <DetailWithButtons
                summary="Bottom finish: "
                options={bevelledOptions}
                selectedOption={bevelledOptions.find(option => option.value === allBevelled).label}
                setOption={setAllBevelled}
            />


        </div >
    </>
}