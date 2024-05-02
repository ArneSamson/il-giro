import React, { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import useScene from "../../../store/useScene";
import useUIStore from "../../../store/useUIStore";

export default function LandingsPage() {
  const { setCameraFocus } = useScene((state) => ({
    setCameraFocus: state.setCameraFocus,
  }));

  const { setLandingPageVisible } = useUIStore((state) => ({
    setLandingPageVisible: state.setLandingPageVisible,
  }));

  return (
    <>
      <div className='landings-page'>
        <button
          onClick={() => {
            setLandingPageVisible(false);
            setCameraFocus([0, 1, 0]);
          }}
        >
          <h5>Start configuring</h5>
        </button>
      </div>
    </>
  );
}
