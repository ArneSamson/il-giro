import React from "react";
import ReactDOM from 'react-dom';
import { PDFViewer, usePDF, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';

import { MyDocument } from "../components/PDF.jsx";

import useConfigStore from "../../../store/useConfigStore.jsx";

export default function PDFButton() {

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

    const chosenModules = [
        sinkChosen ? 'Sink' : '',
        cooktopChosen ? 'Cooktop' : '',
        towerChosen ? 'Tower' : '',
        tableChosen ? 'Table' : ''
    ].filter(Boolean).join(', ');

    const [instance, updateInstance] = usePDF(
        {
            document: <MyDocument
                props={{
                    mainMaterial: mainMaterial,
                    tableTopMaterial: tableTopMaterial,
                    accentMaterial: towerChosen || sinkChosen ? accentMaterial : null,
                    bevelled: allBevelled ? 'curved' : 'straight',
                    edgeFinish: edgeFinish,
                    tapType: sinkChosen ? tapType === 1 ? 'Brandwood 3' : 'Bridge' : null,
                    stoveType: cooktopChosen ? stoveType === 1 ? 'gas' : 'electric' : null,
                    applianceType: applianceType,
                    wineStandSize: wineStandSize,
                    chosenModules: chosenModules,
                }}
            />
        });

    return (<>
        <a href={instance.url} rel="noopener noreferrer" target="_blank">
            Download PDF overview
        </a>
    </>);
}