/**
 * @source file name:   config.ts
 * @author          :   Tony Bogun
 * @last modified by:   Tony Bogun (1 contributor)
 * @description     :   Menu scene class implementation file
 * @revision history:   https://github.com/antonybogun/COMP397-S2016-SlotMachine/commits/master  
 */


module scenes {
    export class Menu extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _startButton: objects.Button;
        private _welcomeLabel: objects.Label;
        private _logoImage: createjs.Bitmap;
        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {    

             // add background image to the scene
            this._logoImage = new createjs.Bitmap(assets.getResult("SlotMachineLogo"));
            this._logoImage.x = config.Screen.CENTER_X - 130;
            this._logoImage.y = config.Screen.CENTER_Y - 120;
            this.addChild(this._logoImage);

            // add the START button to the MENU scene
            this._startButton = new objects.Button(
                "StartButton",
                config.Screen.CENTER_X,
                config.Screen.CENTER_Y + 170, true);
            this.addChild(this._startButton);
            
            // START Button event listener
            this._startButton.on("click", this._startButtonClick, this);

           
           
            // add this scene to the global stage container
            stage.addChild(this);

           
        }

        // INTRO Scene updates here
        public update(): void {

        }
        
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        // START Button click event handler
        private _startButtonClick(event: createjs.MouseEvent) {
            //FadeOut 
                scene = config.Scene.SLOT_MACHINE;
                changeScene();
        }

    }
}