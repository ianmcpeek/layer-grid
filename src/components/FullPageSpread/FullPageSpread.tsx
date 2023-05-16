// Stepper Component that will steps through 2 pages at a time

import { useState } from "react";
import { Colors } from "../../lib/utils/ColorUtil";
import { LinkAvatar, PreviewLink } from "../PreviewLink";
import { Font_Body } from "../../lib/utils/FontUtil";
import useArrowDirection from "../../lib/hooks/useArrowDirection";
import { useNavigate } from "react-router-dom";

// Used with text on left and supplemental material on right (diagrams, interactables, etc)
function FullPageSpread({ spreads }: any) {
    const navigate = useNavigate();
    const { onKeyDownEvent, onKeyUpEvent, upPressed, leftPressed, downPressed, rightPressed, direction, diag } = useArrowDirection();
    const buttonPressed: any = { upPressed, leftPressed, downPressed, rightPressed };
    const [page, setPage] = useState({
        i: 0,
        pages: 4
    });
    const [diagramHovered, setDiagramHovered] = useState(false);

    const spread = spreads[page.i];
    const styles: any = {
        page: {
            border: `2px solid ${Colors.CasperWhite}`, flex: 1, height: '600px', borderRadius: '20px', color: Colors.GhostWhite, outline: '0'
        },
        tick: {
            display: 'block',
            width: '8px',
            height: '8px',
            backgroundColor: 'red',
            transform: 'rotate(45deg)'
        },
        unread: {
            opacity: '0.3',
            display: 'block',
            width: '8px',
            height: '8px',
            backgroundColor: 'red',
            transform: 'rotate(45deg)'
        },
        tickGroup: {
            display: 'flex',
            columnGap: '14px'
        }
    }

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '20px' }}>
                <div style={{
                    backgroundColor: Colors.HotPink,
                    width: 'fit-content',
                    padding: '4px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer'
                }} onClick={() => navigate('/')}><ChevronUp /></div>
                <div style={{
                    width: '1000px',
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', columnGap: '30px', marginLeft: '40px' }}>
                        <LinkAvatar />
                        <h3 style={{
                            ...Font_Body,
                            fontSize: '28px',
                            fontWeight: '200',
                            letterSpacing: '1px',
                            color: 'white'
                        }}>Scroll</h3>
                    </div>
                    <div style={{ display: 'flex', columnGap: '20px', marginTop: '10px' }}>
                        <div style={{ ...styles.page, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: 1 }}>
                                {spread[0](diag, buttonPressed, diagramHovered)}
                            </div>
                            <div style={{ borderTop: '2px solid ' + Colors.CasperWhite, padding: '10px 0' }}>
                                <div style={{ display: 'flex', fontFamily: 'Shrikhand', color: 'white', alignItems: 'center', justifyContent: 'space-between', margin: '0 25px', padding: '5px 0' }}>
                                    {page.i > 0 ? (
                                        <span style={{ width: '45px', cursor: 'pointer' }} onClick={() => setPage({
                                            ...page,
                                            i: page.i - 1
                                        })}>BACK</span>
                                    ) : (
                                        <span style={{ width: '45px' }}>{'    '}</span>
                                    )}

                                    <div style={styles.tickGroup}>
                                        <span style={page.i > 0 ? styles.tick : styles.unread}></span>
                                        <span style={page.i > 1 ? styles.tick : styles.unread}></span>
                                        <span style={page.i > 2 ? styles.tick : styles.unread}></span>
                                        <span style={page.i > 3 ? styles.tick : styles.unread}></span>
                                    </div>
                                    {page.i < page.pages ? (
                                        <span style={{ width: '45px', cursor: 'pointer' }} onClick={() => setPage({
                                            ...page,
                                            i: page.i + 1
                                        })}>NEXT</span>
                                    ) : (
                                        <span style={{ width: '45px' }}>{'    '}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div style={{ ...styles.page, ...(diagramHovered ? { borderColor: 'white' } : { borderColor: '#ffffff44' }) }} tabIndex={0} onKeyDown={(e: any) => diagramHovered ? onKeyDownEvent(e) : undefined} onKeyUp={onKeyUpEvent} onClick={() => setDiagramHovered(true)} onMouseLeave={() => setDiagramHovered(false)}>
                            {spread[1](diag, buttonPressed, diagramHovered)}
                        </div>
                    </div>
                </div>
            </div >
            {/* top tab */}
            {/* Magazine */}
            {/* Page 1 */}
            {/* Page 2 */}
        </>
    );
}

function ChevronUp() {
    return <svg style={{ width: '20px' }} xmlns="http://www.w3.org/2000/svg" width="30" height="14" viewBox="0 0 30 14" fill="none">
        <path d="M2 11L16.4643 3" stroke="#151515" strokeWidth="6" />
        <path d="M28 11L13.5357 3" stroke="#151515" strokeWidth="6" />
    </svg>;
}

export default FullPageSpread;