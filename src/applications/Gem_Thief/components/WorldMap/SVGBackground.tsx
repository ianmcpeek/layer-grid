import { DiamondBGSVG, FireSVGPosable } from "../../../../components/Grid/SVGIcons";
import useIsMobile from "../../../../lib/hooks/useIsMobile";

function SVGBackground() {
    const mobile = useIsMobile();

    return (
        <div style={{ position: 'absolute', top: '80px', paddingTop: '40px', left: mobile ? '-40px' : '-40px', height: '2000px', display: 'flex', justifyContent: 'center' }}>
            {/* left -40 on mobile */}
            <div style={{}}>
                <div >
                    <svg xmlns="http://www.w3.org/2000/svg"
                        width="557"
                        height="1919"
                        viewBox="0 0 557 1919"
                        fill="none">
                        <path
                            d="M107.896 6C165.063 51.3333 285.096 190.9 263.896 348.5C237.396 545.5 118.396 500.5 130.896 685.5C138.898 803.928 217.013 900.799 276.09 953.313C300.604 975.104 324.428 998.757 338.018 1028.61C388.966 1140.52 360.689 1202.24 131.396 1324C-4.441 1481.09 142.07 1692.66 282.396 1649.5C586.396 1556 549.396 1829 549.396 1912.5"
                            stroke="#FF005C"
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    {/* bg svgs */}
                    <DiamondBGSVG width={30} rotate={40} style={{ left: -10, top: 240 }} />
                    <DiamondBGSVG width={10} rotate={10} style={{ left: 310, top: 40 }} />
                    <DiamondBGSVG width={10} rotate={10} style={{ left: 510, top: 580 }} />
                    <DiamondBGSVG width={18} rotate={10} style={{ left: 510, top: 140 }} />
                    <DiamondBGSVG width={10} rotate={10} style={{ left: 700, top: 250 }} />
                    <DiamondBGSVG width={14} rotate={-20} style={{ left: 550, top: -20 }} />
                    <DiamondBGSVG width={10} rotate={-30} style={{ left: 410, top: 330 }} />
                    <DiamondBGSVG width={20} rotate={-30} style={{ left: 610, top: 430 }} />
                    <DiamondBGSVG width={30} rotate={-30} style={{ left: 310, top: 530 }} />
                    <FireSVGPosable style={{ left: 110, top: -80, width: '20%' }} />
                    <FireSVGPosable style={{ left: 410, top: 60, width: '10%' }} />
                    <FireSVGPosable style={{ left: 290, top: -300, width: '8%' }} />
                    <FireSVGPosable style={{ left: 70, top: -210, width: '8%' }} />
                </div>
            </div>
        </div>
    );
}

export default SVGBackground;