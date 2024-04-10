import React from 'react';
import { useGLTF } from '@react-three/drei'

import ModuleMaterial from '../ModuleMaterial.jsx';

export default function TableFlat({ props }) {

    const { nodes } = useGLTF("./models/table.glb");

    //base is 40mm high in model

    return <>

        <group
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes['table-tabletop001'].geometry}
                // material={material}
                position={[0, 0.96, 0]}
                scale={[1, 1, 1]}
                {...props}
            >
                <ModuleMaterial
                    type={"tableTop"}
                />
            </mesh>
        </group>

    </>
}

useGLTF.preload('./models/table.glb')