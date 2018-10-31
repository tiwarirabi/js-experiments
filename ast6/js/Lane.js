function Lane(speed){
    this.lane = [];

    this.speed = speed;
    
    this.parent = undefined;

    this.x = 0;
    this.y1 = 145;
    this.y2 = 295;

    this.init = function(parent){


        this.parent = parent;
        var left = -300;
        this.drawAt(this.x);
    }

    this.drawAt =function(left){
        var leftPull = left;
        for(var i = 0; i<((window.innerWidth - leftPull)/150);i++){
            lane1 = document.createElement('div');
            lane1.style.height = "10px";
            lane1.style.width = "150px";
            lane1.style.position = "absolute";
            if(i%2==0){
                lane1.style.backgroundColor = "rgb(255,255,0)";
            }else{
                lane1.style.backgroundColor = "#444";    
            }
            lane1.style.left = left + "px";

            lane2 = lane1.cloneNode();

            lane1.style.top = this.y1 + "px";
            lane2.style.top = this.y2 + "px";

            this.parent.appendChild(lane1);
            this.parent.appendChild(lane2);
            this.lane.push(lane1);
            this.lane.push(lane2);
            left +=  150;
        }
    }

    
    this.move = function(speed){
        this.speed = speed;
        this.x -= this.speed;
        if(this.x <= -300){ 
            this.x = this.x+300; 
        }
        this.lane.forEach((singleLane)=>{
            singleLane.remove();
        });
        this.drawAt(this.x);
    }


}