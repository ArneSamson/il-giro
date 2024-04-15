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
    } = useConfigStore(
        state => ({
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
                <OverViewItem
                    topic="Chosen Modules"
                    value={
                        (sinkChosen ? 'Sink, ' : '') +
                        (cooktopChosen ? 'Cooktop, ' : '') +
                        (towerChosen ? 'Tower, ' : '') +
                        (tableChosen ? 'Table' : '')
                    }
                />

                <OverViewItem
                    topic="Curved"
                    value={allBevelled ? "yes" : "no"}
                />

                <OverViewItem
                    topic="Main Material"
                    value={mainMaterial.name}
                />


                <OverViewItem
                    topic="Table Top Material"
                    value={tableTopMaterial.name}
                />

                {(towerChosen || sinkChosen) && (

                    <OverViewItem
                        topic="Accent Material"
                        value={accentMaterial.name}
                    />
                )}

                <OverViewItem
                    topic="Edge Finish"
                    value={edgeFinish}
                />

                <OverViewItem
                    topic="Table Top Inset"
                    value={tableTopInset ? 'inset' : 'overlay'}
                />

                {sinkChosen && <>
                    <OverViewItem
                        topic="Tap Type"
                        value={tapType === 1 ? "Brandwood 3" : tapType === 2 ? "Bridge" : ""}
                    />

                    <OverViewItem
                        topic="Extra Drawers"
                        value={mainDrawers ? "Yes" : "No"}
                    />
                </>}

                {cooktopChosen && <>
                    <OverViewItem
                        topic="Stove Type"
                        value={stoveType === 1 ? "Gas" : stoveType === 2 ? "Electric" : ""}
                    />
                </>}

                {towerChosen && <>

                    <OverViewItem
                        topic="Appliance Type"
                        value={applianceType}
                    />

                    <OverViewItem
                        topic="Wine Stand Size"
                        value={wineStandSize}
                    />
                </>}

                {towerChosen && <>
                    <OverViewItem
                        topic="Appliance Type"
                        value={applianceType}
                    />

                    <OverViewItem
                        topic="Wine Stand Size"
                        value={wineStandSize}
                    />
                </>}

                {towerChosen && <>
                    <OverViewItem
                        topic="Appliance Type"
                        value={applianceType}
                    />

                    <OverViewItem
                        topic="Wine Stand Size"
                        value={wineStandSize}
                    />
                </>}

                <PDFButton />

            </div>

        </div>
    </>
}