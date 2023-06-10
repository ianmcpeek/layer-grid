import GridUtil from "../../../lib/utils/GridUtil";
import { PairType } from "../types/GridTypes";

function PersonSVG() {
    const color = '#464646';
    return (
        <>
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="40" height="94" viewBox="0 0 40 94" fill="none">
                <path d="M0 39.123C0 31.497 6.1821 25.3149 13.8081 25.3149H26.1919C33.8179 25.3149 40 31.497 40 39.123V55.9447C40 66.9904 31.0457 75.9446 20 75.9446V75.9446C8.95431 75.9446 0 66.9903 0 55.9446V39.123Z" fill="#FF730E" />
                <ellipse cx="20.0919" cy="12.099" rx="11.9816" ry="12.099" fill="#FF730E" />
                <rect x="9.2168" y="26.6179" width="21.7512" height="67.3822" rx="8" fill="#FF730E" />
            </svg> */}

            {/* <svg style={{ width: '30%' }} xmlns="http://www.w3.org/2000/svg" width="44" height="107" viewBox="0 0 44 107" fill="none">
            <ellipse cx="22.0919" cy="14.099" rx="11.9816" ry="12.099" fill="#FF5C00" stroke="#B44100" strokeWidth="4" />
            <rect x="9.2168" y="33.6179" width="25.7512" height="71.3822" rx="10" fill="#FF5C00" stroke="#B44100" strokeWidth="4" />
            <path d="M2 43.7273C2 37.2505 7.25048 32 13.7273 32H30.2727C36.7495 32 42 37.2505 42 43.7273V55C42 66.0457 33.0457 75 22 75V75C10.9543 75 2 66.0457 2 55V43.7273Z" fill="#FF5C00" stroke="#B44100" strokeWidth="4" />
            <rect x="11" y="59" width="22" height="31" fill="#FF5C00" />
        </svg> */}



            <svg style={{ width: '30%', position: 'absolute', bottom: '-10px', left: '28px' }} xmlns="http://www.w3.org/2000/svg" width="40" height="100" viewBox="0 0 40 100" fill="none">
                <ellipse cx="20.0919" cy="12.099" rx="11.9816" ry="12.099" fill={color} />
                <rect x="8.2168" y="29.6179" width="23.7512" height="69.3822" rx="9" fill={color} stroke={color} strokeWidth="2" />
                <path d="M0 36.9231C0 31.4427 4.44271 27 9.92308 27H30.0769C35.5573 27 40 31.4427 40 36.9231V50C40 61.0457 31.0457 70 20 70V70C8.95431 70 0 61.0457 0 50V36.9231Z" fill={color} />
                <rect x="9" y="54" width="22" height="31" fill={color} />
            </svg>
        </>
    );
}

function EmptyCell() {
    return (
        <>
            {/* <div style={{
                width: '60px',
                height: '60px',
                borderStyle: 'solid',
                borderWidth: '4px 0px 0px 4px',
                borderRadius: '40px 0px 0px 0px',
                boxSizing: 'border-box',
                marginLeft: '-6px',
                marginTop: '-6px',
                borderColor: 'rgba(255, 255, 34, 0.533)'
            }}></div> */}
        </>
    );
}

export function useGridLayers({ layers, config }: any) {

    function RenderCellAtPoint(
        key: string,
        point: PairType
    ) {
        const renderLayer = (layer: any) => {
            const gridUtil = GridUtil(config.dimensions[0], config.dimensions[1]);
            const dat = gridUtil.GetBorderFromNeighbor(point, config.dimensions, layer.cells);

            const falsyValue = !layer.cells[point[0]][point[1]];
            const val = layer.cells[point[0]][point[1]];

            const style = {
                width: (config.cellWidth || config.cellLength) + 'px',
                height: (config.cellHeight || config.cellLength) + 'px',
                boxSizing: 'border-box',
            };

            const TruthyCellStyle = {
                ...style,
                borderStyle: 'solid',
                borderLeftWidth: layer.innerBorder || dat.Edges.left ? config.border.width + 'px' : '0',
                borderRightWidth: dat.Edges.right ? config.border.width + 'px' : '0',
                borderBottomWidth: dat.Edges.bottom ? config.border.width + 'px' : '0',
                borderTopWidth: layer.innerBorder || dat.Edges.top ? config.border.width + 'px' : '0',
                borderTopLeftRadius: dat.Corners.topLeft ? config.border.radius + 'px' : '0',
                borderTopRightRadius: dat.Corners.topRight ? config.border.radius + 'px' : '0',
                borderBottomRightRadius: dat.Corners.bottomRight ? config.border.radius + 'px' : '0',
                borderBottomLeftRadius: dat.Corners.bottomLeft ? config.border.radius + 'px' : '0',
                backgroundColor: layer.backgroundColor,
                borderColor: layer.borderColor
            }

            const theStyle = falsyValue || layer.type === 'number' ? style : TruthyCellStyle;

            return (
                <div className='cell-content' key={`${layer.layerId}-${point[0]}-${point[1]}`}>
                    <div style={{ ...theStyle, boxSizing: 'border-box' }}>
                        {layer.type === 'number' ?
                            <span className="layer-num">{val}</span> :
                            (layer.icon ? <PersonSVG></PersonSVG> : undefined)
                        }
                    </div>
                </div>
            );
        }
        return <>
            {
                layers.map((layer: any, index: number) => {
                    return <div
                        key={key + index}
                        style={{
                            // transform: `translate(-${60 * index}px, -${60 * index}px)`
                        }}>
                        {renderLayer(layer)}
                    </div>
                })

            }
            {/* {
                <div style={{
                    transform: `translate(-${80}px, -${80}px)`
                }}>{layers.map(renderLayer)}</div>
            } */}
        </>;
    }

    return {
        RenderCellAtPoint
    }
}