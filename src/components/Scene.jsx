import Cooktop from "./kitchen/Cooktop.jsx";
import Sink from "./kitchen/Sink.jsx";
import Tower from "./kitchen/Tower.jsx";
import Table from "./kitchen/Table.jsx";

import useConfigStore from "../store/useConfigStore.jsx";
import { useShallow } from "zustand/react/shallow";

export default function Scene() {
  console.log("Scene.jsx");

  const { sinkChosen, cooktopChosen, towerChosen, tableChosen } =
    useConfigStore(
      useShallow((state) => ({
        sinkChosen: state.sinkChosen,
        cooktopChosen: state.cooktopChosen,
        towerChosen: state.towerChosen,
        tableChosen: state.tableChosen,
      }))
    );

  return (
    <>
      {sinkChosen && <Sink />}

      {cooktopChosen && <Cooktop />}

      {towerChosen && <Tower />}

      {tableChosen && <Table />}
    </>
  );
}
