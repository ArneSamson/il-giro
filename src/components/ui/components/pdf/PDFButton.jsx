import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  PDFViewer,
  usePDF,
  PDFDownloadLink,
  BlobProvider,
} from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";

import { MyDocument } from "./PDF.jsx";

import useConfigStore from "../../../../store/useConfigStore.jsx";

import { Vector3 } from "three";

import { useCapture } from "../../../../helper/useCapture.tsx";
import { useThreeGlobal } from "../../../../helper/useThreeGlobal.tsx";

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

    visibleForPDF,
    setVisibleForPDF,
  } = useConfigStore((state) => ({
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

    visibleForPDF: state.visibleForPDF,
    setVisibleForPDF: state.setVisibleForPDF,
  }));

  const chosenModules = [
    sinkChosen ? "Sink" : "",
    cooktopChosen ? "Cooktop" : "",
    towerChosen ? "Tower" : "",
    tableChosen ? "Table" : "",
  ]
    .filter(Boolean)
    .join(", ");

  const ralColorForPDF =
    mainMaterial.name === "microtopping with ral"
      ? "microtopping with RAL " + ralColor.code
      : mainMaterial.name === "paintwork"
      ? "painwork with RAL " + ralColor.code
      : null;

  let counterTopHeight;

  if (tableTopMaterialCategory === "dekton") {
    if (tableTopHeight === 0.5) {
      counterTopHeight = "20mm";
    }
    if (tableTopHeight === 0.3) {
      counterTopHeight = "12mm";
    }
  } else if (tableTopMaterialCategory === "natural stone") {
    counterTopHeight = "40mm";
  } else if (tableTopMaterialCategory === "metal") {
    counterTopHeight = "5mm";
  }

  let lookAtXOffset;
  let lookAtZOffset;
  let lookAtYOffset;

  //a switch case that sets the offset of the camera based on the chosen modules

  switch (true) {
    case sinkChosen && cooktopChosen && towerChosen && tableChosen:
      lookAtZOffset = 3.6;
      lookAtYOffset = 2;
      break;
    case sinkChosen && cooktopChosen && towerChosen && !tableChosen:
      lookAtZOffset = 3.6;
      lookAtYOffset = 3;
      break;
    case sinkChosen && cooktopChosen && !towerChosen && tableChosen:
      lookAtZOffset = 2.5;
      lookAtYOffset = 3;
      break;
    case sinkChosen && !cooktopChosen && !towerChosen && tableChosen:
      lookAtZOffset = 3.5;
      lookAtYOffset = 3;
      lookAtXOffset = 0.5;
      break;
    case !sinkChosen && cooktopChosen && !towerChosen && tableChosen:
      lookAtZOffset = 3.5;
      lookAtYOffset = 3;
      lookAtXOffset = 0.5;
      break;
    case sinkChosen && cooktopChosen && !towerChosen && !tableChosen:
      lookAtZOffset = 2;
      lookAtYOffset = 2;
      break;
    case sinkChosen && !cooktopChosen && !towerChosen && !tableChosen:
      lookAtZOffset = 1.5;
      lookAtYOffset = 2;
      lookAtXOffset = 0;
      break;
    case !sinkChosen && cooktopChosen && !towerChosen && !tableChosen:
      lookAtZOffset = 1.5;
      lookAtYOffset = 2;
      lookAtXOffset = 0;
      break;
    case !sinkChosen && !cooktopChosen && towerChosen && !tableChosen:
      lookAtZOffset = 3.5;
      lookAtYOffset = 2;
      lookAtXOffset = 0;
      break;
    case !sinkChosen && !cooktopChosen && !towerChosen && tableChosen:
      lookAtZOffset = 2;
      lookAtYOffset = 2;
      lookAtXOffset = 0;
      break;
    default:
      lookAtZOffset = 3.5;
      lookAtYOffset = 3;
      lookAtXOffset = 0;
      break;
  }

  const options = {
    position: [
      new Vector3(lookAtXOffset, lookAtYOffset, lookAtZOffset),
      new Vector3(2, 0.75, 3.5),
    ],
    lookAt: new Vector3(lookAtXOffset, 0.65, 0),
  };

  const [pdf, setPdf] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    async function captureImage() {
      const newCapture = await capture(three.scene, options);

      const document = (
        <MyDocument
          props={{
            mainMaterial: mainMaterial,
            ralColorText: ralColorForPDF,
            ralColor: ralColor,
            tableTopMaterial: tableTopMaterial,
            tableTopInset: tableTopInset ? "inset" : "overlay",
            accentMaterial: towerChosen || sinkChosen ? accentMaterial : null,
            bevelled: allBevelled ? "curved" : "straight",
            edgeFinish: edgeFinish,
            tapType: sinkChosen
              ? tapType === 1
                ? "Brandwood 3"
                : "Bridge"
              : null,
            mainDrawers: sinkChosen ? (mainDrawers ? "yes" : "no") : null,
            stoveType: cooktopChosen
              ? stoveType === 1
                ? "gas"
                : "electric"
              : null,
            applianceType: towerChosen ? applianceType : null,
            wineStandSize: towerChosen ? wineStandSize : null,
            chosenModules: chosenModules,
            tableTopHeight: counterTopHeight,
            tableTopEdge: tableTopRounded ? "rounded" : "straight",
            imageRender: newCapture,
          }}
        />
      );

      setPdf(document);
      //   setVisibleForPDF(true);
    }

    captureImage();
  }, []);

  return (
    <>
      {pdf && (
        <>
          <PDFDownloadLink
            document={pdf}
            fileName='overview.pdf'
            className='config-ui__options__overview__PDF-link-container'
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <a
                  aria-disabled
                  className='config-ui__options__overview__PDF-link'
                >
                  Loading document...
                </a>
              ) : (
                <a
                  href={url}
                  target='_blank'
                  className='config-ui__options__overview__PDF-link'
                >
                  Download PDF quote
                </a>
              )
            }
          </PDFDownloadLink>
        </>
      )}
    </>
  );
}
