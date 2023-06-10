import { LayeredGridBaseConfiguration } from "../../../components/Grid/LayeredGrid";
import { Matrix, MatrixUtil } from "../../../lib/utils/MatrixUtil";
import { Agent, WatcherAgent } from "../lib/Agents";

export type GemLevel = {
    gridConfig: LayeredGridBaseConfiguration;
    playerCoord: [number, number];
    gemCoord: [number, number];
    land?: Matrix;
    fire?: Matrix;
    cracks?: Matrix;
    agents: Agent[];
    watchers?: WatcherAgent[];
    message?: string;
};

class Level {
    gridConfig: LayeredGridBaseConfiguration;
    playerCoord: [number, number];
    gemCoord: [number, number];
    land?: Matrix;
    fire?: Matrix;
    cracks?: Matrix;
    agents: Agent[];
    watchers?: WatcherAgent[];
    message?: string;

    private constructor(
        gridConfig: LayeredGridBaseConfiguration,
        dimensions: [number, number],
        playerCoord: [number, number],
        gemCoord: [number, number],
        agents: Agent[]
    ) {
        this.gridConfig = { ...gridConfig, dimensions };
        this.playerCoord = playerCoord;
        this.gemCoord = gemCoord;
        this.agents = agents;
    }

    static of(
        gridConfig: LayeredGridBaseConfiguration,
        dimensions: [number, number],
        playerCoord: [number, number],
        gemCoord: [number, number],
        agents: Agent[]
    ) {
        return new Level(gridConfig, dimensions, playerCoord, gemCoord, agents);
    }

    withCellLength(length: number) {
        this.gridConfig.cellLength = length;
        return this;
    }

    withMessage(message: string) {
        this.message = message;
        return this;
    }

    withLand(bitArray: number[]) {
        this.land = MatrixUtil.from(this.gridConfig.dimensions, bitArray);
        return this;
    }

    withCracks(bitArray: number[]) {
        this.cracks = MatrixUtil.from(this.gridConfig.dimensions, bitArray);
        return this;
    }

    withFire(bitArray: number[]) {
        this.fire = MatrixUtil.from(this.gridConfig.dimensions, bitArray);
        return this;
    }
}

const gridConfig: LayeredGridBaseConfiguration = {
    // overwrite this value
    dimensions: [0, 0],
    // showCoord: true,
    cellLength: 30,
    border: {
        color: '#ffffff',
        width: 4,
        opacity: '.06',
        radius: 20,
    },
    frame: {
        padding: 20,
        border: {
            color: '#ffffff',
            width: 4,
            opacity: '22',
            radius: 40,
            style: 'dashed'
        }
    },
};

// steeple 2 (patrol)
// steeple 4 (patrol)

const dialogue = [
    `That diamond is mine, I just have to pick it up.`,
    `The way is blocked, but the wall is weak in places.`,
    `There is another one over there.`,
    `This part of town looks long abandoned.`,
    `Hard to remember a time before the patrols now.`,
    `The Wizards' ascension to power was subtle at first.`,
    `There was a market here when I was younger.`,
    `Here they performed Minor miracles and eased maladies.`,
    `Mine own Father sought their treatment and returned lively.`,
    `These gems hold no value to them any longer.`,
    `For a time, things were peaceful.`,
    `We lived in a humble village, where my Father was a Jeweler.`,
    `I found great joy listening to him talk about the different kinds of gems.`,
    `He was excited about the arrival of the Plum Wizards.`,
    `Tragedy struck in the Spring, and Father had gotten ill.`,
    `Watchers around, better not let them see me.`,
    `That same Wizard pilfered our pockets until there was nothing left.`,
    `When Father fell ill again shortly after, they did nothing.`,
    `For our safety, patrols were sent through the streets.`,
    `The kindness had vanished, and so had our peace of mind.`,
    `I have returned from a faraway land for a singular purpose.`,
    `The Great Fire broke out and no one was safe from it’s burn.`,
    `Not even the Wizards were prepared for blistering heat.`,
    `All that is left are their automated machines…`,
    `...and the gems of a humble Jeweler.`,
    `Only a few more left now.`,
    `This is the last one.`,
    `Thank you for everything Father, may you rest well.`,
];



const levels: GemLevel[] = [
    // 1
    Level.of(gridConfig, [6, 3], [0, 1], [2, 0], [])
        .withMessage(dialogue[0])
        .withCellLength(60)
        .withLand([
            0, 0, 0,
            1, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 0, 0,
            0, 0, 0,
        ])
    ,
    // 2
    Level.of(gridConfig, [6, 4], [0, 0], [0, 3], [])
        .withMessage(dialogue[1])
        .withCellLength(60)
        .withLand([
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 1,
            0, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 0
        ]).withCracks([
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 2, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
            0, 0, 0, 0,
        ])
    ,
    // 3
    Level.of(gridConfig, [6, 4], [0, 0], [5, 3], [])
        .withMessage(dialogue[2])
        .withCellLength(60)
        .withLand([
            0, 1, 0, 0,
            0, 1, 0, 0,
            0, 1, 1, 1,
            0, 1, 0, 0,
            0, 1, 1, 1,
            0, 1, 0, 0
        ]).withCracks([
            0, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 0, 0,
            0, 2, 0, 0,
            0, 0, 2, 0,
            0, 0, 0, 0,
        ])
    ,
    // 4
    Level.of(gridConfig, [6, 6], [0, 0], [5, 3], [])
        .withMessage(dialogue[3])
        .withCellLength(50)
        .withLand([
            0, 1, 1, 0, 0, 0,
            1, 1, 1, 1, 0, 0,
            1, 1, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 0,
            0, 1, 0, 0, 0, 0,
        ]).withCracks([
            0, 0, 0, 0, 0, 0,
            1, 1, 2, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 2, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ])
    ,
    // 5
    Level.of(gridConfig, [7, 5], [0, 0], [6, 0], [
        { coord: [0, 2], type: 'Patrol', state: { dir: 'DOWN' } }
    ])
        .withMessage(dialogue[4])
        .withCellLength(55)
        .withLand([
            0, 0, 0, 0, 0,
            1, 1, 0, 1, 0,
            0, 0, 0, 0, 0,
            0, 1, 0, 1, 1,
            0, 0, 0, 0, 0,
            1, 1, 0, 1, 0,
            0, 0, 0, 0, 0,
        ])
    ,
    // 6
    Level.of(gridConfig, [6, 5], [0, 0], [5, 2], [
        { coord: [0, 2], type: 'Patrol', state: { dir: 'DOWN' } },
        { coord: [5, 4], type: 'Patrol', state: { dir: 'UP' } },
    ])
        .withMessage(dialogue[5])
        .withCellLength(60)
        .withLand([
            0, 1, 0, 1, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 1, 0,
            0, 1, 1, 1, 0,
            0, 1, 0, 0, 0,
        ])
    ,
    // 7
    Level.of(gridConfig, [5, 7], [0, 0], [4, 0], [
        { coord: [0, 4], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [1, 4], type: 'Patrol', state: { dir: 'LEFT' } },
    ])
        .withMessage(dialogue[6])
        .withCellLength(40)
        .withLand([
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 1, 0, 1, 0,
            1, 1, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0,
        ])
    ,
    // 8
    Level.of(gridConfig, [8, 6], [0, 0], [0, 2], [
        { coord: [5, 3], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [7, 5], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [1, 5], type: 'Patrol', state: { dir: 'LEFT' } },
    ])
        .withMessage(dialogue[7])
        .withCellLength(45)
        .withLand([
            0, 1, 0, 1, 1, 0,
            0, 1, 0, 0, 0, 0,
            0, 1, 1, 1, 1, 0,
            0, 0, 1, 0, 1, 0,
            0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 1, 0,
            0, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0,
        ]).withCracks([
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 2, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ])
    ,
    // 9
    Level.of(gridConfig, [8, 6], [0, 0], [0, 2], [
        { coord: [7, 5], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [2, 3], type: 'Patrol', state: { dir: 'LEFT' } },
    ])
        .withMessage(dialogue[8])
        .withCellLength(45)
        .withLand([
            0, 1, 0, 0, 1, 0,
            0, 1, 1, 1, 1, 0,
            0, 1, 0, 0, 1, 0,
            0, 1, 0, 0, 1, 0,
            0, 1, 0, 0, 1, 0,
            0, 1, 1, 1, 1, 0,
            0, 1, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0,
        ]).withCracks([
            0, 0, 0, 0, 0, 0,
            0, 0, 2, 0, 0, 0,
            0, 2, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ])
    ,
    // 10
    Level.of(gridConfig, [8, 7], [0, 0], [5, 4], [
        { coord: [1, 0], type: 'Patrol', state: { dir: 'RIGHT' } },
        { coord: [0, 6], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [3, 0], type: 'Patrol', state: { dir: 'RIGHT' } },
        { coord: [4, 0], type: 'Patrol', state: { dir: 'RIGHT' } },
        { coord: [6, 0], type: 'Patrol', state: { dir: 'RIGHT' } },
        { coord: [7, 0], type: 'Patrol', state: { dir: 'RIGHT' } },
    ])
        .withMessage(dialogue[9])
        .withCellLength(40)
        .withLand([
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 1, 0, 1,
            0, 0, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 1,
            0, 0, 0, 0, 0, 0, 0,
        ])
    ,
    // 11
    Level.of(gridConfig, [10, 5], [0, 0], [4, 4], [
        { coord: [0, 4], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [2, 4], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [9, 0], type: 'Patrol', state: { dir: 'UP' } },
        { coord: [9, 3], type: 'Patrol', state: { dir: 'UP' } },
    ])
        .withMessage(dialogue[10])
        .withCellLength(40)
        .withLand([
            0, 0, 0, 0, 0,
            1, 1, 1, 0, 1,
            0, 0, 0, 0, 0,
            1, 0, 1, 1, 1,
            0, 0, 1, 0, 0,
            0, 1, 0, 0, 1,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0,
        ]).withCracks([
            0, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 2, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
        ])
    ,
    // 12
    Level.of(gridConfig, [10, 10], [0, 0], [8, 9], [
        { coord: [5, 6], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [0, 3], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [6, 7], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [7, 4], type: 'Patrol', state: { dir: 'LEFT' } },
    ])
        .withMessage(dialogue[11])
        .withCellLength(30)
        .withLand([
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 1, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 0, 0, 1, 0, 1,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 0, 1, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ])
    ,
    // 13
    Level.of(gridConfig, [6, 6], [0, 0], [5, 5], [])
        .withMessage(dialogue[12])
        .withCellLength(40)
        .withLand([
            0, 0, 0, 0, 0, 0,
            0, 0, 1, 1, 0, 0,
            0, 0, 0, 1, 1, 0,
            0, 1, 0, 0, 0, 1,
            0, 0, 1, 1, 0, 0,
            0, 0, 0, 1, 1, 0,
        ]).withFire([
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 0,
        ])
    ,
    // 14
    Level.of(gridConfig, [6, 6], [0, 0], [5, 5], [])
        .withMessage(dialogue[13])
        .withCellLength(40)
        .withLand([
            0, 0, 0, 1, 0, 0,
            0, 0, 1, 1, 0, 0,
            0, 0, 0, 0, 1, 0,
            1, 1, 1, 0, 0, 1,
            0, 1, 0, 1, 0, 0,
            1, 0, 1, 1, 1, 0,
        ]).withCracks([
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 2, 0,
            0, 1, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
        ]).withFire([
            0, 0, 0, 2, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1,
            0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0,
        ])
    ,
    // 15
    Level.of(gridConfig, [9, 3], [0, 0], [8, 1], [
        { coord: [5, 2], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [0, 2], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [6, 2], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [7, 2], type: 'Patrol', state: { dir: 'LEFT' } },
    ])
        .withMessage(dialogue[14])
        .withCellLength(40)
        .withLand([
            0, 0, 0,
            0, 1, 1,
            0, 0, 0,
            0, 0, 0,
            1, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        ]).withFire([
            0, 0, 1,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
            0, 0, 0,
        ])
    ,
    // 16
    Level.of(gridConfig, [8, 7], [0, 0], [0, 6], [
        { coord: [1, 4], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [1, 1], type: 'Patrol', state: { dir: 'RIGHT' } },
        { coord: [2, 3], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [2, 0], type: 'Patrol', state: { dir: 'RIGHT' } },
        { coord: [2, 6], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [7, 6], type: 'Patrol', state: { dir: 'LEFT' } },
    ])
        .withMessage(dialogue[15])
        .withCellLength(40)
        .withLand([
            0, 0, 1, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 1, 0, 1, 0,
            1, 1, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
        ]).withCracks([
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 2, 0, 0, 0, 0, 0,
        ]).withFire([
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 0, 0, 0, 0, 0, 0,
        ])
    ,
    // 17
    Level.of(gridConfig, [9, 7], [0, 0], [8, 1], [
        { coord: [0, 5], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [2, 2], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [4, 2], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [6, 2], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [6, 4], type: 'Patrol', state: { dir: 'LEFT' } },
        { coord: [8, 4], type: 'Patrol', state: { dir: 'LEFT' } },
    ])
        .withMessage(dialogue[16])
        .withCellLength(35)
        .withLand([
            0, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0,
        ])
    ,
    // 18
    Level.of(gridConfig, [9, 7], [0, 0], [7, 6], [
        {
            coord: [1, 6],
            type: 'Watcher',
            state: {
                dir: 'LEFT',
                watching: [
                    [1, 0],
                    [1, 1],
                    [1, 2],
                    [1, 3],
                    [1, 4],
                    [1, 5],
                    [1, 6],
                ],
                triggered: undefined,
                origin: [4, 6]
            }
        },
        {
            coord: [4, 6],
            type: 'Watcher',
            state: {
                dir: 'LEFT',
                watching: [
                    [4, 0],
                    [4, 1],
                    [4, 2],
                    [4, 3],
                    [4, 4],
                    [4, 5],
                    [4, 6],
                ],
                triggered: undefined,
                origin: [4, 6]
            }
        },

    ])
        .withMessage(dialogue[17])
        .withCellLength(40)
        .withLand([
            0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 1, 0,
        ])
    ,
    {
        gridConfig: { ...gridConfig, dimensions: [9, 7] },
        playerCoord: [0, 0],
        gemCoord: [7, 6],
        land: MatrixUtil.from([9, 7], [
            0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 1, 0, 0, 1, 0,
            0, 0, 1, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 1, 0,
        ]),
        agents: [],
        watchers: [
            {
                coord: [0, 3],
                type: 'Watcher',
                state: {
                    dir: 'DOWN',
                    watching: [
                        [0, 3],
                        [1, 3],
                        [2, 3],
                        [3, 3],
                        [4, 3],
                        [5, 3],
                        [6, 3],
                        [7, 3],
                        [8, 3],
                    ],
                    triggered: undefined,
                    origin: [4, 6]
                }
            },
            {
                coord: [8, 4],
                type: 'Watcher',
                state: {
                    dir: 'UP',
                    watching: [
                        [0, 4],
                        [1, 4],
                        [2, 4],
                        [3, 4],
                        [4, 4],
                        [5, 4],
                        [6, 4],
                        [7, 4],
                        [8, 4],
                    ],
                    triggered: undefined,
                    origin: [4, 6]
                }
            },
        ]
    },
    {
        gridConfig: { ...gridConfig, dimensions: [3, 8] },
        playerCoord: [1, 0],
        gemCoord: [1, 7],
        land: MatrixUtil.from([3, 8], [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0,
        ]),
        agents: [
            { coord: [1, 4], type: 'Patrol', state: { dir: 'LEFT' } },
        ],
        watchers: [
            {
                coord: [0, 5],
                type: 'Watcher',
                state: {
                    dir: 'LEFT',
                    watching: [
                        [0, 0],
                        [0, 1],
                        [0, 2],
                        [0, 3],
                        [0, 4],
                        [0, 5],
                        [0, 6],
                        [0, 7],
                    ],
                    triggered: undefined,
                    origin: [0, 5]
                }
            },
            {
                coord: [2, 5],
                type: 'Watcher',
                state: {
                    dir: 'LEFT',
                    watching: [
                        [2, 0],
                        [2, 1],
                        [2, 2],
                        [2, 3],
                        [2, 4],
                        [2, 5],
                        [2, 6],
                        [2, 7],
                    ],
                    triggered: undefined,
                    origin: [2, 5]
                }
            },
        ]
    },
    {
        gridConfig: { ...gridConfig, dimensions: [8, 7] },
        playerCoord: [0, 0],
        gemCoord: [0, 6],
        land: MatrixUtil.from([8, 7], [
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0,
            1, 1, 1, 1, 1, 1, 0,
            0, 0, 0, 0, 1, 0, 0,
            0, 1, 1, 0, 1, 1, 0,
            0, 0, 1, 0, 1, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
        ]),
        agents: [
            { coord: [0, 2], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [1, 4], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [4, 3], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [7, 3], type: 'Patrol', state: { dir: 'LEFT' } },
        ],
        cracks: MatrixUtil.from([8, 7], [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 2, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
        ]),
        watchers: [
            {
                coord: [2, 6],
                type: 'Watcher',
                state: {
                    dir: 'LEFT',
                    watching: [
                        [2, 0],
                        [2, 1],
                        [2, 2],
                        [2, 3],
                        [2, 4],
                        [2, 5],
                        [2, 6],
                    ],
                    triggered: undefined,
                    origin: [2, 6]
                }
            },
        ],
        message: `Someone left the door open, so I went in.`
    },
    {
        gridConfig: { ...gridConfig, dimensions: [8, 7] },
        playerCoord: [5, 4],
        gemCoord: [0, 5],
        land: MatrixUtil.from([8, 7], [
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 1, 1, 0, 0, 0, 0,
            0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 1, 0, 1, 0,
            0, 1, 1, 1, 0, 1, 0,
            0, 0, 0, 1, 0, 1, 0,
            0, 0, 0, 1, 0, 1, 0,
        ]),
        cracks: MatrixUtil.from([8, 7], [
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 2, 0, 0, 0,
            0, 2, 2, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
        ]),
        agents: [
        ],
        watchers: [
            {
                coord: [0, 4],
                type: 'Watcher',
                state: {
                    dir: 'DOWN',
                    watching: [
                        [0, 4],
                        [1, 4],
                        [2, 4],
                        [3, 4],
                        [4, 4],
                        [5, 4],
                        [6, 4],
                    ],
                    triggered: undefined,
                    origin: [0, 4]
                }
            },
            {
                coord: [4, 0],
                type: 'Watcher',
                state: {
                    dir: 'LEFT',
                    watching: [
                        [4, 0],
                        [4, 1],
                        [4, 2],
                        [4, 3],
                    ],
                    triggered: undefined,
                    origin: [4, 0]
                }
            },
        ],
        message: `Despite all my rage...`
    },
    {
        gridConfig: { ...gridConfig, dimensions: [12, 7] },
        playerCoord: [0, 0],
        gemCoord: [0, 6],
        land: MatrixUtil.from([12, 7], [
            0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 1, 0,
            1, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 1, 1, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 1, 0,
            0, 1, 0, 1, 1, 1, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 1, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0,
        ]),
        agents: [
            { coord: [5, 4], type: 'Patrol', state: { dir: 'LEFT' } },
        ],
        message: `Boo.`
    },
    {
        gridConfig: { ...gridConfig, dimensions: [8, 7] },
        playerCoord: [0, 0],
        gemCoord: [0, 6],
        land: MatrixUtil.from([8, 7], [
            0, 0, 0, 0, 0, 1, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 1, 0, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 1, 0,
        ]),
        agents: [
            { coord: [0, 2], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [1, 4], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [1, 5], type: 'Patrol', state: { dir: 'RIGHT' } },
            { coord: [2, 1], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [3, 5], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [3, 2], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [4, 0], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [4, 2], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [4, 5], type: 'Patrol', state: { dir: 'LEFT' } },
            { coord: [5, 0], type: 'Patrol', state: { dir: 'RIGHT' } },
            { coord: [6, 0], type: 'Patrol', state: { dir: 'LEFT' } },
        ],
        message: `Someone left the door open, so I went in.`
    },
    {
        gridConfig: { ...gridConfig, cellLength: 40, dimensions: [11, 5] },
        playerCoord: [0, 2],
        gemCoord: [10, 2],
        land: MatrixUtil.from([11, 5], [
            0, 1, 0, 1, 0,
            0, 1, 0, 1, 0,
            0, 1, 0, 1, 0,
            1, 1, 0, 1, 1,
            0, 1, 0, 1, 0,
            0, 1, 0, 1, 0,
            0, 1, 0, 1, 0,
            1, 1, 0, 1, 1,
            0, 1, 0, 1, 0,
            0, 1, 0, 1, 0,
            0, 1, 0, 1, 0,
        ]),
        agents: [
            { coord: [0, 0], type: 'Patrol', state: { dir: 'DOWN' } },
            { coord: [5, 0], type: 'Patrol', state: { dir: 'DOWN' } },
            { coord: [10, 0], type: 'Patrol', state: { dir: 'UP' } },

            { coord: [2, 4], type: 'Patrol', state: { dir: 'UP' } },
            { coord: [5, 4], type: 'Patrol', state: { dir: 'UP' } },
            { coord: [8, 4], type: 'Patrol', state: { dir: 'DOWN' } },
        ],
        message: `He said to observe very carefully in order to spot a fake.`
    },

];

export default levels;