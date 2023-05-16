import { useEffect, useState } from "react";
import { LayerGrid } from "./Grid/LayerGrid";
import { MatrixUtil } from "../lib/utils/MatrixUtil";

class RotationUtil {
    // all degrees can be expressed in 0-360

    // any negative or values that overflow should be handled

    // changing from one direction to another should result in shortest path in degrees

    // [from, to] will be value in rotation table
    static rotateTo(from: string, to: string): number {
        return this.counterClockwiseDistance(from, to);
    }

    static clockwiseDistance(from: string, to: string): number {
        return -7 + directionDistance[to] - directionDistance[from];
    }

    static counterClockwiseDistance(from: string, to: string): number {
        return directionDistance[to] - directionDistance[from];
    }
}

const directionDistance: any = {
    'UP': 0,
    'UP_RIGHT': 1,
    'RIGHT': 2,
    'DOWN_RIGHT': 3,
    'DOWN': 4,
    'DOWN_LEFT': 5,
    'LEFT': 6,
    'UP_LEFT': 7
};




export function Compass({ dir, theme }: any) {
    const compassConfig = {
        dimensions: [2, 2],
        cellLength: 45,
        border: {
            radius: 60,
            width: 3,
            color: theme.border + 'aa'
        },
        frame: {
            padding: 6,
            border: {
                radius: 80,
                width: 4,
                color: theme.border + '44',
                style: 'dashed'
            }
        }
    }
    const Layer = {
        dimensions: [2, 2],
        cells: MatrixUtil.of([2, 2], 1).rows,
        innerBorder: false,
        borderColor: 'transparent',
        backgroundColor: theme.bg + '88',
    }


    const [savedDir, setSavedDir] = useState('RIGHT');
    const [rotation, setRotation] = useState(90);

    useEffect(() => {
        if (dir !== savedDir) {
            const dist = RotationUtil.counterClockwiseDistance(savedDir, dir);

            setRotation(rotation + (dist * 45));
            setSavedDir(dir);
            console.log('setting gotation ' + (rotation + (dist * 45)));

        }
    }, [dir, rotation, savedDir]);

    return (
        <div className='compass' style={{ display: 'inline-block' }}>
            <LayerGrid config={compassConfig} layers={[Layer]}></LayerGrid>
            <ArrowSVG rotate={rotation} theme={theme} />
        </div>
    );
}

function ArrowSVG({ rotate, theme }: any) {
    const border = theme.arrow.border;
    const bg = theme.arrow.bg;
    return (
        <svg className='compass--arrow' style={{ transform: `rotate(${rotate}deg)` }} xmlns="http://www.w3.org/2000/svg" width="36" height="61" viewBox="0 0 32 61" fill="none">
            <path d="M18 51.0147V1L33 58L18 51.0147Z" fill={bg} stroke={border} strokeWidth="3" />
            <path d="M18 51.0147V1L3 58L18 51.0147Z" fill={bg} stroke={border} strokeWidth="3" />
        </svg>
    );
}