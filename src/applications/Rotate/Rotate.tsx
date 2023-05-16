import { LayerGrid } from "../../components/Grid/LayerGrid";
import { LayerThemes } from "../../lib/utils/ColorUtil";

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

// const props: any = {
//     config: configs[0],
//     layers: [
//         // {
//         //     layerId: 'foo',
//         //     backgroundColor: '#FF000022',
//         //     borderColor: '#FFFF2288',
//         //     innerBorder: false,
//         //     cells: [
//         //         [1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1],
//         //         [1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
//         //         [1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0],
//         //     ]
//         // },
//         // {
//         //     layerId: 'foo1',
//         //     backgroundColor: '#FF00FF22',
//         //     borderColor: '#11FF2288',
//         //     innerBorder: false,
//         //     cells: [
//         //         [0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
//         //         [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1],
//         //         [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
//         //     ]
//         // }
//     ]
// };

function Rotate() {

    return (
        <div className="App">
            <div className='grid-container'>
                <LayerGrid classes="rotator" config={configs[0]} layers={layerPacks[0].layers}></LayerGrid>

            </div>
        </div>
    );
}

export default Rotate;
