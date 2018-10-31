const PIPES = [
    'assets/images/pipe/pipe-green.png',
    'assets/images/pipe/pipe-red.png',
];

//The gap between the up and bottom pipe
//In Pixels
const PIPE_GAP = 100;


class Pipe{
    constructor(context,dimension){
        this.pipeImage = new Image();
        this.pipeImage.src = PIPES[Math.floor(Math.random()*2)];
        this.minTopPipeHeight = 60;
        this.minBottompPipeHeight = 60;
        this.y = Math.floor(Math.random() * (400 - this.minBottompPipeHeight-PIPE_GAP) ) + this.minTopPipeHeight;
        this.x = undefined;
        this.frameNumber = 0;
        this.context = context;
        this.dimension = dimension;
        this.hasPassedPlayer = false;
        this.drawPipe();
    }

    drawPipe(stop){
        this.frameNumber++;
        if(this.x === undefined )
            this.x = this.dimension.width;
        
        if(!stop)
            this.x--;

        this.drawUpPipe();
        this.drawDownPipe();
    }

    drawUpPipe(){
        this.context.save();
        this.context.translate(this.x,this.y)
        this.context.scale(1,-1);
        this.context.drawImage(this.pipeImage , 0 , 0 , 52 , 320 );
        this.context.restore();
    }
    
    drawDownPipe(){
        this.context.drawImage(this.pipeImage , this.x , this.y + PIPE_GAP , 52 , 320);
    }

    getDimension(){
        return{
            x:this.x,
            width:52,
            top:this.y,
            gap:PIPE_GAP,
        };
    }

    updatePassedPlayer(){
        this.hasPassedPlayer = true;
    }

    getPassedPlayer(){
        return this.hasPassedPlayer;
    }


}