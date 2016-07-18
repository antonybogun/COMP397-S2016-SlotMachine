// SLOT MACHINE SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage:createjs.Bitmap;

        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void {
            // add Background Image to the scene

            //add the SLOT MACHINE label to the MENU scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            // add the START button to the MENU scene
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // SLOT MACHINE Scene updates here
        public update(): void {

        }
               
        //EVENT HANDLERS ++++++++++++++++++++

    }
}