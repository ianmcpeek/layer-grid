import { monokai } from "react-code-blocks";
import { useNavigate } from "react-router-dom";
import { LinkAvatar } from "../../components/PreviewLink";
import { LayerGrid } from "../../components/Grid/LayerGrid";
import { LayerThemes } from "../../lib/utils/ColorUtil";
import { Font_Body } from "../../lib/utils/FontUtil";

// Data

const con: any = {
    dimensions: [12, 12],
    cellLength: 50,
    border: {
        radius: 20,
        width: 6,
        color: '#ffffff22'
    },
    frame: {
        padding: 30,
        border: {
            radius: 40,
            width: 6,
            color: '#ffffff66',
        }
    }
};
const conLg: any = {
    dimensions: [12, 12],
    cellLength: 30,
    border: {
        radius: 20,
        width: 3,
        color: '#ffffff44'
    }
};
const conSquat: any = {
    dimensions: [12, 6],
    cellLength: 30,
    border: {
        radius: 20,
        width: 3,
        color: '#ffffff44'
    }
};
const conRound: any = {
    dimensions: [2, 2],
    cellLength: 30,
    border: {
        radius: 30,
        width: 3,
        color: '#ffffff44'
    },
    // frame: {
    //     padding: 5,
    //     border: {
    //         style: 'dashed',
    //         radius: 50,
    //         width: 3,
    //         color: '#00000077'
    //     }
    // }
};
const conStick: any = {
    dimensions: [2, 10],
    cellLength: 30,
    border: {
        radius: 30,
        width: 3,
        color: '#ffffff44'
    },
    // frame: {
    //     padding: 5,
    //     border: {
    //         style: 'dashed',
    //         radius: 50,
    //         width: 3,
    //         color: '#00000077'
    //     }
    // }
};
const conTall: any = {
    dimensions: [5, 20],
    cellLength: 30,
    border: {
        radius: 30,
        width: 3,
        color: '#ffffff44'
    }
};

const layersCombined = [
    {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff88',
        innerBorder: false,
        cells: [
            [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0],
            [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    {
        layerId: 'foo',
        ...LayerThemes.Lava,
        innerBorder: false,
        cells: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1],
            [1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0],
            [0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
            [0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
        ]
    },
    {
        layerId: 'foo',
        ...LayerThemes.Forest,
        innerBorder: false,
        cells: [
            [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
    },
    {
        layerId: 'foo',
        borderColor: '#ff000099',
        backgroundColor: '#ff000022',
        innerBorder: false,
    },
    {
        layerId: 'foo',
        borderColor: '#008800',
        backgroundColor: '#008800aa',
        innerBorder: false,
    },
];

// Styles

const styles: any = {

    fig: {
        marginBottom: '40px'
    },
    codeBlock: {
        border: '4px solid #f0306688',
        borderRadius: '8px',
        minWidth: '250px'
    },
    button: {
        border: '0',
        borderRadius: '4px',
        boxShadow: '2px 2px 8px #00000044',
        backgroundColor: '#30d0f0',
        fontFamily: 'Sigmar',
        color: 'black',
        cursor: 'pointer',
        transition: 'transform 1s'
    },
    bg: {
        backgroundColor: '#151515',
        padding: '20px 60px',
        color: '#f03066'
    },
    layout: {
        // backgroundColor: 'green',
        margin: 'auto',
        width: '650px',
    },
    title: {
        fontFamily: `'Eczar', cursive`,
        // textAlign: 'right',
        fontSize: '128px',
        marginBottom: '-40px',
        fontWeight: '600'
    },
    titleBefore: {
        fontFamily: `'Eczar', cursive`,
        fontSize: '24px',
        marginTop: '40px',
        marginBottom: '-30px',
        color: '#ffffffaa',
        letterSpacing: '1px',
        fontWeight: '700',
        // marginLeft: '350px',
        lineHeight: '10px',
        // textAlign: 'right',
    },
    titleAfter: {
        fontFamily: `'Eczar', cursive`,
        // textAlign: 'right',
        fontSize: '24px',
        letterSpacing: '1px',
        color: '#ffffffaa',
        fontWeight: '700'
        // width: '400px',
        // marginLeft: 'auto'
    },
    mainGrid: {
        display: 'flex',
        width: '100%',
        margin: '100px 0',
        justifyContent: 'center'
    }

}

// code blocks
const codeBlockConfig = {
    showLineNumbers: true,
    theme: monokai,
    language: 'typescript'
}
// Template

const cd = `export type Matrix = {
dimensions: Tuple;
rows: any[][];
}`;
const cd2 = `MatrixUtil.from(  
[4, 4],
[ 1, 1, 0, 1,
0, 1, 0, 0,
1, 1, 1, 0,
1, 1, 0, 0 ]
)`;

function SplashContainer({ children }: any) {
    return (
        <>
            <div style={styles.bg}>
                <div style={styles.layout}>
                    {children}
                </div>
            </div>
        </>
    );
}

function Splash() {
    const navigate = useNavigate();
    return (
        <>
            <SplashContainer>
                <div style={styles.titleBefore}>Introducing the</div>
                <div style={styles.title}>Layer Grid</div>
                <div style={{ width: '100%' }}>
                    <div style={styles.titleAfter}>A React component for prototyping game systems.</div>
                </div>
                <div style={styles.mainGrid}>

                    <LayerGrid config={con} layers={[layersCombined[0], layersCombined[1], layersCombined[2]]}></LayerGrid>
                </div>
                {/* <p style={styles.codeBlock}>
                    <CodeBlock
                        text={'foo'}
                        {...codeBlockConfig}
                    />
                </p> */}
                {/* <ArticleSection header='Configuration'>
                    <div style={{
                        display: 'flex',
                        columnGap: '40px'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '58px'
                        }}>
                            <LayerGrid config={conLg} layers={[]}></LayerGrid>
                            <LayerGrid config={conSquat} layers={[]}></LayerGrid>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: '240px'
                        }}>
                            <LayerGrid config={conRound} layers={[]}></LayerGrid>
                            <LayerGrid config={conStick} layers={[]}></LayerGrid>
                        </div>
                        <div>
                            <LayerGrid config={conTall} layers={[]}></LayerGrid>
                        </div>
                    </div>
                </ArticleSection>
                <GridArt></GridArt> */}
                {/* <ArticleSection header='Layers'></ArticleSection> */}
                <div>
                    <h2 style={{ color: '#ffffffaa', fontSize: '32px', fontFamily: 'Eczar', marginBottom: 0, letterSpacing: '2px' }}>Examples</h2>
                    <hr style={{ margin: 0 }}></hr>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        marginTop: '40px',
                        gap: '40px'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '30px', cursor: 'pointer' }} onClick={() => navigate('scroll')}>
                            <LinkAvatar />
                            <h3 style={{
                                ...Font_Body,
                                fontSize: '28px',
                                fontWeight: '200',
                                letterSpacing: '1px',
                                color: 'white'
                            }}>Scroll</h3>
                        </div>
                        {/* <div style={{ display: 'flex', alignItems: 'center', columnGap: '30px' }}>
                            <LinkAvatar />
                            <h3 style={{
                                ...Font_Body,
                                fontSize: '28px',
                                fontWeight: '200',
                                letterSpacing: '1px',
                                color: 'white'
                            }}>Automata</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '30px' }}>
                            <LinkAvatar />
                            <h3 style={{
                                ...Font_Body,
                                fontSize: '28px',
                                fontWeight: '200',
                                letterSpacing: '1px',
                                color: 'white'
                            }}>Animation</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '30px' }}>
                            <LinkAvatar />
                            <h3 style={{
                                ...Font_Body,
                                fontSize: '28px',
                                fontWeight: '200',
                                letterSpacing: '1px',
                                color: 'white'
                            }}>Viewport</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '30px' }}>
                            <LinkAvatar />
                            <h3 style={{
                                ...Font_Body,
                                fontSize: '28px',
                                fontWeight: '200',
                                letterSpacing: '1px',
                                color: 'white'
                            }}>Rotation</h3>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', columnGap: '30px' }}>
                            <LinkAvatar />
                            <h3 style={{
                                ...Font_Body,
                                fontSize: '28px',
                                fontWeight: '200',
                                letterSpacing: '1px',
                                color: 'white'
                            }}>Sprites</h3>
                        </div> */}
                    </div>
                </div>
            </SplashContainer>
        </>
    );
}

function GridArt() {
    const config = {
        dimensions: [8, 8],
        cellLength: 50,
        border: {
            radius: 20,
            width: 4,
            color: '#151515'
        }
    };
    const styles: any = {
        circle: {
            width: '400px',
            height: '400px',
            backgroundColor: 'red',
            borderRadius: '400px'
        },
        gridContainer: {
            position: 'absolute',
            transform: 'translate(-200px,-20px) rotate(45deg)'
        }
    };
    return (
        <div style={{
            position: 'relative',
            height: '600px',
            transform: 'translate(-200px, 50px)'
        }}>
            <div style={styles.gridContainer}>
                <LayerGrid config={config} layers={[]}></LayerGrid>
            </div>
            <div style={styles.circle}></div>
        </div>
    );
}

export default Splash;