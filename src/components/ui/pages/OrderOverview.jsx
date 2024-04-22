import React from "react";

import useConfigStore from "../../../store/useConfigStore";

import PDFButton from "./PDFButton.jsx";
import { OverViewItem } from "../components/text/TextComponents.jsx";

export default function OrderOverview() {
  const {
    edgeFinish,

    tapType,
    mainDrawers,

    stoveType,

    applianceType,

    wineStandSize,

    sinkChosen,
    cooktopChosen,
    towerChosen,
    tableChosen,

    mainMaterial,
    tableTopMaterial,
    accentMaterial,

    allBevelled,
    tableTopInset,
  } = useConfigStore((state) => ({
    edgeFinish: state.edgeFinish,

    tapType: state.tapType,
    mainDrawers: state.mainDrawers,

    stoveType: state.stoveType,

    applianceType: state.applianceType,

    wineStandSize: state.wineStandSize,

    sinkChosen: state.sinkChosen,
    cooktopChosen: state.cooktopChosen,
    towerChosen: state.towerChosen,
    tableChosen: state.tableChosen,

    mainMaterial: state.mainMaterial,
    tableTopMaterial: state.tableTopMaterial,
    accentMaterial: state.accentMaterial,

    allBevelled: state.allBevelled,
    tableTopInset: state.tableTopInset,
  }));

  return (
    <>
      <div className='config-ui__title'>
        <span>
          <h2>Overview of your order</h2>
        </span>
      </div>

      <div className='config-ui__options'>
        <div className='config-ui__options__overview'>
          <OverViewItem topic='Main Material' value={mainMaterial.name} />

          <OverViewItem
            topic='Countertop Material'
            value={tableTopMaterial.name}
          />

          {(towerChosen || sinkChosen) && (
            <OverViewItem topic='Accent Material' value={accentMaterial.name} />
          )}

          <OverViewItem
            topic='Module(s)'
            value={
              (sinkChosen ? "Sink, " : "") +
              (cooktopChosen ? "Cooktop, " : "") +
              (towerChosen ? "Tower, " : "") +
              (tableChosen ? "Table" : "")
            }
          />

          <OverViewItem
            topic='Module finish'
            value={allBevelled ? "curved" : "straight"}
          />

          <OverViewItem
            topic='Countertop Inset'
            value={tableTopInset ? "inset" : "overlay"}
          />

          {towerChosen && (
            <>
              <OverViewItem topic='Tower Appliance' value={applianceType} />

              <OverViewItem topic='Winestand Size' value={wineStandSize} />
            </>
          )}

          {cooktopChosen && (
            <>
              <OverViewItem
                topic='Cooking fire'
                value={
                  stoveType === 1 ? "Gas" : stoveType === 2 ? "Electric" : ""
                }
              />
            </>
          )}

          {sinkChosen && (
            <>
              <OverViewItem
                topic='Faucet'
                value={
                  tapType === 1 ? "Brandwood 3" : tapType === 2 ? "Bridge" : ""
                }
              />
            </>
          )}

          <OverViewItem
            topic='Extra Drawers'
            value={mainDrawers ? "Yes" : "No"}
          />

          <PDFButton />
        </div>
      </div>
    </>
  );
}
