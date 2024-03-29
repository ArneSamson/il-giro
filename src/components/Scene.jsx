import * as THREE from "three";
import { GridHelper } from "three";

import Cooktop from "./kitchen/Cooktop.jsx";
import Sink from "./kitchen/Sink.jsx";
import Tower from "./kitchen/Tower.jsx";
import Table from "./kitchen/Table.jsx";

import ReflectivePlane from "./lighting&shadows/ReflectivePlane.jsx";

import useConfig from "../store/useConfigStore.jsx";

export default function Scene() {
    const {
        sinkChosen,
        cooktopChosen,
        towerChosen,
        tableChosen,

        dragMode,
    } = useConfig((state) => ({
        sinkChosen: state.sinkChosen,
        cooktopChosen: state.cooktopChosen,
        towerChosen: state.towerChosen,
        tableChosen: state.tableChosen,

        dragMode: state.dragMode,
    }));

    return (
        <>
            {sinkChosen && <Sink />}

            {cooktopChosen && <Cooktop />}

            {towerChosen && <Tower />}

            {tableChosen && <Table />}

            <gridHelper
                visible={dragMode}
                args={[10, 10, 0x000000, 0x000000]}
            />

            <color
                attach="background"
                args={dragMode ? [0xefefef] : [0xffffff]}
            />
        </>
    );
}
