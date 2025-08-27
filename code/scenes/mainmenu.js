/*
dark:  #EA7623
light: #FFBF66
text   #773D00
*/

var playMode = "";
var playLevel = -1;
var playWorld = -1;

scenes["mainmenu"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "#EA7623");
        createSquare("bg2", 0, 0.3, 1, 0.65, "#FFBF66");

        createImage("logo", 0.5, 0, 0.4, 0.3, "logo", { quadratic: true, centered: true });
        createText("version", 0.975, 0.985, "Version " + gameVersion, { color: "#773D00", size: 40, align: "right" });

        // Skins button
        createButton("worldsbutton", 0.3, 0.35, 0.4, 0.1, "button", () => {
            loadScene("worlds");
        });
        createText("buttonText4", 0.5, 0.425, "Worlds", { size: 40, color: "#773D00" });

        // Play button
        createButton("playbutton", 0.3, 0.475, 0.4, 0.1, "button", () => {
            playMode = "unlimited";
            loadScene("play");
        });
        createText("buttonText1", 0.5, 0.55, "Unlimited Mode", { size: 40, color: "#773D00" });

        // Stats button
        createButton("playerbutton", 0.3, 0.6, 0.4, 0.1, "button", () => {
            loadScene("settings");
        });
        createText("buttonText2", 0.5, 0.675, "Settings", { size: 40, color: "#773D00" });

        // How to play button
        createButton("helpbutton", 0.3, 0.725, 0.4, 0.1, "button", () => {
            loadScene("help");
        });
        createText("buttonText3", 0.5, 0.795, "How to play", { size: 40, color: "#773D00" });

        /*
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
        
        createButton("patchnotesbutton", 0.02, 0.55, 0.08, 0.08, "whiteNotes", () => {
            loadScene("patchnotes");
        }, { quadratic: true });
        createText("wButtonText2", 0.1, 0.64, "Patch Notes", { color: "#773D00", size: 32, align: "center" });
        
        createButton("statsbutton", 0.02, 0.65, 0.08, 0.08, "whiteStats", () => {
            loadScene("stats");
        }, { quadratic: true });
        createText("wButtonText4", 0.1, 0.74, "Stats", { color: "#773D00", size: 32, align: "center" });

        createButton("donateButton", 0.05, 0.875, 0.4, 0.1, "#BB732B", () => {
            window.open("https://ko-fi.com/Y8Y2XMZX1");
        })
        createText("donateText", 0.25, 0.875 + 0.1 * 2 / 3, "Donate", { color: "#773D00", size: 40 });

        if (!wggjAudio.src.includes("audio/Im_Screwed.mp3")) wggjAudio.src = "audio/Im_Screwed.mp3";
        wggjAudio.volume = game.settings.music ? 0.5 : 0;
        if (game.settings.music) wggjAudio.play();
    },
    (tick) => {
        // Loop
    }
);