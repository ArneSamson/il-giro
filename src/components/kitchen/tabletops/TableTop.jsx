import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei'

import ModuleMaterial from '../../../helper/NewMaterial.jsx';;

export default function TableTop({ props }) {

    //is 40mm high in model

    const { nodes, materials } = useGLTF("./models/table-top.glb");
    return (
        <group
            name='tabletop'
            dispose={null}
        >
            <mesh
                name='tabletopMesh'
                castShadow
                receiveShadow
                geometry={nodes['table-top003'].geometry}
                position={[0, 0.913, 0]}
                {...props}
            >
                <ModuleMaterial
                    type={"tableTop"}
                />
            </mesh>

        </group>
    );
}

useGLTF.preload('./models/table-top.glb')