function Vehicle(speed){
    this.x = 0;
    this.parent = undefined;

    this.speed = speed;

    this.element;

    this.laneWidth = 150;

    this.lane = 1;

    this.top = 0;

    this.init = function(parent){
        this.parent = parent;
        this.top = (this.lane -1) * this.laneWidth;
        var vehicle = document.createElement('img');
        vehicle.style.height = "150px";
        vehicle.src = "images/car_2.png";
        vehicle.style.position = "absolute";
        vehicle.style.top = this.top + "px";
        vehicle.style.zIndex = "100";

        vehicle.style.left = "0px";
        vehicle.style.transform = "rotate(180deg)";
        this.element = vehicle;

        this.parent.appendChild(vehicle);

    }

    this.moveUp = function(){
        if(this.lane>1) this.lane--;
        this.update();
    }

    this.moveDown = function(){
        if( this.lane<3) this.lane++;
        this.update();
    }

    this.update = () =>{
        this.element.style.top = (this.laneWidth * (this.lane-1))  + "px";
    }

    this.getLane =  () =>{
        return this.lane;
    }

    this.clearVehicle = () =>{
        this.lane = 1;
        this.element.remove();
    }

   

}