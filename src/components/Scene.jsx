import Cooktop from "./kitchen/Cooktop.jsx";
import Sink from "./kitchen/Sink.jsx";
import Tower from "./kitchen/Tower.jsx";
import Table from "./kitchen/Table.jsx";

import useConfig from "../store/useConfigStore.jsx";

export default function Scene() {

    console.log("Scene.jsx");

    const {
        sinkChosen,
        cooktopChosen,
        towerChosen,
        tableChosen,
    } = useConfig((state) => ({
        sinkChosen: state.sinkChosen,
        cooktopChosen: state.cooktopChosen,
        towerChosen: state.towerChosen,
        tableChosen: state.tableChosen,
    }));

    return (
        <>

            {sinkChosen && <Sink />}

            {cooktopChosen && <Cooktop />}

            {towerChosen && <Tower />}

            {tableChosen && <Table />}


        </>
    );
}
