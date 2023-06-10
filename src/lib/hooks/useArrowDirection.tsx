import { useEffect, useState } from "react";

function useArrowDirection() {
    const [upPressed, setUpPressed] = useState(false);
    const [downPressed, setDownPressed] = useState(false);
    const [leftPressed, setLeftPressed] = useState(false);
    const [rightPressed, setRightPressed] = useState(false);
    const [direction, setDirection] = useState('RIGHT');
    const [diag, setDiag] = useState('RIGHT');
    const [newDir, setNewDir] = useState(false);

    useEffect(() => {
        if (upPressed && leftPressed) setDiag('UP_LEFT');
        else if (upPressed && rightPressed) setDiag('UP_RIGHT');
        else if (downPressed && rightPressed) setDiag('DOWN_RIGHT');
        else if (downPressed && leftPressed) setDiag('DOWN_LEFT');
        else if (newDir) setDiag(direction);
    }, [upPressed, downPressed, leftPressed, rightPressed, direction, newDir]);
    return {
        onKeyUpEvent: (event: any) => {

            const { code } = event;
            const directionCodes: any = {
                'ArrowRight': 'RIGHT',
                'ArrowLeft': 'LEFT',
                'ArrowUp': 'UP',
                'ArrowDown': 'DOWN',
            };
            setNewDir(false);

            if (directionCodes[code] === 'UP') setUpPressed(false);
            if (directionCodes[code] === 'LEFT') setLeftPressed(false);
            if (directionCodes[code] === 'RIGHT') setRightPressed(false);
            if (directionCodes[code] === 'DOWN') setDownPressed(false);
        },
        onKeyDownEvent: (event: any) => {

            event.preventDefault && event.preventDefault();
            const { code } = event;
            const directionCodes: any = {
                'ArrowRight': 'RIGHT',
                'ArrowLeft': 'LEFT',
                'ArrowUp': 'UP',
                'ArrowDown': 'DOWN',
            };
            setNewDir(true);

            if (directionCodes[code] === 'UP') setUpPressed(true);
            if (directionCodes[code] === 'DOWN') setDownPressed(true);
            if (directionCodes[code] === 'LEFT') setLeftPressed(true);
            if (directionCodes[code] === 'RIGHT') setRightPressed(true);
            setDirection(directionCodes[code]);
        },
        upPressed,
        downPressed,
        leftPressed,
        rightPressed,
        direction,
        diag, newDir
    }
}


// we want to be notified whenever a click event has happened
export function useArrowKeyClicked(fnOnClick: Function, fnSpaceBar: Function) {
    const [keys, setKeys] = useState({
        held: {
            up: false,
            left: false,
            down: false,
            right: false,
            space: false
        },
        clicked: {
            up: false,
            left: false,
            down: false,
            right: false,
            space: false,
        }, clicks: 0
    });

    const directionCodes: any = {
        'ArrowRight': 'RIGHT',
        'ArrowLeft': 'LEFT',
        'ArrowUp': 'UP',
        'ArrowDown': 'DOWN',
    };
    const letterCodes: any = {
        'KeyD': 'RIGHT',
        'KeyA': 'LEFT',
        'KeyW': 'UP',
        'KeyS': 'DOWN',
    };

    function isArrowKey(code: string) {
        return directionCodes[code] !== undefined || letterCodes[code] !== undefined;
    }

    return {
        onKeyUpEvent: (event: any) => {
            event.preventDefault && event.preventDefault();
            const { code } = event;
            console.log('code', code);

            const modified = { ...keys };
            const clicked = {
                up: false,
                left: false,
                down: false,
                right: false,
                space: false
            }
            let dir = 'RIGHT';

            if (directionCodes[code] === 'UP' || letterCodes[code] === 'UP') { modified.held.up = false; clicked.up = true; dir = 'UP'; }
            else if (directionCodes[code] === 'LEFT' || letterCodes[code] === 'LEFT') { modified.held.left = false; clicked.left = true; dir = 'LEFT'; }
            else if (directionCodes[code] === 'DOWN' || letterCodes[code] === 'DOWN') { modified.held.down = false; clicked.down = true; dir = 'DOWN'; }
            else if (directionCodes[code] === 'RIGHT' || letterCodes[code] === 'RIGHT') { modified.held.right = false; clicked.right = true; dir = 'RIGHT'; }
            if (code === 'Space') {
                modified.held.space = false;
                clicked.space = true;
                fnSpaceBar();
            }
            if (isArrowKey(code)) {
                modified.clicked = clicked;
                modified.clicks += 1;
                fnOnClick(dir);
                setKeys(modified);
            }
        },
        onKeyDownEvent: (event: any) => {
            event.preventDefault && event.preventDefault();
            const { code } = event;
            const modified = { ...keys };


            if (directionCodes[code] === 'UP' || letterCodes[code] === 'UP') { modified.held.up = true; }
            else if (directionCodes[code] === 'LEFT' || letterCodes[code] === 'LEFT') { modified.held.left = true; }
            else if (directionCodes[code] === 'DOWN' || letterCodes[code] === 'DOWN') { modified.held.down = true; }
            else if (directionCodes[code] === 'RIGHT' || letterCodes[code] === 'RIGHT') { modified.held.right = true; }

            if (code === 'Space') { modified.held.space = true; }


            setKeys(modified);
        },
        held: keys.held,
        clicked: keys.clicked,
        clicks: keys.clicks,
    }
}

export default useArrowDirection;