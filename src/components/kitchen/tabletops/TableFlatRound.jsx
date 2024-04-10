import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei'

import ModuleMaterial from '../ModuleMaterial.jsx';

export default function TableTopRound({ props }) {

    const { nodes } = useGLTF("./models/table-round.glb");

    //is 40mm high in model

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
                <ModuleMaterial
                    type={"tableTop"}
                />
            </mesh>
        </group>
    );
}

useGLTF.preload('./models/table-round.glb')