function toggleWorldsLevels(world, back = false) {
    for (let o in objects) {
        if (o.includes("world")) objects[o].power = back;
        if (o.includes("level")) {
            if (!o.includes("t") && (o.split("_")[1] == 1 || game.completedLevels.includes(worlds.world1[parseInt(o.split("_")[1]) - 2].getSaveID()))) objects[o].image = "button";
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
        createText("version", 0.975, 0.975, "Version " + gameVersion, { color: "#773D00", size: 40, align: "right" });

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            if (objects["level_1"].power) toggleWorldsLevels(0, true);
            else loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", { size: 40 });

        createButton("world1", 0.5, 0.4, 0.2, 0.2, "world1", () => {
            setTimeout("toggleWorldsLevels(1)", 200);
        }, { quadratic: true, centered: true });
        createText("world1t", 0.5, 0.7, "World 1", { size: 40, color: "#773D00" });

        for (let i = 1; i <= 5; i++) {
            createButton("level_" + i, 0.2 + i * 0.1, 0.4, 0.2, 0.2, "button", function() {
                if (this.image == "button" && this.power) {
                    loadLevel(i);
                }
            }, { quadratic: true, centered: true, power: false });
            createText("level_" + i + "t", 0.2 + i * 0.1, 0.525, i, { size: 40, color: "#773D00", power: false });
            objects["level_" + i].power = false;
            objects["level_" + i + "t"].power = false;
        }
    },
    (tick) => {
        // Loop
    }
);