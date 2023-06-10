import { useCallback, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { LayeredGrid } from "../../components/Grid/LayeredGrid";
import { InlineDiamondSVG } from "../../components/Grid/SVGIcons";
import { KeyboardControls } from "../../components/KeyboardControls";
import { useArrowKeyClicked } from "../../lib/hooks/useArrowDirection";
import useIsMobile from "../../lib/hooks/useIsMobile";
import { Colors } from "../../lib/utils/ColorUtil";
import { Matrix, MatrixUtil } from "../../lib/utils/MatrixUtil";
import levels from "../Gem_Thief/db/levels";
import { Agent } from "../Gem_Thief/lib/Agents";

function spreadFire(matrix: Matrix, fnOnCoord: Function, collision?: Matrix): Matrix {
    const modified = { dimensions: matrix.dimensions, rows: matrix.rows.map(row => row.map(cell => cell)) };
    modified.rows.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell === 0 && (!collision || collision.rows[i][j] === 0)) {
                // left
                if (inBounds(modified.dimensions, [i, j - 1]) && matrix.rows[i][j - 1] === 1) modified.rows[i][j] = 1;
                // right
                else if (inBounds(modified.dimensions, [i, j + 1]) && matrix.rows[i][j + 1] === 1) modified.rows[i][j] = 1;
                // up
                else if (inBounds(modified.dimensions, [i - 1, j]) && matrix.rows[i - 1][j] === 1) modified.rows[i][j] = 1;
                // down
                else if (inBounds(modified.dimensions, [i + 1, j]) && matrix.rows[i + 1][j] === 1) modified.rows[i][j] = 1;

                if (modified.rows[i][j] === 1) fnOnCoord(modified, [i, j]);
            }

        });
    });

    console.log('newFire', modified);


    return modified;
}

const iconLayerConfig: any = {
    id: '0',
    type: 'Icon',
    icons: undefined
};

const colorLayerConfig = {
    id: '1',
    type: 'Color',
    border: {
        color: '#FFFF22',
        width: 4,
        radius: 20,
        opacity: '0.53'
    },
    innerBorder: true,
    backgroundColor: '#FF000022'
};

const inBounds = (dim: [number, number], p: [number, number]) => p[0] >= 0 && p[0] < dim[0] && p[1] >= 0 && p[1] < dim[1];
function Meeple() {
    const [won, setWon] = useState(false);
    const [beatIt, setBeatIt] = useState(false);
    const [dead, setDead] = useState(false);
    const [gemCount, setGemCount] = useState(0);
    const [steps, setSteps] = useState(0);
    const [swipedDir, setSwipedDir] = useState<string | null>(null);
    const [coord, setCoord] = useState<[number, number]>(
        levels[gemCount].playerCoord
    );
    const [agents, setAgents] = useState<Agent[]>(
        levels[gemCount].agents.map(agent => ({ ...agent }))
    );
    const [fire, setFire] = useState<Matrix | undefined>(
        levels[gemCount].fire
    );
    const isMobile = useIsMobile();

    const gemCoord = levels[gemCount].gemCoord;

    const config = levels[gemCount].gridConfig;
    // grid config
    if (!isMobile) {
        config.cellLength = 80;
    }

    const MoveMeeple = useCallback((dir: string) => {
        if (dead || beatIt) return;
        console.log('move meeple ', dir);

        const displace: any = {
            'UP': [-1, 0],
            'LEFT': [0, -1],
            'DOWN': [1, 0],
            'RIGHT': [0, 1],
        }
        const nextCoord: [number, number] = [coord[0] + displace[dir][0], coord[1] + displace[dir][1]];

        const noCollision = (p: [number, number]) => levels[gemCount].land ? levels[gemCount].land?.rows[p[0]][p[1]] === 0 : true;
        let _isDead = false;
        let _steps = steps;
        if (inBounds(config.dimensions, nextCoord) && noCollision(nextCoord)) {
            if (agents.find(agent => agent.coord[0] === nextCoord[0] && agent.coord[1] === nextCoord[1])) {
                setDead(true);
                _isDead = true;
            } else if (fire && fire.rows[nextCoord[0]][nextCoord[1]]) {
                setDead(true);
                _isDead = true;
            } else {
                setCoord(nextCoord);
            }
        }
        if (_isDead) return;
        _steps += 1;
        setSteps(_steps);
        if (nextCoord[0] === gemCoord[0] && nextCoord[1] === gemCoord[1]) setWon(true);
        else {
            let modified: Agent[] = agents.map(agent => ({ coord: [agent.coord[0], agent.coord[1]], type: 'Patrol', state: { dir: agent.state.dir } }));
            // Fire Turn
            if (fire && steps % 2 === 1) {
                setFire(spreadFire(fire, (matrix: Matrix, coord: [number, number]) => {
                    if (coord[0] === nextCoord[0] && coord[1] === nextCoord[1]) {
                        setDead(true);
                        matrix.rows[coord[0]][coord[1]] = 0;
                    }
                    modified = modified.filter(agent => !(agent.coord[0] === coord[0] && agent.coord[1] === coord[1]));
                }, levels[gemCount].land));
            }

            // make agents respond to fire
            // Patrol Agents turn

            // coord: [number, number];
            // type: 'Patrol';
            // state: any;
            // play out agents turn
            modified.forEach(agent => {
                if (agent.type === 'Patrol') {
                    const p = agent.coord;
                    const forward: [number, number] = [p[0] + displace[agent.state.dir][0], p[1] + displace[agent.state.dir][1]];
                    // check if forward is in bounds
                    if (inBounds(config.dimensions, forward) && noCollision(forward)) {
                        if (forward[0] === nextCoord[0] && nextCoord[1] === forward[1]) {
                            setDead(true);
                            // game over
                        } else {
                            // move forward
                            agent.coord = forward;
                        }
                    } else {
                        // flip
                        switch (agent.state.dir) {
                            case 'RIGHT':
                                agent.state.dir = 'LEFT'; break;
                            case 'LEFT':
                                agent.state.dir = 'RIGHT'; break;
                            case 'UP':
                                agent.state.dir = 'DOWN'; break;
                            case 'DOWN':
                                agent.state.dir = 'UP'; break;
                        }
                    }
                }
            });
            setAgents(modified);
        }
    }, [coord, gemCoord, gemCount, dead, agents]);


    const MakeGrid = () => {
        const meeple = MatrixUtil.of(levels[gemCount].gridConfig.dimensions);
        meeple.rows[coord[0]][coord[1]] = dead ? 7 : 1;
        if (!won) meeple.rows[gemCoord[0]][gemCoord[1]] = 2;
        agents.forEach(agent => {
            const p = agent.coord;
            meeple.rows[p[0]][p[1]] = 6;
        });

        fire?.rows.forEach((row, i) => {
            row.forEach((cell, j) => {
                if (cell === 1) meeple.rows[i][j] = 8;
            })
        });

        if (beatIt) {
            meeple.rows = meeple.rows.map(row => {
                return row.map(col => col === 0 ? 2 : col);
            })
        }

        return meeple;
    }


    const { onKeyDownEvent, onKeyUpEvent, clicked, held, clicks } = useArrowKeyClicked(MoveMeeple, () => { });
    const handlers = useSwipeable({
        onSwiped: (eventData: any) => {
            setSwipedDir(eventData.dir.toUpperCase());
            MoveMeeple(eventData.dir.toUpperCase());
            setTimeout(() => {
                setSwipedDir(null);
            }, 400);
        },
        // onSwiped: (eventData: any) => () => { console.log('dir', eventData.dir.toUpperCase()); MoveMeeple(eventData.dir.toUpperCase()) },
        ...{
            delta: 100,                             // min distance(px) before a swipe starts. *See Notes*
            preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
            trackTouch: true,                      // track touch input
            trackMouse: false,                     // track mouse input
            rotationAngle: 0,                      // set a rotation angle
            swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
            touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
        }

    })

    const buttonPressed = {
        upPressed: held.up || swipedDir === 'UP',
        leftPressed: held.left || swipedDir === 'LEFT',

        downPressed: held.down || swipedDir === 'DOWN',
        rightPressed: held.right || swipedDir === 'RIGHT',
    }

    const meeple = MakeGrid();

    useEffect(() => {
        if (won) {
            if (gemCount + 1 < levels.length) {
                setWon(false);
                setGemCount(gemCount + 1);
                setCoord(levels[gemCount + 1].playerCoord);
                setAgents(levels[gemCount + 1].agents);
                setFire(levels[gemCount + 1].fire);
            } else {
                setBeatIt(true);
                setAgents([]);
            }
        }
    }, [won, gemCount]);

    function resetLevel() {
        if (beatIt) return;
        setDead(false);
        setCoord(levels[gemCount].playerCoord);
        setAgents(levels[gemCount].agents);
        setFire(levels[gemCount].fire);
    }

    const layers = [
        { ...iconLayerConfig, matrix: meeple }
    ];

    if (levels[gemCount].land) {
        layers.push({ ...colorLayerConfig, matrix: levels[gemCount].land })
    }

    return (
        <div className="App" tabIndex={0} onKeyDown={onKeyDownEvent} onKeyUp={onKeyUpEvent} {...handlers} style={{ width: '100vw', outline: 0, overscrollBehavior: 'contain', touchAction: 'none' }}>
            <MobileContainer
                header={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', fontFamily: 'Sigmar', fontSize: '22px', fontWeight: 700, letterSpacing: '2px', padding: '0 40px', height: '45px' }}><div style={{ color: Colors.HotPink }}>Gem Thief</div> <div style={{ display: 'flex', columnGap: '10px', justifyContent: 'center', alignItems: 'center' }}><span><InlineDiamondSVG /></span><span>{beatIt ? gemCount + 1 : gemCount}</span></div></div>
                }
                footer={
                    <div style={{ padding: '0px 40px', paddingTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: "white" }}>
                            <KeyboardControls key={'arrows'} {...buttonPressed}></KeyboardControls>
                            <Button key={'reset'} fnClick={resetLevel} />
                        </div>
                    </div>
                }>
                <div style={{ backgroundColor: '#ffffff11', display: 'flex', width: '100%', height: '100%', minHeight: '300px', justifyContent: 'center', alignItems: 'center', padding: '20px 0' }}>
                    <div style={{ display: 'flex', columnGap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <LayeredGrid config={levels[gemCount].gridConfig} layers={layers}></LayeredGrid>
                        </div>
                    </div>
                </div>
            </MobileContainer>
            {/* <div style={{ position: 'absolute', top: '50%', left: '40%', width: '240px', backgroundColor: '#ffffff88', padding: '10px' }}>With no more gems to thieve, <b>Gem Thief</b> faded into the wind.</div> */}
        </div>
    );
}

function MobileContainer({ header, children, footer }: any) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
            <div style={{ width: '100%', maxWidth: '600px', height: '50px' }}>
                {header}
            </div>
            <div style={{ width: '100%', height: '100%' }}>
                {children}
            </div>
            <div style={{ width: '100%', maxWidth: '600px', height: '60px' }}>
                {footer}
            </div>
        </div>
    );
}

function Button({ fnClick }: any) {
    return <button className="btn" style={{
        border: '0px solid #00000066',
        borderRadius: '5px',
        height: 'fit-content',
        width: 'fit-content',
        padding: '6px 2px',
        boxShadow: '2px 2px 4px #00000044',
        cursor: 'pointer'
    }} onClick={fnClick}>
        <span style={{
            fontSize: '20px',
            fontFamily: 'Shrikhand',
            letterSpacing: '1px',
            padding: '2px 12px',
            border: '2px solid #000000ff',
            borderRadius: '4px',
        }}>Reset</span>
    </button>
}

export default Meeple;