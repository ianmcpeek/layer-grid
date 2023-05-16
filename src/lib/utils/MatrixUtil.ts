export type Matrix = {
    dimensions: Tuple;
    rows: any[][];
}


type SubsetMatrix = {
    matrixDimensions: Tuple;
    dimensions: Tuple;
    rows: any[][];
}

export type Tuple = [number, number];


export const MatrixUtil = {
    from: (dimensions: Tuple, values: any[]): Matrix => {
        const rows = [];
        for (let i = 0; i < dimensions[0]; i++) {
            rows.push(values.slice(i * dimensions[1], i * dimensions[1] + dimensions[1]));
        }

        return {
            dimensions,
            rows
        };
    },
    of: (dimensions: Tuple, value: number = 0): Matrix => {
        const rows = [];
        for (let i = 0; i < dimensions[0]; i++) {
            const row: any[] = [];
            for (let j = 0; j < dimensions[1]; j++) {
                row.push(value);
            }
            rows.push(row);
        }

        return {
            dimensions,
            rows
        };
    },
    // TODO deprecate other of for this one
    ofWithFn: (dimensions: Tuple, fnVal: Function): Matrix => {
        const rows = [];
        for (let i = 0; i < dimensions[0]; i++) {
            const row: any[] = [];
            for (let j = 0; j < dimensions[1]; j++) {
                row.push(fnVal());
            }
            rows.push(row);
        }

        return {
            dimensions,
            rows
        };
    },
    // using points 1 & 2, construct a rectangle from source matrix and translate p1 -> to
    // p2 >= p1 && p2 <= source.dimensions
    translate: (source: Matrix, p1: Tuple, p2: Tuple, displacement: Tuple): Matrix => {
        const rows = source.rows.map(row => ([...row]));

        for (let i = p1[0]; i < p2[0]; i++) {
            for (let j = p1[1]; j < p2[1]; j++) {
                const p: Tuple = [i + displacement[0], j + displacement[1]];
                // displacement is not fully contained within source
                if (p[0] < 0 || p[0] >= source.dimensions[0] ||
                    p[1] < 0 || p[1] >= source.dimensions[1]) continue;
                rows[p[0]][p[1]] = source.rows[i][j];
            }
        }

        return {
            rows,
            dimensions: source.dimensions
        };
    },
    fill: (source: Matrix, p1: Tuple, p2: Tuple, fnVal: Function): Matrix => {
        const rows = source.rows.map(row => ([...row]));

        for (let i = p1[0]; i < p2[0]; i++) {
            for (let j = p1[1]; j < p2[1]; j++) {
                rows[i][j] = fnVal(i, j);
            }
        }

        return {
            rows,
            dimensions: source.dimensions
        };
    },
}