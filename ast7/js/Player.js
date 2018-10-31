const PLAYERS = [
    {
        upflap:'assets/images/player/redbird-upflap.png',
        midflap:'assets/images/player/redbird-midflap.png',
        downflap:'assets/images/player/redbird-downflap.png',
    },
    {
        upflap:'assets/images/player/bluebird-upflap.png',
        midflap:'assets/images/player/bluebird-midflap.png',
        downflap:'assets/images/player/bluebird-downflap.png',
    },
    {
        upflap:'assets/images/player/yellowbird-upflap.png',
        midflap:'assets/images/player/yellowbird-midflap.png',
        downflap:'assets/images/player/yellowbird-downflap.png',
    }
];

class Player{
    
    constructor(){
        this.player = PLAYERS[Math.floor(Math.random()*3)];
        this.playerImage = {
            upflap : new Image(),
            midflap : new Image(),
            downflap : new Image(),
        };

        this.playerImage.upflap.src = this.player.upflap;
        this.playerImage.midflap.src = this.player.midflap;
        this.playerImage.downflap.src = this.player.downflap;

        this.birdHeight = 24;
        this.birdWidth = 34;

        this.falldown = false;

        // Constant and never changes through out the game
        this.x = 70;

        //this changes through out the game
        this.y = 220;

        this.velocity = 0;

        this.isFalling = true;
        this.hasFallen = false;

        //This is the defalt value for the bird that's falldown = false and will not fall
        this.boundryTop = 220;
        this.boundryBottom = 250;

        /*
            frame 0 = unflap
            frame 1 = midflap
            frame 2 = downflap
        */
        this.frame = 0; 
        this.frameImage = this.playerImage.upflap;

        //The wings wouldn't flap on every loop so using the current frame number to keep track of that
        this.currentFrameNumber = 0;

        //The default gravity, this might change when the welcome screen is being displayed
        this.gravity = GRAVITY;
        this.upthrust = GRAVITY;

        //rotate degrees
        this.rotateDeg = 0;
        this.maxDeg = 60;
        this.minDeg = -60;


        //For trav=cking the y position so that it wont fly to the top of the screen
        this.deltaY = 50;
        this.prevY;
    }

    getFallDownStatus(){
        return this.falldown;
    }

    setFallDownStatus(falldown){
        this.falldown = falldown;
    }

    fly(){
        this.falldown = true;
        this.isFalling = false;
        this.prevY = this.y;
        this.rotateDeg = 1;
    }

    drawPlayer(context,dimension,stop){
        if(this.falldown){
            //The player will reach the bottom of the screen
            //This will happen when the game actually starts
            this.gravity = GRAVITY/3;
            this.upthrust = GRAVITY/2;
            this.setBoundries(-20,400);
        }else{
            //Here the player will not actually falldown to the edge but will loop in the middle and wait for the game to start
            this.setBoundries(230,260);
           // this.gravity = GRAVITY/2;
            this.velocity = GRAVITY;
        }

        this.drawIntoCanvas(context);

        this.changeRotateDeg();
        this.changePosition();
        this.changeFrame(stop);
    }

    drawIntoCanvas(context){
        context.save();
        context.translate( this.x + (this.birdWidth/2) , this.y + (this.birdWidth/2) );
        context.rotate(this.rotateDeg * (Math.PI/180));
        context.drawImage(this.frameImage, -(this.birdWidth/2) ,-(this.birdWidth/2),this.birdWidth,this.birdHeight);
        context.restore();
    }

    getDimensions(){
        return {
            x:this.x,
            y:this.y,
            width:this.birdWidth,
            height:this.birdHeight,
        };
    }

    changeRotateDeg(){
        if(this.rotateDeg>= this.maxDeg){
            this.rotateDeg = this.maxDeg;
        }else if(this.rotateDeg<=this.minDeg){
            this.rotateDeg = this.minDeg;
        }

        if(this.falldown){
            if(this.isFalling && !this.hasFallen){
                this.rotateDeg +=1;
            }else if(!this.isFalling && !this.hasFallen){
                this.rotateDeg -=1;
            }
        }
    }

    changePosition(){
        this.checkIfFalling();
        if(this.isFalling) {
            this.y += this.velocity;
            this.velocity+= this.gravity;
        }else if(!this.isFalling) {
            this.y -= this.velocity;
            this.velocity+=this.upthrust;

            if(this.prevY-this.y > this.deltaY) {
                this.isFalling = true;
                this.velocity = this.gravity;
            }
        }
    }

    checkIfFalling(){
        var touched = this.touchedBoundries();
        if(touched != false){
            //Has Touched Boundries
            if(touched === 1){
                this.isFalling = false;
                if(this.falldown) {
                    this.hasFallen = true;
                    this.velocity = 0;
                }
            }else if(touched === -1){
                this.isFalling = true;
                this.velocity = this.gravity;
            }
            if(!this.falldown) this.velocity = this.gravity;
        }
    }

    setBoundries(top,bottom){
        this.boundryTop = top;
        this.boundryBottom = bottom; 
    }

    touchedBoundries(){
        if(this.y<=this.boundryTop) return -1;
        if((this.y+this.birdHeight)>=this.boundryBottom) return 1;
        return false;
    }

    changeFrame(stop){
        if(this.currentFrameNumber % 10 == 0 && !stop){
            this.frame++;
            if(this.frame>2) this.frame = 0;

            switch(this.frame){
                case 0:
                    this.frameImage = this.playerImage.upflap;
                    break;
                case 1:
                    this.frameImage = this.playerImage.midflap;
                    break;
                case 2:
                    this.frameImage = this.playerImage.downflap;
                    break;

                default:
                    this.frame = 0;
                    this.frameImage = this.playerImage.upflap;
            }
        }
        this.currentFrameNumber++;
    }
}