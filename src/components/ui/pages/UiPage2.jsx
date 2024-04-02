import React from "react";

import useConfigStore from "../../../store/useConfigStore";

import DetailWithButtons from "../components/DetailWithButtons";

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
        { label: "Shelves", value: "shelves" },
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

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>2. Options</h2></span>
        </div>

        <div
            className='config-ui__options'
        >

            <DetailWithButtons
                summary="Edge finish: "
                options={edgeFinishOptions}
                selectedOption={edgeFinishOptions.find(option => option.value === edgeFinish).label}
                setOption={setEdgeFinish}
            />

            <DetailWithButtons
                summary="Faucet type: "
                options={faucetOptions}
                selectedOption={faucetOptions.find(option => option.value === tapType).label}
                setOption={setTapType}
            />

            <DetailWithButtons
                summary="Stove type: "
                options={stoveOptions}
                selectedOption={stoveOptions.find(option => option.value === stoveType).label}
                setOption={setStoveType}
            />

            <DetailWithButtons
                summary="Winestand size: "
                options={winestandOptions}
                selectedOption={winestandOptions.find(option => option.value === wineStandSize).label}
                setOption={setWineStandSize}
            />

            <DetailWithButtons
                summary="Appliance type: "
                options={applianceOptions}
                selectedOption={applianceOptions.find(option => option.value === applianceType).label}
                setOption={setApplianceType}
            />

            <DetailWithButtons
                summary="Exta drawers: "
                options={mainDrawerOptions}
                selectedOption={mainDrawerOptions.find(option => option.value === mainDrawers).label}
                setOption={setMainDrawers}
            />

        </div>
    </>
}