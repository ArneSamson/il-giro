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

const ralColors = organizeRalColors(ralData);


export default function ColorPicker({ color, setColor }) {

    const {
        ralColor,
        setRalColor,
    } = useConfigStore(state => ({
        ralColor: state.ralColors,
        setRalColor: state.setRalColor,
    }));

    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleInput = (value) => {
        if (value.length === 4) {
            //compare the value with the ralData
            const color = ralData[value];
            if (color) {
                setRalColor(color.hex);
            } else {
                console.log("Color not found");
            }
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
        <SwatchesPicker
            color={color}
            colors={ralColors}
            onChangeComplete={color => setRalColor(color.hex)}
            width={(windowWidth * 0.2)}
            height={300}
        />

        <input
            type="text"
            value={ralColor}
            maxLength={4}
            pattern="[0-9]*"
            onBlur={e => handleInput(e.target.value)}

        />
    </>

    );
}