// SLOT MACHINE SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _spinButton: objects.Button;
        private _bet1Button: objects.Button;
        private _bet10Button: objects.Button;
        private _bet100Button: objects.Button;

        private grapes = 0;
        private bananas = 0;
        private oranges = 0;
        private cherries = 0;
        private bars = 0;
        private bells = 0;
        private sevens = 0;
        private blanks = 0;

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

        this._bet1Button = new objects.Button("Bet1Button", 162, 404, false);
        this.addChild(this._bet1Button);
        this._bet1Button.on("click", this._bet1ButtonClick, this);

        this._bet10Button = new objects.Button("Bet10Button", 217, 404, false);
        this.addChild(this._bet10Button);
        this._bet10Button.on("click", this._bet10ButtonClick, this);

        this._bet100Button = new objects.Button("Bet100Button", 271, 404, false);
        this.addChild(this._bet100Button);
        this._bet100Button.on("click", this._bet100ButtonClick, this);

        this._spinButton = new objects.Button("SpinButton", 432, 404, false);
        this.addChild(this._spinButton);
        this._spinButton.on("click", this._spinButtonClick, this);
        // add the START button to the MENU scene
        // add this scene to the global stage container
        stage.addChild(this);
    }

        // SLOT MACHINE Scene updates here
        public update(): void {

    }


        //PRIVATE METHODS

        private _checkRange(value: number, lowerBounds: number, upperBounds: number):number {
        return (value >= lowerBounds && value <= upperBounds) ? value : -1;
    }

        private _reels(): string[] {
        var betLine = [" ", " ", " "];
        var outCome = [0, 0, 0];

        for (var spin = 0; spin < 3; spin++) {
            outCome[spin] = Math.floor((Math.random() * 65) + 1);
            switch (outCome[spin]) {
                case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                    betLine[spin] = "blank";
                    this.blanks++;
                    break;
                case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                    betLine[spin] = "Grapes";
                    this.grapes++;
                    break;
                case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                    betLine[spin] = "Banana";
                    this.bananas++;
                    break;
                case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                    betLine[spin] = "Orange";
                    this.oranges++;
                    break;
                case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                    betLine[spin] = "Cherry";
                    this.cherries++;
                    break;
                case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                    betLine[spin] = "Bar";
                    this.bars++;
                    break;
                case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                    betLine[spin] = "Bell";
                    this.bells++;
                    break;
                case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                    betLine[spin] = "Seven";
                    this.sevens++;
                    break;
            }
        }
        return betLine;
    }

        //EVENT HANDLERS ++++++++++++++++++++
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
        console.log("Bet 1 ");
    }
        private _bet10ButtonClick(event: createjs.MouseEvent): void {
        console.log("Bet 10 ");
    }
        private _bet100ButtonClick(event: createjs.MouseEvent): void {
        console.log("Bet 100 ");
    }
        private _spinButtonClick(event: createjs.MouseEvent): void {
        console.log("Spin clicked ");
        console.log(this._reels());
    }
}
}