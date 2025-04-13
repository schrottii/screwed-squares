var helpText =
    [
        "Welcome to Screwed Squares!",
        "The main gameplay is simple:",
        "Squares appear with 1-4 Screws on them",
        "Tap them in the right order to unscrew",
        "(Newest Square first, newest Screw first)",
        "",
        "Unlimited Mode:",
        "You start with 30 seconds",
        "Every round, 3 Squares appear",
        "+5s for every Square cleared",
        "-5s for every wrong Screw",
        "Get as far as you can! Good luck!",

    ];

scenes["help"] = new Scene(
    () => {
        // Init
        createSquare("bg", 0, 0, 1, 1, "#EA7623");
        createSquare("bg2", 0, 0.1, 1, 0.8, "#FFBF66");

        // Back button
        createButton("backbutton", 0.4, 0.875, 0.2, 0.1, "button", () => {
            loadScene("mainmenu");
        });
        createText("buttonText", 0.5, 0.95, "Back", { size: 40 });

        // Help
        for (let i in helpText) {
            createText("helpText" + i, 0.5, 0.2 + 0.03 * i, helpText[i], { size: 40 });
        }
    },
    (tick) => {
        // Loop
    }
);