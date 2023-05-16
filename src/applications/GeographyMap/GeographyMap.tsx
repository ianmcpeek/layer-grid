import { useCallback, useEffect, useState } from "react";
import Grid from "../../components/Grid";

function GeographyMap() {
    const [config, setConfig] = useState({
        // expects width/height to be equal
        // may need to be changed in future
        width: 10,
        height: 10,
        cellSize: 15,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffffff22'
    });
    const [viewportConfig, setViewportConfig] = useState({
        // expects width/height to be equal
        // may need to be changed in future
        width: 5,
        height: 5,
        cellSize: 120,
        borderRadius: 40,
        borderWidth: 8,
        borderColor: '#ffffff22'
    });
    const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 });

    const [layers, setLayers] = useState([
        {
            layerId: 'land',
            borderColor: '#F17D16',
            backgroundColor: '#CEA27488',
            innerBorder: false,
            // borderColor: '#0EA66F',
            // backgroundColor: '#74CEAE22',
            cells: [
                0, 1, 0, 0, 0, 0, 1, 1, 1, 0,
                0, 0, 0, 0, 0, 0, 1, 0, 1, 0,
                1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
                0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
                0, 0, 1, 0, 0, 0, 1, 1, 1, 1,
                0, 1, 1, 0, 0, 0, 0, 0, 1, 1,
                0, 0, 0, 0, 1, 1, 0, 0, 0, 1,
                1, 0, 0, 0, 0, 1, 1, 0, 0, 0,
                1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
                1, 1, 1, 0, 0, 0, 1, 1, 0, 0,
            ]
        },
        {
            layerId: 'selected',
            borderColor: '#11d60b',
            backgroundColor: '#afff4d44',
            innerBorder: false,
            // borderColor: '#0EA66F',
            // backgroundColor: '#74CEAE22',
            cells: makeSquareWithin(viewportOffset, { x: viewportConfig.width, y: viewportConfig.height }, { x: config.width, y: config.height })
        },
    ]);


    const getSelectionFrom = useCallback((cells: any[], viewportOffset: { x: number, y: number }) => {
        const convertToRows = (arr: any[]) => {
            const from = [...arr];
            let rows: any[] = [];
            while (from.length > 0) {
                rows.push(from.splice(0, config.width));
            }
            return rows;
        }

        const rows = convertToRows(cells);


        const selection = [];

        for (let i = viewportOffset.x; i < viewportConfig.width + viewportOffset.x; i++) {
            for (let j = viewportOffset.y; j < viewportConfig.height + viewportOffset.y; j++) {
                selection.push(rows[i][j]);
            }
        }

        return selection;

    }, [viewportConfig, viewportOffset, config]);

    const [viewLayer, setViewLayer] = useState(
        {
            layerId: 'view',
            borderColor: '#F17D16',
            backgroundColor: '#CEA27488',
            innerBorder: false,
            // borderColor: '#0EA66F',
            // backgroundColor: '#74CEAE22',
            cells: getSelectionFrom(layers[0].cells, viewportOffset)
        },
    );

    function keyEvent(event: any) {
        console.log('keyvent', event);

        const { code } = event;
        console.log('code', code);
        const directionCodes: any = {
            'ArrowRight': 'RIGHT',
            'ArrowLeft': 'LEFT',
            'ArrowUp': 'UP',
            'ArrowDown': 'DOWN',
        };
        makeMove({ x: config.width, y: config.height }, directionCodes[code]);
    }



    function makeSquareWithin(pos: { x: number, y: number }, size: { x: number, y: number }, containerSize: { x: number, y: number }) {
        const cells = [];
        for (let i = 0; i < containerSize.x; i++) {
            for (let j = 0; j < containerSize.y; j++) {
                cells.push((i >= pos.x && i < pos.x + size.x && j >= pos.y && j < pos.y + size.y) ? 1 : 0);
            }
        }
        return cells;
    }

    function makeMove(bounds: { x: number, y: number }, dir: 'LEFT' | 'UP' | 'DOWN' | 'RIGHT') {
        // check bounds
        // will offset still be within config dim after moving
        const move = { x: viewportOffset.x, y: viewportOffset.y };
        if (dir === 'LEFT') move.y--;
        if (dir === 'RIGHT') move.y++;
        if (dir === 'DOWN') move.x++;
        if (dir === 'UP') move.x--;

        // check bounds
        if (move.x < 0 || move.y < 0) return;
        if (move.x + viewportConfig.width > bounds.x) return;
        if (move.y + viewportConfig.height > bounds.y) return;

        console.log('making move', move);


        setViewportOffset(move);
        setViewLayer({
            ...viewLayer,
            cells: getSelectionFrom(layers[0].cells, move)
        });

        const prevLayers = layers;
        prevLayers[1].cells = makeSquareWithin(move, { x: viewportConfig.width, y: viewportConfig.height }, { x: config.width, y: config.height });
        setLayers([...prevLayers]);
    }

    return (
        <div className="App" tabIndex={0} onKeyDown={keyEvent}>
            <div className='map-container'>

                <div className="layout row">

                    <div className="col">
                        <Grid config={viewportConfig} layers={[viewLayer]}></Grid>
                    </div>
                    <div className="col">
                        <Grid config={config} layers={layers}></Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeographyMap;