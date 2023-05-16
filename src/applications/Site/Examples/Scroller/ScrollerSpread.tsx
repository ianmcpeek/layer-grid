import { CodeBlock, monokai } from "react-code-blocks";
import FullPageSpread from "../../../../components/FullPageSpread/FullPageSpread";
import { Colors } from "../../../../lib/utils/ColorUtil";
import { MatrixUtil } from "../../../../lib/utils/MatrixUtil";
import DoomScroller from "./DoomScroller";
import { LayerGrid } from "../../../../components/Grid/LayerGrid";
import { RandomUtil } from "../../../../lib/utils/RandomUtil";

const codeBlockConfig = {
    showLineNumbers: true,
    theme: monokai,
    language: 'typescript'
}
const b = (text: any) => <b style={{ color: 'white' }}>{text}</b>;
const style: any = {
    body: {
        fontFamily: 'Eczar',
        fontSize: '18px',
        fontWeight: '200',
        letterSpacing: '1px',
        lineHeight: '35px',
        padding: '0 40px'
    },
    title: {
        fontFamily: 'Abril Fatface',
        color: 'white',
        fontSize: '42px',
        marginTop: '40px',
        lineHeight: '45px'
    },
    heading: {
        fontFamily: 'Eczar',
        fontSize: '28px',
        color: '#ffffff',
        letterSpacing: '2px',
        marginBottom: '10px'
    }

};

function LandingContent() {
    return (
        <>
            <div style={{ ...style.body }}>
                <div>
                    <h1 style={style.title}>Wherever the Wind Blows</h1>
                    <p>
                        Enjoy the view of randomized landscapes from above in this peaceful scroller.
                    </p>
                    <p>
                        Click in the play area to use {b('Arrow Keys')} to change the move direction.
                    </p>

                    <p>To learn more about the concepts used to create this example, click the {b('NEXT')} button to follow along.</p>

                </div>
            </div>
        </>
    );
}

function LandingDiagram({ diag, buttonPressed, diagramHovered }: any) {
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
                <DoomScroller diag={diag} buttonPressed={buttonPressed} active={diagramHovered}></DoomScroller>
            </div>
        </>
    );
}

// -- 1st PAGE --

function MatrixOperationsPage() {
    const con = {
        dimensions: [4, 4],
        cellLength: 50,
        border: {
            radius: 10,
            width: 2,
            color: Colors.CasperWhite
        }
    };

    const matrix = MatrixUtil.from([4, 4], [
        1, 1, 0, 1,
        0, 1, 0, 0,
        1, 1, 1, 0,
        1, 1, 0, 0,
    ]);
    const bits = {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff77',
        innerBorder: false,
        type: 'number',
        cells: matrix.rows
    };
    const styles: any = {
        fig: {
            margin: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#eee'
        },
        codeBlock: {
            border: '4px solid #ffffff44',
            borderRadius: '8px',
            width: 'fit-content'
        }
    }
    const cd = `const matrix = MatrixUtil.from(
        [4, 4],
        [ 1, 1, 0, 1,
          0, 1, 0, 0,
          1, 1, 1, 0,
          1, 1, 0, 0 ]
);`;

    const content = (<div style={style.body}>
        <h4 style={style.heading}>Matrix Operations</h4>
        <p>
            Our grid component displays the values of a Matrix. The branch of mathematics known as <i>"Matrix Operations"</i>, for algebra on multi-dimensional arrays of values.
        </p><p>
            For our example, we will be using a Matrix that can only contain 1 or 0, pictured right.
        </p><p>
            To create a scrolling effect, we will need a way of selecting the entire Matrix and dragging it in a given direction.
        </p>
    </div>);
    const diagram = (<div>
        <div style={styles.fig}>
            <LayerGrid config={con} layers={[bits]}></LayerGrid>
            <br />
            <br />
            <span style={{ color: "#ffffffaa", fontFamily: 'Eczar', fontWeight: '500' }}>Create a new matrix</span>
            <p style={styles.codeBlock}>
                <CodeBlock
                    text={cd}
                    {...codeBlockConfig}
                />
            </p>
        </div>
    </div>);

    return [() => content, () => diagram];
}

// -- 2nd PAGE --

function MatrixTranslationPage() {
    const con = {
        dimensions: [4, 4],
        cellLength: 50,
        border: {
            radius: 10,
            width: 2,
            color: Colors.CasperWhite
        }
    };

    const matrix = MatrixUtil.from([4, 4], [
        1, 1, 0, 1,
        0, 1, 0, 0,
        1, 1, 1, 0,
        1, 1, 0, 0,
    ]);
    const bits = {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff77',
        innerBorder: false,
        type: 'number',
        cells: matrix.rows
    };
    const translatedBits = {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff77',
        innerBorder: false,
        type: 'number',
        cells: MatrixUtil.translate(matrix, [0, 0], [3, 3], [2, 2]).rows
    };
    const styles: any = {
        fig: {
            margin: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#eee'
        },
        codeBlock: {
            border: '4px solid #ffffff44',
            borderRadius: '8px',
            width: 'fit-content'
        }
    }
    const translate1 = [bits, {
        layerId: 'foo',
        borderColor: '#72FF4E',
        backgroundColor: '#7DFF5D55',
        innerBorder: false,
        cells: MatrixUtil.from([4, 4], [
            1, 1, 0, 0,
            1, 1, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]).rows
    }];
    const translate2 = [translatedBits,
        {
            layerId: 'foo',
            borderColor: 'transparent',
            backgroundColor: '#7DFF5D22',
            innerBorder: false,
            cells: MatrixUtil.from([4, 4], [
                1, 1, 0, 0,
                1, 1, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ]).rows
        },
        {
            layerId: 'foo',
            borderColor: '#72FF4E',
            backgroundColor: '#7DFF5D55',
            innerBorder: false,
            cells: MatrixUtil.from([4, 4], [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 1, 1,
                0, 0, 1, 1,
            ]).rows
        },
    ];

    const content = (<div style={style.body}>
        <h4 style={style.heading}>Translation</h4>
        <p>
            With <i>origin</i> (X,Y), define a (N,M) <i>size</i> and select a (X,Y) <i>direction</i> to translate values to.
        </p>
        <p>
            For example, we could take a square at <i>(0,0)</i> with size <i>(2,2)</i> and move it {b('right 2, down 2')}.
        </p>
        <p>A negative direction with our square would result in part of the square being cut off by the bounds of the grid.
        </p>
        <p>
            In the case of a scroller, we can use this to create the effect of an object moving out of frame.
        </p>
    </div >);
    const diagram = (<div>
        <div style={styles.fig}>
            <LayerGrid config={con} layers={translate1}></LayerGrid>
            <br />
            <br />
            <LayerGrid config={con} layers={translate2}></LayerGrid>

        </div>
    </div>);

    return [() => content, () => diagram];
}

// -- 3rd PAGE --
const bold = (content: any) => <b style={{ color: Colors.HotPink }}>{content}</b>;
function MatrixFillPage() {
    const con = {
        dimensions: [4, 4],
        cellLength: 50,
        border: {
            radius: 10,
            width: 2,
            color: Colors.CasperWhite
        }
    };

    const matrix = MatrixUtil.from([4, 4], [
        1, 1, 0, 1,
        0, 1, 0, 0,
        1, 1, 1, 0,
        1, 1, 0, 0,
    ]);
    const bits = {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff77',
        innerBorder: false,
        type: 'number',
        cells: matrix.rows
    };
    const translatedBits = {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff77',
        innerBorder: false,
        type: 'number',
        cells: MatrixUtil.translate(matrix, [0, 0], [3, 3], [2, 2]).rows
    };
    const filledBits = {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff77',
        innerBorder: false,
        type: 'number',
        cells: MatrixUtil.fill(MatrixUtil.translate(matrix, [0, 0], [3, 3], [2, 2]), [0, 0], [2, 2], () => (0)).rows
    };

    const fill1 = [translatedBits, {
        layerId: 'foo',
        borderColor: 'transparent',
        backgroundColor: '#FF595922',
        innerBorder: false,
        cells: MatrixUtil.from([4, 4], [
            1, 1, 0, 0,
            1, 1, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ]).rows
    }];
    const fill2 = [filledBits,
        {
            layerId: 'foo',
            borderColor: '#FF2222',
            backgroundColor: '#FF595944',
            innerBorder: false,
            cells: MatrixUtil.from([4, 4], [
                1, 1, 0, 0,
                1, 1, 0, 0,
                0, 0, 0, 0,
                0, 0, 0, 0,
            ]).rows
        },
    ];
    const styles: any = {
        fig: {
            margin: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#eee'
        },
        codeBlock: {
            border: '4px solid #ffffff44',
            borderRadius: '8px',
            width: 'fit-content'
        }
    }

    const cd = `const matrix = MatrixUtil.from(
        [4, 4],
        [ 1, 1, 0, 1,
          0, 1, 0, 0,
          1, 1, 1, 0,
          1, 1, 0, 0 ]
);`;

    const content = (<div style={style.body}>
        <h4 style={style.heading}>Filling Holes</h4>
        <p>
            With origin (X,Y), define a (N,M) size to fill with any value.
        </p>
        <p>The value we choose to fill with can differ depending on what behavior we want to create.</p>
        <p>If we wanted to move a square within the grid, we could translate it in a direction and <i>fill</i> its origin with 0.</p>

        <p>To create a never-ending scroll, we will be filling the gap with a randomized value.</p>
    </div>);
    const diagram = (<div>
        <div style={styles.fig}>
            <LayerGrid config={con} layers={fill1}></LayerGrid>
            <br />
            <br />
            <LayerGrid config={con} layers={fill2}></LayerGrid>

        </div>
    </div>);

    return [() => content, () => diagram];
}

// -- 4th PAGE --

function PseudoRandomPage() {
    const con = {
        dimensions: [4, 4],
        cellLength: 35,
        border: {
            radius: 10,
            width: 2,
            color: Colors.CasperWhite
        }
    };

    const random = {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff77',
        innerBorder: false,
        type: 'number',
        cells: MatrixUtil.ofWithFn([4, 4], RandomUtil.randBinary).rows
    };
    const advantage = {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff77',
        innerBorder: false,
        type: 'number',
        cells: MatrixUtil.ofWithFn([4, 4], RandomUtil.randBinaryAdvantage).rows
    };
    const disadvantage = {
        layerId: 'foo',
        borderColor: '#0964ba',
        backgroundColor: '#2945ff77',
        innerBorder: false,
        type: 'number',
        cells: MatrixUtil.ofWithFn([4, 4], RandomUtil.randBinaryDisavantage).rows
    };
    const styles: any = {
        fig: {
            margin: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#eee'
        },
        codeBlock: {
            border: '4px solid #ffffff44',
            borderRadius: '8px',
            width: 'fit-content'
        }
    }

    const cd = `const matrix = MatrixUtil.from(
        [4, 4],
        [ 1, 1, 0, 1,
          0, 1, 0, 0,
          1, 1, 1, 0,
          1, 1, 0, 0 ]
);`;

    const content = (<div style={style.body}>
        <h4 style={style.heading}>Pseudo-Random</h4>
        <p>
            Random values add variability to any mechanic we are building.
        </p>
        <p>
            For now, let's only think of random in terms of a coin flip, with a 50% chance of it being a 1 or 0.
        </p>
        <p>
            In Dungeons & Dragons, there are mechanics rolling with "Advantage" and "Disadvantage", taking (Better/ Worse) of the outcome.
        </p>
        <p>We can apply this to our coin flip to roll better or worse for different grid layers.
        </p>
    </div>);
    const labelStyle: any = {
        fontFamily: 'Eczar',
        display: 'flex',
        width: '400px',
        fontSize: '18px',
        fontWeight: '100',
        justifyContent: 'space-between',
        alignItems: 'center',
        letterSpacing: '1px',
        textAlign: 'center'
    };
    const sp = {
        width: '210px'
    };
    const diagram = (<div>
        <div style={styles.fig}>
            <div style={labelStyle}>
                <LayerGrid config={con} layers={[random]}></LayerGrid>
                <span style={sp}>Coin Flip<br />Win Rate - 50%</span>
            </div>
            <br />
            <br />
            <div style={labelStyle}>
                <LayerGrid config={con} layers={[advantage]}></LayerGrid>
                <span style={sp}>Coin Flip, Best of 2<br />Win Rate - 75%</span>
            </div>
            <br />
            <br />
            <div style={labelStyle}>
                <LayerGrid config={con} layers={[disadvantage]}></LayerGrid>
                <span style={sp}>Coin Flip, Worst of 2<br />Win Rate - 25%</span>
            </div>
            <br />
            <br />

        </div>
    </div>);

    return [() => content, () => diagram];
}



export default function ScrollerSpread() {
    const spreads = [
        [
            (diag: any, buttonPressed: any, diagramHovered: any) => <LandingContent />,
            (diag: any, buttonPressed: any, diagramHovered: any) => <LandingDiagram diag={diag} buttonPressed={buttonPressed} diagramHovered={diagramHovered} />
        ],
        MatrixOperationsPage(),
        MatrixTranslationPage(),
        MatrixFillPage(),
        PseudoRandomPage()
    ];
    return (
        <>
            <FullPageSpread spreads={spreads}></FullPageSpread>
        </>
    );
}