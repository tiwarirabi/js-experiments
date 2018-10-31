const GRAVITY = .2;

const SCREEN_WIDTH = 288;
const SCREEN_HEIGHT = 512;

//The frame gap between two pipes
const PIPE_FRAME_GAP = 250;

const GAME_OVER = 'assets/images/others/gameover.png';
const GAME_START = 'assets/images/others/message.png';
    
class FlappyBird{
    constructor(){
        //Initialize a canvas element and it's context
        this.element = undefined;
        this.context = undefined;
        this.player = undefined;
        this.background = undefined;
        this.scoreDisplay = undefined;
        this.base = undefined;
        this.pipes = [];
        this.gameStatus = "gamestart";
        this.frameNumber = 0;
        this.initCanvas();
        this.loadImages();
        this.score = 0;
        this.sound = new Sound();
        this.gameOverDueToCollide = false;
    }
    
    loadImages(){
        var preloader = new Preloader();
        preloader.load(this.start,this);
    }

    start(self){
        self.initBackground();
        self.initPlayer();
        self.initBase();
        self.initScoreDisplay(self.context,self.getCanvasDimension());
        self.intervalRef = setInterval( () => {self.startGame()} ,10 );   
    }
    startGame(){
        this.frameNumber++;
        let stop = (this.gameStatus === "gameover" ) ? true : false;
        
        this.clearCanvas();
        this.createBackground();
        
        
        if(this.gameStatus == "playing" && this.frameNumber%PIPE_FRAME_GAP ==0)
            this.pipes.push(new Pipe(this.context,this.getCanvasDimension()));
        
        this.updatePipes(stop);
        this.createPlayer(stop);
        
        if(this.player.hasFallen){
             this.gameStatus = "gameover";
             if(!this.gameOverDueToCollide){
                 this.sound.playHit();
                 this.sound.playDie();
                 this.gameOverDueToCollide = true;
             }
        }

        if(this.gameStatus != "gamestart")
            this.displayScore();
        
        this.displayMessage();
        this.createBase(stop);
        //requestAnimationFrame(self.startGame(self));
    }

    restartGame(){
        //Initializing the variables and starting the game again
        this.score = 0;
        this.scoreDisplay.updateScore(this.score);
        this.frameNumber = 0;
        this.initPlayer();
        this.pipes = [];
        this.gameStatus = "gamestart";
        this.startGame();
        this.gameOverDueToCollide = false;
    }

    updatePipes(stop){
        let playerDimension = this.player.getDimensions();
        if(this.pipes.length>0){
            this.pipes.forEach((pipe)=>{
                //Update Pipe's location and redraw the pipe
                pipe.drawPipe(stop);
                if(this.gameStatus=="playing"){
                    let pipeDimension = pipe.getDimension();
                    if( (playerDimension.x >= pipeDimension.x && playerDimension.x <= pipeDimension.x + pipeDimension.width) || (playerDimension.x + playerDimension.width >= pipeDimension.x && playerDimension.x + playerDimension.width <= pipeDimension.x + pipeDimension.width) ){
                        //x part is inside the pipe\s x part
                        //checking for y part now
                        if(playerDimension.y  < pipeDimension.top || playerDimension.y +  playerDimension.height  < pipeDimension.top || playerDimension.y > pipeDimension.top + pipeDimension.gap || playerDimension.y + playerDimension.height > pipeDimension.top + pipeDimension.gap ){
                            //collided
                            this.sound.playHit();
                            this.sound.playDie();
                            this.gameOverDueToCollide = true;
                            this.gameStatus = "gameover";
                        }
                    }


                    //Code For Updating The Score
                    if(this.gameStatus === "playing" && (playerDimension.x  >= pipeDimension.x + pipeDimension.width)){
                        if(!pipe.getPassedPlayer()) {
                            this.sound.playPoint();
                            this.score++;
                            pipe.updatePassedPlayer();
                            this.scoreDisplay.updateScore(this.score);
                        }
                    }

                    //Removing the pipe if the pipe is out of the left boundry
                    if(pipeDimension.y + pipeDimension.width < 0 ) {
                        this.pipes.splice(this.pipes.indexOf(pipe),1);
                    }
                }
            });
        }
    }    

    canvasClicked(e){
        if(this.gameStatus == "gamestart"){
            this.player.setFallDownStatus( true );
            this.gameStatus = "playing";
            //this.element.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT); //Chrome
            //this.element.mozRequestFullScreen(); //Firefox
        }
        if(this.gameStatus==="playing"){
            this.sound.playWing();
            this.player.fly();
        }
        
        if(this.gameStatus==="gameover"){
            console.log(e);
            if(e.layerX > 10 && e.layerX < this.getCanvasDimension().width -10 ){
                if( e.layerY > (this.getCanvasDimension().height * 0.3) + 170 && e.layerY < (this.getCanvasDimension().height * 0.3) + 220){
                    this.sound.playSwoosh();
                    this.restartGame();
                }
            }
        }
    }

    initCanvas(){
        this.element = document.createElement('canvas');
        this.element.height = SCREEN_HEIGHT ;
        this.element.width = SCREEN_WIDTH ;
        this.element.style.margin = "0px auto";
        this.context = this.element.getContext('2d')
        document.body.appendChild(this.element);

        this.element.onclick = (e) => {
            this.canvasClicked(e);
        }

        
    }

    initBase(){
        this.base = new Base();
    }

    createBase(stop){
        this.base.drawBase(this.context,this.getCanvasDimension(),stop);
    }

    getCanvasDimension(){
        return {width:this.element.width, height:this.element.height };
    }

    initBackground(){
        this.background = new BackGround();
    }

    createBackground(){
        this.background.drawBackground(this.context,this.getCanvasDimension());
    }

    initPlayer(){
        this.player = new Player();
    }

    createPlayer(stop){
        this.player.drawPlayer(this.context,this.getCanvasDimension(),stop);
    }

    initScoreDisplay(){
        this.scoreDisplay = new ScoreDisplay(this.context,this.getCanvasDimension());   
    }

    displayScore(){
        this.scoreDisplay.display( (this.gameStatus==="gameover") ? true : false );
    }

    displayMessage(){
        var img = new Image();
        if(this.gameStatus=="gamestart"){
            img.src = GAME_START;
            this.context.drawImage(img,(this.getCanvasDimension().width-187)/2,this.getCanvasDimension().height * 0.1,187,264);   
        
        }else if(this.gameStatus=="playing"){

        }else if(this.gameStatus ==="gameover"){
            img.src = GAME_OVER;
            this.context.drawImage(img,(this.getCanvasDimension().width-192)/2,this.getCanvasDimension().height * 0.1,192,42);       
        }
    }

    clearCanvas(){
        this.context.clearRect(0,0,this.getCanvasDimension().width,this.getCanvasDimension().height);
    }
}