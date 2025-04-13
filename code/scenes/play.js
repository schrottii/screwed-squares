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

    // the main square, here its variables are saved (OOP)
    // w and h are done beforehand so they can be subtracted from the x and y to avoid going out of bounds
    let randomW = Math.max(0.2, 0.6 * Math.random());
    let randomH = Math.max(0.1, 0.4 * Math.random());

    createImage(
        me,
        0 + Math.random() * (1 - randomW),
        0.175 + Math.random() * (0.75 - randomH),
        randomW,
        randomH,
        "squares"
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

    //console.log(objects["item" + round.generatedItems]);

    // increase counter by 1
    round.generatedItems++;
    round.activeItems++;
}

function generateScrew() {
    let item = objects["item" + (round.generatedItems - 1)];
    let screwNR = item.screwgen[0]; // 0 - 3
    item.screwgen.shift();

    let me = "item" + (round.generatedItems - 1) + "screw" + screwNR;

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
            if (me.power == false || round.paused == true || !me.item.top || me.image != "screw1") return false;
            me.image = "screw2";

            // is this the right screw?
            if (me.screwNR == me.item.order[me.item.order.length - 1]) {
                // correct one, make it disappear
                me.item.order.pop();
                setTimeout(() => me.image = "screw3", 250);
                setTimeout(() => me.power = false, 500);

                // +1 screw!
                round.screws++;
                game.stats.ulScrews++;
                if (round.screws > game.stats.ulHiScrews) game.stats.ulHiScrews = round.screws;

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
    game.stats.ulTime += round.timePassed;
    if (round.timePassed > game.stats.ulHiTime) game.stats.ulHiTime = round.timePassed;

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



        wggjAudio.src = "audio/hard-edm-phonk-gaming-music-160048.mp3";
        wggjAudio.volume = game.settings.music ? 0.5 : 0;
        if (game.settings.music) wggjAudio.play();
    },
    (tick) => {
        // Loop
        if (!round.paused && !round.over) {
            round.timePassed += tick;
        }
        else {
            if (round.toGenerate > 0) {
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
            round.toGenerate = 3;
        }

        objects["timeRemaining"].w = 1 * ((round.timeAllowed - round.timePassed) / round.timeAllowed);
        objects["timeText"].text = round.paused ? "" : (round.timeAllowed - round.timePassed).toFixed(1) + "/" + round.timeAllowed + "s";

        objects["screwsAmount"].text = "Screws: " + round.screws;

        // Game over
        if (round.timePassed >= round.timeAllowed) {
            round.paused = true;
            round.over = true;

            createImage("diaBg", 0.1, 0.3, 0.8, 0.4, "button");
            createText("diaTxt", 0.5, 0.4, "Game over", { size: 48, color: "#773D00" });
            createText("diaTxt2", 0.5, 0.45, "Screws: " + round.screws, { size: 48, color: "#773D00" });
            createText("diaTxt3", 0.5, 0.5, "Time: " + round.timePassed.toFixed(0) + "s", { size: 48, color: "#773D00" });
            createButton("diaButton", 0.2, 0.55, 0.6, 0.1, "button", () => {
                leavePlay();
            });
            createText("diaButtonTxt", 0.5, 0.625, "Return", { size: 48, color: "#773D00" });
        }
    }
);