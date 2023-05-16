import { useState } from "react";
import { LayerGrid } from "./Grid/LayerGrid";
import { useNavigate } from "react-router-dom";

const styles: any = {
    title: {
        fontSize: '32px',
        fontFamily: `'Eczar', serif`,
        letterSpacing: '2px',
        color: '#ffffffaa',
        marginBottom: '10px'
    }, link: {
        border: '4px solid #ffffffaa',
        width: '100px',
        height: '100px',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '60px',
        // cursor: 'default'
    }, preview: {
        // pointerEvents: 'none'
    }, avatar: {
        border: '3px solid #f03066',
        color: '#f03066',
        width: '60px',
        height: '60px',
        display: 'flex',
        overflow: 'hidden',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '60px',
        // cursor: 'default'
    }
};

const hoveredStyles: any = {
    link: {
        border: '4px solid #f03066',
    }, title: {
        color: '#f03066'
    }
}

const config: any = {
    dimensions: [4, 4],
    cellLength: 20,
    border: {
        radius: 10,
        width: 3,
        color: '#ffffff44'
    },
    frame: {
        padding: 10,
        border: {
            radius: 20,
            width: 3,
            color: '#ffffff44'
        }
    }
};
const avatarConfig: any = {
    dimensions: [4, 4],
    cellLength: 12,
    border: {
        radius: 6,
        width: 2,
        color: '#f0306688'
    },
    frame: {
        padding: 10,
        border: {
            radius: 20,
            width: 3,
            color: '#f0306688'
        }
    }
};
const hoveredConfig: any = {
    border: {
        color: '#f0306688'
    },
    frame: {
        border: {
            color: '#f0306688'
        }
    }
};

export function PreviewLink({ title, preview }: any) {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
    const ready = preview && hovered;
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: preview ? 'pointer' : 'default',
            }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => preview ? navigate('/scroll') : undefined}
            >
                <div style={ready ? { ...styles.title, ...hoveredStyles.title } : styles.title}>{title}</div>
                <div style={ready ? { ...styles.link, ...hoveredStyles.link } : styles.link}>
                    {preview && <div style={styles.preview}>
                        <LayerGrid config={ready ? { ...config, ...hoveredConfig } : config} layers={[]}></LayerGrid>
                    </div>}
                    {!preview && <span style={{
                        color: '#ffffff66',
                        fontSize: '32px',
                        fontFamily: 'Eczar',
                        letterSpacing: '-2px'
                    }}>???</span>}
                </div>
            </div>
        </>
    );
}
export function LinkAvatar({ }: any) {
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>

                <div style={styles.avatar}>
                    {<div style={styles.preview}>
                        <LayerGrid config={avatarConfig} layers={[]}></LayerGrid>
                    </div>}
                </div>
            </div>
        </>
    );
}