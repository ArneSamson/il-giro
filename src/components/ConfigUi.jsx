import React,{useState, useEffect} from 'react';
import useConfig from '../store/useConfig';
import useScene from '../store/useScene';

export default function ConfigUi() {

    const {
        cameraCoords,
        setCameraCoords,
        cameraFocus,
        setCameraFocus,
        isFocussedOnIsland,
        setIsFocussedOnIsland,
    } = useScene();

    const {
        allMaterials,
        allCategories,

        sinkAmount,
        setSinkAmount,
        cooktopAmount,
        setCooktopAmount,
        towerAmount,
        setTowerAmount,

        sinkMaterial,
        setSinkMaterial,
        cooktopMaterial,
        setCooktopMaterial,
        towerMaterial,
        setTowerMaterial,

        sinkBevelled,
        setSinkBevelled,
        cooktopBevelled,
        setCooktopBevelled,
        towerBevelled,
        setTowerBevelled,

        tapMaterial,
        setTapMaterial,
        tapType,
        setTapType,

        sinkBowlMaterial,
        setSinkBowlMaterial,

        stoveType,
        setStoveType,

        applianceType,
        setApplianceType,

        towerAccessoryMaterial,
        setTowerAccessoryMaterial,

        doorOpeningRotation,
        setDoorOpeningRotation,

        currentPage,
        setCurrentPage,

        dragMode,
        setDragMode,
    } = useConfig();

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if(allMaterials[0]){
            setLoaded(true);

            if(loaded) return;

            setSinkMaterial(allMaterials[5].url);
            setCooktopMaterial(allMaterials[5].url);
            setTowerMaterial(allMaterials[5].url);
            setTapMaterial(allMaterials[7].url);
            setSinkBowlMaterial(allMaterials[8].url);
            setTowerAccessoryMaterial(allMaterials[8].url);

        }
    }, [allMaterials,
        sinkMaterial,
        setSinkMaterial,
        cooktopMaterial,
        setCooktopMaterial,
        towerMaterial,
        setTowerMaterial,
        tapMaterial,
        setTapMaterial,
        sinkBowlMaterial, 
        setSinkBowlMaterial,
        towerAccessoryMaterial,
        setTowerAccessoryMaterial]);

    useEffect(() => {
        checkPage(currentPage);
    }, [currentPage, setCurrentPage]);

    const handleNext = () => {
        if(currentPage === 3) return;
        checkPage(currentPage + 1);
        setCurrentPage(currentPage + 1);
    }

    const handleBack = () => {
        if(currentPage === 0) return;
        checkPage(currentPage - 1);
        setCurrentPage(currentPage - 1);
    }

    const handleZoom = () => {
        if(currentPage === 0) return;
        checkPage(0);
    }

    const handleDragMode = () => {
        setDragMode(!dragMode);
    }


    const checkPage = (e) => {
        switch(e){
            case 0:
                setCurrentPage(0);
                setCameraFocus([0, 1, 0]);
                setIsFocussedOnIsland(false);
            break;  
            case 1:
                setCurrentPage(1);
                // setCameraFocus([-1.5, 0.5, 0]);
            break;
            case 2:
                setCurrentPage(2);
                // setCameraFocus([1.5, 0.5, 0]);
            break;
            case 3:
                setCurrentPage(3);
                // setCameraFocus([0, 1, -1.5]);
            break;
        }
    }

    return (
        <>
        <div className='config-wrapper'>

            <div
                className='config-ui__extra-buttons'
            >
                <div
                    className='config-ui__zoom-out'
                >
                    <button
                        onClick={handleZoom}                        
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className='zoom-out__image'>
                            <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M19 19L14.65 14.65" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M6 9H12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div
                    className={dragMode ? 'config-ui__move--active' : 'config-ui__move'}
                >
                    <button
                        onClick={handleDragMode}
                    >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" className={dragMode ? 'move__image--active' : 'move__image'}>
                            <path d="M4 8L1 11L4 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 4L11 1L14 4" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M14 18L11 21L8 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18 8L21 11L18 14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 11H21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 1V21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>


            {!loaded && <p>Loading UI...</p>}

            
            {loaded &&    <div
                    className='config-ui'
                >

                    <div
                        className='no-select config-ui__nav'
                    >

                        <button
                            style={currentPage === 0 ? {opacity: 0.4} : {opacity: 1}}
                            className={currentPage === 0 ? 'config-ui__nav__button--disabled' : ''}
                            onClick={handleBack}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 8H1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 15L1 8L8 1" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </button>
  
                        <button
                            style={currentPage === 3 ? {opacity: 0.4} : {opacity: 1}}
                            className={currentPage === 3 ? 'config-ui__nav__button--disabled' : ''}
                            onClick={handleNext}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 1L15 8L8 15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                        </button>
                    </div>

                    {currentPage === 0 &&
                        <div
                            className='config-ui__amounts ui-page'
                        >   
                            <h2>Overview</h2>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <h5>main material:</h5>

                                <div className="config-ui__material-options material-selection">
                                    {Object.entries(allCategories).map(([category, materials]) => (
                                        <div key={category}>
                                            <p>{category}</p>
                                            <div className="config-ui__material-options__category">
                                                {materials.map((material, index) => (
                                                    <div
                                                        key={index}
                                                        className="config-ui__material-options__option"
                                                        // style={{
                                                        //     backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                        // }}
                                                        onClick={() => {
                                                            setSinkMaterial(material.url)
                                                            setCooktopMaterial(material.url)
                                                            setTowerMaterial(material.url)
                                                        }
                                                        }
                                                    >
                                                    <img
                                                        className='material-options__image'
                                                        src={`${material.url}` + 'albedo.jpg'}
                                                    />

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* <p>Select the number of islands you want.</p>
                            
                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Amount of sinks:</p>
                                <input
                                    type="number"
                                    value={sinkAmount}
                                    max={3}
                                    min={0}
                                    //if value is lower than 10, set the value to the input value
                                    onChange={(e) => setSinkAmount(e.target.value < 3 ? e.target.value : 3)}
        
                                />
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Amount of cooktops: </p>
                                <input
                                    type="number"
                                    value={cooktopAmount}
                                    max={3}
                                    min={0}
                                    //if value is lower than 10, set the value to the input value
                                    onChange={(e) => setCooktopAmount(e.target.value < 3 ? e.target.value : 3)}
                                />
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Amount of towers: </p>
                                <input
                                    type="number"
                                    value={towerAmount}
                                    max={3}
                                    min={0}
                                    onChange={(e) => setTowerAmount(e.target.value < 3 ? e.target.value : 3)}
                                />
                            </div> */}

                        </div>
                    }

                    {currentPage === 1 &&
                        <div
                           
                        >
                            <h2>The Sink</h2>

                            <div>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Module Materiaal: 
                                        <span>
                                            {' ' + sinkMaterial.split('/').slice(-2, -1)[0]}
                                        </span>

                                    </summary>

                                    <div className="config-ui__material-options material-selection">
                                        {Object.entries(allCategories).map(([category, materials]) => (
                                            <div
                                                className='material-options__category-wrapper'
                                                key={category}
                                            >
                                                <p>{category}</p>
                                                <div className="config-ui__material-options__category">
                                                    {materials.map((material, index) => (
                                                        <div
                                                            key={index}
                                                            className="config-ui__material-options__option"
                                                            style={{
                                                                backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                            }}
                                                            onClick={() => setSinkMaterial(material.url)
                                                            }
                                                        ></div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </details>

                                <details
                                    open
                                    className='config-ui__details'
                                >
                                    <summary>Afgerond: 
                                        <span>
                                            {sinkBevelled ? ' ja' : ' neen'}
                                        </span>
                                    </summary>
                                    <input 
                                        type="checkbox" 
                                        checked={sinkBevelled}
                                        onChange={(e) => setSinkBevelled(e.target.checked)} 
                                    />
                                </details>

                                <div
                                    className='config-ui__details'
                                >
                                    <p>Tap Material:</p>

                                    <div className="config-ui__material-options material-selection">
                                        <div className="config-ui__material-options__category">
                                            {allCategories.metal.map((material, index) => (
                                                <div
                                                    key={index}
                                                    className="config-ui__material-options__option"
                                                    style={{
                                                        backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                    }}
                                                    onClick={() => setTapMaterial(material.url)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                </div>

                                <div
                                    className='config-ui__details'
                                >
                                    <p>Tap Type:</p>
                                    <select 
                                        onChange={(e) => setTapType(e.target.value)}
                                        value={tapType}
                                    >
                                        <option value="tap1">Standard tap</option>
                                        <option value="tap2">Quooker tap</option>
                                    </select>
                                </div>

                                <div
                                    className='config-ui__details'
                                >
                                    <p>Sink Material:</p>

                                    <div className="config-ui__material-options material-selection">
                                        <div className="config-ui__material-options__category">
                                            {allCategories.metal.map((material, index) => (
                                                <div
                                                    key={index}
                                                    className="config-ui__material-options__option"
                                                    style={{
                                                        backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                    }}
                                                    onClick={() => setSinkBowlMaterial(material.url)}
                                                ></div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    }

                    {currentPage === 2 &&
                        <div
                            className='config-ui__materials ui-page config-ui__cooktop'
                        >

                            <h2>The Cooktop</h2>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Cooktop Material:</p>

                                <div className="config-ui__material-options material-selection">
                                    {Object.entries(allCategories).map(([category, materials]) => (
                                        <div key={category}>
                                            <p>{category}</p>
                                            <div className="config-ui__material-options__category">
                                                {materials.map((material, index) => (
                                                    <div
                                                        key={index}
                                                        className="config-ui__material-options__option"
                                                        style={{
                                                            backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                        }}
                                                        onClick={() => setCooktopMaterial(material.url)}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Cooktop Bevelled:</p>
                                <input 
                                    type="checkbox" 
                                    checked={cooktopBevelled}
                                    onChange={(e) => setCooktopBevelled(e.target.checked)} 
                                />
                            </div>

                                
                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Stove Type:</p>
                                <select 
                                    onChange={(e) => setStoveType(e.target.value)}
                                    value={stoveType}
                                >
                                    <option value="gas">Gas</option>
                                    <option value="electric">Electric</option>
                                </select>
                            </div>
                        
                        </div>
                    }

                    {currentPage === 3 &&
                        <div
                            className='config-ui__materials ui-page config-ui__tower'
                        >

                            <h2>The Tower</h2>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Tower Material:</p>
                                <div className="config-ui__material-options material-selection">
                                    {Object.entries(allCategories).map(([category, materials]) => (
                                        <div key={category}>
                                            <p>{category}</p>
                                            <div className="config-ui__material-options__category">
                                                {materials.map((material, index) => (
                                                    <div
                                                        key={index}
                                                        className="config-ui__material-options__option"
                                                        style={{
                                                            backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                        }}
                                                        onClick={() => setTowerMaterial(material.url)}
                                                    ></div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Tower Bevelled:</p>
                                <input
                                    type="checkbox"
                                    checked={towerBevelled}
                                    onChange={(e) => setTowerBevelled(e.target.checked)}
                                />
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Appliance Type:</p>
                                <select 
                                    onChange={(e) => setApplianceType(e.target.value)}
                                    value={applianceType}
                                >
                                    <option value="oven">Oven</option>
                                    <option value="fridge">Fridge</option>
                                </select>
                            </div>

                            <div
                                className='config-ui__align-row__per-element'
                            >
                                <p>Tower Accessory Material:</p>

                                <div className="config-ui__material-options material-selection">
                                    <div className="config-ui__material-options__category">
                                        {allCategories.metal.map((material, index) => (
                                            <div
                                                key={index}
                                                className="config-ui__material-options__option"
                                                style={{
                                                    backgroundImage: `url(${material.url}albedo.jpg)`, 
                                                }}
                                                onClick={() => setTowerAccessoryMaterial(material.url)}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    }

                    <div
                        className='ui-page__slider'
                    >
                        <p>Open doors and shelves:</p>
                        <input
                            type="range"
                            min="0"
                            max="2"
                            step={0.01}
                            value={doorOpeningRotation}
                            onChange={(e) => setDoorOpeningRotation(e.target.value)}
                        />

                    </div>

                </div>
            }
            
        </div>
        </>
    );
};