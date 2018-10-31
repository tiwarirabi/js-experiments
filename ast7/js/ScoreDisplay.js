const NUMBERS = [
    'assets/images/numbers/0.png',
    'assets/images/numbers/1.png',
    'assets/images/numbers/2.png',
    'assets/images/numbers/3.png',
    'assets/images/numbers/4.png',
    'assets/images/numbers/5.png',
    'assets/images/numbers/6.png',
    'assets/images/numbers/7.png',
    'assets/images/numbers/8.png',
    'assets/images/numbers/9.png',
];

class ScoreDisplay{
    constructor(context,dimension){
        this.score = 0;
        this.canvasDimension = dimension;
        this.context = context;
        
        this.highScore = new HighScore();

        this.images = [];
        NUMBERS.forEach((number)=>{
            let single = new Image();
            single.src = number;
            this.images.push(single);
        })
    }

    getDisplayWidth() { 
        let width = 0;
        this.score.toString().split('').map(Number).forEach((digit)=>{
            if(digit===1) 
                width +=16;
            else
                width +=24;
        });
        return this.score.toString().length * 24; 
    }

    preloadImages(images){
        let tempImages = [];
        images.forEach((image)=>{
            let temp = new Image();
            temp.src = image;
            temp.onload = () =>{
                tempImages.push(temp);
            }
        });
        return tempImages;
    }

    display(gameOver){
        
        var self = this;

        
        
        

        if(gameOver){

            this.drawButton();


            //The top Score and best back rectangle
            this.roundRect(10,this.canvasDimension.height * 0.3,this.canvasDimension.width - (10*2),150);

            

            
            this.x = this.canvasDimension.width - 100; 
            this.y = this.canvasDimension.height * 0.3 + 20;
            this.drawDigits(this.score);

            this.x = this.canvasDimension.width - 100; 
            this.y = this.canvasDimension.height * 0.3 + 85; 
            this.drawDigits(this.highScore.get());

            this.context.font = "20px Verdana";
            this.context.fillStyle = "rgb(201,191,80)";
            this.context.fillText("SCORE", 30, this.canvasDimension.height * 0.3 + 45 ); 

            this.context.font = "20px Verdana";
            this.context.fillStyle = "rgb(201,191,80)";
            this.context.fillText("BEST", 30, this.canvasDimension.height * 0.3 + 110 ); 
        
        }else{
            this.x = (this.canvasDimension.width - this.getDisplayWidth())/2;
            this.y = this.canvasDimension.height * 0.1;
            this.drawDigits(this.score);
        }

        
  
    }

    drawDigits(number){
        let digits = number.toString().split('').map(Number);
        digits.forEach((digit)=>{
            this.context.drawImage(this.images[digit],this.x,this.y,((digit===1) ? 16 : 24),36);
            this.x += (digit===1) ? 16 : 24;
        });
    }

    updateScore(newScore){
        this.score = newScore;
        this.highScore.setIfHighest(this.score);
        this.display();
    }

    roundRect(x,y,width,height) {
            var radius = {tl: 5, tr: 5, br: 5, bl: 5};

            this.context.lineWidth = 3;
            this.context.fillStyle = "rgb(222,216,149)";
            this.context.strokeStyle = "rgb(201,191,80)";
            this.context.beginPath();
            this.context.moveTo(x + radius.tl, y);
            this.context.lineTo(x + width - radius.tr, y);
            this.context.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
            this.context.lineTo(x + width, y + height - radius.br);
            this.context.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
            this.context.lineTo(x + radius.bl, y + height);
            this.context.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
            this.context.lineTo(x, y + radius.tl);
            this.context.quadraticCurveTo(x, y, x + radius.tl, y);
            this.context.closePath();
            this.context.fill();
            this.context.stroke();
      }

      drawButton(){
            //The start Button Back
            this.roundRect(10,(this.canvasDimension.height * 0.3) + 170,this.canvasDimension.width - (10*2),50);
            //The start Button icon

            this.context.fillStyle = "rgb(201,191,80)";
            this.context.beginPath();
            this.context.moveTo(this.canvasDimension.width/2 + 10 , (this.canvasDimension.height * 0.3) + 195 );
            this.context.lineTo(this.canvasDimension.width/2 - 10, (this.canvasDimension.height * 0.3) + 185 );
            this.context.lineTo(this.canvasDimension.width/2 - 10, (this.canvasDimension.height * 0.3) + 205 );
            this.context.closePath();
            this.context.fill();
      }
}