function CarGame(){
    this.element = undefined;
    this.header = undefined;
    this.menu = undefined;

    this.intervalRef = undefined;

    this.lane;

    this.speed = 8;

    this.frameNumber = 0;

    this.myCar = undefined;
    this.enemyCars = [];


    var self = this;

    this.distanceTravelled = 0;

    this.enemyInterval = 150;

    this.isCollided = false;

    this.isPaused = false;
    
    this.init = (element) => {
        this.element = element;
        this.width = window.innerWidth;
        this.element.style.width = this.width + "px";
        this.element.style.height = "450px";
        this.element.style.backgroundColor = "#444";
        this.element.style.marginTop = "50px";
        this.element.style.position = "relative";

        var header = new Header();
        header.setPlayCallback(this.playGame);
        header.init(this.element);
        this.header = header;

        var lane = new Lane(this.speed);
        lane.init(this.element);
        this.lane = lane;
        
        

        var mainMenu = new MainMenu();
        mainMenu.setStartCallBack(this.startGame);
        mainMenu.setPlayCallBack(this.playGame);
        mainMenu.init(this.element);
        this.menu = mainMenu;
       
        

        document.addEventListener("keyup", this.userInput );

        
    }

    this.updateLanes = () => {
        this.lane.move(this.speed);
    }

    this.updateHeader = () =>{
        this.header.update(this.distanceTravelled);
    }

    this.updateEnemies = () => {
        var isCollided = false;
        this.enemyCars.map((enemyCar)=>{    
            enemyCar.move();
            if(enemyCar.checkCollision(this.myCar)){
                isCollided = true;
            }
        });
        this.isCollided = isCollided;
        if(isCollided){
            this.initMenu();
        }
    }

    this.initMenu = () =>{
        if(this.intervalRef != undefined){
            clearInterval(this.intervalRef);
            this.intervalRef = undefined;
        }
        this.menu.show();
    }

    this.startGame = () =>{
        this.clearEnemies();
        this.menu.hide();
        
        this.distanceTravelled = 0;
        this.speed = 8;
        this.frameNumber = 0;
        this.isCollided = false;
        this.enemyInterval = 150;

        this.isPaused = false;

        if(self.myCar!=undefined){
            self.myCar.clearVehicle();
        }

        var myCar = new Vehicle();
        myCar.init(this.element);
        self.myCar = myCar;

        self.intervalRef = setInterval(() => self.gameLoop(),10);
    }


    this.playGame = () => {
        console.log(this.isPaused);
        if(this.isPaused){
            self.intervalRef = setInterval(() => self.gameLoop(),10);
            this.menu.hide();
        }else{
            clearInterval(self.intervalRef);
            if(!this.isCollided)
            this.menu.show("pausedMenu");
        }
        this.header.pauseStatus(this.isPaused);
        this.isPaused = !this.isPaused;
    } 

    this.clearEnemies = () => {
        if(this.enemyCars.length>0){
            this.enemyCars.forEach((enemy)=>{
                enemy.clearVehicle();
            });
        }
        this.enemyCars = [];
    }

    this.gameLoop = () => {
        this.frameNumber++;
        this.updateLanes();
        this.updateEnemies();
        this.updateHeader();
        if(this.frameNumber % 500 ==0){ 
            this.speed +=1;
            this.enemyInterval -= 5;
        }
        if(this.frameNumber % this.enemyInterval ==0) {
            var enemyLane = Math.floor(Math.random()*3) + 1;
            var enemyCar = new Enemy(this.speed,enemyLane);
            enemyCar.init(this.element);
            enemyCar.setElementRemoveCallback(this.removeEnemy);
            this.enemyCars.push(enemyCar);
        }

        this.distanceTravelled += this.speed;
    }

    this.removeEnemy = (whichEnemy) =>{
        whichEnemy.element.style.display = "none";
        whichEnemy.element.remove();
        self.enemyCars.splice(self.enemyCars.indexOf(whichEnemy),1);
    }

    this.userInput = (event) => {
        //32 is for space
        //13 is for enter
        var key = event.which || event.keyCode;
        if(key==32){
            //Space Enterered

        }else if(key==38){
            //Top Key Entered
            if(!this.isCollided) this.myCar.moveUp();
        }else if(key==40){
            //Down Key Entered
            if(!this.isCollided) this.myCar.moveDown();
           
        }

    }
    
}