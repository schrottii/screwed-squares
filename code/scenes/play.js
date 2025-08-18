var round = {
    paused: true,
    over: false,

    timePassed: 0,
    timeAllowed: 30,
    screws: 0,

    generatedItems: 0,
    activeItems: 0,
    toGenerate: 3,
}

var generateTime = 0;
var generateScrewCounter = 0;

function generateItem() {
    // function to generate one of those squares
    let me = "item" + round.generatedItems;
    let w, h, x, y;

    // the main square, here its variables are saved (OOP)
    // w and h are done beforehand so they can be subtracted from the x and y to avoid going out of bounds

    if (playMode == "unlimited") {
        w = Math.max(0.2, 0.6 * Math.random());
        h = Math.max(0.1, 0.4 * Math.random());
        x = 0 + Math.random() * (0.975 - w);
        y = 0.175 + Math.random() * (0.75 - h);
    }
    if (playMode == "worlds") {
        if (round.generatedItems >= currentLevel().squares.length) return false;
        let sq = currentLevel().squares[round.generatedItems];
        [x, y, w, h] = sq;
    }

    createImage(
        me, x, y, w, h, "squares"
    );
    objects[me].snip = [128 * Math.floor(6 * Math.random()), 0, 128, 128];
    //createSquare(me + "inner", item.x + 0.01, item.y + 0.01, item.w - 0.02, item.h - 0.02, "lime");
    let item = objects[me];

    // variablo generato
    // var for "am I on top?"
    item.prev = (round.generatedItems - 1);
    item.top = true;
    if (objects["item" + (round.generatedItems - 1)] != undefined) objects["item" + (round.generatedItems - 1)].top = false;

    // decide how many screws this has, and then the order
    // top right = 0, top left = 1, bottom left = 2, bottom right = 3
    if (playMode == "unlimited" || currentLevel().squares[round.generatedItems][4] == undefined) {
        let randAdd = -1;
        item.screws = 2 + Math.floor(3 * Math.random());

        item.order = [];
        item.screwgen = [];
        while (item.order.length < item.screws) {
            randAdd = Math.floor(item.screws * Math.random());
            if (!item.order.includes(randAdd)) {
                item.order.push(randAdd);
                item.screwgen.push(randAdd);
            }
        }
        generateScrewCounter = item.screws;
    }
    else {
        item.order = [];
        item.screwgen = [];

        for (let sc in currentLevel().squares[round.generatedItems][4]) {
            item.order.push(currentLevel().squares[round.generatedItems][4][sc]);
            item.screwgen.push(currentLevel().squares[round.generatedItems][4][sc]);
        }
        generateScrewCounter = item.screwgen.length;
    }

    // increase counter by 1
    round.generatedItems++;
    round.activeItems++;
}

function generateScrew() {
    let item = objects["item" + (round.generatedItems - 1)];
    let screwNR = item.screwgen[0]; // 0 - 3
    item.screwgen.shift();

    let me = "item" + (round.generatedItems - 1) + "screw" + screwNR;

    if (item.screwgen.length != 0) {
        sound.volume = 0.5;
        sound.src = "audio/516858__lilmati__retro-drop-03.wav";
        if (game.settings.sounds) sound.play();
    }
    else {
        sound.volume = 0.5;
        sound.src = "audio/415991__lilmati__retro-drop-01.wav";
        if (game.settings.sounds) sound.play();
    }

    createButton(
        me,
        (item.x + item.w * (screwNR == 1 || screwNR == 2 ? 0.1 : 0.9)),
        (item.y - 0.05 + item.h * (screwNR == 0 || screwNR == 1 ? 0 : 0.9)),
        0.1,
        0.1,
        "screw1",
        (c) => {
            let me = objects[c];

            // don't do anything if disabled or not the front item
            if (me.power == false || round.paused == true || !me.item.top || me.image != "screw1") {
                sound.volume = 1;
                sound.src = "audio/242503__gabrielaraujo__failurewrong-action.wav";
                if (game.settings.sounds) sound.play();
                return false;
            }
            me.image = "screw2";

            // is this the right screw?
            if (me.screwNR == me.item.order[me.item.order.length - 1]) {
                // correct one, make it disappear
                me.item.order.pop();
                setTimeout(() => me.image = "screw3", 250);
                setTimeout(() => me.power = false, 500);

                // +1 screw!
                round.screws++;
                if (playMode == "unlimited") {
                    game.stats.ulScrews++;
                    if (round.screws > game.stats.ulHiScrews) game.stats.ulHiScrews = round.screws;
                }
                if (playMode == "worlds") {
                    game.stats.woScrews++;
                    if (round.screws > game.stats.woHiScrews) game.stats.woHiScrews = round.screws;
                }

                sound.volume = 1;
                sound.src = "audio/164246__soniktec__metallic-sound-pack-14.wav";
                if (game.settings.sounds) sound.play();

                // all gone?? square gone!!
                if (me.item.order.length == 0) {
                    me.item.top = false;
                    if (objects["item" + me.item.prev] != undefined) objects["item" + me.item.prev].top = true;

                    me.item.power = false;
                    round.activeItems -= 1;

                    round.timeAllowed += 5;
                }
            }
            else {
                sound.volume = 1;
                sound.src = "audio/242503__gabrielaraujo__failurewrong-action.wav";
                if (game.settings.sounds) sound.play();

                round.timeAllowed -= 5;
                setTimeout(() => me.image = "screw1", 250);
            }
        },
        { centered: true, quadratic: true }
    );
    objects[me].screwNR = screwNR;
    objects[me].item = item;

    generateScrewCounter -= 1;
    if (item.screwgen.length == 0) round.toGenerate -= 1;
}

function leavePlay() {
    round.paused = true;
    if (playMode == "unlimited") {
        game.stats.ulTime += round.timePassed;
        if (round.timePassed > game.stats.ulHiTime) game.stats.ulHiTime = round.timePassed;
    }
    if (playMode == "worlds") {
        game.stats.woTime += round.timePassed;
        if (round.timePassed < game.stats.woHiTime) game.stats.woHiTime = round.timePassed;
    }

    save();
    loadScene("mainmenu");
}

scenes["play"] = new Scene(
    () => {
        // Init
        round = {
            paused: true,
            over: false,

            timePassed: 0,
            timeAllowed: 30,
            screws: 0,

            generatedItems: 0,
            activeItems: 0,
            toGenerate: 3,
        }

        createSquare("bg", 0, 0, 1, 1, "#EA7623");
        createSquare("bg2", 0, 0.15, 1, 0.8, "#FFBF66");

        // Header
        createButton("logo", 0.1, 0.0125, 0.075, 0.075, "logo", () => {
            leavePlay();
        }, { quadratic: true, centered: true });
        createText("modeText", 0.5, 0.04, "Unlimited Mode", { size: 30, color: "#773D00", noScaling: true });

        createText("screwsAmount", 0.5, 0.08, "Screws: 0", { size: 30, color: "#773D00", noScaling: true });

        // Time bar
        createSquare("timeBG", 0, 0.1, 1, 0.05, "black");
        createSquare("timeRemaining", 0, 0.1, 0.1, 0.05, "lightblue");
        createText("timeText", 0.5, 0.14, "0", { size: 30, color: "red", noScaling: true });


        round.toGenerate = playMode == "unlimited" ? 3 : Math.min(currentLevel().maxSquares, currentLevel().squares.length);
        if (playMode == "worlds") round.timeAllowed = currentLevel().time;
        if (playMode == "worlds") objects["modeText"].text = currentLevel().name;

        if (!wggjAudio.src.includes("audio/Im_Squared.mp3")) wggjAudio.src = "audio/Im_Squared.mp3";
        wggjAudio.volume = game.settings.music ? 0.5 : 0;
        if (game.settings.music) wggjAudio.play();
    },
    (tick) => {
        // Loop
        if (!round.paused && !round.over) {
            round.timePassed += tick;
        }
        else {
            if ((round.toGenerate > 0 || generateScrewCounter > 0) && !round.over) {
                // Generate stuff!
                if (generateTime <= 0) {
                    if (generateScrewCounter <= 0) {
                        // new item
                        generateItem();
                        generateTime = 0.200 / (1 + round.screws / 100);
                    }
                    else {
                        // screw for an existing item
                        generateScrew();
                        generateTime = 0.400 / (1 + round.screws / 100);
                    }
                }
                else {
                    generateTime -= tick;
                }
            }
            else {
                // all generated, let's go
                round.paused = false;
            }
        }

        if (round.activeItems == 0) {
            round.paused = true;
            round.toGenerate = playMode == "unlimited" ? 3 : Math.min(currentLevel().maxSquares, currentLevel().squares.length);
        }

        if (sound2.src == "" && round.timeAllowed - round.timePassed < 4) {
            sound2.src = "audio/321084__benjaminnelan__clock-ticking.wav";
            if (game.settings.sounds) sound2.play();
        }

        objects["timeRemaining"].w = 1 * ((round.timeAllowed - round.timePassed) / round.timeAllowed);
        objects["timeText"].text = round.paused ? "" : (round.timeAllowed - round.timePassed).toFixed(1) + "/" + round.timeAllowed + "s";

        objects["screwsAmount"].text = "Screws: " + round.screws;

        // Win
        if (playMode == "worlds" && round.generatedItems >= currentLevel().squares.length && round.activeItems == 0) {
            // you got 'em all
            round.paused = true;
            round.over = true;


            createImage("diaBg", 0.1, 0.3, 0.8, 0.4, "button");
            createText("diaTxt", 0.5, 0.4, "You win", { size: 48, color: "#773D00" });
            createText("diaTxt2", 0.5, 0.45, "Screws: " + round.screws, { size: 48, color: "#773D00" });
            createText("diaTxt3", 0.5, 0.5, "Time: " + round.timePassed.toFixed(0) + "s", { size: 48, color: "#773D00" });
            createButton("diaButton", 0.2, 0.55, 0.6, 0.1, "button", () => {
                if (playMode == "worlds") game.stats.woCompletions++;
                if (playMode == "worlds" && !game.completedLevels.includes(currentLevel().getSaveID())) game.completedLevels.push(currentLevel().getSaveID());
                leavePlay();
            });
            createText("diaButtonTxt", 0.5, 0.625, "Return", { size: 48, color: "#773D00" });
        }

        // Game over
        if (round.timePassed >= round.timeAllowed) {
            round.paused = true;
            round.over = true;


            createImage("diaBg", 0.1, 0.3, 0.8, 0.4, "button");
            createText("diaTxt", 0.5, 0.4, "Game over", { size: 48, color: "#773D00" });
            createText("diaTxt2", 0.5, 0.45, "Screws: " + round.screws, { size: 48, color: "#773D00" });
            createText("diaTxt3", 0.5, 0.5, "Time: " + round.timePassed.toFixed(0) + "s", { size: 48, color: "#773D00" });
            createButton("diaButton", 0.2, 0.55, 0.6, 0.1, "button", () => {
                if (playMode == "worlds") game.stats.woFails++;
                leavePlay();
            });
            createText("diaButtonTxt", 0.5, 0.625, "Return", { size: 48, color: "#773D00" });
        }
    }
);