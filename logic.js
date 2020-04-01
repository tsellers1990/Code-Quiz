// variables to keep track of quiz state
var timerId;
var currentQuestionIndex;
var time;
// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");  
var choicesEl = document.getElementById("choices"); 
var submitBtn  = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
var feedbackEl = document.getElementById("feedback");
var startScreenEl = document.getElementById("start-screen");
var endScreenEl = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");

var highScoreBtn = document.getElementById("highscore");
var leaderBoardArray = [
    {name:"Joe Mama", score:"-7"}
]

// fill in the leaderboard array, then connnect that to the high score board
// get feedback to pop up ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

function startQuiz() { 
    currentQuestionIndex = 0;
    time = questions.length * 15; ///set back to 15 seconds after testing
    startScreenEl.setAttribute("class" , "hide")//on button press, hide the startScreenEl
    questionsEl.removeAttribute("class"); // on button press, un-hide the questionsEl
    // feedbackEl.removeAttribute("class");
    
    //start timer
    timerId = setInterval(clockTick, 1000); 
    
    //show starting time
    timerEl.textContent = time;
    clockTick();
    getQuestion();
}

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    
    titleEl.textContent = currentQuestion.title;//this shows the question at the top
    for(i = 0; i < currentQuestion.choices.length; i++){
        var list = document.createElement("div");   //this creates a div for
        list.textContent = questions[currentQuestionIndex].choices[i]; 
        list.addEventListener("click", function(){
            questionClick();
        })
        choicesEl.appendChild(list);
        
        //remove the choices from the divs after click event!
    }
    
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer){
        //time goes down
        time-=15;
        timerEl.textContent = time;
        feedbackEl.textContent = 'Wrong';
    } else {
        feedbackEl.textContent = 'Correct';
    }
    currentQuestionIndex++;
    choicesEl.textContent = "";
    
    if (currentQuestionIndex === questions.length){
        
        quizEnd();
        
    } else{
        getQuestion();
    }
}

function quizEnd() {
    questionsEl.setAttribute("class" , "hide")//on button press, hide the startScreenEl
    endScreenEl.removeAttribute("class"); // on button press, un-hide the questionsEl
    finalScoreEl.textContent = time
    submitBtn.addEventListener("click", scoreLog)//submit gets clicked
}

function clockTick() { //das es gut
    if(time >= 0){
        time -=1;
        timerEl.innerHTML = time;
    }else{
        quizEnd();
    }
    }

function scoreLog(){
    //initials element is the textbox
    var userInitials;
    userInitials = initialsEl.value;
    var toArray = {name: userInitials, score: time}

    leaderBoardArray.push(toArray);
    endScreenEl.setAttribute("class" , "hide");
    questionsEl.setAttribute("class" , "hide")
    startScreenEl.removeAttribute("class")
}
    //leaderBoardArray -> obj{initials get set as an attribute -> time gets set as an attribute}


function hsb(){
    // alert(scoreboard)
    if(leaderBoardArray.length > 0){
        for(i = 0; i < leaderBoardArray.length; i++)
        alert(`#${i + 1}: ${leaderBoardArray[i].name} ${leaderBoardArray[i].score}`)
    } else{
        alert("There are no high scores!")
    }

}
    
// user clicks button to start quiz
startBtn.onclick = startQuiz;
highScoreBtn.onclick = hsb;