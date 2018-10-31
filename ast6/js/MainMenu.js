function MainMenu(){
    this.element = undefined;
    this.isShown = false;

    this.parent = undefined;

    this.playFunction = undefined;
    this.startFunction = undefined;

    this.ulElement = undefined;

    var self = this;

    this.init = (parent) =>{
        this.parent = parent;

        var wrapper = document.createElement('div');
        wrapper.style.position = "absolute";
        wrapper.style.top = "20px";
        wrapper.style.left = "50%";
        wrapper.style.width = "300px";
        wrapper.style.marginLeft = "-150px";
        wrapper.style.height = "300px";
        wrapper.style.backgroundColor = "white";
        wrapper.style.border = "15px solid #aaa";
        wrapper.style.zIndex = "1000";

        var ul = document.createElement('ul');
        ul.style.padding = "0px";
        ul.style.margin = "0px";
        ul.style.listStyle = "none";

        ul.appendChild(this.menuItem("Start",()=>{
            this.hide();
            this.startFunction();
        }));

        this.ulElement = ul;
        wrapper.appendChild(ul);
        this.element = wrapper;

        this.parent.appendChild(this.element);
    }

    this.setStartCallBack = (callback) =>{
        this.startFunction = callback;
    }

    this.setPlayCallBack = (callback) =>{
        this.playFunction = callback;
    }

    this.menuItem = (text,clickedFunction) =>{
        var li = document.createElement('li');
        li.style.padding = "20px";
        li.innerHTML = text;
        li.onclick = clickedFunction;
        li.style.textAlign = "center";

        return li;
    }

    this.show = (whichMenu) => {
        this.isShown = true;

        if(whichMenu=="pausedMenu"){
            this.ulElement.innerHTML = "";
            this.ulElement.appendChild(this.menuItem("Resume",()=>{
                
                self.playFunction();
            }));
        }else{
            this.ulElement.innerHTML = "";
            this.ulElement.appendChild(this.menuItem("Start",()=>{
                
                self.startFunction();
            }));
        }
        this.update();
    }

    this.hide = () => {
        this.isShown = false;
        this.update();
    }

    this.update = () => {
        if(this.isShown){
            this.element.style.display = "block";
        }else{
            this.element.style.display = "none";
        }
    }
}