import React from "react";

import useConfigStore from "../../../store/useConfigStore";

import PDFButton from "./PDFButton.jsx";

export default function OrderOverview() {

    const {
        edgeFinish,

        tapType,

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

        allBevelled
    } = useConfigStore(
        state => ({
            edgeFinish: state.edgeFinish,

            tapType: state.tapType,

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

            allBevelled: state.allBevelled
        })
    );

    return <>
        <div
            className='config-ui__title'
        >
            <span><h2>Overview of your order</h2></span>
        </div>

        <div
            className='config-ui__options'
        >
            <div
                className='config-ui__options__overview'
            >

                <h4
                    className="config-ui__options__overview__title"
                >
                    Chosen Modules: <span> {
                        sinkChosen ? 'Sink, ' : ''
                    }{
                            cooktopChosen ? 'Cooktop, ' : ''
                        }{
                            towerChosen ? 'Tower, ' : ''
                        }{
                            tableChosen ? 'Table' : ''
                        }
                    </span>
                </h4>

                <h4
                    className="config-ui__options__overview__title"
                >Curved: <span>{allBevelled ? "yes" : "no"}</span></h4>

                <h4
                    className="config-ui__options__overview__title"
                >Main Material: <span>{mainMaterial.name} </span> </h4>

                <h4
                    className="config-ui__options__overview__title"
                >Table Top Material: <span>{tableTopMaterial.name}</span></h4>

                {(towerChosen || sinkChosen) && (
                    <h4
                        className="config-ui__options__overview__title"
                    >Accent Material: <span>{accentMaterial.name}</span>
                    </h4>
                )}

                <h4
                    className="config-ui__options__overview__title"
                >Edge Finish: <span>{edgeFinish}</span></h4>

                {sinkChosen &&
                    <h4
                        className="config-ui__options__overview__title"
                    >Tap Type: <span>{
                        tapType === 1 ? "Brandwood 3" : tapType === 2 ? "Bridge" : ""
                    }</span></h4>
                }

                {cooktopChosen &&
                    <h4
                        className="config-ui__options__overview__title"
                    >Stove Type: <span>{
                        stoveType === 1 ? "Gas" : stoveType === 2 ? "Electric" : ""
                    }</span></h4>
                }

                {towerChosen && <>
                    <h4
                        className="config-ui__options__overview__title"
                    >Appliance Type: <span>{applianceType}</span></h4>

                    <h4
                        className="config-ui__options__overview__title"
                    >Wine Stand Size: <span>{wineStandSize}</span>
                    </h4>
                </>}


                {/* <PDFButton /> */}



            </div>

        </div>
    </>
}