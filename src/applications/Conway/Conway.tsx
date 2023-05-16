import { useCallback, useEffect, useRef, useState } from 'react';

import Grid from '../../components/Grid';
import '../../components/GridContainer.css';
import GridContainer from '../../components/GridContainer';
import GridUtil from '../../lib/utils/GridUtil';

function getRandomGrid({ width, height }: any) {
    const cells = [];
    for (let i = 0; i < width * height; i++) {
        cells.push(Math.round(Math.random()));
    }
    return cells;
}

function Conway() {
    const [config, setConfig] = useState({
        // expects width/height to be equal
        // may need to be changed in future
        width: 10,
        height: 10,
        cellSize: 30,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffffff22'
    });
    const [started, setStarted] = useState(false);
    const [setupConfig, setSetupConfig] = useState({
        // expects width/height to be equal
        // may need to be changed in future
        width: 3,
        height: 3,
        cellSize: 60,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ffffff22'
    });

    const [layer, setLayer] = useState({
        borderColor: '#F17D16',
        backgroundColor: '#CEA27444',
        innerBorder: false,
        // borderColor: '#0EA66F',
        // backgroundColor: '#74CEAE22',
        cells: getRandomGrid(config)
        // cells: [1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0]
    });
    const [layer2, setLayer2] = useState({
        borderColor: '#FF0000',
        backgroundColor: '#EEA27444',
        innerBorder: true,
        // borderColor: '#0EA66F',
        // backgroundColor: '#74CEAE22',
        cells: [0, 1, 0, 1, 0, 1, 0, 0, 0]
    });

    const [nextGn, setNextGn] = useState({
        cells: [...layer.cells],
        i: 0
    });

    // const scrollLayer = useCallback(() => {
    //     let cells = [...layer.cells];

    //     cells = cells.slice(0, cells.length - config.width);
    //     for (let i = 0; i < config.width; i++) {
    //         cells.unshift(Math.round(Math.random()));
    //         // cells.unshift(0);
    //     }
    //     setLayer({
    //         borderColor: '#F17D16',
    //         backgroundColor: '#CEA27444',
    //         innerBorder: false,
    //         cells
    //     });
    // }, [config, layer.cells]);

    // const generate = useCallback(() => {
    //     let cells = [...layer.cells];
    //     let nextGeneration = [];

    //     for (let i = 0; i < config.width; i++) {
    //         for (let j = 0; j < config.height; j++) {
    //             nextGeneration.push(GridUtil(config.width, config.height).ValueAtIndex(config, cells, { x: i, y: j }));
    //         }
    //     }
    //     setLayer({
    //         borderColor: '#F17D16',
    //         backgroundColor: '#CEA27444',
    //         innerBorder: false,
    //         cells: nextGeneration
    //     });
    // }, [config, layer.cells]);

    const [count, setCount] = useState<any>(0);
    const [starter, setStarter] = useState<boolean>(false);
    const requestRef = useRef<any>();
    const previousTimeRef = useRef<any>();



    const animate = useCallback((time: number) => {
        if (previousTimeRef.current !== undefined) {
            const deltaTime = time - previousTimeRef.current;

            setCount((prevCount: any) => {
                // console.log(Math.floor(prevCount % 10));

                const fiveCount = Math.floor(prevCount % 5);

                if (true) {
                    setNextGn(({ cells: prevCells, i }) => {
                        const cells = prevCells;
                        const x = Math.floor(i / config.width);
                        const y = i % config.height;
                        cells[i] = GridUtil(config.width, config.height).ValueAtIndex(config, layer.cells, { x, y });
                        if (i >= config.width * config.height) {
                            // reset
                            setLayer({ ...layer, cells: [...cells] });
                            return { cells, i: 0 };
                        }
                        return { cells, i: i + 1 };
                    });
                }
                return (prevCount + deltaTime * 0.01)
            });
            // console.log(deltaTime);




        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
    }, [layer, config]);

    useEffect(() => {
        setStarter(true);

        return () => {
            setStarter(false);
        }
    }, []);

    useEffect(() => {
        if (starter) {
            requestRef.current = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(requestRef.current);
        }
    }, [starter, animate]); // Make sure the effect 

    const roundNumber = Math.round(count);
    const formattedNumber = Math.floor(roundNumber / 10) + '.' + (roundNumber % 10) + 's';

    return (
        <div className="App">
            <div className='grid-container'>
                <div className='flexer'>
                    <Grid config={config} layer={{ ...layer, cells: nextGn.cells }}></Grid>
                </div>
                <div>
                    <Grid config={setupConfig} layer={layer2}></Grid>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <button>Randomize</button>
                        <div style={{ color: 'white', fontSize: '22px', marginTop: '20px' }}>{formattedNumber}</div>
                        {/* <button onClick={startAnimation}>Start</button> */}
                    </div>

                </div>
            </div>
            {/* <div className='grid-container'>
                <Grid config={config} layer={layer}></Grid>
            </div> */}
        </div>
    );
}

export default Conway;
