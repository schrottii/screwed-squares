scenes["settings"] = new Scene(
    () => {
        // Init
        function updateSettings() {
            objects["settingText1"].text = "Music " + (game.settings.music ? "ON" : "OFF");
            objects["settingText2"].text = "Sounds " + (game.settings.sounds ? "ON" : "OFF");
            objects["settingText3"].text = game.completedLevels.length == 0 ? "-" : "Reset Worlds";
            objects["settingText4"].text = "Hardmode " + (game.settings.hardmode ? "ON" : "OFF");

            //objects["settingText2"].text = "Device " + game.settings.device.substr(0, 1).toUpperCase() + game.settings.device.substr(1);
        }

        createSquare("bg", 0, 0, 1, 1, "#EA7623");

        createText("header", 0.5, 0.2, "Settings", { size: 80 });

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            buttonClick();
            save();
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Save", { size: 40 });

        // Settings
        createButton("setting1", 0.3, 0.3, 0.4, 0.1, "button", () => {
            buttonClick();
            game.settings.music = !game.settings.music;
            updateSettings();
        });
        createText("settingText1", 0.5, 0.375, "?", { size: 40 });

        createButton("setting2", 0.3, 0.45, 0.4, 0.1, "button", () => {
            buttonClick();
            game.settings.sounds = !game.settings.sounds;
            updateSettings();
        });
        createText("settingText2", 0.5, 0.525, "?", { size: 40 });

        createButton("setting3", 0.3, 0.6, 0.4, 0.1, "button", () => {
            buttonClick();
            if (confirm("Do you really want to reset your progress in Worlds? (Stats are kept)") == true) {
                game.completedLevels = [];
                updateSettings();
            }
        });
        createText("settingText3", 0.5, 0.675, "?", { size: 40 });

        createButton("setting4", 0.3, 0.75, 0.4, 0.1, "button", () => {
            buttonClick();
            game.settings.hardmode = !game.settings.hardmode;
            updateSettings();
        });
        createText("settingText4", 0.5, 0.825, "?", { size: 40 });

        /*
        createButton("setting2", 0.3, 0.45, 0.4, 0.1, "button", () => {
            switch (game.settings.device) {
                case "automatic":
                    game.settings.device = "pc";
                    break;
                case "pc":
                    game.settings.device = "mobile";
                    break;
                case "mobile":
                    game.settings.device = "automatic";
                    break;
            }
            updateSettings();
        });
        createText("settingText2", 0.5, 0.525, "?", { size: 40 });
        */

        // Inite
        updateSettings();
    },
    (tick) => {
        // Loop

    }
);