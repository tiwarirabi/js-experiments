const SOUNDS = {
    die:'assets/audio/die.wav',
    hit:'assets/audio/hit.wav',
    point:'assets/audio/point.wav',
    swoosh:'assets/audio/swoosh.wav',
    wing:'assets/audio/wing.wav',
};

class Sound{
    constructor(){

        this.die = undefined;
        this.hit = undefined;
        this.point = undefined;
        this.swoosh = undefined;
        this.wing = undefined;

        this.initDie();
        this.initHit();
        this.initPoint();
        this.initSwoosh();
        this.initWing();
        
    }

    playDie(){
        this.die.play();
    }
    playHit(){
        this.hit.play();
    }
    playPoint(){
        this.point.play();
    }
    playSwoosh(){
        this.swoosh.play();
    }
    playWing(){
        this.wing.pause();
        this.wing.play();
    }

    initDie(){
        let sound = document.createElement("audio");
        sound.src = SOUNDS.die;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        this.die = sound;
        this.die.load();
    }

    initHit(){
        let sound = document.createElement("audio");
        sound.src = SOUNDS.hit;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        this.hit = sound;
        this.hit.load();
    }

    initPoint(){
        let sound = document.createElement("audio");
        sound.src = SOUNDS.point;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        this.point = sound;
        this.point.load();
    }

    initSwoosh(){
        let sound = document.createElement("audio");
        sound.src = SOUNDS.swoosh;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        this.swoosh = sound;
        this.swoosh.load();
    }

    initWing(){
        let sound = document.createElement("audio");
        sound.src = SOUNDS.wing;
        sound.setAttribute("preload", "auto");
        sound.setAttribute("controls", "none");
        sound.style.display = "none";
        document.body.appendChild(sound);
        this.wing = sound;
        this.wing.load();
    }


}