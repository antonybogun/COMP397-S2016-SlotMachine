/**
 * @source file name:   game.ts
 * @author          :   Tony Bogun
 * @last modified by:   Tony Bogun (1 contributor)
 * @description     :   Core functionality implementation file
 * @revision history:   https://github.com/antonybogun/COMP397-S2016-SlotMachine/commits/master
 */
/// <reference path = "_reference.ts" />
// global variables
var assets;
var canvas;
var stage;
var stats;
var currentScene;
var scene;
// Game Scenes
var menu;
var slotMachine;
var gameOver;
var assetData = [
    { id: "StartButton", src: "../../Assets/images/StartButton.png" },
    { id: "StartOverButton", src: "../../Assets/images/StartOverButton.png" },
    { id: "QuitButton", src: "../../Assets/images/QuitButton.png" },
    { id: "SlotMachine", src: "../../Assets/images/SlotMachine.png" },
    { id: "SpinButton", src: "../../Assets/images/Spin.png" },
    { id: "Bet1Button", src: "../../Assets/images/Bet1.png" },
    { id: "Bet10Button", src: "../../Assets/images/Bet10.png" },
    { id: "Bet100Button", src: "../../Assets/images/Bet100.png" },
    { id: "ResetButton", src: "../../Assets/images/Reset.png" },
    { id: "GameoverButton", src: "../../Assets/images/Exit.png" },
    { id: "Blank", src: "../../Assets/images/Blank.png" },
    { id: "Grapes", src: "../../Assets/images/Grapes.gif" },
    { id: "Banana", src: "../../Assets/images/Banana.gif" },
    { id: "Cherry", src: "../../Assets/images/Cherry.gif" },
    { id: "Orange", src: "../../Assets/images/Orange.gif" },
    { id: "Bar", src: "../../Assets/images/Bar.gif" },
    { id: "Bell", src: "../../Assets/images/Bell.gif" },
    { id: "Seven", src: "../../Assets/images/Seven.gif" },
    { id: "SlotMachineLogo", src: "../../Assets/images/SlotMachineLogo.png" }
];
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    assets.on("complete", init, this);
    assets.loadManifest(assetData);
}
function init() {
    // create a reference the HTML canvas Element
    canvas = document.getElementById("canvas");
    // create our main display list container
    stage = new createjs.Stage(canvas);
    // Enable mouse events
    stage.enableMouseOver(20);
    // set the framerate to 60 frames per second
    createjs.Ticker.setFPS(config.Game.FPS);
    // create an event listener to count off frames
    createjs.Ticker.on("tick", gameLoop, this);
    // sets up our stats counting workflow
    setupStats();
    // set initial scene
    scene = config.Scene.MENU;
    changeScene();
}
// Main Game Loop function that handles what happens each "tick" or frame
function gameLoop(event) {
    // start collecting stats for this frame
    stats.begin();
    // calling State's update method
    currentScene.update();
    // redraw/refresh stage every frame
    stage.update();
    // stop collecting stats for this frame
    stats.end();
}
// Setup Game Stats
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // shows fps
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
}
// Finite State Machine used to change Scenes
function changeScene() {
    // Launch various scenes
    switch (scene) {
        case config.Scene.MENU:
            // show the MENU scene
            stage.removeAllChildren();
            menu = new scenes.Menu();
            currentScene = menu;
            console.log("Starting MENU Scene");
            break;
        case config.Scene.SLOT_MACHINE:
            // show the PLAY scene
            stage.removeAllChildren();
            slotMachine = new scenes.SlotMachine();
            currentScene = slotMachine;
            console.log("Starting SLOT_MACHINE Scene");
            break;
        case config.Scene.GAME_OVER:
            // show the game OVER scene
            stage.removeAllChildren();
            gameOver = new scenes.GameOver();
            currentScene = gameOver;
            console.log("Starting GAME_OVER Scene");
            break;
    }
    console.log(currentScene.numChildren);
}
window.onload = preload;
//# sourceMappingURL=game.js.map