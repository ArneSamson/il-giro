import React from "react";
import { useEffect } from "react";

import useScene from "../../../../store/useScene.jsx";
import useUIStore from "../../../../store/useUIStore.jsx";

export default function ConfigNav() {

    const { currentPage, setCurrentPage } = useUIStore(
        state => ({
            currentPage: state.currentPage,
            setCurrentPage: state.setCurrentPage,
        })
    );

    const pagesAmount = 3;

    const {
        setCameraFocus,
        setIsFocussedOnIsland,
    } = useScene(
        state => ({
            setCameraFocus: state.setCameraFocus,
            setIsFocussedOnIsland: state.setIsFocussedOnIsland,
        })
    );

    useEffect(() => {
        checkPage(currentPage);
    }, [currentPage, setCurrentPage]);

    const handleNext = () => {
        if (currentPage === pagesAmount) return;
        checkPage(currentPage + 1);
        setCurrentPage(currentPage + 1);
    }

    const handleBack = () => {
        if (currentPage === 0) return;
        checkPage(currentPage - 1);
        setCurrentPage(currentPage - 1);
    }

    const checkPage = (e) => {

        switch (e) {
            case 0:
                setCurrentPage(0);
                setCameraFocus([0, 1, 0]);
                setIsFocussedOnIsland(false, false, false);
                break;
            case 1:
                setCurrentPage(1);
                break;
            case 2:
                setCurrentPage(2);
                break;
            case 3:
                setCurrentPage(3);
                break;
        }
    }

    return <>
        <div
            className='config-ui__nav'
        >

            <button
                style={currentPage === 0 ? { opacity: 0.1 } : { opacity: 1 }}
                className={currentPage === 0 ? 'config-ui__nav__button--disabled' : ''}
                onClick={handleBack}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 8H1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 15L1 8L8 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <button
                style={currentPage === pagesAmount ? { opacity: 0.1 } : { opacity: 1 }}
                className={currentPage === pagesAmount ? 'config-ui__nav__button--disabled' : ''}
                onClick={handleNext}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8 1L15 8L8 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            </button>
        </div>
    </>

}