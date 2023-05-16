import { useCallback, useEffect, useState } from 'react';

import Grid from '../../components/Grid';
import GridContainer from '../../components/GridContainer';

function Percolator() {
    const [config, setConfig] = useState({
        // expects width/height to be equal
        // may need to be changed in future
        width: 10,
        height: 10,
        cellSize: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffffff22'
    });

    const [layer, setLayer] = useState({
        layerId: '',
        borderColor: '#F17D16',
        backgroundColor: '#CEA27488',
        innerBorder: true,
        // borderColor: '#0EA66F',
        // backgroundColor: '#74CEAE22',
        cells: (new Array(config.width * config.height)).fill(1)
    });

    const scrollLayer = useCallback(() => {
        let cells = [...layer.cells];

        cells = cells.slice(0, cells.length - config.width);
        for (let i = 0; i < config.width; i++) {
            cells.unshift(Math.round(Math.random()));
            // cells.unshift(0);
        }
        setLayer({
            layerId: 'K',
            borderColor: '#F17D16',
            backgroundColor: '#CEA27444',
            innerBorder: true,
            cells
        });
    }, [config, layer.cells]);

    useEffect(() => {
        let tId = setTimeout(() => {
            scrollLayer();
        }, 1000);

        return () => {
            if (tId) clearTimeout(tId);
        };
    }, [layer, scrollLayer]);

    return (
        <div className="App">
            <div className='grid-container'>
                <Grid config={config} layers={[{
                    layerId: 'Q',
                    borderColor: '#1751ff',
                    backgroundColor: '#00e1ff44',
                    innerBorder: false,
                    cells: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }, layer]}></Grid>
            </div>
        </div>
    );
}

export default Percolator;
