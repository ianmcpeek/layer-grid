import { useCallback, useEffect, useState } from "react";
import { Compass } from "../../../../components/Compass";
import { LayerGrid } from "../../../../components/Grid/LayerGrid";
import { KeyboardControls } from "../../../../components/KeyboardControls";
import { Matrix, MatrixUtil } from "../../../../lib/utils/MatrixUtil";
import { RandomUtil } from "../../../../lib/utils/RandomUtil";

// Data
const GameboyPalette = {
    Green0: '#0f380f',
    Green1: '#306230',
    Green2: '#8bac0f',
    Green3: '#9bbc0f',
}
const con: any = {
    dimensions: [20, 20],
    cellLength: 18,
    border: {
        radius: 20,
        width: 4,
        color: GameboyPalette.Green3 + '22'
    },
    frame: {
        padding: 20,
        border: {
            radius: 25,
            width: 4,
            color: GameboyPalette.Green2 + 'aa'
        },
    }
};


const layerConfigs = [
    {
        layerId: 'bg',
        borderColor: 'transparent',
        backgroundColor: '#448899' + '44',
        innerBorder: false,
    },
    {
        layerId: 'land',
        borderColor: 'f0f3bd',
        backgroundColor: '#ffad69aa',
        innerBorder: false,
    },
    {
        layerId: 'mountain',
        borderColor: '#386112',
        backgroundColor: '#317b22',
        innerBorder: false,
    },
    {
        layerId: 'cloud',
        borderColor: 'transparent',
        backgroundColor: '#EDF2F4aa',
        innerBorder: false,
    },
];

// Styles

const styles: any = {

    fig: {
        marginBottom: '40px'
    },
    codeBlock: {
        border: '4px solid #00000088',
        borderRadius: '8px',
        minWidth: '250px'
    },
    button: {
        border: '0',
        borderRadius: '4px',
        boxShadow: '2px 2px 8px #00000044',
        backgroundColor: '#30d0f0',
        fontFamily: 'Sigmar',
        color: 'black',
        cursor: 'pointer',
        transition: 'transform 1s'
    }

}


function getLandscape() {
    const land = MatrixUtil.fill(MatrixUtil.of(con.dimensions, 0), [0, 0], con.dimensions, RandomUtil.randBinaryAdvantage);
    const bg = MatrixUtil.fill(MatrixUtil.of(con.dimensions, 0), [0, 0], con.dimensions, () => (1));
    return {
        bg,
        land,
        mountains: MatrixUtil.fill(MatrixUtil.of(con.dimensions, 0), [0, 0], con.dimensions, (i: number, j: number) => {
            return land.rows[i][j] === 1 ? RandomUtil.randBinaryAdvantage() : 0;
        }),
        clouds: MatrixUtil.fill(MatrixUtil.of(con.dimensions, 0), [0, 0], con.dimensions, RandomUtil.randBinaryDisavantage)
    }
}

function translateMatrixInDirection(matrix: Matrix, dir: string): Matrix {
    const [w, h] = matrix.dimensions;

    const step = 1;
    const displacementByDirection: any = {
        UP: [step, 0],
        DOWN: [-step, 0],
        LEFT: [0, step],
        RIGHT: [0, -step],
        UP_LEFT: [step, step],
        UP_RIGHT: [step, -step],
        DOWN_LEFT: [-step, step],
        DOWN_RIGHT: [-step, -step],
    };

    return MatrixUtil.translate(
        matrix,
        [0, 0], [w, h], displacementByDirection[dir]
    );
}

function fillMatrixInDirection(matrix: Matrix, dir: string, fnVal: Function) {
    const [w, h] = matrix.dimensions;
    const step = 1;
    const fill_up = (matrix: Matrix) => (MatrixUtil.fill(matrix, [0, 0], [step, h], fnVal));
    const fill_left = (matrix: Matrix) => (MatrixUtil.fill(matrix, [0, 0], [w, step], fnVal));
    const fill_right = (matrix: Matrix) => (MatrixUtil.fill(matrix, [0, h - step], [w, h], fnVal));
    const fill_down = (matrix: Matrix) => (MatrixUtil.fill(matrix, [w - step, 0], [w, h], fnVal));

    const fillByDirection: any = {
        UP: fill_up,
        DOWN: fill_down,
        LEFT: fill_left,
        RIGHT: fill_right,
        UP_LEFT: (matrix: Matrix) => fill_up(fill_left(matrix)),
        UP_RIGHT: (matrix: Matrix) => fill_up(fill_right(matrix)),
        DOWN_RIGHT: (matrix: Matrix) => fill_down(fill_right(matrix)),
        DOWN_LEFT: (matrix: Matrix) => fill_down(fill_left(matrix)),
    };

    return fillByDirection[dir](matrix);
}

function useTimer({ fnTick, delayInMS }: any) {
    const [ticks, setTicks] = useState(0);
    useEffect(() => {
        let tId = setTimeout(() => {
            fnTick(ticks + 1);
            setTicks(ticks + 1);
        }, delayInMS);

        return () => {
            if (tId) clearTimeout(tId);
        };
    }, [fnTick, delayInMS, ticks]);

    return ticks;
}


function DoomScroller({ diag, buttonPressed, active }: any) {
    const [landscape, setLandscape] = useState(getLandscape);

    const landscapeLayers = [
        { ...layerConfigs[0], cells: landscape.bg.rows },
        { ...layerConfigs[1], cells: landscape.land.rows },
        { ...layerConfigs[2], cells: landscape.mountains.rows },
        { ...layerConfigs[3], cells: landscape.clouds.rows },
    ];

    const scroll = useCallback((elapsed: number) => {
        // determine direction to perform scroll
        // determine which layers should update based on layer config
        const scape: any = {
            ...landscape
        };
        if (elapsed % 4 === 0) {
            scape.land = fillMatrixInDirection(translateMatrixInDirection(landscape.land, diag), diag, RandomUtil.randBinaryAdvantage);
            scape.mountains = fillMatrixInDirection(translateMatrixInDirection(landscape.mountains, diag), diag, (i: number, j: number) => {
                return landscape.land.rows[i][j] ? RandomUtil.randBinaryAdvantage() : 0;
            });
        }
        scape.clouds = fillMatrixInDirection(translateMatrixInDirection(landscape.clouds, diag), diag, RandomUtil.randBinaryDisavantage);
        setLandscape(scape);
    }, [landscape, diag]);

    const elapsed = useTimer({
        fnTick: (elapsed: number) => active ? scroll(elapsed) : undefined,
        delayInMS: 400
    });




    return (
        <>
            {
                !active && <div style={{
                    marginLeft: '-3px',
                    width: '408px',
                    height: '100px',
                    backgroundColor: GameboyPalette.Green2,
                    position: 'absolute',
                    zIndex: '2',
                    top: '32%',
                    border: '4px solid #647a11',
                    boxSizing: 'border-box',
                    padding: '20px',
                    color: GameboyPalette.Green1,
                    fontFamily: 'Shrikhand',
                    fontSize: '26px',
                    textAlign: 'center',
                    lineHeight: '30px'
                }}>
                    Game Paused<br />
                    <span style={{ fontFamily: 'Eczar', fontSize: '18px', fontWeight: 200 }}>Click here to resume</span>
                </div>
            }

            <div style={{ color: '#ffffff44', marginTop: '20px' }}>
                <div>


                    <LayerGrid config={con} layers={landscapeLayers}></LayerGrid>
                    <div style={{
                        padding: '0 40px',
                        paddingTop: '5px',
                        columnGap: '40px',
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{
                            position: 'relative',
                            marginTop: '25px'
                        }}>

                            <Compass dir={diag} theme={{
                                bg: GameboyPalette.Green2,
                                border: GameboyPalette.Green2,
                                arrow: {
                                    bg: GameboyPalette.Green0,
                                    border: GameboyPalette.Green0
                                }
                            }} />
                        </div>
                        <KeyboardControls {...buttonPressed}></KeyboardControls>
                    </div>


                </div>

            </div>
        </>
    );
}

export default DoomScroller;