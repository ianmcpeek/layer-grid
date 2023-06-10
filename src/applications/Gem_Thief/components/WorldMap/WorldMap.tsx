
import SoundManager from "../../../../components/SoundManager/SoundManager";
import { VerticalNodeMapConfiguration } from "../../../../components/VerticalNodeMap/VerticalNodeMapTypes";
import VerticalScrollMap from "../../../../components/VerticalScrollMap";
import { Palette } from "../../ColorPalette";
import levels from "../../db/levels";
import SVGBackground from "./SVGBackground";

const mapConfig: VerticalNodeMapConfiguration = {
    length: levels.length,
    positions: [
        { left: 60, top: -40 },
        { left: 120, top: 20 },
        { left: 175, top: 90 },
        { left: 215, top: 170 },
        { left: 235, top: 265 },
        { left: 225, top: 360 },
        { left: 190, top: 440 },
        { left: 130, top: 520 },
        { left: 100, top: 600 },
        { left: 105, top: 690 },
        { left: 130, top: 780 },
        { left: 185, top: 860 },
        { left: 245, top: 930 },
        { left: 305, top: 1000 },
        { left: 325, top: 1095 },
        { left: 275, top: 1180 },
        { left: 200, top: 1235 },
        { left: 120, top: 1280 },
        { left: 65, top: 1350 },
        { left: 45, top: 1450 },
        { left: 70, top: 1530 },
        { left: 125, top: 1600 },
        { left: 210, top: 1620 },
        { left: 290, top: 1620 },
        { left: 305, top: 1700 },
        { left: 45, top: 1720 },
        { left: 45, top: 1820 },
        { left: 45, top: 1920 },
        { left: 45, top: 2020 },
    ],
    nodeStyle: {
        color: 'white',
        fontSize: '30px',
        backgroundColor: Palette.Charcoal,
        width: '50px',
        height: '50px',
        paddingRight: '3px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '4px solid ' + Palette.Magenta,
        borderRadius: '40px',
        cursor: 'pointer'
    },
    selectedNodeStyle: {
        color: 'black',
        backgroundColor: Palette.Yellow
    },
};

const styles: any = {
    App: {
        fontFamily: 'Shrikhand',
        width: '100%',
    },
    Title: {
        fontSize: '48px',
        letterSpacing: '2px',
        color: Palette.Magenta,
        lineHeight: '66px',
        margin: '0',
        marginTop: '40px',
        textShadow: '2px 2px #801b5e'
    },
    Subtitle: {
        marginLeft: '60px',
        fontSize: '20px',
        letterSpacing: '2px',
        color: Palette.GhostWhite,
        lineHeight: '0px',
        marginTop: '0',
        marginBottom: '0',
        textShadow: '2px 2px #c21d8b'
    },
};

function WorldMap(props: { fnSelectLevel: Function, levelId: number, unlocked: number }) {

    return (
        <div style={styles.App}>
            <SoundManager musicRequest={{ effect: 'foo' }}></SoundManager>
            <Header
                title='Gem Thief'
                subtitle="Ways of the Craft"
            />
            {/* put loader here to avoid textures popping in */}
            <VerticalScrollMap
                config={mapConfig}
                background={<SVGBackground />}
                lastUnlocked={props.unlocked}
                lastVisited={props.levelId}
                scrollHeightAt={{
                    7: 740,
                    8: 800,
                    9: 900,
                    10: 970,
                    11: 1050,
                    12: 1120,
                    13: 1200,
                    14: 1280,
                    15: 1380,
                    16: 1430,
                    17: 1490,
                    18: 1560,
                    19: 1640,
                    20: 2240,
                }}
                fnNodeClicked={props.fnSelectLevel}
            />
        </div>
    );
}

function Header({ title, subtitle }: { title: string, subtitle: string }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <h1 style={styles.Title}>{title}</h1>
                <h3 style={styles.Subtitle}>{subtitle}</h3>
            </div>
        </div>
    );
}

export default WorldMap;