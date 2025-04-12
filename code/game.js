// Game made by Schrottii - don't steal or cheat

class SaveGame {
    new() {
        this.id = Math.random().toString(16).slice(2);
        this.name = "Player";

        this.stats = {
            highscore: 0,
        }
        this.settings = {
            music: true,
            device: "automatic",
        }
    }
    loadFromSaveGame(sg) {
        this.id = sg.id;
        this.name = sg.name;
    }
}

var game = new SaveGame();
game.new();