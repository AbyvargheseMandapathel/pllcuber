window.onload = function(){

var notations = ["R","L","F","B","U","D"];

function produceScramble(){
    
    //setting up the scramble
    var scramble = "";
    
    for(let i=0;i<Math.floor(Math.random()*6)+19;i++){

        var randomNum = Math.floor(Math.random()*4);

        if(randomNum == 0){
            additive = "";
            
        }else if(randomNum == 1){
            additive = "\'";
            
        }else {
            additive = "2";
            
        }
        
        var randomArrayIndex = Math.floor(Math.random()*6);

        var newNotation = notations[randomArrayIndex] + additive;


        //preventing 2 repeated notations in a row
        var scrambleArray = scramble.split(" ");
        
        if(i > 0){
        
            if(notations[randomArrayIndex] == scrambleArray[i-1][0]){

                i--;
            
            }else {
        
                scramble += newNotation + " ";
        
            }
        
        }else {
        
            scramble += newNotation + " ";
        
        }
        
    }
    
    
    scramble = scramble.slice(0,scramble.length-1);
    
    //displaying the scramble
    document.querySelector(".text").innerText = scramble;
    
}

produceScramble();



//starting timer function
var updateInterval;

function touchStart2(){
    functions.stopTimer();
    
}

function keyDown2(e){
    
    if(e.code.toLowerCase() == "space"){
            
        functions.stopTimer();
        
        spaceDown = true;
        
    }
    
}

function startTimer(){
    document.querySelector(".wrapper").removeEventListener("touchstart",touchStart);

    window.removeEventListener("keydown",keyDown);

    document.querySelector(".wrapper").addEventListener("touchstart",touchStart2);

    window.addEventListener("keydown",keyDown2);

    document.body.style.background = "#77FF77";
    
    document.querySelector(".timer").style.fontSize = "20vw";
    
    var timerMinutes = 0;
    var timerSeconds = 0;
    var timerSecondsText;
    var timerMilliSeconds = 0;
    var timerMilliSecondsText;
    
    updateInterval = true;

    function updateTimer(){
    
    setTimeout(function(){
    
        if(updateInterval)
            setTimeout(updateTimer,1/2);
    
        timerMilliSeconds++;
        
        if(timerMilliSeconds == 100){
            
            timerSeconds += 1;
            
            timerMilliSeconds = 0;
            
        }
        
        if(timerSeconds == 60){
            
            timerMinutes += 1;
            timerSeconds = 0;
            
        }
        
        if(timerMilliSeconds.toString().length == 1){
            timerMilliSecondsText = "0" + timerMilliSeconds.toString();
    
        }else{
        
            timerMilliSecondsText = timerMilliSeconds.toString();
            
        }
        
        timerSecondsText = timerSeconds.toString();
        
        if(timerMinutes > 0){
            
            if(timerSecondsText.length == 1){
                timerSecondsText = timerMinutes.toString() + ":0" + timerSecondsText;
    
            }else {
                timerSecondsText = timerMinutes.toString() + ":" + timerSecondsText;
                
            }
            
        }
        
        var timerText = timerSecondsText + "." + timerMilliSecondsText;
        document.querySelector(".timer").innerText = timerText;
        
    },1/2);
    
    }
    
    setTimeout(updateTimer,1/2);
    
}

//putting functions in an object to make them look more organized

var startTimerTimeout;
var canStartTimer = false;

var functions = {
    
    holdScreen:function(){
                    document.body.style.background = "red";

                startTimerTimeout = setTimeout(function(){
                        document.body.style.background = "white";

                        canStartTimer = true;
    
                    },500);
        
                },
                
    releaseScreen:function(){
    
                    if(canStartTimer == false){
                        document.body.style.background = "#77FF77";

                        clearTimeout(startTimerTimeout);

                    }else {
                        
                        startTimer();

                    }
        
                },
                
        stopTimer:function(){
        
                        document.querySelector(".wrapper").removeEventListener("touchstart",touchStart2);

                        window.removeEventListener("keydown",keyDown2);
                        
                        document.querySelector(".wrapper").addEventListener("touchstart",touchStart);

                        window.addEventListener("keydown",keyDown);

                        updateInterval = false;

                        canStartTimer = false;
                        
                        //adding the solve info to the solve list
                        var timeElement = "<span class='solvesTime'>"+document.querySelector(".timer").innerText+"</span>";

                        var scrambleElement = "<span class='solvesScramble'>"+document.querySelector(".text").innerText+"</span>";

                        document.querySelector(".solvesBox").innerHTML = document.querySelector(".solvesBox").innerHTML+"<br />"+timeElement+scrambleElement;
                        
                        
                        //making a new scramble
                        produceScramble();
                        
            
                    }
    
}


//event listeners

function touchStart(){
    functions.holdScreen();
    
}

//touchscreen
document.querySelector(".wrapper").addEventListener("touchstart",touchStart);

document.querySelector(".wrapper").addEventListener("touchend",function(){
    functions.releaseScreen();
    
});


//keyboard
var spaceDown = false;
function keyDown(e){

    if(e.code.toLowerCase() == "space" && !spaceDown){
        
        touchStart();
        
        spaceDown = true;
        
    }
    
}


window.addEventListener("keydown",function(e){
    
    keyDown(e);
    
});

window.addEventListener("keyup",function(e){
    
    if(e.code.toLowerCase() == "space"){
            
        functions.releaseScreen();
        
        spaceDown = false;
        
    }
    
});

//preventing screen from scrolling
window.addEventListener('keydown', function(e) { if(e.keyCode == 32 && e.target == document.body) { e.preventDefault(); } });

}
