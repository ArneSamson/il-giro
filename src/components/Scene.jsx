import { useRef, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { useThreeGlobal } from "../helper/useThreeGlobal.tsx";
// import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import { GLTFExporter } from "../helper/useGLTFExporter.js";
import { useControls, button } from "leva";

import Cooktop from "./kitchen/Cooktop.jsx";
import Sink from "./kitchen/Sink.jsx";
import Tower from "./kitchen/Tower.jsx";
import Table from "./kitchen/Table.jsx";

import useConfigStore from "../store/useConfigStore.jsx";
import { useShallow } from "zustand/react/shallow";

export default function Scene() {
  const { downloadScene } = useControls("Download", {
    downloadScene: button(() => {
      setDownloadScene(true);
    }),
  });

  const [isDownloadScene, setDownloadScene] = useState(false);

  //   console.log("Scene.jsx");

  const { sinkChosen, cooktopChosen, towerChosen, tableChosen } =
    useConfigStore(
      useShallow((state) => ({
        sinkChosen: state.sinkChosen,
        cooktopChosen: state.cooktopChosen,
        towerChosen: state.towerChosen,
        tableChosen: state.tableChosen,
      }))
    );

  const sceneRef = useRef();
  const exporter = new GLTFExporter();

  const { three } = useThreeGlobal();
  //   console.log(three);

  const options = {
    onlyVisible: true,
    binary: true,
    maxTextureSize: 2048,
  };

  useEffect(() => {
    if (three && three.scene) {
      if (isDownloadScene) {
        exporter.parse(
          three.scene,
          (gltf) => {
            console.log(gltf);
            const blob = new Blob([gltf], { type: "model/gltf+json" });
            console.log(blob);
            saveAs(blob, "scene.glb");
            setDownloadScene(false);
          },
          (error) => {
            console.error(error);
          },
          options
        );
      }
    }
  }, [three, isDownloadScene]);

  return (
    <>
      {sinkChosen && <Sink />}

      {cooktopChosen && <Cooktop />}

      {towerChosen && <Tower />}

      {tableChosen && <Table />}
    </>
  );
}
