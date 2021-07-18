//Variables

var playing = false;
var score;
var timeremaining;
var action;
var correctanswer;

// if we click on start/reset
document.getElementById("startreset").onclick = function(){
    // if we are playing
    if(playing==true){
        // reload page
        location.reload();
    }
    // if we are not playing
    else{
        // set playing mode as true which was false earlier
        playing = true;
        // set score to zero
        score=0;
        document.getElementById("scorevalue").innerHTML = score;
        // show countdown box
        show("time");
        timeremaining = 60;
        document.getElementById("timevalue").innerHTML = timeremaining;
        hide("gameover");     // hide func called to hide game over box once game is restarted
        // change button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";
        // reduce time by 1s in loops using countdown func generated below
        startcountdown();    // calling the function startcountdown
        // Generate q&a
        generateQA();
    } 
}

for(i=1; i<5; i++){
    //To generate another question after attempting one question correctly
    document.getElementById("box" + i).onclick = function(){
        if(playing == true){
            // if(document.getElementById("box1").innerHTML == correctanswer)   to check whether clicked box value is = correctanswer
            if(this.innerHTML == correctanswer){      //Using keyword this to check value of box1
                score++;   //increase score by 1 if answer is correct
                document.getElementById("scorevalue").innerHTML = score;
                hide("wrong");
                show("correct");    
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                //Generate another question when correct
                generateQA();
            }
            else{
                show("wrong");
                hide("correct");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
        }   
    }
}


//Functions used
//1. Start the counter
function startcountdown(){
    action = setInterval(function(){
        timeremaining-=1;
        document.getElementById("timevalue").innerHTML = timeremaining;
        // time left?
        if(timeremaining==0){          
            //Game over
            stopcountdown();     // calling the function stopcountdown
            // document.getElementById("gameover").style.display = "block";   Can be used if show func not created
            show("gameover");    // calling the function show
            document.getElementById("gameover").innerHTML = "<p>Game over!</p><p>your score is " + score +".</p>";
            hide("time");       // calling the function hide
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}
 //2.Stop counter
function stopcountdown(){
    clearInterval(action);
}

//3.Hide elements
function hide(id){
    document.getElementById(id).style.display = "none";    // created func as many times the display property has to be used
}

//4.Show hidden elements
function show(id){
    document.getElementById(id).style.display = "block";    // created func as many times the display property has to be used
}

//5.Generate Q&A
function generateQA(){
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctanswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctposition = 1 + Math.round(3 * Math.random());
    document.getElementById("box" + correctposition).innerHTML = correctanswer;    // Filling any 1 box with the correct answer
    // Fill other boxes with wrong answers of different values
    
    var answers = [correctanswer];
    for(i=1; i<5; i++){
        if(i != correctposition){
            var wronganswer;
            do{               
                wronganswer = ((1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random())));  // a wrong answer
            }while(answers.indexOf(wronganswer) > -1)   
            document.getElementById("box" + i).innerHTML = wronganswer;
            answers.push(wronganswer); 
        }
    }
}