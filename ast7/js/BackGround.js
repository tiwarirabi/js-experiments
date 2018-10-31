const BACKGROUNDS = [
    'assets/images/background/background-day.png',
    'assets/images/background/background-night.png',
];

class BackGround{
    constructor(){
        this.background = BACKGROUNDS[Math.floor(Math.random()*2)];
        this.backGroundImage = new Image();
        this.backGroundImage.src = this.background;
    }

    drawBackground(context,dimension){
        context.drawImage(this.backGroundImage,0,0,dimension.width,dimension.height);
    }
}