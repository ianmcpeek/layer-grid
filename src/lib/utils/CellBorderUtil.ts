import { Matrix } from "./MatrixUtil";

export default class CellBorderUtil {

    static GetBorderFromNeighbors(point: [number, number], matrix: Matrix) {
        const bounds = matrix.dimensions;
        const neighbors = matrix.rows;

        const Edges: any = {
            top: false,
            left: false,
            bottom: false,
            right: false
        };


        const offset: any = {
            'top': [-1, 0],
            'bottom': [1, 0],
            'left': [0, -1],
            'right': [0, 1],
        };

        const inBounds = (i: number, j: number) => (i >= 0 && i < bounds[0] && j >= 0 && j < bounds[1]);

        ['top', 'bottom', 'left', 'right'].forEach(dir => {
            const p = [point[0] + offset[dir][0], point[1] + offset[dir][1]];
            Edges[dir] = (!inBounds(p[0], p[1]) || neighbors[p[0]][p[1]] === 0);
        });

        const Corners = {
            bottomLeft: Edges.bottom && Edges.left,
            topLeft: Edges.top && Edges.left,
            bottomRight: Edges.bottom && Edges.right,
            topRight: Edges.top && Edges.right,
        };
        return { point, Edges, Corners };
    }
}