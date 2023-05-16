import { GridType, PairType } from "../../components/Grid/types/GridTypes";


function GridUtil(width: number, height: number) {

    const topLeftCorner = (i: number, j: number) => {
        return i === 0 && j === 0;
    };
    const topRightCorner = (i: number, j: number) => {
        return i === 0 && j + 1 === width;
    };
    const bottomLeftCorner = (i: number, j: number) => {
        return i + 1 === height && j === 0;
    };
    const bottomRightCorner = (i: number, j: number) => {
        return i + 1 === height && j + 1 === width;
    };
    const rightEdge = (i: number, j: number) => {
        return j + 1 === width;
    };
    const bottomEdge = (i: number, j: number) => {
        return i + 1 === height;
    };

    function MakeRectangle() {
        const cells: any[] = [];

        const Corners = (i: number, j: number) => {
            return {
                topLeft: topLeftCorner(i, j),
                topRight: topRightCorner(i, j),
                bottomLeft: bottomLeftCorner(i, j),
                bottomRight: bottomRightCorner(i, j)
            };
        };

        const Edges = (i: number, j: number) => {
            return {
                top: true,
                bottom: bottomEdge(i, j),
                left: true,
                right: rightEdge(i, j)
            };
        };

        if (width < 1) {
            throw new Error('width must be at least 1');
        }

        if (height < 1) {
            throw new Error('height must be at least 1');
        }

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                cells.push({ Corners: Corners(x, y), Edges: Edges(x, y), index: { x, y } });
            }
        }

        return cells;
    }

    type CellBorderType = {
        index: PairType;
        corners: {
            bottom: boolean;
            top: boolean;
            left: boolean;
            right: boolean;
        };
        edges: {
            bottom: boolean;
            top: boolean;
            left: boolean;
            right: boolean;
        };
    };

    function GetGrid(): GridType {
        const rows: any[][] = [];

        const Corners = (i: number, j: number) => {
            return {
                topLeft: topLeftCorner(i, j),
                topRight: topRightCorner(i, j),
                bottomLeft: bottomLeftCorner(i, j),
                bottomRight: bottomRightCorner(i, j)
            };
        };

        const Edges = (i: number, j: number) => {
            return {
                top: true,
                bottom: bottomEdge(i, j),
                left: true,
                right: rightEdge(i, j)
            };
        };

        if (width < 1) {
            throw new Error('width must be at least 1');
        }

        if (height < 1) {
            throw new Error('height must be at least 1');
        }

        for (let x = 0; x < height; x++) {
            const row = [];
            for (let y = 0; y < width; y++) {
                row.push({ Corners: Corners(x, y), Edges: Edges(x, y), point: [x, y] });
            }
            rows.push(row);
        }

        return {
            width,
            height,
            cells: rows
        };
    }

    function GetBorderFromNeighbors(index: { x: number, y: number }, config: { width: number, height: number }, neighbors: any[]) {
        const Edges = {
            top: false,
            left: false,
            bottom: false,
            right: false
        };
        // top
        const top = (index.x - 1) * config.width + index.y;
        Edges.top = index.x === 0 || (top < (config.width * config.height) && top >= 0 && neighbors[top] === 0);
        // left
        const left = (index.x) * config.width + (index.y - 1);
        Edges.left = index.y === 0 || (left < (config.width * config.height) && left >= 0 && neighbors[left] === 0);
        // right
        const right = (index.x) * config.width + (index.y + 1);
        Edges.right = index.y + 1 === config.width || (right < (config.width * config.height) && right >= 0 && neighbors[right] === 0);
        // bottom
        const bottom = (index.x + 1) * config.width + index.y;
        Edges.bottom = index.x + 1 === config.height || (bottom < (config.width * config.height) && bottom >= 0 && neighbors[bottom] === 0);

        const Corners = {
            bottomLeft: Edges.bottom && Edges.left,
            topLeft: Edges.top && Edges.left,
            bottomRight: Edges.bottom && Edges.right,
            topRight: Edges.top && Edges.right,
        };
        return { index, Edges, Corners };
    }
    function GetBorderFromNeighbor(point: PairType, bounds: PairType, neighbors: any[][]) {
        const Edges = {
            top: false,
            left: false,
            bottom: false,
            right: false
        };
        // top
        const top = [point[0] - 1, point[1]];
        Edges.top = point[0] === 0 || (top[0] >= 0 && neighbors[top[0]][top[1]] === 0);
        // left
        const left = [point[0], point[1] - 1];
        Edges.left = point[1] === 0 || (left[1] >= 0 && neighbors[left[0]][left[1]] === 0);
        // // right
        const right = [point[0], point[1] + 1];
        Edges.right = right[1] === bounds[0] || (right[1] < bounds[0] && neighbors[right[0]][right[1]] === 0);
        // // bottom
        const bottom = [point[0] + 1, point[1]];
        Edges.bottom = bottom[0] === bounds[1] || (bottom[0] < bounds[1] && neighbors[bottom[0]][bottom[1]] === 0);

        const Corners = {
            bottomLeft: Edges.bottom && Edges.left,
            topLeft: Edges.top && Edges.left,
            bottomRight: Edges.bottom && Edges.right,
            topRight: Edges.top && Edges.right,
        };
        return { point, Edges, Corners };
    }

    function ValueAtIndex(config: any, values: any[], index: any) {
        const inBounds = (x: number, y: number) => {
            return x >= 0 && x < config.width &&
                y >= 0 && y < config.height;
        };

        const { x, y } = index;

        const count = [
            { x, y: y + 1 },
            { x, y: y - 1 },
            { x: x + 1, y },
            { x: x - 1, y },
            { x: x - 1, y: y + 1 },
            { x: x - 1, y: y - 1 },
            { x: x + 1, y: y - 1 },
            { x: x + 1, y: y + 1 },
        ].filter(val => inBounds(val.x, val.y) && values[val.x * config.width + val.y] === 1).length;


        return (count > 1 && count < 5) ? 1 : 0;
    }

    function GetValueFromNeighbors(index: { x: number, y: number }, config: { width: number, height: number }, neighbors: any[]) {
        const Neighbors = {
            top: false,
            left: false,
            bottom: false,
            right: false,
            bottomLeft: false,
            topLeft: false,
            bottomRight: false,
            topRight: false,
        };
        let count = 0;
        // top
        const top = (index.x - 1) * config.width + index.y;
        Neighbors.top = (index.x !== 0 && (top < (config.width * config.height) && top >= 0 && neighbors[top] === 1));
        count += Neighbors.top ? 1 : 0;
        // left
        const left = (index.x) * config.width + (index.y - 1);
        Neighbors.left = (index.y !== 0 && (left < (config.width * config.height) && left >= 0 && neighbors[left] === 1));
        count += Neighbors.left ? 1 : 0;
        // right
        const right = (index.x) * config.width + (index.y + 1);
        Neighbors.right = (index.y + 1 !== config.width && (right < (config.width * config.height) && right >= 0 && neighbors[right] === 1));
        count += Neighbors.right ? 1 : 0;
        // bottom
        const bottom = (index.x + 1) * config.width + index.y;
        Neighbors.bottom = (index.x + 1 !== config.width && (bottom < (config.width * config.height) && bottom >= 0 && neighbors[bottom] === 1));
        count += Neighbors.bottom ? 1 : 0;



        return (Neighbors.top || Neighbors.left) ? 1 : 0;
    }

    return {
        MakeRectangle,
        GetGrid,
        GetBorderFromNeighbors,
        GetValueFromNeighbors,
        GetBorderFromNeighbor,
        ValueAtIndex
    };
}

export default GridUtil;