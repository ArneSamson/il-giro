import React from "react";
import { useEffect, useState } from "react";

import useConfig from "../../../../store/useConfigStore.jsx";
import useScene from "../../../../store/useScene.jsx";
import useUIStore from "../../../../store/useUIStore.jsx";

import ToolTipHandler from "./ToolTipHandler.jsx";

export default function ExtraButtons() {

    const {
        doorOpeningRotation,
        setDoorOpeningRotation,
    } = useConfig(
        state => ({
            doorOpeningRotation: state.doorOpeningRotation,
            setDoorOpeningRotation: state.setDoorOpeningRotation,
        })
    );

    const {
        currentPage,
        setCurrentPage,
        setLandingPageVisible,
    } = useUIStore(
        state => ({
            currentPage: state.currentPage,
            setCurrentPage: state.setCurrentPage,
            setLandingPageVisible: state.setLandingPageVisible,
        })
    );

    const {
        setCameraFocus,
    } = useScene(
        state => ({
            setCameraFocus: state.setCameraFocus,
        })
    );

    const handleZoom = () => {
        // if (currentPage === 0) return;
        setCameraFocus([0, 1, 0]);
        setCurrentPage(0);

    }

    const handleBackHome = () => {
        setLandingPageVisible(true);
    }

    const handleOpening = () => {
        setDoorOpeningRotation(doorOpeningRotation === 1.5 ? 0 : 1.5);
    }


    return <>
        <div
            className='extra-buttons'
        >
            <ToolTipHandler
                content='Back to selection'
            >
                <div
                    className='extra-buttons__zoom-out'
                >
                    <button
                        onClick={handleBackHome}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.375 9.75L1 5.375M1 5.375L5.375 1M1 5.375H11.5C12.4283 5.375 13.3185 5.74375 13.9749 6.40013C14.6313 7.0565 15 7.94674 15 8.875V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </ToolTipHandler>

            <ToolTipHandler
                content='Zoom out'
            >
                <div
                    className='extra-buttons__zoom-out'
                >
                    <button
                        onClick={handleZoom}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='zoom-out__image'>
                            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M19 19L14.65 14.65" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 9H12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </ToolTipHandler>

            <ToolTipHandler
                content={`${doorOpeningRotation === 0 ? 'Open ' : 'Close '} doors and drawers`}
            >
                <div
                    className='extra-buttons__zoom-out'
                >
                    <button
                        onClick={handleOpening}
                    >
                        {doorOpeningRotation === 0 && <svg width="17" height="19" viewBox="0 0 17 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.461 1.1875H2.53891C1.80732 1.1875 1.21423 1.76749 1.21423 2.48295V16.733C1.21423 17.4484 1.80732 18.0284 2.53891 18.0284H14.461C15.1926 18.0284 15.7857 17.4484 15.7857 16.733V2.48295C15.7857 1.76749 15.1926 1.1875 14.461 1.1875Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.5 1.1875V18.0284" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10.8116 8.96021V10.2557" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.18823 8.96021V10.2557" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>}
                        {doorOpeningRotation === 1.5 && <svg width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5714 14V2.29545C15.5714 1.57999 14.9784 1 14.2468 1H2.32468C1.59308 1 1 1.57999 1 2.29545V16.5455C1 17.2609 1.59308 17.8409 2.32468 17.8409H7.5" stroke="black" strokeLinecap="square" strokeLinejoin="round" />
                            <path d="M11.5 11V11.6477V12.7" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M5.974 8.77271V10.0682" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 4V20.4387" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 1.5V17.8362" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M10 4L15 1.5" stroke="black" />
                            <path d="M10 20.45L13.5 18.5001L14.25 18C15.75 17.15 15.57 15 15.57 14" stroke="black" />
                        </svg>
                        }
                    </button>
                </div>
            </ToolTipHandler>
        </div>
    </>
}