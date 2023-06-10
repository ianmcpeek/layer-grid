import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useArrowKeyClicked } from "../../../../lib/hooks/useArrowDirection";

function useInput(fnOnDirection: Function, fnOnSpaceBar: Function) {
    const { onKeyDownEvent, onKeyUpEvent, clicked, held, clicks } = useArrowKeyClicked(fnOnDirection, fnOnSpaceBar);
    const [swipedDir, setSwipedDir] = useState<string | null>(null);
    const handlers = useSwipeable({
        onSwiped: (eventData: any) => {
            setSwipedDir(eventData.dir.toUpperCase());
            fnOnDirection(eventData.dir.toUpperCase());
            setTimeout(() => {
                setSwipedDir(null);
            }, 400);
        },
        // onSwiped: (eventData: any) => () => { console.log('dir', eventData.dir.toUpperCase()); MoveMeeple(eventData.dir.toUpperCase()) },
        ...{
            delta: 100,                             // min distance(px) before a swipe starts. *See Notes*
            preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
            trackTouch: true,                      // track touch input
            trackMouse: false,                     // track mouse input
            rotationAngle: 0,                      // set a rotation angle
            swipeDuration: Infinity,               // allowable duration of a swipe (ms). *See Notes*
            touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
        }
    });
    const buttonPressed = {
        upPressed: held.up || swipedDir === 'UP',
        leftPressed: held.left || swipedDir === 'LEFT',

        downPressed: held.down || swipedDir === 'DOWN',
        rightPressed: held.right || swipedDir === 'RIGHT',
    }

    return {
        onKeyDownEvent,
        onKeyUpEvent,
        buttonPressed,
        handlers
    };
}

export default useInput;