function Ant(){

    this.element;
    this.lifeElement;

    this.x = 400;
    this.y = 200;
    
    this.radius = 15;

    this.degree = 0;

    this.life = 100;

    this.scoreUpdateCallBack = undefined;
    this.antDiedCallBack = undefined;
    
    this.parent;
    this.parentWidth;
    this.parentHeight;

    var that = this;

    this.init = function(parent,parentWidth,parentHeight,radius){
        this.radius = radius;
        this.parent = parent;
        this.parentWidth = parentWidth;
        this.parentHeight = parentHeight;

        //Random Point in Space
        this.x = Math.floor(Math.random() * (this.parentWidth-(this.radius)*2) ) + this.radius;
        this.y = Math.floor(Math.random() * (this.parentHeight-(this.radius)*2) ) + this.radius;

        this.degree = Math.floor(Math.random() * (360) ) + 0;

        var elem = document.createElement('div');
        elem.style.height = (this.radius*2) + "px";
        elem.style.width = (this.radius*2) + "px";
        elem.style.borderRadius = "100%";
        elem.style.backgroundImage = "url(ant.png)";
        elem.style.backgroundSize = "40px 40px";
        elem.style.backgroundPosition = "10px 10px";
        elem.style.backgroundRepeat = "no-repeat";
        elem.style.backgroundColor = "#eee";
        elem.style.position = "absolute";
        elem.style.left = this.x + "px";
        elem.style.top = this.y + "px";
        elem.style.overflow = "hidden";

        var lifeElem = document.createElement('div');
        lifeElem.style.width = "100%";
        lifeElem.style.height = (this.radius*2) + "px";
        lifeElem.style.backgroundColor = "rgba(0,255,0,.7)";
        
        

        this.element = elem;
        this.lifeElement = lifeElem;

        this.element.appendChild(this.lifeElement);



        this.parent.appendChild(elem);

        
    }

    this.decreaseLife = function(){
        this.life-=2;
        this.lifeElement.style.width = this.life + "%";
        if(this.life>20 && this.life < 50) this.lifeElement.style.backgroundColor =  "rgba(255,255,0,.7)";
        if(this.life<20) this.lifeElement.style.backgroundColor =  "rgba(255,0,0,.7)";
        if(this.life<=0){
            this.antDiedCallBack(this); 
        }
    }
    this.setAntDiedCallBack = function(callback){
        this.antDiedCallBack = callback;
    }

    this.setScoreUpdateCallBack = function(callback){
        this.scoreUpdateCallBack = callback;
        var that = this;
        this.element.onclick=function(){
                that.scoreUpdateCallBack(that);
        };
    }

    this.updateScreen = function(){
        this.element.style.left = (newPosition.x- this.radius) + "px";
        this.element.style.top = (newPosition.y - this.radius)+ "px";
    }

    this.getCenter = function(){
        return {
            x:this.x+this.radius,
            y:this.y+this.radius
        };
    }

    this.changeDirectionRandom = function(){
        this.degree = Math.floor(Math.random() * (360) ) + 0;
    }

    this.changeDegree = function(degree){
        this.degree = degree;
        this.move();
    }


    this.move = function(){
        newPosition = this.calculateNewPosition();

        this.x = newPosition.x;
        this.y = newPosition.y;

        this.updateScreen();

        this.checkWallCollision();
    }

    this.calculateNewPosition = function(){
            var dH = 5;
            var dX = Math.sin(this.degree * (Math.PI/180) ) * dH;
            var dY = Math.cos(this.degree * (Math.PI/180) ) * dH;
            var newPoint = {
                x : this.x +dX,
                y : this.y +dY,
            };
            return newPoint;
    }

    this.checkWallCollision = function(){

        

        if(this.getDistanceTo(this.x,0)<=this.radius){
            //Top Touched

            if(this.degree == 270 ) {this.degree = 90; return ;}
            if(this.degree == 90 ) {this.degree = 270; return ;}
            if(this.degree == 0 || this.degree == 360 ) {this.degree = 180; return ;}
            if(this.degree == 180 ) {this.degree = 0; return ;}
            
            if(this.degree < 180 && this.degree > 90 )
                this.degree = 180 - this.degree ;
            
            if(this.degree < 270 && this.degree > 180)
                this.degree = 270 +  (270 - this.degree); 

        }else if(this.getDistanceTo(this.x,this.parentHeight)<=this.radius){
            //Bottom Touched
            if(this.degree == 270 ) {this.degree = 90; return ;}
            if(this.degree == 90 ) {this.degree = 270; return ;}
            if(this.degree == 0 || this.degree == 360 ) {this.degree = 180; return ;}
            if(this.degree == 180 ) {this.degree = 0; return ;}

            if(this.degree < 360 && this.degree > 270)
                this.degree  = 180 + (360 - this.degree);
            
            if(this.degree >0 && this.degree < 90)
                this.degree = 180 - this.degree ;

        }else if(this.getDistanceTo(0,this.y) <= this.radius){
            //Left Collided  
            if(this.degree == 270 ) {this.degree = 90; return ;}
            if(this.degree == 90 ) {this.degree = 270; return ;}
            if(this.degree == 0 || this.degree == 360 ) {this.degree = 180; return ;}
            if(this.degree == 180 ) {this.degree = 0; return ;}

            if(this.degree > 180 && this.degree < 270)
                this.degree = 180 - (this.degree - 180) ;
            
            if(this.degree > 270 && this.degree < 360 )
                this.degree = 360 - this.degree;

        }else if(this.getDistanceTo(this.parentWidth,this.y) <= this.radius){
            //Right Collided    
            if(this.degree == 270 ) {this.degree = 90; return ;}
            if(this.degree == 90 ) {this.degree = 270; return ;}
            if(this.degree == 0 || this.degree == 360 ) {this.degree = 180; return ;}
            if(this.degree == 180 ) {this.degree = 0; return ;}

            if(this.degree > 90 && this.degree < 180)
                this.degree  = (180-this.degree)+180;
            
            if(this.degree > 0 && this.degree < 90)
                this.degree = 360 - this.degree;
            
        }

        if(this.degree > 360 ) this.degree = this.degree - 360;
        if(this.degree < 0 ) this.degree =  360 + this.degree;
    }
    

    this.getDistanceTo =function(x,y){
        return Math.sqrt(Math.pow(this.x-x,2)+Math.pow(this.y-y,2));
    }


}