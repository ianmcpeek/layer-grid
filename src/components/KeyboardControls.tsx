export function KeyboardControls({ upPressed, leftPressed, downPressed, rightPressed }: any) {
    return (<div className='key-controls' style={{ display: 'inline-block' }}>
        <div className='arrow-grid'>
            <div className={'keyboardKey key-left' + (leftPressed ? ' active' : '')}>⇐</div>
            <div className={'keyboardKey key-up' + (upPressed ? ' active' : '')}>⇑</div>
            <div className={'keyboardKey key-right' + (rightPressed ? ' active' : '')}>⇒ </div>
            <div className={'keyboardKey key-down' + (downPressed ? ' active' : '')}>⇓ </div>
        </div>

    </div>);
}