class Level {
    constructor(world, name, time, maxSquares, squares) {
        this.world = world;
        this.name = name;
        this.time = time;
        this.maxSquares = maxSquares;
        this.squares = squares;
    }

    getSaveID() {
        return "w" + this.world + ":" + this.name;
    }
}

/*

        new Level("Square One", 120, [

        ]),
*/

function currentLevel() {
    return worlds.world1[playLevel - 1];
}

const worlds = {
    world1: [
        new Level(1, "Square One", 120, 1, [
            [0.3, 0.3, 0.4, 0.4, [0, 1, 2, 3]]
        ]),
        new Level(1, "Random One", 90, 1, [
            [0.3, 0.3, 0.4, 0.4]
        ]),
        new Level(1, "A Triple", 90, 3, [
            [0.3, 0.3, 0.4, 0.4, [0, 1,]],
            [0.3, 0.3, 0.4, 0.4, [0, 1, 2]],
            [0.3, 0.3, 0.4, 0.4, [0, 1, 2, 3]]
        ]),
        new Level(1, "Row Your Square", 90, 3, [
            [0.2, 0.2, 0.6, 0.2, [0, 1,]],
            [0.2, 0.4, 0.6, 0.2, [0, 1, 2]],
            [0.2, 0.6, 0.6, 0.2, [0, 1, 2, 3]]
        ]),
        new Level(1, "Don't Panic", 60, 1, [
            [0.2, 0.2, 0.3, 0.3, [3, 2, 1]],
            [0.4, 0.6, 0.3, 0.3, [2, 1, 3]],
            [0.4, 0.4, 0.3, 0.3, [1, 0, 2]]
        ]),
    ]
}