import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import { PDFViewer, usePDF, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';

import { MyDocument } from "../components/PDF.jsx";

import useConfigStore from "../../../store/useConfigStore.jsx";

import { Vector3 } from 'three';

import { useCapture } from '../../../helper/useCapture.tsx';
import { useThreeGlobal } from "../../../helper/useThreeGlobal.tsx";

export default function PDFButton() {

    // console.log(ReactPDF)

    const { capture } = useCapture();

    const { three } = useThreeGlobal();

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
        mainMaterialCategory,
        tableTopMaterial,
        tableTopMaterialCategory,
        accentMaterial,

        allBevelled,
        tableTopInset,
        tableTopHeight,
        tableTopRounded,

        ralColor,
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
            mainMaterialCategory: state.mainMaterialCategory,
            tableTopMaterial: state.tableTopMaterial,
            tableTopMaterialCategory: state.tableTopMaterialCategory,
            accentMaterial: state.accentMaterial,

            allBevelled: state.allBevelled,
            tableTopInset: state.tableTopInset,
            tableTopHeight: state.tableTopHeight,
            tableTopRounded: state.tableTopRounded,

            ralColor: state.ralColor,
        })
    );

    const chosenModules = [
        sinkChosen ? 'Sink' : '',
        cooktopChosen ? 'Cooktop' : '',
        towerChosen ? 'Tower' : '',
        tableChosen ? 'Table' : ''
    ].filter(Boolean).join(', ');

    let counterTopHeight;

    if (tableTopMaterialCategory === 'dekton') {
        if (tableTopHeight === 0.5) {
            counterTopHeight = "20mm";
        }
        if (tableTopHeight === 0.3) {
            counterTopHeight = "12mm";
        }
    } else if (tableTopMaterialCategory === 'natural stone') {
        counterTopHeight = "40mm";
    } else if (tableTopMaterialCategory === 'metal') {
        counterTopHeight = "5mm";
    }

    const options = {
        position: new Vector3(0, 3, 4),
        lookAt: new Vector3(0, 0.75, 0),
    };

    const [pdf, setPdf] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    useEffect(() => {
        async function captureImage() {
            const newCapture = await capture(three.scene, options);

            const document = <MyDocument
                props={{
                    mainMaterial: mainMaterial,
                    ralColor: mainMaterialCategory === 'ral' ? ralColor : null,
                    tableTopMaterial: tableTopMaterial,
                    tableTopInset: tableTopInset ? 'inset' : 'overlay',
                    accentMaterial: towerChosen || sinkChosen ? accentMaterial : null,
                    bevelled: allBevelled ? 'curved' : 'straight',
                    edgeFinish: edgeFinish,
                    tapType: sinkChosen ? tapType === 1 ? 'Brandwood 3' : 'Bridge' : null,
                    mainDrawers: sinkChosen ? mainDrawers ? "yes" : "no" : null,
                    stoveType: cooktopChosen ? stoveType === 1 ? 'gas' : 'electric' : null,
                    applianceType: towerChosen ? applianceType : null,
                    wineStandSize: towerChosen ? wineStandSize : null,
                    chosenModules: chosenModules,
                    tableTopHeight: counterTopHeight,
                    tableTopEdge: tableTopRounded ? 'rounded' : 'straight',
                    imageRender: newCapture,
                }}
            />

            setPdf(document);

        }

        captureImage();

    }, [])


    return (<>

        {pdf && <>
            <PDFDownloadLink
                document={pdf}
                fileName="overview.pdf"
                className="config-ui__options__overview__PDF-link-container"
            >
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : <a href={url} target="_blank" className="config-ui__options__overview__PDF-link">Download PDF quote</a>
                }
            </PDFDownloadLink>
        </>}

    </>);
}