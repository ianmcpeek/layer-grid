import { useEffect, useState } from "react";
import GridUtil from "../../lib/utils/GridUtil";
import { BaseGridPropsType, GridType } from "./types/GridTypes";

const getBorderedCell = (key: string, cell: any, config: any, inflateCell?: any) => {
    return (
        <div
            key={JSON.stringify(cell.point)}
            style={{
                position: 'relative',
                borderColor: config.border.color,
                borderStyle: 'solid',
                width: (config.cellWidth || config.cellLength) + 'px',
                height: (config.cellHeight || config.cellLength) + 'px',
                borderTopWidth: cell.Edges.top ? config.border.width + 'px' : '0px',
                borderRightWidth: cell.Edges.right ? config.border.width + 'px' : '0px',
                borderLeftWidth: cell.Edges.left ? config.border.width + 'px' : '0px',
                borderBottomWidth: cell.Edges.bottom ? config.border.width + 'px' : '0px',
                borderTopLeftRadius: cell.Corners.topLeft ? config.border.radius + 'px' : '',
                borderTopRightRadius: cell.Corners.topRight ? config.border.radius + 'px' : '',
                borderBottomRightRadius: cell.Corners.bottomRight ? config.border.radius + 'px' : '',
                borderBottomLeftRadius: cell.Corners.bottomLeft ? config.border.radius + 'px' : '',
                boxSizing: 'border-box'
            }}
        >
            {inflateCell?.(key + JSON.stringify(cell.point), cell)}
        </div>
    );
}

const GridBorder = ({ classes, config, children }: any) => {
    return (
        // containing div to force display: block and prevent grid being stretched
        <div style={{ display: 'flex' }}>
            <div className={"grid " + classes} style={
                {
                    gridTemplateColumns: '1fr '.repeat(config.dimensions[0]),
                    backgroundColor: config.bgColor,
                    borderColor: config.frame?.border.color,
                    borderWidth: (config.frame?.border.width || 0) + 'px',
                    borderRadius: config.frame?.border.radius,
                    borderStyle: config.frame?.border.style || 'solid',
                    padding: config.frame?.padding + 'px'
                }
            }>
                {children}
            </div>
        </div>
    );
};

export function BaseGrid({ classes, config, inflateCell }: BaseGridPropsType) {
    const [grid, setGrid] = useState<GridType>({
        width: 0,
        height: 0,
        cells: []
    });

    const gridUtil = GridUtil(...config.dimensions);

    useEffect(() => {
        setGrid(gridUtil.GetGrid());
    }, [config]);

    return (
        <GridBorder classes={classes} config={config}>
            {grid.cells.map((row, i) => row.map((cell, ii) =>
                getBorderedCell(`${i}-${ii}`, cell, config, inflateCell)))}
        </GridBorder>
    );
}