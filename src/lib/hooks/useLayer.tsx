
import { PairType } from "../../components/Grid/types/GridTypes";
import GridUtil from "../utils/GridUtil";


function PersonSVG() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="94" viewBox="0 0 40 94" fill="none">
            <path d="M0 39.123C0 31.497 6.1821 25.3149 13.8081 25.3149H26.1919C33.8179 25.3149 40 31.497 40 39.123V55.9447C40 66.9904 31.0457 75.9446 20 75.9446V75.9446C8.95431 75.9446 0 66.9903 0 55.9446V39.123Z" fill="#FF730E" />
            <ellipse cx="20.0919" cy="12.099" rx="11.9816" ry="12.099" fill="#FF730E" />
            <rect x="9.2168" y="26.6179" width="21.7512" height="67.3822" rx="8" fill="#FF730E" />
        </svg>
    );
}

function useLayer({ layers, config }: any) {

    function RenderAtIndex(
        coord: { x: number, y: number },
        index: number,
    ) {
        const renderLayer = (layer: any, index: number) => {
            if (layer.cells[index] === 0) return undefined;

            const dat = GridUtil(config.width, config.height).GetBorderFromNeighbors(coord, config, layer.cells);

            return (
                <div className='cell-content' key={layer.layerId + index}>
                    <div style={{
                        width: config.cellSize + 'px',
                        height: config.cellSize + 'px',
                        borderStyle: 'solid',
                        borderLeftWidth: layer.innerBorder || dat.Edges.left ? config.borderWidth + 'px' : '0',
                        borderRightWidth: dat.Edges.right ? config.borderWidth + 'px' : '0',
                        borderBottomWidth: dat.Edges.bottom ? config.borderWidth + 'px' : '0',
                        borderTopWidth: layer.innerBorder || dat.Edges.top ? config.borderWidth + 'px' : '0',
                        borderTopLeftRadius: dat.Corners.topLeft ? config.borderRadius + 'px' : '0',
                        borderTopRightRadius: dat.Corners.topRight ? config.borderRadius + 'px' : '0',
                        borderBottomRightRadius: dat.Corners.bottomRight ? config.borderRadius + 'px' : '0',
                        borderBottomLeftRadius: dat.Corners.bottomLeft ? config.borderRadius + 'px' : '0',
                        boxSizing: 'border-box',
                        backgroundColor: layer.backgroundColor,
                        borderColor: layer.borderColor
                    }}>
                        {layer.icon ? <PersonSVG></PersonSVG> : undefined}
                    </div>
                </div>
            );
        }
        return layers.map((layer: any) => (renderLayer(layer, index)));
    }

    return {
        RenderAtIndex
    }
}

export type GridLayerType = {

}


export default useLayer;