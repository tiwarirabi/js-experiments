const allImages =[
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

    'assets/images/player/redbird-upflap.png',
    'assets/images/player/redbird-midflap.png',
    'assets/images/player/redbird-downflap.png',

    'assets/images/player/bluebird-upflap.png',
    'assets/images/player/bluebird-midflap.png',
    'assets/images/player/bluebird-downflap.png',

    'assets/images/player/yellowbird-upflap.png',
    'assets/images/player/yellowbird-midflap.png',
    'assets/images/player/yellowbird-downflap.png',

    'assets/images/background/background-day.png',
    'assets/images/background/background-night.png',

    'assets/images/pipe/pipe-green.png',
    'assets/images/pipe/pipe-red.png',

    'assets/images/base/base.png',
    'assets/images/others/gameover.png',
    'assets/images/others/message.png',
];

class Preloader{
    constructor(){
        this.totalImages = allImages.length;
        this.loadedImages = 0;
    }

    load(callback,that){
        allImages.forEach((image)=>{
            var img = new Image();
            img.src=image;
            img.onload = () =>{
                this.loadedImages++;
                if(this.loadedImages>= this.totalImages){
                    callback(that);
                }
            }
        });
    }
}