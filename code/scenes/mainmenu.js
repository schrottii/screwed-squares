/*
dark:  #EA7623
light: #FFBF66
text   #773D00
*/

scenes["mainmenu"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "#EA7623");
        createSquare("bg2", 0, 0.3, 1, 0.65, "#FFBF66");

        createImage("logo", 0.5, 0, 0.4, 0.3, "logo", { quadratic: true, centered: true });
        createText("version", 0.975, 0.975, "Version " + gameVersion, { color: "#773D00", size: 40, align: "right" });

        // Play button
        createButton("playbutton", 0.3, 0.4, 0.4, 0.1, "button", () => {
            loadScene("play");
        });
        createText("buttonText1", 0.5, 0.475, "Unlimited Mode", { size: 40, color: "#773D00" });

        // Stats button
        createButton("playerbutton", 0.3, 0.525, 0.4, 0.1, "button", () => {
            loadScene("settings");
        });
        createText("buttonText2", 0.5, 0.6, "Settings", { size: 40, color: "#773D00" });

        /*
        // Skins button
        createButton("shopbutton", 0.3, 0.65, 0.4, 0.1, "button", () => {
            loadScene("shop");
        });
        createText("buttonText3", 0.5, 0.725, "Shop", { size: 40, color: "#773D00" });

        // Settings button
        createButton("settingsbutton", 0.3, 0.775, 0.4, 0.1, "button", () => {
            loadScene("settings");
        });
        createText("buttonText4", 0.5, 0.85, "Settings", { size: 40, color: "#773D00" });
        */
        
        // Left Icons
        createButton("serverbutton", 0.02, 0.35, 0.08, 0.08, "whiteDiscord", () => {
            window.open("https://discord.gg/CbBeJXKUrk");
        }, { quadratic: true });
        createText("wButtonText1", 0.1, 0.44, "Discord", { color: "#773D00", size: 32, align: "center" });

        createButton("websitebutton", 0.02, 0.45, 0.08, 0.08, "whiteWebsite", () => {
            window.open("https://schrottii.github.io/");
        }, { quadratic: true });
        createText("wButtonText3", 0.1, 0.54, "Website", { color: "#773D00", size: 32, align: "center" });
        /*
        createButton("patchnotesbutton", 0.02, 0.55, 0.08, 0.08, "whiteNotes", () => {
            loadScene("patchnotes");
        }, { quadratic: true });
        createText("wButtonText2", 0.1, 0.64, "Patch Notes", { color: "#773D00", size: 32, align: "center" });
        */
        createButton("statsbutton", 0.02, 0.65, 0.08, 0.08, "whiteStats", () => {
            loadScene("stats");
        }, { quadratic: true });
        createText("wButtonText4", 0.1, 0.74, "Stats", { color: "#773D00", size: 32, align: "center" });

        createButton("donateButton", 0.05, 0.875, 0.4, 0.1, "#BB732B", () => {
            window.open("https://ko-fi.com/Y8Y2XMZX1");
        })
        createText("donateText", 0.25, 0.875 + 0.1 * 2 / 3, "Donate", { color: "#773D00", size: 40 });

        wggjAudio.src = "audio/game-music-loop-8-145362.mp3";
        wggjAudio.volume = game.settings.music ? 1 : 0;
        if (game.settings.music) wggjAudio.play();
    },
    (tick) => {
        // Loop
    }
);