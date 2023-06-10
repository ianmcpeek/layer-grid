export function KeyboardControls({ upPressed, leftPressed, downPressed, rightPressed, fnClick }: any) {

    const dir = [upPressed, leftPressed, downPressed, rightPressed];
    const arrows = [
        { class: 'key-up', dir: 0, label: '⇑', val: 'ArrowUp', rot: 0 },
        { class: 'key-left', dir: 1, label: '⇐', val: 'ArrowLeft', rot: 270 },
        { class: 'key-down', dir: 2, label: '⇓', val: 'ArrowDown', rot: 180 },
        { class: 'key-right', dir: 3, label: '⇒', val: 'ArrowRight', rot: 90 },
    ];

    return (<div className='key-controls' style={{ display: 'inline-block' }}>
        <div style={{
            display: 'flex',
            columnGap: '10px'
        }}>
            {
                arrows.map(arrow => {
                    return (
                        <div
                            style={{ fontFamily: 'Eczar' }}
                            key={arrow.val}
                            className={`` + (dir[arrow.dir] ? ' active' : '')}
                            // update in DoomScroller to receive 
                            onClick={() => fnClick ? fnClick(arrow.val) : undefined}
                        >
                            <ArrowKey rotate={arrow.rot} active={dir[arrow.dir]}></ArrowKey>
                        </div>
                    );
                })
            }
        </div>

    </div>);
}

function ArrowKey({ rotate, active }: any) {
    const color = active ? '#ffffff' : '#ffffff44';
    return (
        <svg style={{ transform: `rotate(${rotate}deg)`, width: '25px', height: '25px', boxShadow: active ? '0 0 12px white' : undefined }} xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
            <path d="M32 57.2574L56.6334 31.9455C58.2038 30.3319 60.7962 30.3319 62.3666 31.9455L87 57.2574M47.5833 92L47.378 41.5074M71.4167 92L71.622 41.5074" stroke={color} strokeWidth="10" strokeLinejoin="round" />
            <rect x="3" y="3" width="114" height="114" rx="5" stroke={color} strokeWidth="6" />
        </svg>
    );
}

export function ArrowIndicators({ upPressed, leftPressed, downPressed, rightPressed, fnClick }: any) {

    const dir = [upPressed, leftPressed, downPressed, rightPressed];
    const arrows = [
        { class: 'key-up', dir: 0, label: '⇑', val: 'ArrowUp' },
        { class: 'key-left', dir: 1, label: '⇐', val: 'ArrowLeft' },
        { class: 'key-down', dir: 2, label: '⇓', val: 'ArrowDown' },
        { class: 'key-right', dir: 3, label: '⇒', val: 'ArrowRight' },
    ];

    return (<div className='key-controls' style={{ display: 'inline-block' }}>
        <div className='arrow-grid'>
            {
                arrows.map(arrow => {
                    return (
                        <div
                            key={arrow.val}
                            className={`keyboardKey ${arrow.class}` + (dir[arrow.dir] ? ' active' : '')}
                            // update in DoomScroller to receive 
                            onClick={() => fnClick ? fnClick(arrow.val) : undefined}
                        >{arrow.label}</div>
                    );
                })
            }
        </div>

    </div>);
}