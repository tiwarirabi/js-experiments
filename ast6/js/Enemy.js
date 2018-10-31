function Enemy(speed,lane){
    this.x = 0;
    this.parent = undefined;

    this.speed = speed;

    this.element;

    this.lane = lane;

    this.laneWidth = 150;
    
    this.left = window.innerWidth;

    this.elementRemoveCallback = undefined;

    this.init = function(parent){
        this.parent = parent;
        this.top = this.laneWidth *(this.lane-1);
        var vehicle = document.createElement('img');
        vehicle.style.height = "150px";
        vehicle.src = "images/car_1.png";
        vehicle.style.position = "absolute";
        vehicle.style.top = this.top + "px";
        vehicle.style.zIndex = "100";

        vehicle.style.left = this.left + "px";
        this.element = vehicle;

        this.parent.appendChild(vehicle);

        
            
    }

    this.move = function(){
        if(this.left>-300) {
            this.left = this.left - this.speed;
            this.element.style.left = this.left  + "px";
        }else{
            this.elementRemoveCallback(this);
        }
    }

    this.setElementRemoveCallback = (callback) =>{
        this.elementRemoveCallback = callback;
    }

    this.checkCollision = (collideWith) =>{
        console.log(this.left);
        if(this.left < 260 && this.lane==collideWith.getLane()){
            this.speed = 0;
            return true;
        }
        return false;
    }

    this.clearVehicle = () =>{
        this.element.remove();
    }
   

}