import { Palette } from "../../ColorPalette";

function PuzzleMessage({ children }: { children: any }) {
    return <div
        style={{
            color: Palette.GhostWhite,
            fontSize: '20px',
            fontFamily: 'Eczar',
            fontWeight: '600',
            padding: '30px 40px 0px 40px',
            letterSpacing: '2px',
            lineHeight: '30px'
        }}

    >{children}</div>;
}

export default PuzzleMessage;