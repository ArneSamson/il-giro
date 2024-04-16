import React, { useEffect, useState } from 'react';
import { SwatchesPicker } from 'react-color';
import { ralData } from './dataColors.js';

import useConfigStore from '../../../../store/useConfigStore.jsx';

function organizeRalColors(ralData) {
    const ralColors = {};

    Object.values(ralData).forEach(color => {
        const group = color.code.substring(0, 1) + "000";
        if (!ralColors[group]) {
            ralColors[group] = [];
        }
        ralColors[group].push(color.hex);
    });

    return Object.values(ralColors);
}

//function that organizes the ral colors by hex code
function organizeRalColorsByHex(ralData) {
    const ralColorsByHex = {};

    Object.values(ralData).forEach(color => {
        ralColorsByHex[color.hex] = color;
    });

    return ralColorsByHex;
}


const ralColors = organizeRalColors(ralData);

const ralColorsByHex = organizeRalColorsByHex(ralData);
// console.log('ralColorsByHex', ralColorsByHex);


export default function ColorPicker({ color }) {

    const {
        ralColor,
        setRalColor,
    } = useConfigStore(state => ({
        ralColor: state.ralColor,
        setRalColor: state.setRalColor,
    }));

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleInput = (value) => {
        if (value.length === 4) {
            //compare the value with the ralData
            const color = ralData[value];
            if (color) {
                setRalColor(color);
            } else {
                window.alert("RAL color doesn't exist.");
            }
        }
    }

    const handleColorChange = (color) => {
        const selectedColorHex = color.hex.toUpperCase();

        const newColor = ralColorsByHex[selectedColorHex];

        if (newColor) {
            setRalColor(newColor);
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (<>
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                paddingLeft: 5,
                paddingRight: 10,
                marginBottom: 10,
            }}
        >
            <input
                className='colorpicker__color-input'
                type="text"
                placeholder='Enter RAL code'
                maxLength={4}
                pattern="[0-9]*"
                onBlur={e => handleInput(e.target.value)}
            />
        </div>

        <SwatchesPicker
            color={color}
            colors={ralColors}
            onChangeComplete={(color) => handleColorChange(color)}
            height={300}
        />


    </>

    );
}