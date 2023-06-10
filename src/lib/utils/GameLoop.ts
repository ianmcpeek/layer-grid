function GameLoop(fnUpdate: (time: number) => void, fnStopped: () => boolean) {
    let lastRender = 0;
    function loop(time: number) {
        const progress = time - lastRender;
        fnUpdate(progress);

        lastRender = time;
        if (!fnStopped()) {
            requestAnimationFrame(loop);
        }
    }

    requestAnimationFrame(loop);
}

export default GameLoop;