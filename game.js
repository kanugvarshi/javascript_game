var buttonColors=["red","blue","green","yellow"];
var gamePattern=[];
var audio;
var userClickedPattern=[];
var level=0;
var started=false;
var count=0;
function nextSequence(){
    userClickedPattern=[];
    count=0;
    level++;
    $("h1").html('Level '+level);
    //alert("hai");
    var randomNumber =Math.floor(Math.random() *4);
    var randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
   // $("#"+randomChosenColor).css("margin","100px");
   
    $("#"+randomChosenColor).fadeOut(200);
    $("#"+randomChosenColor).fadeIn(200);
    playSound(randomChosenColor);
}

$(".btn").click(function(){
var userChosenColor = $(this).attr('id');
//alert(userChosenColor);
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
//starting of code execution
$(document).keypress(function(){  
    if(!started){
        $("h1").html('Level '+level);
        nextSequence();
        started=true;
    }
})

function startOver(){
    gamePattern=[];
    started=false;
    level=0;
   // alert("gameover");
   // userClickedPattern=[];
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        count++;
        if(count===gamePattern.length){
            if(userClickedPattern.length===gamePattern.length){
                alert("success");
                setTimeout(function(){
                    nextSequence();
                },1000);
            }
        }
    }
    else{
        var w=new Audio("sounds/wrong.mp3");
        w.play();
        //alert("sorry");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press any key to restart");
        startOver();
    }
}

