import { useCallback, useState } from 'react';

import Grid from '../../components/Grid';
import GridContainer from '../../components/GridContainer';

function GridRandomizer() {
    const [config, setConfig] = useState({
        // expects width/height to be equal
        // may need to be changed in future
        width: 30,
        height: 30,
        cellSize: 30,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffffff22'
    });

    const [layer, setLayer] = useState({
        borderColor: '#F17D16',
        backgroundColor: '#CEA27444',
        innerBorder: true,
        // borderColor: '#0EA66F',
        // backgroundColor: '#74CEAE22',
        cells: [
            // 1, 1, 1, 1, 1, 0, 0, 0,
            // 1, 1, 1, 1, 1, 1, 1, 0,
            // 0, 1, 1, 1, 1, 1, 1, 0,
            // 0, 0, 1, 1, 1, 1, 1, 0,
            // 0, 0, 0, 0, 0, 0, 0, 0,
            // 0, 0, 0, 0, 0, 0, 0, 0,
            // 0, 0, 0, 0, 0, 0, 0, 0,
            // 0, 0, 0, 0, 0, 0, 0, 0,
            0
        ]
    });

    const changeLayer = useCallback(() => {
        const cells = [];
        for (let i = 0; i < config.width * config.height; i++) {
            cells.push(Math.round(Math.random()));
        }
        setLayer({
            borderColor: '#F17D16',
            backgroundColor: '#CEA27444',
            innerBorder: false,
            cells
        });
    }, [config]);

    // useEffect(() => {
    //   let tId = setTimeout(() => {
    //     changeLayer();
    //   }, 500);

    //   return () => {
    //     if (tId) clearTimeout(tId);
    //   };
    // }, [layer, changeLayer]);

    return (
        <div className="App">
            <div className='grid-container'>
                <Grid config={config} layer={layer}></Grid>
            </div>
            <div className='button-container'>
                <button onClick={changeLayer}>Generate</button>
            </div>
        </div>
    );
}

export default GridRandomizer;
