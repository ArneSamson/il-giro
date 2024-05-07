import React, { useState, useRef, useEffect } from "react";
import { GLTFExporter } from "three/addons/exporters/GLTFExporter.js";

import CameraHandler from "./helper/CameraHandler.jsx";

import Scene from "./components/Scene.jsx";
import Lights from "./components/lighting&shadows/Lights.jsx";
import Env from "./components/lighting&shadows/Env.jsx";

import { useThreeGlobal } from "./helper/useThreeGlobal.tsx";
import { Perf } from "r3f-perf";

export default function Experience() {
  //   console.log("Experience");

  const [a, set] = useState(0);

  const { ThreeGlobal } = useThreeGlobal();

  const sceneRef = useRef();

  const options = {
    onlyVisible: true,
    binary: false,
    maxTextureSize: 2048,
  };

  return (
    <>
      <Perf position='top-left' style={{ transform: "translateX(15vw)" }} />

      <CameraHandler />

      <Lights />

      <Scene sceneRef={sceneRef} />

      <Env />

      <ThreeGlobal />
    </>
  );
}
