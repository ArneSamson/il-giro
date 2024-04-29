import React from "react";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import useConfig from "../../../../store/useConfigStore.jsx";
import useScene from "../../../../store/useScene.jsx";
import useUIStore from "../../../../store/useUIStore.jsx";

import ToolTipHandler from "./ToolTipHandler.jsx";

export default function ExtraButtons() {
  const {
    doorOpeningRotation,
    setDoorOpeningRotation,
    showChairs,
    setShowChairs,
    sinkChosen,
    cooktopChosen,
    towerChosen,
    tableChosen,
  } = useConfig(
    useShallow((state) => ({
      doorOpeningRotation: state.doorOpeningRotation,
      setDoorOpeningRotation: state.setDoorOpeningRotation,
      showChairs: state.showChairs,
      setShowChairs: state.setShowChairs,
      sinkChosen: state.sinkChosen,
      cooktopChosen: state.cooktopChosen,
      towerChosen: state.towerChosen,
      tableChosen: state.tableChosen,
    }))
  );

  const { setLandingPageVisible } = useUIStore((state) => ({
    setLandingPageVisible: state.setLandingPageVisible,
  }));

  const { setCameraFocus, setNeedsToDolly } = useScene(
    useShallow((state) => ({
      setCameraFocus: state.setCameraFocus,
      setNeedsToDolly: state.setNeedsToDolly,
    }))
  );

  const handleZoom = () => {
    setCameraFocus([0, 1, 0]);
    setNeedsToDolly(true);
  };

  //   const handleBackHome = () => {
  //     setLandingPageVisible(true);
  //   };

  const handleOpening = () => {
    setDoorOpeningRotation(doorOpeningRotation === 1.5 ? 0 : 1.5);
  };

  const handleChairs = () => {
    setShowChairs(!showChairs);
  };

  return (
    <>
      <div className='extra-buttons'>
        {/* <ToolTipHandler content='Back to selection'>
          <div className='extra-buttons__button'>
            <button onClick={handleBackHome}>
              <svg
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M6.625 12.25L1 6.625M1 6.625L6.625 1M1 6.625H14.5C15.6935 6.625 16.8381 7.09911 17.682 7.94302C18.5259 8.78693 19 9.93153 19 11.125V19'
                  stroke='black'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </ToolTipHandler> */}

        <ToolTipHandler content='Zoom out'>
          <div className='extra-buttons__button'>
            <button onClick={handleZoom}>
              <svg
                width='22'
                height='22'
                viewBox='0 0 22 22'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9.88888 18.7778C14.7981 18.7778 18.7778 14.7981 18.7778 9.88888C18.7778 4.97969 14.7981 1 9.88888 1C4.97969 1 1 4.97969 1 9.88888C1 14.7981 4.97969 18.7778 9.88888 18.7778Z'
                  stroke='black'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M21 20.9998L16.1666 16.1665'
                  stroke='black'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M6.55554 9.88892H13.2222'
                  stroke='black'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          </div>
        </ToolTipHandler>

        {(sinkChosen || cooktopChosen || towerChosen) && (
          <ToolTipHandler
            content={`${
              doorOpeningRotation === 0 ? "Open " : "Close "
            } doors and drawers`}
          >
            <div className='extra-buttons__button'>
              <button onClick={handleOpening}>
                {doorOpeningRotation === 0 && (
                  <svg
                    width='20'
                    height='22'
                    viewBox='0 0 20 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M16.7316 1H2.57316C1.70434 1 1 1.68879 1 2.53846V19.4615C1 20.3112 1.70434 21 2.57316 21H16.7316C17.6005 21 18.3048 20.3112 18.3048 19.4615V2.53846C18.3048 1.68879 17.6005 1 16.7316 1Z'
                      stroke='black'
                      strokeWidth='1'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M9.65247 1V21'
                      stroke='black'
                      strokeWidth='1'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M12.3978 10.2307V11.7692'
                      stroke='black'
                      strokeWidth='1'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M6.90698 10.2307V11.7692'
                      stroke='black'
                      strokeWidth='1'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                )}
                {doorOpeningRotation === 1.5 && (
                  <svg
                    width='17'
                    height='22'
                    viewBox='0 0 17 22'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M15.9835 14.3676V2.33209C15.9835 1.5964 15.3737 1 14.6214 1H2.36214C1.60986 1 1 1.5964 1 2.33209V16.9851C1 17.7208 1.60986 18.3172 2.36214 18.3172H7.16968'
                      stroke='black'
                      strokeWidth='1'
                      strokeLinecap='square'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M12.311 11.2827V11.9488V13.0308'
                      stroke='black'
                      strokeWidth='1'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M6.11462 8.99243V10.3245'
                      stroke='black'
                      strokeWidth='1'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M10.2545 4.08496V20.9885'
                      stroke='black'
                      strokeWidth='1'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M8.198 1.51416V18.3123'
                      stroke='black'
                      strokeWidth='1'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M10.2545 4.08486L15.3959 1.51416'
                      stroke='black'
                      strokeWidth='1'
                    />
                    <path
                      d='M10.2545 21.0001L13.8535 18.995L14.6248 18.4808C16.1672 17.6068 15.9821 15.396 15.9821 14.3677'
                      stroke='black'
                      strokeWidth='1'
                    />
                  </svg>
                )}
              </button>
            </div>
          </ToolTipHandler>
        )}

        {tableChosen && (
          <ToolTipHandler
            content={`${showChairs === true ? "Hide " : "Show "} chairs`}
          >
            <div className='extra-buttons__button'>
              <button onClick={handleChairs}>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 20 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M10 11.522L10 19L10 11.5L10 4'
                    stroke='black'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M5.99413 11.522L4 19L6 11.5L8 4'
                    stroke='black'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M14.0059 11.522L16 19L14 11.5L12 4'
                    stroke='black'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M4 1V4C7.75 4 5.93629 4 9.25 4C12.5637 4 12.25 4 16 4V1H10H4Z'
                    stroke='black'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M5 15C8.125 15 6.61357 15 9.375 15C12.1364 15 11.875 15 15 15'
                    stroke='black'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              </button>
            </div>
          </ToolTipHandler>
        )}
      </div>
    </>
  );
}
