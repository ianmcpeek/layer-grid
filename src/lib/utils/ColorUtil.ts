export const Colors = {
    HotPink: '#DD4468',
    GhostWhite: '#ffffff88',
    CasperWhite: '#ffffff44',
    Charcoal: '#151515'
};

export const LayerThemes: { [key: string]: LayerTheme } = {
    Lava: {
        backgroundColor: '#FF000022',
        borderColor: '#FFFF2288'
    },
    Forest: {
        backgroundColor: '#0FA33922',
        borderColor: '#7AFF2188'
    },
    Ocean: {
        backgroundColor: '#0F59A322',
        borderColor: '#21F8FF88'
    },
}

type LayerTheme = {
    borderColor: string;
    backgroundColor: string;
};