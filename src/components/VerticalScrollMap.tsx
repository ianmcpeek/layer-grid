import { useEffect } from "react";
import SVGBackground from "../applications/Gem_Thief/components/WorldMap/SVGBackground";
import VerticalNodeMap from "./VerticalNodeMap/VerticalNodeMap";
import { VerticalNodeMapProps } from "./VerticalNodeMap/VerticalNodeMapTypes";

function VerticalScrollMap(props: VerticalNodeMapProps) {
    const { scrollHeightAt, lastVisited, lastUnlocked, background } = props;

    useEffect(() => {
        const scrollPos = scrollHeightAt[lastVisited] - 550;
        window.scrollTo(0, scrollPos);
    }, [lastUnlocked, lastVisited, scrollHeightAt]);

    return (
        <>
            <div id="scroller" style={{ width: '100%', height: getMapHeight(scrollHeightAt, lastUnlocked), backgroundColor: '', display: 'flex', position: 'relative', overflow: 'hidden' }}>
                {background}
                <VerticalNodeMap
                    {...props}
                />
            </div>
        </>
    );
}

function getMapHeight(scrollHeightAt: { [key: number]: number }, unlocked: number) {
    let height = 0;

    for (let i = 0; i <= unlocked; i++) {
        if (scrollHeightAt[i] !== undefined) {
            height = scrollHeightAt[i];
        }
    }

    return `max(calc(100% - 106px), ${height}px)`;
}

export default VerticalScrollMap;