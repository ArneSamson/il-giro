import React, { useRef, useEffect, useState } from "react";

import BaseIsland from "./BaseIsland.jsx";

import TableTop from "./tabletops/TableTop.jsx";
import TableTopRound from "./tabletops/TableTopRound.jsx";

import GasStove from "./accessoires/GasStove.jsx";
import ElectricStove from "./accessoires/ElectricStove.jsx";

import Drawers from "./accessoires/Drawers.jsx";

import useScene from "../../store/useScene.jsx";
import useConfig from "../../store/useConfigStore.jsx";

export default function Cooktop() {
  const {
    cooktopPosition,
    cooktopRotation,

    stoveType,

    tableTopInset,
    tableTopRounded,
    setTableTopRounded,

    tableTopMaterialCategory,
    tableTopHeight,

    mainDrawers,
  } = useConfig((state) => ({
    cooktopPosition: state.cooktopPosition,
    cooktopRotation: state.cooktopRotation,

    stoveType: state.stoveType,

    tableTopInset: state.tableTopInset,
    tableTopRounded: state.tableTopRounded,
    setTableTopRounded: state.setTableTopRounded,

    tableTopMaterialCategory: state.tableTopMaterialCategory,
    tableTopHeight: state.tableTopHeight,

    mainDrawers: state.mainDrawers,
  }));

  const { setCameraFocus } = useScene((state) => ({
    setCameraFocus: state.setCameraFocus,
    setIsFocussedOnIsland: state.setIsFocussedOnIsland,
  }));

  const cookTopRef = useRef();

  const handleClick = () => {
    // setCameraFocus([
    //   cooktopPosition[0],
    //   cooktopPosition[1] + 1,
    //   cooktopPosition[2],
    // ]);
  };

  const [stovePosition, setStovePosition] = useState([0, 0, 0]);

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
          setStovePosition([0, -0.005, -0.05]);
        } else {
          if (tableTopHeight === 0.5) {
            setTableTopScale([1.05, 0.5, 1.05]);
            setTableTopPosition([0, 0.96, 0]);
            setStovePosition([0, 0.03, -0.05]);
          } else if (tableTopHeight === 0.3) {
            setTableTopScale([1.05, 0.3, 1.05]);
            setTableTopPosition([0, 0.96, 0]);
            setStovePosition([0, 0.02, -0.05]);
          }
        }
        break;
      case "natural stone":
        if (tableTopInset) {
          setTableTopScale([1, 1, 1]);
          setTableTopPosition([0, 0.905, 0]);
          setStovePosition([0, -0.005, -0.05]);
        } else {
          setTableTopScale([1.05, 1, 1.05]);
          setTableTopPosition([0, 0.96, 0]);
          setStovePosition([0, 0.048, -0.05]);
        }
        break;
      case "metal":
        if (tableTopInset) {
          setTableTopScale([1, 1, 1]);
          setTableTopPosition([0, 0.905, 0]);
          setStovePosition([0, -0.005, -0.05]);
        } else {
          setTableTopScale([1.05, 0.125, 1.05]);
          setTableTopPosition([0, 0.96, 0]);
          setStovePosition([0, 0.01, -0.05]);
        }
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
        name='cooktop-group'
        ref={cookTopRef}
        rotation={cooktopRotation}
        position={cooktopPosition}
        dispose={null}
      >
        <group
          name='cooktop-hovers-group'
          onClick={(e) => {
            handleClick();
            e.stopPropagation();
          }}
        >
          {mainDrawers && <Drawers />}

          <BaseIsland needsDrawers={mainDrawers} />

          {tableTopRounded && (
            <group>
              <TableTopRound
                props={{
                  scale: [1, tableTopScale[1], 1],
                }}
              />

              {stoveType === 1 && (
                <GasStove
                  props={{
                    position: stovePosition,
                  }}
                />
              )}

              {stoveType === 2 && (
                <ElectricStove
                  props={{
                    position: [
                      stovePosition[0],
                      stovePosition[1] + 0.97,
                      stovePosition[2] + 0.1,
                    ],
                    scale: [0.9, 0.9, 0.9],
                    rotation: [0, 0, 0],
                  }}
                />
              )}
            </group>
          )}

          {!tableTopRounded && (
            <group>
              <TableTop
                props={{
                  scale: tableTopScale,
                  position: tableTopPosition,
                }}
              />

              {stoveType === 1 && (
                <GasStove
                  props={{
                    position: stovePosition,
                  }}
                />
              )}

              {stoveType === 2 && (
                <ElectricStove
                  props={{
                    position: [
                      stovePosition[0],
                      stovePosition[1] + 0.97,
                      stovePosition[2] + 0.1,
                    ],
                    scale: [0.9, 0.9, 0.9],
                    rotation: [0, 0, 0],
                  }}
                />
              )}
            </group>
          )}
        </group>
      </group>
    </>
  );
}
