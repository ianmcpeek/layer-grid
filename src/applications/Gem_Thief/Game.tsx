import { useEffect, useState } from "react";
import levels from "./db/levels";
import Puzzle from "./components/Puzzle/Puzzle";
import WorldMap from "./components/WorldMap/WorldMap";

function Game() {
    const [gems, setGems] = useState(0);
    const [level, setLevel] = useState({
        id: -1,
        selected: false
    });

    function updateGems(val: number) {
        if (val >= levels.length) {
            setLevel({ id: -1, selected: false });
        } else {
            setGems(val);
            localStorage.setItem('gem_thief', JSON.stringify({ gems, id: level.id }));
        }
    }

    useEffect(() => {
        const dat = localStorage.getItem('gem_thief');
        if (dat) {
            const parsed = JSON.parse(dat);
            setGems(parsed.gems);
            setLevel({ id: parsed.id, selected: false });
        }
    }, []);

    return (
        <div style={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'center' }}>
            {(level.selected && (level.id < levels.length)) ?
                <Puzzle
                    key={level.id}
                    gems={gems}
                    setGems={updateGems}
                    levelId={level.id}
                    puzzle={levels[level.id]}
                    fnSelectLevel={(id: number, selected: boolean) => { setLevel({ id, selected }) }}
                /> :
                <WorldMap
                    levelId={level.id}
                    unlocked={gems}
                    fnSelectLevel={(id: number) => { setLevel({ id, selected: true }) }}
                />}

        </div>
    );
}

export default Game;