import React, { useRef, useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import BaseIsland from "./BaseIsland.jsx";
import TableFlat from "./tabletops/TableFlat.jsx";
import TableFlatRound from "./tabletops/TableFlatRound.jsx";
import Stool from "./accessoires/Stool.jsx";

import useScene from "../../store/useScene.jsx";
import useConfigStore from "../../store/useConfigStore.jsx";

export default function Table({ props }) {
  const {
    tablePosition,
    tableRotation,

    tableTopMaterialCategory,
    tableTopInset,
    tableTopRounded,
    tableTopHeight,
  } = useConfigStore(
    useShallow((state) => ({
      tablePosition: state.tablePosition,
      tableRotation: state.tableRotation,

      tableTopMaterialCategory: state.tableTopMaterialCategory,
      tableTopInset: state.tableTopInset,
      tableTopRounded: state.tableTopRounded,
      tableTopHeight: state.tableTopHeight,
    }))
  );

  const { setCameraFocus } = useScene((state) => ({
    setCameraFocus: state.setCameraFocus,
  }));

  const tableRef = useRef();

  const handleClick = () => {
    // setCameraFocus([tablePosition[0], tablePosition[1] + 1, tablePosition[2]]);
  };

  const [tableTopPosition, setTableTopPosition] = useState([0, 0, 0]);
  const [tableTopScale, setTableTopScale] = useState([1, 1, 1]);

  useEffect(() => {
    switch (tableTopMaterialCategory) {
      case "dekton":
        setTableTopScale([1, tableTopHeight, 1]);
        // setTableTopPosition([0, 0.96, 0]);

        break;
      case "natural stone":
        setTableTopScale([1, tableTopHeight, 1]);
        // setTableTopPosition([0, 0.96, 0]);
        break;
      case "metallook":
        setTableTopScale([1, 0.125, 1]);
        // setTableTopPosition([0, 0.96, 0]);
        break;
    }
  }, [
    tableTopMaterialCategory,
    tableTopInset,
    tableTopRounded,
    tableTopHeight,
  ]);

  return (
    <>
      <group
        name='table-group'
        ref={tableRef}
        position={tablePosition}
        rotation={tableRotation}
        dispose={null}
      >
        <group
          name='table-hovers-group'
          onClick={(e) => {
            handleClick();
            e.stopPropagation();
          }}
        >
          {tableTopRounded && (
            <TableFlatRound
              props={{
                // position: tableTopPosition,
                scale: tableTopScale,
              }}
            />
          )}
          {!tableTopRounded && (
            <TableFlat
              props={{
                // position: tableTopPosition,
                scale: tableTopScale,
              }}
            />
          )}

          <BaseIsland
            props={{
              position: [1, 0, 0],
            }}
          />

          <BaseIsland
            props={{
              position: [-1, 0, 0],
            }}
          />
          <>
            <Stool
              props={{
                position: [0.3, 0, 0.7],
                rotation: [0, Math.PI, 0],
              }}
            />

            <Stool
              props={{
                position: [-0.3, 0, 0.7],
                rotation: [0, Math.PI, 0],
              }}
            />

            <Stool
              props={{
                position: [0.3, 0, -0.7],
                rotation: [0, 0, 0],
              }}
            />

            <Stool
              props={{
                position: [-0.3, 0, -0.7],
                rotation: [0, 0, 0],
              }}
            />
          </>
        </group>
      </group>
    </>
  );
}
