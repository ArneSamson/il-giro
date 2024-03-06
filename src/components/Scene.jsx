import * as THREE from 'three'
import { GridHelper } from 'three'

import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'
import Tower from './kitchen/Tower.jsx'

import ReflectivePlane from './lighting&shadows/ReflectivePlane.jsx'

import useConfig from '../store/useConfig.jsx'

export default function Scene() {

    const {
        allMaterials,
        sinkAmount, 
        cooktopAmount, 
        towerAmount, 
        sinkMaterial,
        cooktopMaterial,
        towerMaterial, 
        sinkBevelled,
        cooktopBevelled,
        towerBevelled,
        tapMaterial,
        tapType,
        sinkBowlMaterial,
        stoveType,
        applianceType,
        towerAccessoryMaterial,
        doorOpeningRotation,

        currentPage,
        setCurrentPage,

        dragMode
    } = useConfig();

    const islands = [];

    for (let i = 0; i < sinkAmount; i++){
        islands.push(
            <Sink
                key={'sink'+i}
                materialUrl={
                    sinkMaterial ? sinkMaterial : allMaterials[0].url
                }
                props={
                    {
                        position: [-1.5 - i, 0, 0],
                        rotation: [0, 0.5, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {sinkBevelled}
                accessoryMaterialUrl={
                    tapMaterial ? tapMaterial : allMaterials[1].url
                }
                tapType={tapType}
                sinkBowlMaterial={
                    sinkBowlMaterial ? sinkBowlMaterial : allMaterials[8].url
                }
            />
        )
    }
    for(let i =0; i < cooktopAmount; i++){
        islands.push(
            <Cooktop
                key={'cooktop'+i}
                materialUrl={
                    cooktopMaterial ? cooktopMaterial : allMaterials[0].url
                }
                props={
                    {
                        position: [1.5 + i, 0, 0],
                        rotation: [0, -0.5, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {cooktopBevelled}
                stoveType={stoveType}

            />
        )
    }
    for(let i =0; i < towerAmount; i++){
        islands.push(
            <Tower
                key={'tower'+i}
                materialUrl={
                    towerMaterial ? towerMaterial : allMaterials[4].url
                }
                props={
                    {
                        position: [0, 0, -1 - i],
                        rotation: [0, 0, 0],
                        scale: [1, 1, 1],
                    }
                }
                bevelled = {towerBevelled}
                doorOpening = {doorOpeningRotation}
                fridgeOrOven = {applianceType}
                accessoryMaterialUrl={
                    towerAccessoryMaterial ? towerAccessoryMaterial : allMaterials[5].url
                }

            />
        )
    }

    return <>

            {islands}

            <gridHelper
                visible={dragMode}
                args={[10, 10, 0x000000, 0x000000]} 
            />

            <ReflectivePlane
                props={
                    {
                        position: [0, -0.01, 0],
                        rotation: [-Math.PI / 2, 0, 0],
                        scale: [7, 7, 1],
                    }
                }
            />

            <color attach="background" args={dragMode ? [0xefefef] : [0xffffff]} />


    </>
}