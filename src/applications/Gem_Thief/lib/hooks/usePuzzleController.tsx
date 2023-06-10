import { useState } from "react";
import { Matrix } from "../../../../lib/utils/MatrixUtil";
import { GemLevel } from "../../db/levels";
import { Agent, FirePlaybook, PatrolPlaybook, PlayerPlaybook, WatcherPlaybook, deepCopy } from "../Agents";

export type BoardState = {
    levelId: number;
    won: boolean,
    bounds: [number, number],
    // player and computer agents will have different collider objects
    colliders: [number, number][],
    playerCoord: [number, number],
    gemCoord: [number, number],
    steps: number,
    dead: boolean,
    walls?: Matrix,
    cracks?: Matrix,
    fire?: Matrix,
    agents?: any[],
};

function getPlayerColliders(board: BoardState) {
    const colliders: [number, number][] = [];
    // gem
    colliders.push(board.gemCoord);
    // agents
    if (board.agents) {
        colliders.push(...board.agents.map(agent => agent.coord));
    }
    return colliders;
}

function getAgentColliders(board: BoardState) {
    return [board.playerCoord];
}
function getFireColliders(board: BoardState) {
    const colliders: [number, number][] = [board.playerCoord];
    // gem
    colliders.push(board.gemCoord);
    // agents
    if (board.agents) {
        colliders.push(...board.agents.map(agent => agent.coord));
    }
    return colliders;
}

function usePuzzleController(puzzle: GemLevel, playSound: (sound: string) => void) {
    // initialPuzzle
    // puzzleState

    const [puzzleState, setPuzzleState] = useState<BoardState>(
        {
            levelId: 0,
            won: false,
            bounds: puzzle.gridConfig.dimensions,
            colliders: [puzzle.gemCoord],
            playerCoord: [puzzle.playerCoord[0], puzzle.playerCoord[1]],
            gemCoord: [puzzle.gemCoord[0], puzzle.gemCoord[1]],
            steps: 0,
            dead: false,
            walls: puzzle.land,
            cracks: puzzle.cracks,
            fire: puzzle.fire,
            agents: puzzle.agents,
        }
    );

    const updateWithDir = (dir: string) => {
        if (puzzleState.won || puzzleState.dead) return;
        const _boardState = deepCopy<BoardState>(puzzleState);
        _boardState.colliders = getPlayerColliders(_boardState);
        let _puzzleState = PlayerPlaybook.step(_boardState, dir, playSound);
        const steps: any = [
            // Patrol
            () => {
                _puzzleState.colliders = getAgentColliders(_puzzleState);
                _puzzleState.agents?.forEach(agent => {
                    if (agent.type === 'Patrol') {
                        PatrolPlaybook.step(_puzzleState, agent, playSound);
                    }
                    else if (agent.type === 'Watcher') {
                        WatcherPlaybook.step(_puzzleState, agent, playSound);
                    }
                });
            },
            // Watchers
            // Fire
            () => {
                _puzzleState.colliders = getFireColliders(_puzzleState);
                if (_puzzleState.fire) {
                    FirePlaybook.step(_puzzleState, playSound);
                }
            }
        ];

        for (let step of steps) {
            if (_puzzleState.won || _puzzleState.dead) break;
            step();
        }
        setPuzzleState(_puzzleState);
    };

    function resetPuzzle() {
        const modified = { ...puzzleState };
        if (modified.won) return;
        modified.playerCoord = puzzle.playerCoord;
        modified.agents = [...puzzle.agents];
        modified.fire = puzzle.fire;
        modified.walls = puzzle.land;
        modified.cracks = puzzle.cracks;
        modified.dead = false;
        playSound('resetPuzzle');
        setPuzzleState(modified);
    }

    return { puzzleState, updateWithDir, resetPuzzle };
}

export default usePuzzleController;