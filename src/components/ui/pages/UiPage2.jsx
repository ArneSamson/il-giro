import React from "react";

import useConfigStore from "../../../store/useConfigStore";

import DetailWithButtons from "../components/DetailWithButtons";

export default function UiPage2() {

    const {
        edgeFinish,
        setEdgeFinish,
    } = useConfigStore(
        state => ({
            edgeFinish: state.edgeFinish,
            setEdgeFinish: state.setEdgeFinish,
        })
    );

    const edgeFinishOptions = [
        { label: "Square", value: "rect" },
        { label: "Curved", value: "curved" }
    ];

    return <>

        <div
            className='config-ui__title'
        >
            <span><h2>2. Tabletop</h2></span>
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

        </div>
    </>
}