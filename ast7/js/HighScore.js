class HighScore{
    constructor(){

    }

    setIfHighest(score){
        if(score>this.get()){
            //Save the high score
            localStorage.setItem("highScore",score);
        }
    }

    get(){
        return parseInt( (localStorage.getItem("highScore")===null) ? 0 : localStorage.getItem("highScore")  );
    }
}