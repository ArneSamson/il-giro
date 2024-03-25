import * as THREE from 'three'
import { GridHelper } from 'three'

import Cooktop from './kitchen/Cooktop.jsx'
import Sink from './kitchen/Sink.jsx'
import Tower from './kitchen/Tower.jsx'

import ReflectivePlane from './lighting&shadows/ReflectivePlane.jsx'

import useConfig from '../store/useConfig.jsx'

export default function Scene() {

    const {
        sinkChosen,
        cooktopChosen,
        towerChosen,

        dragMode
    } = useConfig();

    console.log('hey');

    return <>

        {sinkChosen &&
            <Sink
                props={
                    {
                        rotation: [0, 0.5, 0],
                    }
                }
            />
        }

        {cooktopChosen &&
            <Cooktop
            />
        }

        {towerChosen &&
            <Tower
            />
        }

        <gridHelper
            visible={dragMode}
            args={[10, 10, 0x000000, 0x000000]}
        />

        <color attach="background" args={dragMode ? [0xefefef] : [0xffffff]} />


    </>
}