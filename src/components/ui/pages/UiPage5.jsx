import React from "react";

import useConfigStore from "../../../store/useConfigStore";

import DetailWithButtons from "../components/DetailWithButtons";

export default function UiPage5() {

    const {
        applianceType,
        setApplianceType,
        wineStandSize,
        setWineStandSize,
    } = useConfigStore(
        state => ({
            applianceType: state.applianceType,
            setApplianceType: state.setApplianceType,
            wineStandSize: state.wineStandSize,
            setWineStandSize: state.setWineStandSize,
        })
    );

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

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>The Tower</h2></span>
        </div>

        <div
            className='config-ui__options'
        >

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

        </div>
    </>
}