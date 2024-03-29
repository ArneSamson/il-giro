import React from "react";

import useConfigStore from "../../../store/useConfigStore";

import DetailWithButtons from "../components/DetailWithButtons";

export default function UiPage3() {

    const {
        tapType,
        setTapType,
    } = useConfigStore(
        state => ({
            tapType: state.tapType,
            setTapType: state.setTapType,
        })
    );

    const faucetOptions = [
        { label: "Brandwood 3", value: "1" },
        { label: "Bridge", value: "2" }
    ];

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>The Sink</h2></span>
        </div>

        <div
            className='config-ui__options'
        >

            <DetailWithButtons
                summary="Faucet type: "
                options={faucetOptions}
                selectedOption={faucetOptions.find(option => option.value === tapType).label}
                setOption={setTapType}
            />

        </div>
    </>
}