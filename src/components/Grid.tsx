import { useEffect, useState } from 'react';
import './Grid.css';
import GridUtil from '../lib/utils/GridUtil';
import useLayer from '../lib/hooks/useLayer';

function Grid({ config, layer, layers }: any) {
    if (!layers) layers = [layer];
    const { RenderAtIndex } = useLayer({ config, layers });
    const [cellData, setCellData] = useState<any[]>([]);

    useEffect(() => {
        setCellData(GridUtil(config.width, config.height).MakeRectangle())
    }, [config]);

    return (
        <div className="grid" style={
            {
                gridTemplateColumns: '1fr '.repeat(config.width),
                border: config.borderWidth + 'px solid ' + config.borderColor
            }
        }>
            {cellData.map(cell => {
                return (
                    <div
                        key={JSON.stringify(cell.index)}
                        style={{
                            position: 'relative',
                            borderColor: config.borderColor,
                            borderStyle: 'solid',
                            width: config.cellSize + 'px',
                            height: config.cellSize + 'px',
                            borderTopWidth: cell.Edges.top ? config.borderWidth + 'px' : '0px',
                            borderRightWidth: cell.Edges.right ? config.borderWidth + 'px' : '0px',
                            borderLeftWidth: cell.Edges.left ? config.borderWidth + 'px' : '0px',
                            borderBottomWidth: cell.Edges.bottom ? config.borderWidth + 'px' : '0px',
                            borderTopLeftRadius: cell.Corners.topLeft ? config.borderRadius + 'px' : '',
                            borderTopRightRadius: cell.Corners.topRight ? config.borderRadius + 'px' : '',
                            borderBottomRightRadius: cell.Corners.bottomRight ? config.borderRadius + 'px' : '',
                            borderBottomLeftRadius: cell.Corners.bottomLeft ? config.borderRadius + 'px' : '',
                            boxSizing: 'border-box'
                        }}
                    >
                        {config ? RenderAtIndex(cell.index, cell.index.x * config.width + cell.index.y) : undefined}
                    </div>
                );
            })}
        </div>
    );
}



export default Grid;