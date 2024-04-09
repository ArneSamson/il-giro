import React from "react";

import useConfig from "../../../../store/useConfigStore.jsx";

export default function DoorRotationToggle() {

    const {
        doorOpeningRotation,
        setDoorOpeningRotation,
    } = useConfig(
        state => ({
            doorOpeningRotation: state.doorOpeningRotation,
            setDoorOpeningRotation: state.setDoorOpeningRotation,
        })
    );

    return <>
        <div
            className='config-ui__slider'
        >
            <h5>Open doors and drawers:</h5>

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
    </>

}