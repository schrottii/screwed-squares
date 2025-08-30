var round = {
    paused: true,
    over: false,
    wincase: 0,

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

    let y = (item.y - 0.05 + item.h * (screwNR == 0 || screwNR == 1 ? 0 : 0.9));

    createButton(
        me,
        (item.x + item.w * (screwNR == 1 || screwNR == 2 ? 0.1 : 0.9)),
        y,
        0.1,
        0.1,
        "screw1",
        (c) => {
            let me = objects[c];

            // don't do anything if disabled or not the front item
            if (me.power == false || round.paused == true || round.over == true || !me.item.top || me.image != "screw1") {
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

                    if (!game.settings.hardmode) round.timeAllowed += 5;
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

    createAnimation("screw" + me, me, (t, d, a) => t.y = y - 0.05 * (1 - (a.dur / a.maxDur)), 0.33);

    generateScrewCounter -= 1;
    if (item.screwgen.length == 0) round.toGenerate -= 1;
}

function generateSandkorn(s) {
    if (s >= currentLevel().features["sandstorm"].amount) return false;
    if (objects["sandkorn" + s] != undefined) {
        let obj = Object.assign({}, objects["sandkorn" + s]);
        delete objects["sandkorn" + s];
        createSquare("sandkorn" + s, obj.x, obj.y, obj.w, obj.h, obj.color, obj.config);
        objects["sandkorn" + s].speedmod = 0.5 * Math.random() + 0.5;
    }
    else {
    createSquare("sandkorn" + s, -0.1 + -0.7 * Math.random(), 0.7 * Math.random() + 0.2, 0.01, 0.01, "yellow", { quadratic: true });
    objects["sandkorn" + s].speedmod = 0.5 * Math.random() + 0.5;
        createAnimation("anisand" + s, "sandkorn" + s, (t, d) => {
        if (t == undefined) return false;
        t.x += 0.5 * d * t.speedmod * currentLevel().features["sandstorm"].speed;
        if (Math.random() > 0.99) t.y -= 0.01;
        if (Math.random() > 0.99) t.y += 0.01;
        if (t.x > 1.1) t.x = -0.1;
    }, 0);
    }
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
            wincase: 0,

            timePassed: 0,
            timeAllowed: 30,
            screws: 0,

            generatedItems: 0,
            activeItems: 0,
            toGenerate: 3,
        }

        createSquare("bg", 0, 0, 1, 1, "#EA7623");
        createSquare("bg2", 0, 0.15, 1, 0.8, "#FFBF66");
        if (playMode == "worlds") createImage("bg3", 0, 0.15, 1, 0.8, "world" + playWorld + "_bg");

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

        // round preparations
        round.toGenerate = playMode == "unlimited" ? 3 : Math.min(currentLevel().maxSquares, currentLevel().squares.length);
        if (playMode == "worlds") round.timeAllowed = game.settings.hardmode ? Math.floor(currentLevel().time / 2) : currentLevel().time;
        if (playMode == "worlds") objects["modeText"].text = currentLevel().name;

        // AUDIO / MUSIC
        let aaudio = "";
        if (playMode == "unlimited") {
            aaudio = "audio/Im_Squared.mp3";
        }
        else {
            aaudio = [
                "audio/Kittearth_SCSQ.mp3",
                "audio/Pyrascrewa.mp3"
            ][playWorld - 1];
        }

        if (!wggjAudio.src.includes(aaudio)) wggjAudio.src = aaudio;
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

                        // sandstorm
                        if (playMode == "worlds" && currentLevel().features["sandstorm"] != undefined) {
                            for (let s = 0; s < currentLevel().features["sandstorm"].amount; s++) {
                                generateSandkorn(s);
                            }
                        }
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

        // Win / lose
        if (playMode == "worlds" && round.generatedItems >= currentLevel().squares.length && round.activeItems == 0 && !round.over) round.wincase = 1; // win
        if (round.timePassed >= round.timeAllowed && !round.over) round.wincase = 2; // lose

        if (round.wincase != 0 && !round.over) {
            // you got 'em all
            round.paused = true;
            round.over = true;

            let canNext = playMode == "worlds" && (game.completedLevels.includes(currentLevel().getSaveID()) || round.wincase == 1) && currentWorld()[playLevel + 1] != undefined;

            createImage("diaBg", 0.1, 0.3, 0.8, 0.4, "button");
            createText("diaTxt", 0.5, 0.4, round.wincase == 1 ? "You win" : "Game over", { size: 48, color: "#773D00" });
            createText("diaTxt2", 0.5, 0.45, "Screws: " + round.screws, { size: 48, color: "#773D00" });
            createText("diaTxt3", 0.5, 0.5, "Time: " + round.timePassed.toFixed(0) + "s", { size: 48, color: "#773D00" });
            createButton("diaButton", 0.2, 0.55, canNext ? 0.3 : 0.6, 0.1, "button", () => {
                buttonClick();
                if (round.wincase == 1 && playMode == "worlds") { // win
                    game.stats.woCompletions++;
                    if (!game.completedLevels.includes(currentLevel().getSaveID())) game.completedLevels.push(currentLevel().getSaveID());
                }
                else { // lose
                    if (playMode == "worlds") game.stats.woFails++;
                }
                leavePlay();
            });
            createText("diaButtonTxt", canNext ? 0.35 : 0.5, 0.625, "Return", { size: 48, color: "#773D00" });

            if (canNext) {
                createButton("diaButton2", 0.5, 0.55, 0.3, 0.1, "button", () => {
                    if (playMode == "worlds") {
                        buttonClick();

                        game.stats.woCompletions++;
                        if (!game.completedLevels.includes(currentLevel().getSaveID())) game.completedLevels.push(currentLevel().getSaveID());

                        playLevel = playLevel + 1;

                        loadScene("worlds");
                        loadScene("play");
                    }
                });
                createText("diaButton2Txt", 0.65, 0.625, "Next", { size: 48, color: "#773D00" });

                createAnimation("winAni7", "diaButton2", (t, d, a) => t.y = 0.55 - 1 * (1 - (a.dur / a.maxDur)), 1);
                createAnimation("winAni8", "diaButton2Txt", (t, d, a) => t.y = 0.625 - 1 * (1 - (a.dur / a.maxDur)), 1);
            }

            createAnimation("winAni1", "diaBg", (t, d, a) => t.y = 0.3 - 1 * (1 - (a.dur / a.maxDur)), 1);
            createAnimation("winAni2", "diaTxt", (t, d, a) => t.y = 0.4 - 1 * (1 - (a.dur / a.maxDur)), 1);
            createAnimation("winAni3", "diaTxt2", (t, d, a) => t.y = 0.45 - 1 * (1 - (a.dur / a.maxDur)), 1);
            createAnimation("winAni4", "diaTxt3", (t, d, a) => t.y = 0.5 - 1 * (1 - (a.dur / a.maxDur)), 1);
            createAnimation("winAni5", "diaButton", (t, d, a) => t.y = 0.55 - 1 * (1 - (a.dur / a.maxDur)), 1);
            createAnimation("winAni6", "diaButtonTxt", (t, d, a) => t.y = 0.625 - 1 * (1 - (a.dur / a.maxDur)), 1);
        }
    }
);