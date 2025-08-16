var gameVersion = "1.1";
var newestVersion = 1;
var selectedVersion = newestVersion;

const patchnotes = {
    "v1.0":
    [
        `
- Game release
`
        ],
    "v1.1":
        [
            `
-> Worlds:
- A new way to play the game! Instead of endless random spawns, play fixed levels
- Every level has different time, squares and screws
- The Squares are always in the same places, and Screws usually too (they CAN be random)
- Complete the levels one by one, locked levels are gray
- Added World 1
- World 1: Added the first five levels
- More will come

-> Audio:
- Replaced both menu music and game music, with new songs I made
- Music no longer resets between menus
- Added five sound effects (screws spawning, unscrewing, wrong screw, time running out)
- Added sound effect setting

-> Other:
- Added Patch Notes menu
- Added buttons for Worlds and Patch Notes to main menu
- Increased max. name length from 12 to 16
`
        ]
}

scenes["patchnotes"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "#EA7623");

        createText("header", 0.5, 0.1, "Patch notes", { size: 80 });

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", { size: 40 });

        // Top navigation
        createSquare("topBgSquare", 0.1, 0.1, 0.8, 0.1, "darkgray");
        createSquare("midBgSquare", 0.1, 0.2, 0.8, 0.65, "gray");

        createButton("goLeft", 0.1, 0.1, 0.1, 0.1, "button", () => {
            if (selectedVersion > 0) selectedVersion -= 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goLeftText", 0.15, 0.185, "<", { size: 60 });

        createButton("goRight", 0.8, 0.1, 0.1, 0.1, "button", () => {
            if (selectedVersion < newestVersion) selectedVersion += 1;
            objects["versionText"].text = "Version " + Object.keys(patchnotes)[selectedVersion];
        });
        createText("goRightText", 0.85, 0.185, ">", { size: 60 });

        createText("versionText", 0.5, 0.185, "Version v" + gameVersion, { size: 40 });

        for (vtc = 0; vtc < 32; vtc++) {
            createText("text" + vtc, 0.1125, 0.225 + (0.02 * vtc), "", { size: 20, align: "left" });
        }
    },
    (tick) => {
        // Loop

        let currentVersionText = patchnotes[Object.keys(patchnotes)[selectedVersion]];
        if (currentVersionText.length == 1) {
            currentVersionText = currentVersionText[0].split("\n");
            currentVersionText.shift();
        }

        for (vt = 0; vt < 32; vt++) {
            if (vt < currentVersionText.length) {
                objects["text" + vt].text = currentVersionText[vt];
                if (objects["text" + vt].text.substr(0, 2) == "->") {
                    objects["text" + vt].fontSize = 24;
                    objects["text" + vt].x = 0.1125;
                }
                else {
                    objects["text" + vt].fontSize = 20;
                    objects["text" + vt].x = 0.125;
                }
            }
            else {
                objects["text" + vt].text = "";
            }
        }
    }
);