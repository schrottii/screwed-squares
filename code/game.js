// Game made by Schrottii - don't steal or cheat

class SaveGame {
    new() {
        this.id = Math.random().toString(16).slice(2);
        this.name = "Player";

        this.stats = {
            playtime: 0,

            ulScrews: 0,
            ulHiScrews: 0,
            ulTime: 0,
            ulHiTime: 0,

            woScrews: 0,
            woHiScrews: 0,
            woTime: 0,
            woHiTime: 0,
            woCompletions: 0,
            woFails: 0
        }
        this.settings = {
            music: true,
            sounds: true,
            device: "automatic",
            hardmode: false
        }
        this.completedLevels = [];
    }
    loadFromSaveGame(sg) {
        this.id = sg.id;
        this.name = sg.name;

        this.stats = Object.assign({}, defaultSave.stats, sg.stats);
        this.settings = Object.assign({}, defaultSave.settings, sg.settings);
        this.completedLevels = Object.assign([], sg.completedLevels);
    }
}

var defaultSave = new SaveGame();
defaultSave.new();

var game = new SaveGame();
game.new();