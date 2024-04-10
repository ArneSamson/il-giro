import React from 'react';
import { SwatchesPicker } from 'react-color';
import { ralData } from './dataColors.js';

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
    return (
        <SwatchesPicker
            color={color}
            colors={ralColors}
        // onChangeComplete={(color) => setColor(color.hex)}
        />
    );
}