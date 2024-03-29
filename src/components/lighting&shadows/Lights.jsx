import { useRef } from "react";
import useShadowHelper from "../../helper/useShadowHelper.jsx";
import { SoftShadows } from "@react-three/drei";

export default function Lights() {
    const lightRef = useRef();

    // const helper = useShadowHelper(lightRef)

    return (
        <>
            <directionalLight
                ref={lightRef}
                castShadow
                position={[-2, 0.5, 5]}
                intensity={1.5}
                shadow-mapSize={[1024, 1024]}
                shadow-camera-near={0.1}
                shadow-camera-far={10}
                shadow-camera-top={5}
                shadow-camera-right={5}
                shadow-camera-bottom={-4}
                shadow-camera-left={-5}
                shadow-bias={0.0}
                shadow-normalBias={0}
            />

            <SoftShadows focus={0} samples={25} size={40} />

            {/* <ambientLight intensity={ 1.4 } /> */}
        </>
    );
}
