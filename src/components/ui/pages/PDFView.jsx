import React from "react";
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

import MyDocument from "../components/PDF.jsx";

export default function PDFView() {

    return (<>


        <div
            className='config-ui__title'
        >
            <span><h2>PDF</h2></span>
        </div>

        <PDFViewer>
            <MyDocument />
        </PDFViewer>
    </>);
}