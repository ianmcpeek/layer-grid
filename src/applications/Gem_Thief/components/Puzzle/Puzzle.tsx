import { useState } from "react";
import { InlineDiamondSVG } from "../../../../components/Grid/SVGIcons";
import MobileView from "../../../../components/MobileView/MobileView";
import SoundManager from "../../../../components/SoundManager/SoundManager";
import { Palette } from "../../ColorPalette";
import usePuzzleController from "../../lib/hooks/usePuzzleController";
import PuzzleBoard from "./PuzzleBoard";
import PuzzleMessage from "./PuzzleMessage";

function Puzzle({ levelId, fnSelectLevel, puzzle, gems, setGems }: any) {
    const [soundEffectRequest, setSoundEffectRequest] = useState<any>(undefined);
    const { puzzleState, updateWithDir, resetPuzzle } = usePuzzleController(puzzle, (name: string) => setSoundEffectRequest({ effect: name }));

    // collect input here and pass to puzzle

    return (
        <MobileView
            fnOnInput={updateWithDir}
            fnOnSpace={() => {
                if (puzzleState.won) {
                    fnSelectLevel(levelId + 1, true);
                } else resetPuzzle();
            }}
            header={
                <Header gems={gems} />
            }
            footer={
                <Footer
                    fnReset={resetPuzzle}
                    fnBack={() => {
                        fnSelectLevel(levelId, false);
                        setSoundEffectRequest({ effect: 'backButton' });
                    }}
                    won={puzzleState.won}
                    fnNext={() => { fnSelectLevel(levelId + 1, true); }}
                />
            }
        >
            <SoundManager soundRequest={soundEffectRequest}></SoundManager>
            {/* content */}
            <div style={{ height: 'calc(100% - 160px)' }}>
                <PuzzleMessage>{puzzle.message}</PuzzleMessage>
                <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
                        {/* <PuzzleBox {...puzzleBoxProps} puzzle={puzzle} /> */}
                        <PuzzleBoard boardState={puzzleState} puzzle={puzzle} />
                    </div>
                </div>
            </div>
        </MobileView>
    );
}

function Header({ gems }: any) {
    return <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white',
        fontSize: '18px',
        letterSpacing: '1px',
        backgroundColor: Palette.Charcoal,
        height: '60px'
    }}>
        <h3 style={{ margin: '0', paddingLeft: '20px' }}>Gem Thief</h3>
        <div style={{ display: 'flex', columnGap: '10px', width: '70px', paddingRight: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InlineDiamondSVG />
            </div>
            {gems}
        </div>
    </div>
}

function Footer({ won, fnReset, fnBack, fnNext }: any) {
    return <div style={{ height: '100px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button style={{
                outline: 0,
                backgroundColor: 'black',
                color: '#ffffff',
                letterSpacing: '1px',
                border: '4px solid white',
                padding: '8px 0px',
                borderRadius: '50px 20px 20px 50px',
                position: 'absolute', left: '-70px',
                cursor: 'pointer'
            }} onClick={fnBack}>
                <ArrowIcon />
            </button>
            <button className="p-button" style={{
                outline: 0,
                height: 'fit-content',
                backgroundColor: won ? '#B70042' : 'black',
                color: '#ffffff',
                fontSize: '32px',
                letterSpacing: '1px',
                fontFamily: 'Shrikhand',
                border: '4px solid ' + (won ? '#FF005C' : 'white'),
                padding: '8px 40px',
                borderRadius: '50px',
                cursor: 'pointer',
                width: '210px',
            }} onClick={won ? fnNext : fnReset}>{won ? 'NEXT' : 'RESET'}</button>
        </div>
    </div>;
}

function ArrowIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="18" viewBox="0 0 55 60" fill="none">
            <path d="M0 30C0 26.6674 1.80569 23.5964 4.71791 21.9761L40.3947 2.12614C46.945 -1.51834 55 3.21783 55 10.7138V49.2862C55 56.7822 46.945 61.5183 40.3947 57.8739L4.71791 38.0239C1.80569 36.4036 0 33.3326 0 30V30Z" fill="white" />
        </svg>
    );
}

export default Puzzle;