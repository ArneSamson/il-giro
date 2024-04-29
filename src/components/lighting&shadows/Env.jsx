import {
  OrbitControls,
  Html,
  Text,
  Environment,
  Lightformer,
  CameraControls,
  ContactShadows,
  SoftShadows,
} from "@react-three/drei";
import * as THREE from "three";

export default function Env() {
  return (
    <>
      <Environment files={"/HDR/4.hdr"} background={false} blur={0}>
        <Lightformer
          visible={true}
          form='rect'
          intensity={1}
          position={new THREE.Vector3().setFromSphericalCoords(
            2, // distance
            1.2, // phi
            1.75 // theta
          )}
          scale={[5, 2, 5]}
          target={[0, 0, 0]}
          color={"#ffffff"}
        />
        <Lightformer
          visible={true}
          form='rect'
          intensity={1}
          position={new THREE.Vector3().setFromSphericalCoords(
            1.5, // distance
            1, // phi
            4.2 // theta
          )}
          rotation={[0, 0, 0]}
          scale={[5, 2, 5]}
          target={[0, 0, 0]}
          castShadow={false}
          receiveShadow={false}
        />

        {/* <Lightformer
          visible={true}
          form='rect'
          intensity={0.2}
          position={new THREE.Vector3().setFromSphericalCoords(
            1, // distance
            Math.PI, // phi
            0 // theta
          )}
          scale={[5, 5, 5]}
          target={[0, 0, 0]}
          color={"#fff"}
        /> */}

        {/* <Lightformer
          visible={true}
          form='rect'
          intensity={1}
          position={new THREE.Vector3().setFromSphericalCoords(
            1.5, // distance
            Math.PI / 13,
            0 // theta
          )}
          scale={[5, 5, 5]}
          target={[0, 0, 0]}
          color={"#000"}
        /> */}
      </Environment>
    </>
  );
}
