import React from "react";

import useConfigStore from "../../../store/useConfigStore";

import DetailWithButtons from "../components/DetailWithButtons";

export default function UiPage4() {

    const {
        stoveType,
        setStoveType,
    } = useConfigStore(
        state => ({
            stoveType: state.stoveType,
            setStoveType: state.setStoveType,
        })
    );

    const stoveOptions = [
        { label: "Gas", value: "1" },
        { label: "Electric", value: "2" }
    ];

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>The Cooktop</h2></span>
        </div>

        <div
            className='config-ui__options'
        >

            <DetailWithButtons
                summary="Stove type: "
                options={stoveOptions}
                selectedOption={stoveOptions.find(option => option.value === stoveType).label}
                setOption={setStoveType}
            />

        </div>
    </>
}