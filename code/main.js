images = {
    "logo": "fulllogo.png",
    "button": "button.png",
    "squares": "squares.png",

    "screw1": "screw1.png",
    "screw2": "screw2.png",
    "screw3": "screw3.png",

    whiteDiscord: "white-dc-logo.png",
    whiteNotes: "white-patch-notes.png",
    whiteWebsite: "white-website.png",
    whiteStats: "white-stats.png",
}
FONT = "Raleway";
GAMENAME = "Screwed Squares";
wggjLoadImages();
wggjLoop();

function customWGGJLoop(tick) {
    game.stats.playtime += tick / 1000;
}

function isMobile() {
    if (game.settings.device == "pc") return false;
    if (game.settings.device == "mobile") return true;
    return /Mobi/i.test(window.navigator.userAgent) || wggjCanvasWidth <= 480;
}

function save() {
    localStorage.setItem("ScrewedSquares", "6csq" + btoa(JSON.stringify(game)));
}

function exportGame() {
    let save = game;
    save = JSON.stringify(save);
    save = "6csq" + btoa(save);
    navigator.clipboard.writeText(save);
}

function importGame() {
    let save = prompt("Insert the code here...");
    try {
        save = atob(save.slice(4));
        save = JSON.parse(save);

        game = new SaveGame();
        game.loadFromSaveGame(save);
    }
    catch {
        alert("Wrong!");
    }
}

function customWGGJInit() {
    let cachedGame = localStorage.getItem("ScrewedSquares");
    if (cachedGame != undefined) {
        game.loadFromSaveGame(JSON.parse(atob(cachedGame.slice(4))));
    }
}