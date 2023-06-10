import { MatrixUtil } from "../../../lib/utils/MatrixUtil";
import GridTraversalUtil, { OppositeDirection } from "./GridTraversalUtil";
import { BoardState } from "./hooks/usePuzzleController";

export type Agent = {
    coord: [number, number];
    type: string;
    state: any;
}

interface PatrolAgent extends Agent {
    type: 'Patrol';
    state: {
        dir: string;
    }
};

export interface WatcherAgent {
    coord: [number, number];
    type: 'Watcher';
    state: {
        dir: string;
        watching: [number, number][];
        triggered: [number, number] | undefined;
        origin: [number, number]
    }
};

function MoveInDir(boardState: BoardState, coord: [number, number], dir: string) {
    const { bounds, colliders, walls, cracks } = boardState;
    const move = GridTraversalUtil.ValidMove(bounds, coord, dir);
    const blockedByWall = move.inBounds && walls && move.blockedByWall(walls);
    const bumpedCrackedWall = move.inBounds && walls && cracks && move.bumpedCrackedWall(walls, cracks);
    let collided = false;
    const collidedWith: [number, number][] = [];

    colliders.forEach((collider) => {
        collided = collided || move.collidedWith(collider);
        if (collided) collidedWith.push(collider);
    });

    return {
        validMove: move.inBounds && !blockedByWall && !collided,
        blockedByWall,
        bumpedCrackedWall,
        collided,
        collidedWith,
        movedTo: move.movedTo
    };
}

export const PatrolPlaybook = {
    step: (
        boardState: BoardState,
        agent: any,
        playSound: (sound: string) => void
    ) => {
        const move = MoveInDir(boardState, agent.coord, agent.state.dir);
        if (move.collided) {
            const bumpedPlayer = move.collidedWith.find((collided) => MatrixUtil.equal(collided, boardState.playerCoord)) !== undefined;
            if (bumpedPlayer) {
                boardState.dead = true;
                playSound('death');
            } else {
                // reverse direction
                // if bumped into angry watcher remove
                agent.state.dir = OppositeDirection[agent.state.dir];
            }
        } else if (move.validMove) {
            agent.coord = move.movedTo;
        } else {
            agent.state.dir = OppositeDirection[agent.state.dir];
        }
    }
};

export const WatcherPlaybook = {
    step: (
        boardState: BoardState,
        watcher: any,
        playSound: (sound: string) => void
    ) => {
        const coord = boardState.playerCoord;
        let { triggered } = watcher.state;
        const passive = triggered === undefined;
        // check if triggered coord is updated
        if (watcher.state.watching.find((c: any) => MatrixUtil.equal(coord, c))) {
            playSound('siren');
            triggered = coord;
            if (coord[1] !== watcher.coord[1]) watcher.state.dir = coord[1] < watcher.coord[1] ? 'LEFT' : 'RIGHT';
            else if (coord[0] !== watcher.coord[0]) watcher.state.dir = coord[0] < watcher.coord[0] ? 'UP' : 'DOWN';
        }

        // only happens when first activated
        if (passive && triggered) {
            // change state and pause
        } else if (triggered) {
            // run towards direction
            const move = MoveInDir(boardState, watcher.coord, watcher.state.dir);
            if (move.collided) {
                const bumpedPlayer = move.collidedWith.find((collided) => MatrixUtil.equal(collided, boardState.playerCoord)) !== undefined;
                if (bumpedPlayer) {
                    boardState.dead = true;
                    playSound('death');
                }
            } else if (move.validMove) {
                watcher.coord = move.movedTo;
                if (MatrixUtil.equal(watcher.coord, triggered)) {
                    triggered = undefined;
                    watcher.state.dir = OppositeDirection[watcher.state.dir];
                }
            }
        } else if (passive && !MatrixUtil.equal(watcher.coord, watcher.state.origin)) {
            const move = MoveInDir(boardState, watcher.coord, watcher.state.dir);
            if (move.collided) {

            } else if (move.validMove) {
                watcher.coord = move.movedTo;
                if (MatrixUtil.equal(watcher.coord, watcher.state.origin)) {
                    watcher.state.dir = OppositeDirection[watcher.state.dir];
                }
            }
        }

        watcher.state.triggered = triggered;
    }
};

export const FirePlaybook = {
    step: (
        boardState: BoardState,
        playSound: (sound: string) => void
    ) => {
        if (boardState.fire && boardState.steps % 2 === 1) {

            const prev = boardState.fire;
            const matrix = deepCopy(boardState.fire);
            const walls = boardState.walls;
            const playerCoord = boardState.playerCoord;

            MatrixUtil.iterate(prev, ([i, j], val) => {
                if (val === 0 && (!walls || walls.rows[i][j] === 0)) {
                    // left
                    if (MatrixUtil.inBounds(matrix.dimensions, [i, j - 1]) && prev.rows[i][j - 1] === 1) matrix.rows[i][j] = 1;
                    // right
                    else if (MatrixUtil.inBounds(matrix.dimensions, [i, j + 1]) && prev.rows[i][j + 1] === 1) matrix.rows[i][j] = 1;
                    // up
                    else if (MatrixUtil.inBounds(matrix.dimensions, [i - 1, j]) && prev.rows[i - 1][j] === 1) matrix.rows[i][j] = 1;
                    // down
                    else if (MatrixUtil.inBounds(matrix.dimensions, [i + 1, j]) && prev.rows[i + 1][j] === 1) matrix.rows[i][j] = 1;

                    if (matrix.rows[i][j] === 1) {
                        boardState.colliders.forEach((collider) => {
                            // collided
                            if (i === collider[0] && j === collider[1]) {
                                if (collider[0] === playerCoord[0] && collider[1] === playerCoord[1]) {
                                    // collided with player
                                    boardState.dead = true;
                                    playSound('death');
                                    matrix.rows[i][j] = 0;
                                } else {
                                    // remove collided object
                                }
                            }
                        })
                        if (i === playerCoord[0] && j === playerCoord[1]) {
                        }
                    }
                }
            });

            boardState.fire = matrix;
        }
    }
}

// WatcherPlaybook
// FirePlaybook

export const PlayerPlaybook = {
    step: (
        boardState: BoardState,
        dir: string,
        playSound: (sound: string) => void
    ) => {
        const move = MoveInDir(boardState, boardState.playerCoord, dir);

        const _boardState = deepCopy<BoardState>(boardState);
        _boardState.steps = _boardState.steps + 1;

        if (move.collided) {
            const foundGem = move.collidedWith.find((collided) => MatrixUtil.equal(collided, _boardState.gemCoord)) !== undefined;
            if (foundGem) {
                _boardState.won = true;
                playSound('diamond');
            } else {
                // all other colliders cause player death
            }
        } else if (move.validMove) {
            if (_boardState.fire) {
                if (_boardState.fire.rows[move.movedTo[0]][move.movedTo[1]] === 1) {
                    _boardState.dead = true;
                    playSound('death');
                } else {
                    _boardState.playerCoord = move.movedTo;
                    playSound('walk');
                }
            } else {
                _boardState.playerCoord = move.movedTo;
                playSound('walk');
            }

        } else {
            if (move.blockedByWall) {
                if (move.bumpedCrackedWall) {
                    const hp = bumpCrackInWallboard(_boardState, move.movedTo);
                    (hp > 0) ? playSound('crumble1') : playSound('crumble0');
                } else {
                    playSound('bump');
                }
            }
        }

        return _boardState;
    }
}

function bumpCrackInWallboard(boardState: BoardState, coord: [number, number]) {
    let hp = boardState.cracks?.rows[coord[0]][coord[1]];
    hp -= 1;

    if (hp < 1) {
        // destroy land at coord
        if (boardState.walls) boardState.walls.rows[coord[0]][coord[1]] = 0;
    }
    if (boardState.cracks) boardState.cracks.rows[coord[0]][coord[1]] = hp;

    return hp;
}

export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
}