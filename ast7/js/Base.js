const BASE = 'assets/images/base/base.png';

class Base{
    constructor(){
        this.x = 0;
        this.baseImage = new Image();
        this.baseImage.src = BASE;

        this.frameNumber = 0;

    }

    drawBase(context,dimension,stop){
        this.frameNumber++;
        context.drawImage(this.baseImage,this.x,400,336,112);
        if(this.frameNumber % 1 ==0 && !stop) this.x--;
        if(this.x < -48) this.x = 0;
    }
}