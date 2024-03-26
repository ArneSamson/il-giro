import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

import useConfig from '../store/useConfigStore.jsx';
import useUIStore from '../store/useUIStore.jsx';

import ConfigNav from './ui/components/nav/ConfigNav.jsx';
import ExtraButtons from './ui/components/buttons/ExtraButtons.jsx';
import ToolTip from './ui/components/buttons/ToolTip.jsx';

import LandingsPage from './ui/pages/LandingsPage.jsx';
import UiPage1 from './ui/pages/UiPage1.jsx';
import UiPage2 from './ui/pages/UiPage2.jsx';
import UiPage3 from './ui/pages/UiPage3.jsx';
import UiPage4 from './ui/pages/UiPage4.jsx';
import UiPage5 from './ui/pages/UiPage5.jsx';

export default function ConfigUi() {

    const {
        allMaterials,
        allCategories,

        mainMaterial,
        setMainMaterial,

        accentMaterial,
        setAccentMaterial,

        setTableTopMaterial,

        applianceType,
        setApplianceType,
        wineStandSize,
        setWineStandSize,

        doorOpeningRotation,
        setDoorOpeningRotation,

    } = useConfig();

    const {
        currentPage,
        landingPageVisible,
    } = useUIStore();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const lastMaterial = allMaterials[allMaterials.length - 1];

        if (lastMaterial) {
            setLoaded(true);

            if (loaded) return;

            setMainMaterial(allMaterials[0].url);
            setAccentMaterial(allCategories['metal'][0].url);
            setTableTopMaterial(allCategories['metal'][0].url);

        }
    }, [allMaterials,

        mainMaterial,
        setMainMaterial,

        accentMaterial,
        setAccentMaterial
    ]);



    return (
        <>
            {landingPageVisible &&
                <LandingsPage />
            }

            <ToolTip />

            <ExtraButtons />

            <div className='config-wrapper'>

                {!loaded && <p>Loading UI...</p>}

                {loaded && <div
                    className='config-ui'
                >

                    <ConfigNav />

                    {currentPage === 0 && <>

                        <UiPage1 />

                    </>}

                    {currentPage === 1 && <>

                        <UiPage2 />

                    </>}

                    {currentPage === 2 && <>
                        <UiPage3 />
                    </>}

                    {currentPage === 3 && <>
                        <UiPage4 />
                    </>}

                    {currentPage === 4 && <>
                        <UiPage5 />
                    </>}

                    {currentPage === 5 && <>

                        {/* <div
                            className='config-ui__title'
                        >
                            <span><h2>6. The Tower</h2></span>
                        </div>

                        <div
                            className='config-ui__options'
                        >


                            <details
                                open
                                className='config-ui__details'
                            >
                                <summary>Winestand size:
                                    <span>
                                        {wineStandSize === 'tall' ? ' tall' : wineStandSize === 'medium' ? ' medium' : ' small'}
                                    </span>
                                </summary>

                                <div
                                    className='config-ui__selection-buttons'
                                >
                                    <button
                                        className={wineStandSize === 'tall' ? 'active-selection-button' : ''}
                                        onClick={() => setWineStandSize('tall')}
                                    >
                                        Tall
                                    </button>
                                    <button
                                        className={wineStandSize === 'medium' ? 'active-selection-button' : ''}
                                        onClick={() => setWineStandSize('medium')}
                                    >
                                        Medium
                                    </button>
                                    <button
                                        className={wineStandSize === 'small' ? 'active-selection-button' : ''}
                                        onClick={() => setWineStandSize('small')}
                                    >
                                        Small
                                    </button>
                                </div>
                            </details>

                        </div> */}


                        <div
                            className='config-ui__slider'
                        >
                            <h5>Open doors and shelves:</h5>

                            <label className="config-ui__toggle">
                                <input
                                    type="checkbox"
                                    checked={doorOpeningRotation === 1.5}
                                    onChange={(e) => {
                                        setDoorOpeningRotation(e.target.checked ? 1.5 : 0);
                                    }}

                                />
                                <span className="config-ui__toggle-slider"></span>
                            </label>
                        </div>
                    </>}

                </div>
                }

            </div>
        </>
    );
};