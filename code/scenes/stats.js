// Game made by Schrottii - don't steal or cheat

scenes["stats"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "#EA7623");

        createText("header", 0.5, 0.2, "Stats", { size: 80 });
        createText("playerName", 0.5, 0.3, "Player", { size: 80 });
        createButton("playerNameButton", 0.75, 0.15, 0.05, 0.05, "button", () => {
            buttonClick();
            let newName = prompt("New player name?", "Peter").slice(0, 16);
            game.name = newName;
        });
        createText("playerNameButtonText", 0.775, 0.2, "*", { size: 40 });

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            buttonClick();
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", { size: 40 });

        // Export button
        createButton("exportbutton", 0.25, 0.7, 0.2, 0.1, "button", () => {
            buttonClick();
            exportGame();
        });
        createText("buttonText2", 0.35, 0.775, "Export", { size: 40 });

        // Import button
        createButton("importbutton", 0.55, 0.7, 0.2, 0.1, "button", () => {
            buttonClick();
            importGame();
        });
        createText("buttonText3", 0.65, 0.775, "Import", { size: 40 });


        createText("stat1", 0.5, 0.35, "", { size: 30 });
        createText("stat2", 0.5, 0.4, "", { size: 30 });
        createText("stat3", 0.5, 0.45, "", { size: 30 });
        createText("stat4", 0.5, 0.5, "", { size: 30 });
        createText("stat5", 0.5, 0.55, "", { size: 30 });
        createText("stat6", 0.5, 0.6, "", { size: 30 });
        createText("stat7", 0.5, 0.65, "", { size: 30 });
        createText("stat8", 0.5, 0.7, "", { size: 30 });
    },
    (tick) => {
        // Loop
        objects["stat1"].text = "Total Playtime: " + game.stats.playtime.toFixed(0) + "s";
        objects["stat2"].text = "(Unlimited) Screws: " + game.stats.ulScrews + " (Best: " + game.stats.ulHiScrews + ")";
        objects["stat3"].text = "(Unlimited) Time Survived: " + game.stats.ulTime.toFixed(0) + "s" + " (Best: " + game.stats.ulHiTime.toFixed(0) + ")";
        objects["stat4"].text = "(Worlds) Screws: " + game.stats.woScrews + " (Best: " + game.stats.woHiScrews + ")";
        objects["stat5"].text = "(Worlds) Time Survived: " + game.stats.woTime.toFixed(0) + "s" + " (Best: " + game.stats.woHiTime.toFixed(0) + "s)";
        objects["stat6"].text = "(Worlds) Levels completed: " + game.stats.woCompletions;
        objects["stat7"].text = "(Worlds) Levels failed: " + game.stats.woFails;

        objects["playerName"].text = game.name;
    }
);