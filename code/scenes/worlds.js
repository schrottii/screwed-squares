function toggleWorldsLevels(world, back = false) {
    for (let o in objects) {
        if (o.includes("world")) objects[o].power = back;
        if (o.includes("level")) {
            if (!o.includes("t") && (o.split("_")[1] == 1 ||
                (currentWorld()[parseInt(o.split("_")[1]) - 2] != undefined
                    && game.completedLevels.includes(currentWorld()[parseInt(o.split("_")[1]) - 2].getSaveID())))) { // - 2 because it has to be the PREVIOUS
                objects[o].image = "button";
            }
            else objects[o].image = "buttonOff";

            objects[o].power = !back;
        }
    }
}

function loadLevel(nr) {
    playMode = "worlds";
    playLevel = nr;
    loadScene("play");
}

scenes["worlds"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "#EA7623");
        createSquare("bg2", 0, 0.3, 1, 0.65, "#FFBF66");

        createImage("logo", 0.5, 0, 0.4, 0.3, "logo", { quadratic: true, centered: true });
        createText("version", 0.975, 0.985, "Version " + gameVersion, { color: "#773D00", size: 40, align: "right" });

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            if (objects["level_1"].power) toggleWorldsLevels(0, true);
            else loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", { size: 40 });

        createButton("world1", 0.3, 0.4, 0.2, 0.2, "world1", () => {
            playWorld = 1;
            setTimeout("toggleWorldsLevels(1)", 100);
        }, { quadratic: true, centered: true });
        createText("world1t", 0.3, 0.7, "World 1", { size: 40, color: "#773D00" });

        createButton("world2", 0.7, 0.4, 0.2, 0.2, "world2", () => {
            playWorld = 2;
            setTimeout("toggleWorldsLevels(2)", 100);
        }, { quadratic: true, centered: true });
        createText("world2t", 0.7, 0.7, "World 2", { size: 40, color: "#773D00" });

        createContainer("containerLevels", 0, 0.3, 1, 0.5, { XScroll: true, XLimit: [0.001, 3], power: true }, []);

        let w = 0.1;
        for (let i = 1; i <= 10; i++) {
            createButton("level_" + i, 0.125 + ((i - 1) * w), 0.45, w, w, "button", function() {
                if (this.image == "button" && this.power) {
                    loadLevel(i);
                }
            }, { power: false, alpha: 1 });
            createText("level_" + i + "t", 0.125 + ((i - 1) * w) + (w / 2), 0.45 + (w * 2/3), i, { size: 40, color: "#773D00", power: false });
            objects["level_" + i].power = false;
            objects["level_" + i + "t"].power = false;

            objects["containerLevels"].children.push("level_" + i);
            objects["containerLevels"].children.push("level_" + i + "t");
        }

        createImage("king", 0.5, 0.4, 0.2, 0.2, "king", { quadratic: true, centered: true, alpha: game.completedLevels.length == 20 });
        createText("world2t", 0.7, 0.7, "World 2", { size: 40, color: "#773D00" });

        objects["containerLevels"].XLimit[1] = objects["containerLevels"].children.length / 2 * w - 0.75;
    },
    (tick) => {
        // Loop
    }
);