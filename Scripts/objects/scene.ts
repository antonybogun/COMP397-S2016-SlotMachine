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