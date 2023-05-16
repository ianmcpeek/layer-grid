export type BaseGridPropsType = {
    classes: string;
    inflateCell?: Function;
    config: {
        dimensions: PairType;
        cellLength: number;
        border: {
            radius: number,
            width: number,
            color: string
        };
        frame?: {
            padding: number;
            border: {
                style?: string,
                radius: number,
                width: number,
                color: string
            }
        };
    };
};

export type PairType = [number, number];

export type GridType = {
    width: number;
    height: number;
    cells: any[][];
}