/**
 * @source file name:   config.ts
 * @author          :   Tony Bogun
 * @last modified by:   Tony Bogun (1 contributor)
 * @description     :   User-defined scene class implementation file
 * @revision history:   https://github.com/antonybogun/COMP397-S2016-SlotMachine/commits/master  
 */

module objects {
    // Scene Class
    export class Scene extends createjs.Container {
        // PROTECTED INSTANCE VARIABLES
        protected _blackBackground: createjs.Bitmap;
         
        // CONSTRUCTOR +++++++++++++++++++++++++++++
        constructor() {
            super();            
            this.start();
        }
        
        // Add game objects to my scene in this method
        public start(): void {
            stage.addChild(this);
        }
        
        // update game objects in my scene
        public update(): void {

        }
        
        
    }
}