import React from "react";
import { useShallow } from "zustand/react/shallow";

import useConfigStore from "../../../../store/useConfigStore";

export default function BevelledSelection() {
  const { allBevelled, setAllBevelled } = useConfigStore(
    useShallow((state) => ({
      allBevelled: state.allBevelled,
      setAllBevelled: state.setAllBevelled,
    }))
  );

  return (
    <>
      <details open className='config-ui__details'>
        <summary>{allBevelled ? "Curved" : "Not curved"}</summary>
        <label className='config-ui__toggle'>
          <input
            type='checkbox'
            checked={allBevelled}
            onChange={(e) => setAllBevelled(e.target.checked)}
          />
          <span className='config-ui__toggle-slider'></span>
        </label>
      </details>
    </>
  );
}
