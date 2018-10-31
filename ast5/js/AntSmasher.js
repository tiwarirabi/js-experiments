function AntSmasher(elem){
    this.element = elem;
    this.width;
    this.height;

    this.ants = [];

    this.intervalRef;

    this.score = 0;
    this.scoreBoard = undefined;

    var self = this;

    var dieSound = undefined;

    this.initRadius = undefined;
    this.initNoOfAnts = undefined;
    
    this.setScreen = function(elem){
        this.element = elem;
    }

    

    this.setDimensions = function(width,height){
        this.width = width;
        this.height = height;

        this.element.style.width = this.width + "px";
        this.element.style.height = this.height + "px";
        this.element.style.overflow = "hidden";
    }

    this.createAnt = function(radius){
        var newAnt = new Ant();
        newAnt.init(this.element,this.width,this.height,radius);
        newAnt.setScoreUpdateCallBack(this.antClicked);
        newAnt.setAntDiedCallBack(this.removeAnt);
        this.ants.push(newAnt);
    }

    this.updateAnts = function(){
        if(this.ants.length==0){
            this.startGame();
        }
        this.ants.forEach((singleAnt)=>{
            singleAnt.move();
        });
        this.checkAntCollision();
    }

    this.antClicked = (whichAnt) => {
        self.score++;
        self.scoreBoard.updateScore(self.score);
        self.removeAnt(whichAnt);
    }

    this.removeAnt =function(whichAnt){
        var r = self.ants.splice(self.ants.indexOf(whichAnt),1);
        if(r.length>0){
            whichAnt.element.style.display = "none";
            this.element.removeChild(whichAnt.element);
        }
        self.dieSound.play();
    }

    this.checkAntCollision = function(){
        this.ants.forEach((singleAnt)=>{
            antCenter = singleAnt.getCenter();
            this.ants.forEach((singleAnt2)=>{
                if(singleAnt != singleAnt2){
                    ant2Center = singleAnt2.getCenter();
                    if(this.getDistanceTo(antCenter,ant2Center) <= singleAnt.radius + singleAnt2.radius){
                        //console.log(antCenter,ant2Center,this.getDistanceTo(antCenter,ant2Center));
                        
                        var ant1Degree = singleAnt.degree;
                        var ant2Degree = singleAnt2.degree;
                        
                        singleAnt.changeDegree(ant2Degree);
                        singleAnt2.changeDegree(ant1Degree);
            
                        singleAnt.decreaseLife();

                        singleAnt2.decreaseLife();
                    }
                }
            });
        });
    }

    

    this.getDistanceTo =function(point1,point2){
        return Math.sqrt(Math.pow(point1.x-point2.x,2)+Math.pow(point1.y-point2.y,2));
    }

    this.init = function(noOfAnts,radius){

        this.initRadius = radius;
        this.initNoOfAnts = noOfAnts;
        
       
        
        this.dieSound = new GameSound('dieSound.mp3');

        this.scoreBoard = new ScoreBoard();
        this.scoreBoard.setPauseCallback(()=>this.pauseGame());
        this.scoreBoard.setPlayCallback(()=>this.playGame());
        this.scoreBoard.setRestartCallback(()=>this.startGame());
        this.scoreBoard.init(this.element);
        
        this.startGame();
        
        this.intervalRef = setInterval(() => this.updateAnts(),20);
    }

    
    this.pauseGame = () =>{
        clearInterval(self.intervalRef);
    }

    this.playGame = () =>{
        self.intervalRef = setInterval(() => self.updateAnts(),20);
    }

    this.startGame = function(){
        self.element.innerHTML = "";
        self.score =0;
        self.scoreBoard.updateScore(self.score);
        self.ants = [];
        for(var i = 0; i<self.initNoOfAnts; i++)
            self.createAnt(self.initRadius);
        
    }
    


}