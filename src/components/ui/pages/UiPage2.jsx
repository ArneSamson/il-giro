import React from "react";

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
    } = useConfigStore(
        state => ({
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
        })
    );

    const edgeFinishOptions = [
        { label: "Square", value: "square" },
        { label: "Curved", value: "curved" }
    ];

    const faucetOptions = [
        { label: "Brandwood 3", value: 1 },
        { label: "Bridge", value: 2 }
    ];

    const stoveOptions = [
        { label: "Gas", value: 1 },
        { label: "Electric", value: 2 }
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
        { label: "No", value: false }
    ];

    const tableTopInsetOptions = [
        { label: "Inset", value: true },
        { label: "Overlay", value: false }
    ];

    const tableTopRoundedOptions = [
        { label: "Rounded", value: true },
        { label: "Straight", value: false }
    ];

    const tableTopHeightOptions = [
        { label: "12mm", value: 0.3 },
        { label: "20mm", value: 0.5 },
    ];

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>Options</h2></span>
        </div>

        <div
            className='config-ui__options'
        >

            {/* <DetailWithButtons
                summary="Edge finish: "
                options={edgeFinishOptions}
                selectedOption={edgeFinishOptions.find(option => option.value === edgeFinish).label}
                setOption={setEdgeFinish}
            /> */}

            {(sinkChosen || cooktopChosen) && <>

                <ButtonCategoryTitle
                    title="Countertop"
                >
                    <DetailWithButtons
                        summary="Countertop type: "
                        options={tableTopInsetOptions}
                        selectedOption={tableTopInsetOptions.find(option => option.value === tableTopInset).label}
                        setOption={setTableTopInset}
                    />

                    {!tableTopInset &&
                        <DetailWithButtons
                            summary="Countertop edge: "
                            options={tableTopRoundedOptions}
                            selectedOption={tableTopRoundedOptions.find(option => option.value === tableTopRounded).label}
                            setOption={setTableTopRounded}
                        />
                    }

                    {tableTopMaterialCategory === 'dekton' &&
                        <DetailWithButtons
                            summary="Countertop height: "
                            options={tableTopHeightOptions}
                            selectedOption={tableTopHeightOptions.find(option => option.value === tableTopHeight).label}
                            setOption={setTableTopHeight}
                        />
                    }
                </ButtonCategoryTitle>



            </>}

            <ButtonCategoryTitle
                title="Appliances"
            >


                {sinkChosen && <>
                    <DetailWithButtons
                        summary="Faucet type: "
                        options={faucetOptions}
                        selectedOption={faucetOptions.find(option => option.value === tapType).label}
                        setOption={setTapType}
                    />
                </>}

                {cooktopChosen && <>
                    <DetailWithButtons
                        summary="Stove type: "
                        options={stoveOptions}
                        selectedOption={stoveOptions.find(option => option.value === stoveType).label}
                        setOption={setStoveType}
                    />
                </>}

                {towerChosen && <>
                    <DetailWithButtons
                        summary="Winestand size: "
                        options={winestandOptions}
                        selectedOption={winestandOptions.find(option => option.value === wineStandSize).label}
                        setOption={setWineStandSize}
                    />

                    <DetailWithButtons
                        summary="Tower appliance: "
                        options={applianceOptions}
                        selectedOption={applianceOptions.find(option => option.value === applianceType).label}
                        setOption={setApplianceType}
                    />
                </>}
            </ButtonCategoryTitle>


            {sinkChosen && <>
                <ButtonCategoryTitle
                    title="Extras"
                >
                    <DetailWithButtons
                        summary="Exta drawers: "
                        options={mainDrawerOptions}
                        selectedOption={mainDrawerOptions.find(option => option.value === mainDrawers).label}
                        setOption={setMainDrawers}
                    />
                </ButtonCategoryTitle>
            </>}

        </div>
    </>
}