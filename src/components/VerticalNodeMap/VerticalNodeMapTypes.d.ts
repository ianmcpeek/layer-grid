export type VerticalNodeMapProps = {
    config: VerticalNodeMapConfiguration;
    lastVisited: number;
    lastUnlocked: number;
    scrollHeightAt: { [key: number]: number };
    fnNodeClicked: Function;
    background: any;
};

export type VerticalNodeMapConfiguration = {
    length: number;
    positions: { top: number, left: number }[];
    nodeStyle: any;
    selectedNodeStyle: any;
};
