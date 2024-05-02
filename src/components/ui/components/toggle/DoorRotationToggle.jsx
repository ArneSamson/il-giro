import React from "react";
import { useShallow } from "zustand/react/shallow";

import useConfigStore from "../../../../store/useConfigStore.jsx";

export default function DoorRotationToggle() {
  const { doorOpeningRotation, setDoorOpeningRotation } = useConfigStore(
    useShallow((state) => ({
      doorOpeningRotation: state.doorOpeningRotation,
      setDoorOpeningRotation: state.setDoorOpeningRotation,
    }))
  );

  return (
    <>
      <div className='config-ui__slider'>
        <h5>Open doors and drawers:</h5>

        <label className='config-ui__toggle'>
          <input
            type='checkbox'
            checked={doorOpeningRotation === 1.5}
            onChange={(e) => {
              setDoorOpeningRotation(e.target.checked ? 1.5 : 0);
            }}
          />
          <span className='config-ui__toggle-slider'></span>
        </label>
      </div>
    </>
  );
}
