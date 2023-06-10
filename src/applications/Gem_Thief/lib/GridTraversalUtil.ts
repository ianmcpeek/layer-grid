import { Matrix, MatrixUtil } from "../../../lib/utils/MatrixUtil";

export const MoveDirection: { [key: string]: [number, number] } = {
    'UP': [-1, 0],
    'LEFT': [0, -1],
    'DOWN': [1, 0],
    'RIGHT': [0, 1],
}

export const OppositeDirection: { [key: string]: string } = {
    'LEFT': 'RIGHT',
    'RIGHT': 'LEFT',
    'UP': 'DOWN',
    'DOWN': 'UP',
}


class GridTraversalUtil {
    static CoordInDir(coord: [number, number], dir: string): [number, number] {
        if (MoveDirection[dir] === undefined) throw Error(dir + " not a direction");
        return [coord[0] + MoveDirection[dir][0], coord[1] + MoveDirection[dir][1]];
    }

    static ValidMove(bounds: [number, number], coord: [number, number], dir: string) {
        const movedTo = this.CoordInDir(coord, dir);
        const blockedByWall = (walls: Matrix) => (walls.rows[movedTo[0]][movedTo[1]] === 1);

        return {
            coord,
            movedTo,
            dir,
            inBounds: MatrixUtil.inBounds(bounds, movedTo),
            blockedByWall,
            bumpedCrackedWall: (walls: Matrix, cracks: Matrix) => (blockedByWall(walls) && cracks && cracks.rows[movedTo[0]][movedTo[1]] > 0),
            collidedWith: (target: [number, number]) => (movedTo[0] === target[0] && movedTo[1] === target[1])
        }
    }
}

export default GridTraversalUtil;

