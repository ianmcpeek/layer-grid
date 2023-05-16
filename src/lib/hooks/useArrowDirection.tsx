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
            event.preventDefault();
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
        diag
    }
}

export default useArrowDirection;