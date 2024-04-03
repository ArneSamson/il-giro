import React from "react";
import ReactDOM from 'react-dom';
import { PDFViewer, usePDF, PDFDownloadLink, BlobProvider } from '@react-pdf/renderer';

import { MyDocument } from "../components/PDF.jsx";

import useConfigStore from "../../../store/useConfigStore";

export default function PDFView() {

    const {
        allBevelled,
    } = useConfigStore(
        state => ({
            allBevelled: state.allBevelled,
        })
    );

    const [instance, updateInstance] = usePDF(
        {
            document: <MyDocument
                props={{
                    title: allBevelled ? 'bevelled' : 'not bevelled',
                    content: 'test'
                }}
            />
        });

    return (<>
        <div
            className='config-ui__title'
        >
            <span><h2>PDF</h2></span>
        </div>

        <a href={instance.url} rel="noopener noreferrer" target="_blank">
            Download
        </a>
    </>);
}