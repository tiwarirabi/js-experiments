function Header(){
    this.distance = 0;
    this.element = undefined;
    this.headerElement = undefined;
    this.pauseButton = undefined;
    this.parent = undefined;

    this.playCallback = undefined;
    this.pauseCallback = undefined;


    this.init =(parent) =>{
        this.parent = parent;

        var headerElement = document.createElement('div');
        headerElement.style.position = "absolute";
        headerElement.style.top = "0px";
        headerElement.style.height = "50px";
        headerElement.style.backgroundColor = "rgba(255,255,255,.7)";
        headerElement.style.width = "100%";

        this.element = headerElement;

        
        var pauseButton = document.createElement('div');
        pauseButton.style.height = "50px";
        pauseButton.style.width = "50px";
        pauseButton.style.display = "inline-block";
        pauseButton.style.float = "left";
        pauseButton.style.backgroundColor = "rgba(255,255,255,.7)";
        pauseButton.onclick = () => {
            this.playCallback();
        };

        var img = document.createElement('img');
        img.style.width = "30px";
        img.style.height = "30px";
        img.style.margin = "10px";
        img.src = "images/pause.png";

        pauseButton.appendChild(img);
        this.pauseButton = pauseButton;

        this.element.appendChild(this.pauseButton);

        var distanceElement = document.createElement('div');
        distanceElement.style.position = "absolute";
        distanceElement.style.display = "inline-block";
        distanceElement.style.top = "0px";
        distanceElement.style.right = "0px ";
        distanceElement.style.marginTop = "4px ";
        distanceElement.style.marginRight = "10px ";
        distanceElement.style.padding = "10px 20px"; 
        distanceElement.style.backgroundColor = "#444"; 
        distanceElement.style.color = "#eee"; 
        distanceElement.style.borderRadius = "5px"; 
        distanceElement.style.fontSize = "20px";

        this.distanceElement = distanceElement;

        this.element.appendChild(this.distanceElement);


        document.body.appendChild(this.element);
    }

    this.update = (distanceTravelled) =>{
        this.distance = distanceTravelled;
        this.distanceElement.innerHTML = Math.floor(this.distance / 100) + " m";
    }

    this.pauseStatus = (isPaused) =>{
        if(isPaused){
            this.pauseButton.getElementsByTagName('img')[0].src="images/pause.png";
        }else{
            this.pauseButton.getElementsByTagName('img')[0].src="images/play.png";
        }
    }


    this.setPlayCallback = (callback) =>{
        this.playCallback = callback;
    }

}