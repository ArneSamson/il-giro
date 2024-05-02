import React, { useState, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import useConfigStore from "../store/useConfigStore.jsx";
import useUIStore from "../store/useUIStore.jsx";

import ConfigNav from "./ui/components/nav/ConfigNav.jsx";
import ExtraButtons from "./ui/components/buttons/ExtraButtons.jsx";
import ToolTip from "./ui/components/buttons/ToolTip.jsx";
import TextureIsLoading from "./ui/components/loading/TextureIsLoading.jsx";

import LandingsPage from "./ui/pages/LandingsPage.jsx";
import UiPage1 from "./ui/pages/UiPage1.jsx";
import UiPage2 from "./ui/pages/UiPage2.jsx";
import OrderOverview from "./ui/pages/OrderOverview.jsx";
import ModuleSelectionPage from "./ui/pages/ModuleSelectionPage.jsx";

export default function ConfigUi() {
  const {
    allMaterials,
    allCategories,

    setMainMaterial,

    setAccentMaterial,

    setTableTopMaterial,
  } = useConfigStore(
    useShallow((state) => ({
      allMaterials: state.allMaterials,
      allCategories: state.allCategories,

      setMainMaterial: state.setMainMaterial,

      setAccentMaterial: state.setAccentMaterial,

      setTableTopMaterial: state.setTableTopMaterial,
    }))
  );

  const { currentPage, landingPageVisible } = useUIStore((state) => ({
    currentPage: state.currentPage,
    landingPageVisible: state.landingPageVisible,
  }));

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const lastMaterial = allMaterials[allMaterials.length - 1];

    if (lastMaterial) {
      setLoaded(true);

      if (loaded) return;

      setMainMaterial(allCategories["wood"][0]);
      setAccentMaterial(allCategories["metal"][0]);
      setTableTopMaterial(allCategories["dekton"][1]);
    }
  }, [allMaterials, setMainMaterial, setAccentMaterial]);

  return (
    <>
      {/* {landingPageVisible &&
                <LandingsPage />
            } */}

      <TextureIsLoading />

      <ToolTip />

      <ExtraButtons />

      <div className='config-wrapper'>
        {!loaded && <p>Loading UI...</p>}

        {loaded && (
          <div className='config-ui'>
            {currentPage === 0 && (
              <>
                <ModuleSelectionPage />
              </>
            )}

            {currentPage === 1 && (
              <>
                <UiPage1 />
              </>
            )}

            {currentPage === 2 && (
              <>
                <UiPage2 />
              </>
            )}

            {currentPage === 3 && (
              <>
                <OrderOverview />
              </>
            )}

            <ConfigNav />
          </div>
        )}
      </div>
    </>
  );
}
