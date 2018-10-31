window.onload = () => {
    var single = "*";
    var currentOutput = "";

    var maxLength = 5;
    
    //set initial increasing to true and add more singles on each loop
    var isAscending = true;

    
    //Loop every 100 milliseconds and display the output
    setInterval(()=>{

        if(isAscending)
            currentOutput += single;
        else
            currentOutput = currentOutput.substr(0,currentOutput.length-1);

        
        if(currentOutput.length == maxLength)
            isAscending = false;
        else if(currentOutput.length==1)
            isAscending = true;
        
        console.log(currentOutput);
          
    },100);

}