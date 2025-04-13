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
        }
        this.settings = {
            music: true,
            device: "automatic",
        }
    }
    loadFromSaveGame(sg) {
        this.id = sg.id;
        this.name = sg.name;

        this.stats = sg.stats;
        this.settings = sg.settings;
    }
}

var game = new SaveGame();
game.new();