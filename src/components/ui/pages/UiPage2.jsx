import React, { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import useConfigStore from "../../../store/useConfigStore";

import DetailWithButtons from "../components/DetailWithButtons";
import { ButtonCategoryTitle } from "../components/text/TextComponents";

export default function UiPage2() {
  const {
    edgeFinish,
    setEdgeFinish,

    tapType,
    setTapType,

    stoveType,
    setStoveType,

    applianceType,
    setApplianceType,
    wineStandSize,
    setWineStandSize,

    mainDrawers,
    setMainDrawers,

    sinkChosen,
    cooktopChosen,
    towerChosen,
    tableChosen,

    tableTopInset,
    setTableTopInset,

    tableTopRounded,
    setTableTopRounded,

    tableTopHeight,
    setTableTopHeight,

    tableTopMaterialCategory,

    visibleForPDF,
    setVisibleForPDF,
  } = useConfigStore(
    useShallow((state) => ({
      edgeFinish: state.edgeFinish,
      setEdgeFinish: state.setEdgeFinish,

      tapType: state.tapType,
      setTapType: state.setTapType,

      stoveType: state.stoveType,
      setStoveType: state.setStoveType,

      applianceType: state.applianceType,
      setApplianceType: state.setApplianceType,
      wineStandSize: state.wineStandSize,
      setWineStandSize: state.setWineStandSize,

      mainDrawers: state.mainDrawers,
      setMainDrawers: state.setMainDrawers,

      sinkChosen: state.sinkChosen,
      cooktopChosen: state.cooktopChosen,
      towerChosen: state.towerChosen,
      tableChosen: state.tableChosen,

      tableTopInset: state.tableTopInset,
      setTableTopInset: state.setTableTopInset,

      tableTopRounded: state.tableTopRounded,
      setTableTopRounded: state.setTableTopRounded,

      tableTopHeight: state.tableTopHeight,
      setTableTopHeight: state.setTableTopHeight,

      tableTopMaterialCategory: state.tableTopMaterialCategory,

      visibleForPDF: state.visibleForPDF,
      setVisibleForPDF: state.setVisibleForPDF,
    }))
  );

  const edgeFinishOptions = [
    { label: "Square", value: "square" },
    { label: "Curved", value: "curved" },
  ];

  const faucetOptions = [
    { label: "Brandwood 3", value: 1 },
    { label: "Bridge", value: 2 },
  ];

  const stoveOptions = [
    { label: "Gas", value: 1 },
    { label: "Electric", value: 2 },
  ];

  const applianceOptions = [
    { label: "Oven", value: "oven" },
    { label: "Fridge", value: "fridge" },
    { label: "Drawers", value: "drawers" },
  ];

  const winestandOptions = [
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "tall" },
  ];

  const mainDrawerOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];

  const tableTopInsetOptions = [
    { label: "Inset", value: true },
    { label: "Overlay", value: false },
  ];

  const tableTopRoundedOptions = [
    { label: "Rounded", value: true },
    { label: "Straight", value: false },
  ];

  const dektonTableTopHeightOptions = [
    { label: "12mm", value: 0.3 },
    { label: "20mm", value: 0.5 },
  ];

  const naturalStoneTableTopHeightOptions = [
    { label: "20mm", value: 0.5 },
    { label: "30mm", value: 0.75 },
    { label: "40mm", value: 1 },
  ];

  let counterTopHeight;

  if (tableTopMaterialCategory === "dekton") {
    if (tableTopHeight === 0.5) {
      counterTopHeight = "20mm";
    }
    if (tableTopHeight === 0.3) {
      counterTopHeight = "12mm";
    }
  } else if (tableTopMaterialCategory === "natural stone") {
    counterTopHeight = "40mm";
  } else if (tableTopMaterialCategory === "metallook") {
    counterTopHeight = "4mm";
  }

  const [showInsetOption, setShowInsetOption] = useState(true);

  useEffect(() => {
    // Check if only the table is chosen
    const isTableChosen =
      tableChosen && !sinkChosen && !cooktopChosen && !towerChosen;
    // If only the table is chosen, set tableTopInset to false
    if (isTableChosen) {
      setTableTopInset(false);
      setShowInsetOption(false);
    }
  }, [sinkChosen, cooktopChosen, towerChosen, tableChosen]);

  useEffect(() => {
    // if (!visibleForPDF) {
    //   setVisibleForPDF(true);
    // }
  }, []);

  return (
    <>
      <div className='config-ui__title'>
        <span>
          <h2>Options</h2>
        </span>
      </div>

      <div className='config-ui__options'>
        {/* <DetailWithButtons
                summary="Edge finish: "
                options={edgeFinishOptions}
                selectedOption={edgeFinishOptions.find(option => option.value === edgeFinish).label}
                setOption={setEdgeFinish}
            /> */}

        {(sinkChosen || cooktopChosen || tableChosen) && (
          <>
            <ButtonCategoryTitle
              title={`Countertop (` + counterTopHeight + `)`}
            >
              {showInsetOption && (
                <DetailWithButtons
                  summary='Countertop type: '
                  options={tableTopInsetOptions}
                  selectedOption={
                    tableTopInsetOptions.find(
                      (option) => option.value === tableTopInset
                    ).label
                  }
                  setOption={setTableTopInset}
                />
              )}

              {!tableTopInset && (
                <DetailWithButtons
                  summary='Countertop edge: '
                  options={tableTopRoundedOptions}
                  selectedOption={
                    tableTopRoundedOptions.find(
                      (option) => option.value === tableTopRounded
                    ).label
                  }
                  setOption={setTableTopRounded}
                />
              )}

              {tableTopMaterialCategory === "dekton" && (
                <DetailWithButtons
                  summary='Countertop height: '
                  options={dektonTableTopHeightOptions}
                  selectedOption={
                    dektonTableTopHeightOptions.find(
                      (option) => option.value === tableTopHeight
                    ).label
                  }
                  setOption={setTableTopHeight}
                />
              )}
              {tableTopMaterialCategory === "natural stone" && (
                <DetailWithButtons
                  summary='Countertop height: '
                  options={naturalStoneTableTopHeightOptions}
                  selectedOption={
                    naturalStoneTableTopHeightOptions.find(
                      (option) => option.value === tableTopHeight
                    ).label
                  }
                  setOption={setTableTopHeight}
                />
              )}
            </ButtonCategoryTitle>
          </>
        )}

        {(sinkChosen || cooktopChosen || towerChosen) && (
          <>
            <ButtonCategoryTitle title='Appliances'>
              {sinkChosen && (
                <>
                  <DetailWithButtons
                    summary='Faucet type: '
                    options={faucetOptions}
                    selectedOption={
                      faucetOptions.find((option) => option.value === tapType)
                        .label
                    }
                    setOption={setTapType}
                  />
                </>
              )}

              {cooktopChosen && (
                <>
                  <DetailWithButtons
                    summary='Stove type: '
                    options={stoveOptions}
                    selectedOption={
                      stoveOptions.find((option) => option.value === stoveType)
                        .label
                    }
                    setOption={setStoveType}
                  />
                </>
              )}

              {towerChosen && (
                <>
                  <DetailWithButtons
                    summary='Winestand size: '
                    options={winestandOptions}
                    selectedOption={
                      winestandOptions.find(
                        (option) => option.value === wineStandSize
                      ).label
                    }
                    setOption={setWineStandSize}
                  />

                  <DetailWithButtons
                    summary='Tower appliance: '
                    options={applianceOptions}
                    selectedOption={
                      applianceOptions.find(
                        (option) => option.value === applianceType
                      ).label
                    }
                    setOption={setApplianceType}
                  />
                </>
              )}
            </ButtonCategoryTitle>
          </>
        )}

        {/* {tableChosen && !sinkChosen && !cooktopChosen && !towerChosen && (
          <>
            <h4>These are not the options you are looking for...</h4>
            <p
              style={{
                marginTop: "1rem",
              }}
            >
              continue on the next page
            </p>
          </>
        )} */}

        {sinkChosen && (
          <>
            <ButtonCategoryTitle title='Extras'>
              <DetailWithButtons
                summary='Exta drawers: '
                options={mainDrawerOptions}
                selectedOption={
                  mainDrawerOptions.find(
                    (option) => option.value === mainDrawers
                  ).label
                }
                setOption={setMainDrawers}
              />
            </ButtonCategoryTitle>
          </>
        )}
      </div>
    </>
  );
}
