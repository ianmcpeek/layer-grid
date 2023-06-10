import { LayerGrid } from "../../components/Grid/LayerGrid";
import { ColorLayerConfiguration, LayerConfiguration, LayeredGrid, LayeredGridBaseConfiguration } from "../../components/Grid/LayeredGrid";
import { LayerThemes } from "../../lib/utils/ColorUtil";
import { MatrixUtil } from "../../lib/utils/MatrixUtil";

const configs = [
    {
        dimensions: [3, 3],
        cellLength: 80,
        border: {
            radius: 40,
            width: 4,
            color: '#ffffff22'
        },
        frame: {
            padding: 20,
            border: {
                radius: 60,
                width: 4,
                color: '#ffffff22',
                style: 'dashed'
            }
        }
    },

];

const layerPacks = [
    {
        layers: [
            {
                layerId: 'foo',
                ...LayerThemes.Lava,
                innerBorder: false,
                cells: [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                ]
            },
            {
                layerId: 'foo2',
                ...LayerThemes.Lava,
                innerBorder: false,
                cells: [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 0],
                ]
            },
            {
                layerId: 'foo3',
                ...LayerThemes.Lava,
                innerBorder: false,
                cells: [
                    [1, 1, 1],
                    [1, 0, 0],
                    [1, 0, 0],
                ]
            },
            {
                layerId: 'foo4',
                ...LayerThemes.Lava,
                innerBorder: false,
                cells: [
                    [1, 1, 1],
                    [1, 1, 1],
                    [1, 1, 1],
                ]
            },
        ]
    },
    {
        layers: [
            {
                layerId: 'foo5',
                backgroundColor: '#DDDD0022',
                borderColor: '#00FF2288',
                innerBorder: false,
                cells: [
                    [1, 1, 1],
                    [0, 0, 1],
                    [0, 0, 1],
                ]
            }
        ]
    },
];

// great config for cell cursor!

// const layeredConfig: LayeredGridBaseConfiguration = {
//     dimensions: [3, 3],
//     frame: {
//         padding: 10,
//         border: {
//             color: '#ffffff',
//             width: 10,
//             opacity: 'ff',
//             radius: 8,
//             style: 'dashed'
//         }
//     }
// };

const layeredConfig: LayeredGridBaseConfiguration = {
    dimensions: [3, 3],
    cellLength: 80,
    border: {
        color: '#ffffff',
        width: 4,
        opacity: '.2',
        radius: 40,
    },
    frame: {
        padding: 20,
        border: {
            color: '#ffffff',
            width: 4,
            opacity: '22',
            radius: 60,
            style: 'dashed'
        }
    },
};

const iconConfig: LayeredGridBaseConfiguration = {
    dimensions: [3, 3],
    showCoord: true,
    cellLength: 80,
    border: {
        color: '#ffffff',
        width: 4,
        opacity: '.2',
        radius: 40,
    },
    frame: {
        padding: 20,
        border: {
            color: '#ffffff',
            width: 4,
            opacity: '22',
            radius: 60,
            style: 'dashed'
        }
    },
};

const IconLayers: any[] = [
    {
        id: '0',
        matrix: MatrixUtil.from([3, 3], [
            0, 1, 1,
            1, 0, 1,
            1, 0, 1,
        ]),
        type: 'Icon',
        icon: 'person'
    },
];

const rotatedLayers: ColorLayerConfiguration[] = [
    {
        id: '0',
        matrix: MatrixUtil.from([3, 3], [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
        ]),
        type: 'Color',
        border: {
            color: '#FFFF22',
            width: 4,
            radius: 40,
            opacity: '0.53'
        },
        innerBorder: true,
        backgroundColor: '#FF000022'
    },
    {
        id: '1',
        matrix: MatrixUtil.from([3, 3], [
            1, 1, 1,
            1, 1, 1,
            1, 1, 0,
        ]),
        type: 'Color',
        border: {
            color: '#FFFF22',
            width: 4,
            radius: 40,
            opacity: '0.53'
        },
        innerBorder: true,
        backgroundColor: '#FF000022'
    },
    {
        id: '2',
        matrix: MatrixUtil.from([3, 3], [
            1, 1, 1,
            1, 0, 0,
            1, 0, 0,
        ]),
        type: 'Color',
        border: {
            color: '#FFFF22',
            width: 4,
            radius: 40,
            opacity: '0.53'
        },
        innerBorder: true,
        backgroundColor: '#FF000022'
    },
    {
        id: '3',
        matrix: MatrixUtil.from([3, 3], [
            1, 1, 1,
            1, 1, 1,
            1, 1, 1,
        ]),
        type: 'Color',
        border: {
            color: '#FFFF22',
            width: 4,
            radius: 40,
            opacity: '0.53'
        },
        innerBorder: true,
        backgroundColor: '#FF000022'
    },
];

function Rotate() {

    return (
        <div className="App">
            <div style={{ backgroundColor: 'green', padding: '20px 60px' }}>
                <div style={{ display: 'flex', columnGap: '100px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <LayerGrid config={configs[0]} layers={layerPacks[0].layers}></LayerGrid>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <LayerGrid classes="rotator" config={configs[0]} layers={layerPacks[0].layers}></LayerGrid>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <LayeredGrid config={layeredConfig} layers={rotatedLayers}></LayeredGrid>
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <br />
                        <LayeredGrid config={{ ...layeredConfig, rotated: true }} layers={rotatedLayers}></LayeredGrid>

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <LayeredGrid config={iconConfig} layers={IconLayers}></LayeredGrid>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Rotate;
