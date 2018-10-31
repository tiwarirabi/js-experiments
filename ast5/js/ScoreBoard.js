function ScoreBoard(){
    this.score = 0;
    this.element = undefined;

    this.staticElement = undefined;
    this.dynamicElement = undefined;
    this.pauseButton = undefined;
    this.restartButton = undefined;

    this.pauseCallBack = undefined;
    this.playCallBack = undefined;
    this.restartCallBack = undefined;

    this.parent = undefined;

    this.isPaused = false;

    this.init = (parent) => {
        this.parent = parent;


        var elem = document.createElement('div');
        elem.style.height = 40 + "px";
        elem.style.width = 252 + "px";
        elem.style.borderRadius = "10px";
        elem.style.position = "absolute";
        elem.style.left = "50%";
        elem.style.marginLeft = "-165px";
        elem.style.top = 20 + "px";

        this.element = elem;

        document.body.appendChild(elem);

        var staticElem = document.createElement('span');
        staticElem.style.lineHeight = 40 + "px";
        staticElem.style.display = "inline-block";
        staticElem.style.borderRadius = "10px 0px 0px 10px";
        staticElem.style.backgroundColor = "rgba(255,255,255,0.9)";
        staticElem.style.padding = "0px 10px";
        staticElem.innerHTML = "SCORE";

        this.staticElement = staticElem;

        this.element.appendChild(staticElem);

        var dynamicElem = document.createElement('span');
        dynamicElem.style.lineHeight = 40 + "px";
        dynamicElem.style.minWidth = 60 + "px";
        dynamicElem.style.display = "inline-block";
        dynamicElem.style.padding = "0px 10px";
        dynamicElem.innerHTML = this.score;
        dynamicElem.style.fontSize = "30px";
        dynamicElem.style.borderRadius = "0px 10px 10px 0px";
        dynamicElem.style.fontWeight = "bold";
        dynamicElem.style.backgroundColor = "rgba(255,255,255,0.7)";

        this.dynamicElement = dynamicElem;

        this.element.appendChild(dynamicElem);


        
        var pauseButton = document.createElement('div');
        pauseButton.style.height = 40 + "px";
        pauseButton.style.width = 40 + "px";
        pauseButton.style.display = "inline-block";
        pauseButton.style.marginLeft = "10px";
        pauseButton.style.backgroundColor = "white";
        pauseButton.style.borderRadius = "100%";
        pauseButton.title = "Pause The Game";


        var pauseImg = document.createElement('img');
        pauseImg.src = "pause.png";
        pauseImg.style.height = 30 + "px";
        pauseImg.style.width = 30 + "px";
        pauseImg.style.margin = 5 + "px";
        pauseButton.appendChild(pauseImg);
        pauseButton.onclick = () => { this.pause(); }
        
        this.pauseButton = pauseButton;

        this.element.appendChild(pauseButton);



        var restartButton = document.createElement('div');
        restartButton.style.height = 40 + "px";
        restartButton.style.width = 40 + "px";
        restartButton.style.display = "inline-block";
        restartButton.style.marginLeft = "10px";
        restartButton.style.backgroundColor = "white";
        restartButton.style.borderRadius = "100%";
        restartButton.title = "Restart The Game";

        var restartImg = document.createElement('img');
        restartImg.src = "restart.png";
        restartImg.style.height = 30 + "px";
        restartImg.style.width = 30 + "px";
        restartImg.style.margin = 5 + "px";
        restartButton.appendChild(restartImg);

        
        restartButton.onclick = () => { this.restart(); }
        
        this.restartButton = restartButton;

        this.element.appendChild(restartButton);

        
    }

    this.updateScore = (newScore) => {
        this.score = newScore;
        this.dynamicElement.innerHTML = this.score;
    }

    this.setPauseCallback = (callback) =>{
        this.pauseCallBack = callback;
    }

    this.setPlayCallback = (callback) =>{
        this.playCallBack = callback;
    }

    this.setRestartCallback = (callback) =>{
        this.restartCallBack = callback;
    }

    this.pause = () => {
        if(this.isPaused){
            this.pauseButton.getElementsByTagName('img')[0].src = "pause.png";
            this.playCallBack();
        }else{
            this.pauseButton.getElementsByTagName('img')[0].src = "play.png";
            this.pauseCallBack();
        }
        this.isPaused = !this.isPaused;
        //alert("This feature is currently Being Developed");
    }

    this.restart = () =>{
        this.pauseButton.getElementsByTagName('img')[0].src = "pause.png";
        
        this.restartCallBack();
        if(this.isPaused)
        this.playCallBack();
    }
}