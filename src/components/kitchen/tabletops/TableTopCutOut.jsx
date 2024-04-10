import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei'

import NewMaterial from '../../../helper/NewMaterial.jsx';;

export default function TableTopCutOut({ props }) {

    const { nodes, materials } = useGLTF("./models/table-top-cut-out.glb");
    return (
        <group
            name='tabletop'
            dispose={null}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['table-top-cut-out002'].geometry}
                position={[0, 0.913, 0]}
                {...props}
            >
                <NewMaterial
                    type={"tableTop"}
                    ralExclude={true}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('./models/table-top-cut-out.glb')