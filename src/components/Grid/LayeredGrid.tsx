
import { useEffect, useState } from "react";
import CellBorderUtil from "../../lib/utils/CellBorderUtil";
import { Matrix, MatrixUtil } from "../../lib/utils/MatrixUtil";
import { BoatSVG, Crack1SVG, Crack2SVG, DiamondSVG, EyeSVG, FireSVG, ForestSVG, FrogmanSVG, MeepleSVG, PatrolSVG, SkullSVG, WatcherSVG } from "./SVGIcons";

export type BorderStyles = {
    color: string;
    // combined with color for full hex value
    opacity: string;
    radius: number;
    width: number;
    style?: string;
}

export type LayeredGridBaseConfiguration = {
    dimensions: [number, number];
    cellLength: number;
    cellWidth?: number;
    showCoord?: boolean;
    cellHeight?: number;
    border: BorderStyles;
    rotated?: boolean;
    frame?: {
        padding: number;
        border: BorderStyles;
    };

};

export type LayerConfiguration = {
    id: string;
    matrix: Matrix;
    type: 'Color' | 'Icon' | 'Number';
};

export interface ColorLayerConfiguration extends LayerConfiguration {
    border: BorderStyles;
    innerBorder: boolean;
    backgroundColor: string;
};

export interface IconLayerConfiguration extends LayerConfiguration {
    icons: any;
    // sizing
    // offset from center
};

export type LayeredGridPropsType = {
    layers: (ColorLayerConfiguration | IconLayerConfiguration)[];
    config: LayeredGridBaseConfiguration;
};

export function LayeredGrid({ config, layers }: LayeredGridPropsType) {
    const [grid, setGrid] = useState<Matrix>({
        dimensions: [0, 0],
        rows: []
    });

    useEffect(() => {
        setGrid(MatrixUtil.of(config.dimensions, 1));
    }, [config]);

    return (
        <div style={{ position: 'relative' }}>
            {/* create border from config */}
            {/* create base layer */}
            <GridBorder config={config} />
            <BaseLayer config={config} grid={grid} />
            {/* create n layers passed in */}
            {
                layers.map((layer, i) => {
                    if (layer.type === 'Icon') {
                        return (
                            <IconLayer key={`${layer.id}-${i}`} config={config} layer={layer as IconLayerConfiguration}></IconLayer>
                        );
                    }
                    return (<>
                        <ColorLayer key={`${layer.id}-${i}-color`} config={config} layer={layer as ColorLayerConfiguration} offset={i + 1}></ColorLayer>
                        <BorderLayer key={`${layer.id}-${i}-border`} config={config} layer={layer as ColorLayerConfiguration} offset={i + 1}></BorderLayer>
                    </>);
                })
            }
        </div>
    );
}

// Grid Border

const GridBorder = ({ config }: { config: LayeredGridBaseConfiguration }) => {
    const { cellLength, dimensions, frame } = config;
    return (
        // containing div to force display: block and prevent grid being stretched
        <div style={{ display: 'flex' }}>
            <div style={
                {
                    // this border is no longer wrapping an element so it needs to calculate width
                    width: `${cellLength * dimensions[1]}px`,
                    height: `${cellLength * dimensions[0]}px`,
                    // backgroundColor: config.bgColor,
                    borderColor: (frame?.border.color + (frame?.border.opacity || '')) || 'transparent',
                    borderWidth: `${frame?.border.width || 0}px`,
                    borderRadius: `${frame?.border.radius}px`,
                    borderStyle: config.frame?.border.style || 'solid',
                    padding: `${config.frame ? config.frame.padding : 0}px`,
                    transform: config.rotated ? 'rotateX(60deg) rotateZ(45deg)' : undefined
                }
            }>
            </div>
        </div>
    );
};

// Layer types

// - BASE
/**
 * Special type of color layer
 * 
 * contains Grid Frame + Border + gridlines + Rotation
 */
function BaseLayer({ config, grid }: { config: LayeredGridBaseConfiguration, grid: Matrix }) {
    return (
        <div style={{
            position: 'absolute',
            top: config.rotated ? (config.frame ? Math.round(config.frame.padding / 2 - (config.border.width)) : 0) : '0',
            left: config.rotated ? (config.frame ? Math.round(config.frame.padding / 2 + (config.border.width * 4)) : 0) : '0',
            display: 'grid',
            overflow: 'visible',
            opacity: config.border.opacity,
            gridTemplateColumns: `repeat(${grid.dimensions[1]}, ${config.cellLength}px)`,
            gridTemplateRows: `repeat(${grid.dimensions[0]}, ${config.cellLength}px)`,
            transform: config.rotated ? 'rotateX(60deg) rotateZ(45deg)' : undefined
        }}>
            {
                grid.rows.map((row: any[], i: number) => {
                    return row.map((cell: any, j: number) => renderBaseBorderedCell(config, [i, j], grid))
                })
            }
        </div>
    );
}


function renderBaseBorderedCell(config: LayeredGridBaseConfiguration, p: [number, number], matrix: Matrix) {
    const border = CellBorderUtil.GetBorderFromNeighbors(p, matrix);

    const showBorder = !!matrix.rows[p[0]][p[1]];
    const style: any = {
        width: (config.cellWidth || config.cellLength) + config.border.width + 'px',
        height: (config.cellHeight || config.cellLength) + config.border.width + 'px',
        boxSizing: 'border-box',
    };

    const innerBorder = true;

    const BorderStyle = {
        ...style,
        borderStyle: config.border.style || 'solid',
        borderLeftWidth: innerBorder || border.Edges.left ? config.border.width + 'px' : '0',
        borderRightWidth: border.Edges.right ? config.border.width + 'px' : '0',
        borderBottomWidth: border.Edges.bottom ? config.border.width + 'px' : '0',
        borderTopWidth: innerBorder || border.Edges.top ? config.border.width + 'px' : '0',
        borderTopLeftRadius: border.Corners.topLeft ? config.border.radius + 'px' : '0',
        borderTopRightRadius: border.Corners.topRight ? config.border.radius + 'px' : '0',
        borderBottomRightRadius: border.Corners.bottomRight ? config.border.radius + 'px' : '0',
        borderBottomLeftRadius: border.Corners.bottomLeft ? config.border.radius + 'px' : '0',
        // backgroundColor: layer.backgroundColor,
        borderColor: config.border.color
    }

    return (
        <div style={{ position: 'relative', ...style }} key={`${JSON.stringify(p)}`}>
            <div style={
                {
                    position: 'absolute',
                    left: `${config.frame ? config.frame.padding + Math.round(config.frame.border.width / 2) : 0}px`,
                    top: `${config.frame ? config.frame.padding + Math.round(config.frame.border.width / 2) : 0}px`,
                    ...(showBorder ? BorderStyle : style),
                }
            }>
                {
                    config.showCoord &&
                    <span style={{ color: '#ffffff', fontSize: '24px', textAlign: 'center', display: 'block', marginTop: '20px', fontFamily: 'Eczar' }}>{JSON.stringify(p)}</span>
                }
            </div>
        </div>
    );
}

function ColorLayer({ config, layer, offset }: { config: LayeredGridBaseConfiguration, layer: ColorLayerConfiguration, offset: number }) {
    return (
        <div style={{
            position: 'absolute',
            left: `${config.frame ? config.frame.padding + Math.round(config.frame.border.width) : 0}px`,
            top: `${config.frame ? config.frame.padding + Math.round(config.frame.border.width) : 0}px`,
            display: 'grid',
            overflow: 'visible',
            gridTemplateColumns: `repeat(${config.dimensions[1]}, ${config.cellLength}px)`,
            gridTemplateRows: `repeat(${config.dimensions[0]}, ${config.cellLength}px)`,
            transform: config.rotated ? `translate(0, ${-40 * offset}px) rotateX(60deg) rotateZ(45deg)` : undefined
        }}>
            {
                layer.matrix.rows.map((row: any[], i: number) => {
                    return row.map((cell: any, j: number) => renderColorCell(config, [i, j], layer))
                })
            }
        </div>
    );
}
function BorderLayer({ config, layer, offset }: { config: LayeredGridBaseConfiguration, layer: ColorLayerConfiguration, offset: number }) {
    return (
        <div style={{
            position: 'absolute',
            left: `${config.frame ? config.frame.padding + Math.round(config.frame.border.width / 2) : 0}px`,
            top: `${config.frame ? config.frame.padding + Math.round(config.frame.border.width / 2) : 0}px`,
            display: 'grid',
            overflow: 'visible',
            opacity: layer.border.opacity,
            gridTemplateColumns: `repeat(${config.dimensions[1]}, ${config.cellLength}px)`,
            gridTemplateRows: `repeat(${config.dimensions[0]}, ${config.cellLength}px)`,
            transform: config.rotated ? `translate(0, ${-40 * offset}px) rotateX(60deg) rotateZ(45deg)` : undefined
        }}>
            {
                layer.matrix.rows.map((row: any[], i: number) => {
                    return row.map((cell: any, j: number) => renderBorderedCell(config, [i, j], layer))
                })
            }
        </div>
    );
}

function IconLayer({ config, layer }: { config: LayeredGridBaseConfiguration, layer: IconLayerConfiguration }) {
    return (
        <div style={{
            position: 'absolute',
            left: `${config.frame ? config.frame.padding + Math.round(config.frame.border.width / 2) : 0}px`,
            top: `${config.frame ? config.frame.padding + Math.round(config.frame.border.width / 2) : 0}px`,
            gridTemplateColumns: `repeat(${config.dimensions[1]}, ${config.cellLength}px)`,
            gridTemplateRows: `repeat(${config.dimensions[0]}, ${config.cellLength}px)`,
            display: 'grid',
        }}> {
                layer.matrix.rows.map((row: any[], i: number) => {
                    return row.map((cell: any, j: number) => renderIconCell(config, [i, j], layer))
                })
            }
        </div>
    );
}

const icons: any = {
    '1': <MeepleSVG color={'#FF005C'} />,
    '2': <DiamondSVG />,
    '3': <ForestSVG />,
    '4': <FrogmanSVG />,
    '5': <BoatSVG />,
    '6': <PatrolSVG />,
    '7': <SkullSVG />,
    '8': <FireSVG />,
    // active
    '9': <WatcherSVG color={'#AD0D16'} />,
    // passive
    '10': <WatcherSVG color={'#F3FF63'} />,
    '11': <EyeSVG />,
    '12': <EyeSVG coloor={'red'} />,
    '13': <Crack1SVG />,
    '14': <Crack2SVG />,
}

function renderIconCell(config: LayeredGridBaseConfiguration, p: [number, number], layer: IconLayerConfiguration) {
    const style: any = {
        width: (config.cellWidth || config.cellLength) + 'px',
        height: (config.cellHeight || config.cellLength) + 'px',
        boxSizing: 'border-box',
    };
    return (
        <div style={{ position: 'relative', ...style }} key={`${JSON.stringify(p)}`}>
            <div style={
                {
                    width: (config.cellWidth || config.cellLength + config.border.width) + 'px',
                    height: (config.cellHeight || config.cellLength + config.border.width) + 'px',
                    position: 'absolute',
                    left: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }
            }>
                {!!layer.matrix.rows[p[0]][p[1]] ? (
                    icons[layer.matrix.rows[p[0]][p[1]]]
                ) : undefined
                }
            </div>
        </div>
    );
}

function renderBorderedCell(config: LayeredGridBaseConfiguration, p: [number, number], layer: ColorLayerConfiguration) {
    const border = CellBorderUtil.GetBorderFromNeighbors(p, layer.matrix);

    const showBorder = !!layer.matrix.rows[p[0]][p[1]];
    const style: any = {
        width: (config.cellWidth || config.cellLength) + layer.border.width + 'px',
        height: (config.cellHeight || config.cellLength) + layer.border.width + 'px',
        boxSizing: 'border-box',
    };

    const BorderStyle = {
        ...style,
        borderStyle: 'solid',
        borderLeftWidth: layer.innerBorder || border.Edges.left ? layer.border.width + 'px' : '0',
        borderRightWidth: border.Edges.right ? layer.border.width + 'px' : '0',
        borderBottomWidth: border.Edges.bottom ? layer.border.width + 'px' : '0',
        borderTopWidth: layer.innerBorder || border.Edges.top ? layer.border.width + 'px' : '0',
        borderTopLeftRadius: border.Corners.topLeft ? layer.border.radius + 'px' : '0',
        borderTopRightRadius: border.Corners.topRight ? layer.border.radius + 'px' : '0',
        borderBottomRightRadius: border.Corners.bottomRight ? layer.border.radius + 'px' : '0',
        borderBottomLeftRadius: border.Corners.bottomLeft ? layer.border.radius + 'px' : '0',
        // backgroundColor: layer.backgroundColor,
        borderColor: layer.border.color
    }

    return (
        <div style={{ position: 'relative', ...style }} key={`${JSON.stringify(p)}`}>
            <div style={
                {
                    position: 'absolute',
                    left: '0px',
                    ...(showBorder ? BorderStyle : style),
                }
            }>
                {/* create element to mirror border */}
                {/* <div style={{ backgroundColor: 'red', width: '76px', height: '76px', borderRadius: '40px' }}></div> */}
            </div>
        </div>
    );
}

function renderColorCell(config: LayeredGridBaseConfiguration, p: [number, number], layer: ColorLayerConfiguration) {
    const border = CellBorderUtil.GetBorderFromNeighbors(p, layer.matrix);

    const showBorder = !!layer.matrix.rows[p[0]][p[1]];
    const style: any = {
        width: (config.cellWidth || config.cellLength) + 'px',
        height: (config.cellHeight || config.cellLength) + 'px',
        borderLeftWidth: border.Edges.left ? layer.border.width + 'px' : '0',
        borderRightWidth: border.Edges.right ? layer.border.width + 'px' : '0',
        borderBottomWidth: border.Edges.bottom ? layer.border.width + 'px' : '0',
        borderTopWidth: border.Edges.top ? layer.border.width + 'px' : '0',
        borderTopLeftRadius: border.Corners.topLeft ? layer.border.radius + 'px' : '0',
        borderTopRightRadius: border.Corners.topRight ? layer.border.radius + 'px' : '0',
        borderBottomRightRadius: border.Corners.bottomRight ? layer.border.radius + 'px' : '0',
        borderBottomLeftRadius: border.Corners.bottomLeft ? layer.border.radius + 'px' : '0',
        boxSizing: 'border-box',
    };

    const BorderStyle = {
        ...style,
        backgroundColor: layer.backgroundColor,
    }

    return (
        <div style={{ position: 'relative', ...style }} key={`${JSON.stringify(p)}`}>
            <div style={
                {
                    position: 'absolute',
                    left: '0px',
                    ...(showBorder ? BorderStyle : style),
                }
            }>
                {/* create element to mirror border */}
                {/* <div style={{ backgroundColor: 'red', width: '76px', height: '76px', borderRadius: '40px' }}></div> */}
            </div>
        </div>
    );
}

// - Number
/**
 * contains Grid Frame + Border + gridlines
 */

// - Color
/**
 * contains Grid Frame + Border + gridlines
 */

// - Icon
/**
 * contains Grid Frame + Border + gridlines
 */