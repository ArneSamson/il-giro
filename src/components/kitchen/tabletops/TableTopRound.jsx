import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei'

import NewMaterial from '../../../helper/NewMaterial.jsx';;

export default function TableTopRound({ props }) {

    //is 40mm high in model

    const { nodes } = useGLTF("./models/tabletop-round.glb");
    return (
        <group
            name='tabletop'
            dispose={null}
        >
            <mesh
                name='tabletopMesh'
                castShadow
                receiveShadow
                geometry={nodes['tabletop-round'].geometry}
                position={[0, 0.96, 0]}
                {...props}
            >
                <NewMaterial
                    type={"tableTop"}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('./models/tabletop-round.glb')