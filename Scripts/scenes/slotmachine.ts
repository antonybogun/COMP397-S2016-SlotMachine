// SLOT MACHINE SCENE
module scenes {
    export class SlotMachine extends objects.Scene {
        //PRIVATE INSTANCE VARIABLES ++++++++++++
        private _backgroundImage: createjs.Bitmap;
        private _bet1Button: objects.Button;
        private _bet10Button: objects.Button;
        private _bet100Button: objects.Button;
        private _resetButton: objects.Button;
        private _gameoverButton: objects.Button;
        private _spinButton: objects.Button;
        private _reels: createjs.Bitmap[];
        private _jackpotText: objects.Label;
        private _creditsText: objects.Label;
        private _betText: objects.Label;
        private _resultText: objects.Label;
        private playerMoney: number;
        private winnings: number;
        private jackpot: number;
        private playerBet: number;

        private _grapes = 0;
        private _bananas = 0;
        private _oranges = 0;
        private _cherries = 0;
        private _bars = 0;
        private _bells = 0;
        private _sevens = 0;
        private _blanks = 0;



        // CONSTRUCTOR ++++++++++++++++++++++
        constructor() {
            super();
        }
        
        // PUBLIC METHODS +++++++++++++++++++++
        
        // Start Method
        public start(): void { 
            // Reset the Game to initial values 
            this._resetAll();
            
            // add background image to the scene
            this._backgroundImage = new createjs.Bitmap(assets.getResult("SlotMachine"));
            this.addChild(this._backgroundImage);
            
            // add Bet10Button to the scene
            this._bet1Button = new objects.Button("Bet1Button", 154, 404, false);
            this.addChild(this._bet1Button);
            this._bet1Button.on("click", this._bet1ButtonClick, this); 
            
            // add Bet50Button to the scene
            this._bet10Button = new objects.Button("Bet10Button", 210, 404, false);
            this.addChild(this._bet10Button);
            this._bet10Button.on("click", this._bet10ButtonClick, this); 
            
            // add Bet100Button to the scene
            this._bet100Button = new objects.Button("Bet100Button", 266, 404, false);
            this.addChild(this._bet100Button);
            this._bet100Button.on("click", this._bet100ButtonClick, this); 
            
            // add SpinButton to the scene
            this._spinButton = new objects.Button("SpinButton", 322, 404, false);
            this.addChild(this._spinButton);
            this._spinButton.on("click", this._spinButtonClick, this); 
               
             // add ResetButton to the scene
            this._resetButton = new objects.Button("ResetButton", 378, 404, false);
            this.addChild(this._resetButton);
            this._resetButton.on("click", this._resetButtonClick, this); 

            // add QuitButton to the scene
            this._gameoverButton = new objects.Button("GameoverButton", 434, 404, false);
            this.addChild(this._gameoverButton);
            this._gameoverButton.on("click", this._gameoverButtonClick, this); 

            
            // add JackPot Text to the scene
            this._jackpotText = new objects.Label(
                this.jackpot.toString(),
                "42px Consolas",
                "#3c3c3c",
                490, 85, false);
            this._jackpotText.textAlign = "right";
            this.addChild(this._jackpotText);
        
            // add Credits Text to the scene
            this._creditsText = new objects.Label(
                this.playerMoney.toString(),
                "23px Consolas",
                "#FFFFFF",
                255, 335, false);
            this._creditsText.textAlign = "right";
            this.addChild(this._creditsText);
            
            // add Bet Text to the scene
            this._betText = new objects.Label(
                this.playerBet.toString(),
                "23px Consolas",
                "#FFFFFF",
                363, 335, false);
            this._betText.textAlign = "right";
            this.addChild(this._betText);
            
            // add Result Text to the scene
            this._resultText = new objects.Label(
                this.winnings.toString(),
                "23px Consolas",
                "#FFFFFF",
                475, 335, false);
            this._resultText.textAlign = "right";
            this.addChild(this._resultText);
        
            // Initialize Array of Bitmaps 
            this._initializeBitmapArray();
        
            // add this scene to the global stage container
            stage.addChild(this);
        }

        // SLOT_MACHINE Scene updates here
        public update(): void {

        }
        
        //PRIVATE METHODS
        /* Utility function to check if a value falls within a range of bounds */
        private _checkRange(value: number, lowerBounds: number, upperBounds: number): number {
            return (value >= lowerBounds && value <= upperBounds) ? value : -1;
        }

        //Reset variables to start gain 
        private _resetAll() {
            this.playerMoney = 500;
            this.winnings = 0;
            this.jackpot = 1000;
            this.playerBet = 0;
        }
        
        /* When this function is called it determines the betLine results.
        e.g. Bar - Orange - Banana */
        private _spinReels(): string[] {
            var betLine = [" ", " ", " "];
            var outCome = [0, 0, 0];

            for (var spin = 0; spin < 3; spin++) {
                outCome[spin] = Math.floor((Math.random() * 65) + 1);
                switch (outCome[spin]) {
                    case this._checkRange(outCome[spin], 1, 27):  // 41.5% probability
                        betLine[spin] = "Blank";
                        this._blanks++;
                        break;
                    case this._checkRange(outCome[spin], 28, 37): // 15.4% probability
                        betLine[spin] = "Grapes";
                        this._grapes++;
                        break;
                    case this._checkRange(outCome[spin], 38, 46): // 13.8% probability
                        betLine[spin] = "Banana";
                        this._bananas++;
                        break;
                    case this._checkRange(outCome[spin], 47, 54): // 12.3% probability
                        betLine[spin] = "Orange";
                        this._oranges++;
                        break;
                    case this._checkRange(outCome[spin], 55, 59): //  7.7% probability
                        betLine[spin] = "Cherry";
                        this._cherries++;
                        break;
                    case this._checkRange(outCome[spin], 60, 62): //  4.6% probability
                        betLine[spin] = "Bar";
                        this._bars++;
                        break;
                    case this._checkRange(outCome[spin], 63, 64): //  3.1% probability
                        betLine[spin] = "Bell";
                        this._bells++;
                        break;
                    case this._checkRange(outCome[spin], 65, 65): //  1.5% probability
                        betLine[spin] = "Seven";
                        this._sevens++;
                        break;
                }
            }
            this.winnings = 0;
            return betLine;
        }

        /* This function calculates the player's winnings, if any */
        private _determineWinnings(): void {
            if (this._blanks == 0) {
                if (this._grapes == 3) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this._bananas == 3) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this._oranges == 3) {
                    this.winnings = this.playerBet * 30;
                }
                else if (this._cherries == 3) {
                    this.winnings = this.playerBet * 40;
                }
                else if (this._bars == 3) {
                    this.winnings = this.playerBet * 50;
                }
                else if (this._bells == 3) {
                    this.winnings = this.playerBet * 75;
                }
                else if (this._sevens == 3) {
                    this.winnings = this.playerBet * 100;
                }
                else if (this._grapes == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this._bananas == 2) {
                    this.winnings = this.playerBet * 2;
                }
                else if (this._oranges == 2) {
                    this.winnings = this.playerBet * 3;
                }
                else if (this._cherries == 2) {
                    this.winnings = this.playerBet * 4;
                }
                else if (this._bars == 2) {
                    this.winnings = this.playerBet * 5;
                }
                else if (this._bells == 2) {
                    this.winnings = this.playerBet * 10;
                }
                else if (this._sevens == 2) {
                    this.winnings = this.playerBet * 20;
                }
                else if (this._sevens == 1) {
                    this.winnings = this.playerBet * 5;
                }
                else {
                    this.winnings = this.playerBet * 1;
                }
                console.log("Win!");
            }
            else {
                console.log("Loss!");
            }

            this._resultText.text = this.winnings.toString();
            this.playerMoney += this.winnings;
            this._creditsText.text = this.playerMoney.toString();
            this._resetFruitTally();

        }

        //Reset fruit counters to start again
        private _resetFruitTally(): void {
            this._grapes = 0;
            this._bananas = 0;
            this._oranges = 0;
            this._cherries = 0;
            this._bars = 0;
            this._bells = 0;
            this._sevens = 0;
            this._blanks = 0;
        }

        //initialize first images
        private _initializeBitmapArray(): void {
            this._reels = new Array<createjs.Bitmap>();
            for (var reel: number = 0; reel < 3; reel++) {
                this._reels[reel] = new createjs.Bitmap(assets.getResult("Banana"));
                this._reels[reel].x = 176 + (reel * 107);
                this._reels[reel].y = 235;
                this.addChild(this._reels[reel]);
                console.log("reel" + reel + " " + this._reels[reel]);
            }
        }

        //assign bet money and show the amount
        private _placeBet(playerBet: number) {
            
            // Check player has as enough money as it is more than bet money 
             if(playerBet > this.playerMoney){
                alert("Sorry, not enough money");
             }else{
                this.playerBet += playerBet;
                this.playerMoney -= playerBet;
                this._creditsText.text = this.playerMoney.toString();
                this._betText.text = this.playerBet.toString();
            }
        }
        
        //EVENT HANDLERS ++++++++++++++++++++
        
        //Bet button click event
        private _bet1ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 1 Credit");
            this._placeBet(1);
        }

        //Bet button click event
        private _bet10ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 10 Credit");
            this._placeBet(10);
        }

        //Bet button click event
        private _bet100ButtonClick(event: createjs.MouseEvent): void {
            console.log("Bet 100 Credit");
            this._placeBet(100);
        }

        //Spring button click event
        private _spinButtonClick(event: createjs.MouseEvent): void {

            // Check player bet his money
            if (this.playerBet <= 0) {
                alert("Please Bet!");
            } else {

                var bitmap: string[] = this._spinReels();
                for (var reel: number = 0; reel < 3; reel++) {
                    //Show images
                    this._reels[reel].image = assets.getResult(bitmap[reel]);
                    console.log("reel" + reel + " " + this._reels[reel]);
                }

                //Determine the result
                this._determineWinnings();

                // reset player's bet to zero
                this.playerBet = 0;
                this._betText.text = this.playerBet.toString();
            }

        }

        //Reset game variables
        private _resetButtonClick(event: createjs.MouseEvent): void {
            console.log("_resetButtonClick");
            this.start();      
        }

        //Move to a gameover page
        private _gameoverButtonClick(event: createjs.MouseEvent): void {
            console.log("_quitButtonClick");     
                // Switch to the Game over Scene
                scene = config.Scene.GAME_OVER;
                changeScene();   
        }
    }
}