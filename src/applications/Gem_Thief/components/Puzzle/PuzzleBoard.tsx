import { LayeredGrid } from "../../../../components/Grid/LayeredGrid";
import { MatrixUtil } from "../../../../lib/utils/MatrixUtil";
import { GemLevel } from "../../db/levels";
import { Agent } from "../../lib/Agents";
import { BoardState } from "../../lib/hooks/usePuzzleController";

function PuzzleBoard(props: { boardState: BoardState, puzzle: GemLevel }) {
    const { boardState, puzzle } = props;
    const { playerCoord, gemCoord, dead, won, walls, cracks, agents, fire } = boardState;

    const layers: any[] = [];
    const config = puzzle.gridConfig;

    // Construct layers from boardState
    const iconMatrix = MatrixUtil.of(puzzle.gridConfig.dimensions);
    const crackedMatrix = MatrixUtil.of(puzzle.gridConfig.dimensions);
    const eyeMatrix = MatrixUtil.of(puzzle.gridConfig.dimensions);
    const activeEyeMatrix = MatrixUtil.of(puzzle.gridConfig.dimensions);

    layers.push(
        {
            ...iconLayerConfig,
            matrix: iconMatrix
        }
    );

    // 1. Add player (Dead/Alive)
    iconMatrix.rows[playerCoord[0]][playerCoord[1]] = dead ? 7 : 1;
    // 2. Add Gem (if unsolved)
    if (!won) iconMatrix.rows[gemCoord[0]][gemCoord[1]] = 2;
    // 3. Add Walls
    if (walls) {
        layers.push(
            {
                ...wallLayerConfig,
                matrix: walls
            }
        );
    }
    // 4. Add Cracks
    if (cracks) {
        cracks.rows.forEach((row: any, i: number) => {
            row.forEach((cell: any, j: number) => {
                if (cell === 2) crackedMatrix.rows[i][j] = 14;
                else if (cell === 1) crackedMatrix.rows[i][j] = 13;
            })
        });
        layers.unshift({
            ...iconLayerConfig,
            id: '3',
            matrix: crackedMatrix
        });
    }
    // 5. Add Patrols
    if (agents) {
        agents.forEach((agent: Agent) => {
            const p = agent.coord;
            if (agent.type === 'Patrol') {
                iconMatrix.rows[p[0]][p[1]] = 6;
            } else if (agent.type === 'Watcher') {
                iconMatrix.rows[p[0]][p[1]] = agent.state.triggered ? 9 : 10;
                agent.state.watching.forEach((c: [number, number]) => {
                    eyeMatrix.rows[c[0]][c[1]] = agent.state.triggered && MatrixUtil.equal(c, agent.state.triggered) ? 12 : 11;
                    if (agent.state.triggered && MatrixUtil.equal(c, agent.state.triggered)) activeEyeMatrix.rows[c[0]][c[1]] = 1;
                });
            }
        });
    }
    // 6. Add Watchers
    layers.unshift({
        id: '4',
        type: 'Icon',
        icons: undefined,
        matrix: eyeMatrix
    });

    layers.unshift({
        id: '5',
        type: 'Color',
        border: {
            color: 'transparent',
            width: 0,
            radius: 0,
            opacity: '1'
        },
        innerBorder: true,
        backgroundColor: '#ff000066',
        matrix: activeEyeMatrix
    } as any);
    // 7. Add Fire
    if (fire) {
        fire.rows.forEach((row: any, i: number) => {
            row.forEach((cell: any, j: number) => {
                if (cell === 1) iconMatrix.rows[i][j] = 8;
            })
        });
    }

    return <LayeredGrid config={config} layers={layers} />;
}

const wallLayerConfig: any = {
    id: '1',
    type: 'Color',
    border: {
        color: '#7d5b14',
        width: 4,
        radius: 0,
        opacity: '1'
    },
    innerBorder: true,
    backgroundColor: '#bd8c24'
};

const iconLayerConfig: any = {
    id: '0',
    type: 'Icon',
    icons: undefined,
};

export default PuzzleBoard;