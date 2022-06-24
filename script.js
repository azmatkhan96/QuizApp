let timeLeft = document.querySelector(".timer-left");
let quizContainer = document.getElementById("container");
let nextBtn= document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");

let questionCount;
let scoreCount = 0;
let count = 11; 
let countdown;

// Questions and option arrays

const quizArray = [
                  {
                    id: "0",
                    question: "Which is the most widely spoken language in the world ?",
                    options: ["Spanish", "German", "English", "Mandarin"], 
                    correct: "English",
                   },
                   {
                    id: "1",
                    question: "which is the only continent in the world without a desert ?",
                    options: ["North America", "Asia","Africa", "Europe"], 
                    correct: "Europe",
                   },
                   {
                    id: "2",
                    question: "who invented Computer",
                    options: ["Charles Babbage", "Henry Luce", "Henry Babbage", "Charles Luce"],
                    correct: "Charles Babbage",
                    },
                ];




//Display quiz
const quizDisplay=(questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");

    quizCards.forEach((card) => {
        card.classList.add("hide");
    });

    quizCards[questionCount].classList.remove("hide");
};

//Timer

const timerDisplay = () => {
        countdown = setInterval(() =>{
            count--;
            timeLeft.innerHTML=`${count}s`;
            if(count == 0)
            {
                clearInterval(countdown);
                displayNext();
            }

        }, 1000)
};

  // Quiz create
  
  function quizCreator(){
  //randomly sort question
    quizArray.sort(() => Math.random() - 0.5);
//generate quiz
    for(let i of quizArray)
    {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div= document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML +=`
        <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
        <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
        `;
        quizContainer.appendChild(div);

    }

  }

  //Restart Quiz

  restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
  });

  //next button 
  nextBtn.addEventListener("click", (displayNext = () =>{
    questionCount +=1;
    if(questionCount == quizArray.length)
    {
        displayContainer.classList.add("hide");
        scoreContainer.classList.remove("hide");

        userScore.innerHTML="Your score is " + scoreCount+ " out of " + questionCount;
    }
    else
    {
        countOfQuestion.innerHTML= questionCount + 1 + " of " + quizArray.length + " Question";
        quizDisplay(questionCount);
        count=11;
        clearInterval(countdown);
        timerDisplay(); 
    }
  })
  );

//check if opt is correct or not

function checker(userOption)
{
    let userSolution = userOption.innerText;
    let question = document.getElementsByClassName("container-mid")
    [questionCount];
    let options = question.querySelectorAll(".option-div");
//if user click ans == opt

    if(userSolution === quizArray[questionCount].correct)
    {
        userOption.classList.add("correct");
        scoreCount++;
    } 
    else{
        userOption.classList.add("incorrect");
        //for making the correct   

        options.forEach((element) => {
            if(element.innerText == quizArray[questionCount].correct)
            {
                element.classList.add("correct");
            }
        });
    }
//clear interval stop timer
    clearInterval(countdown);
   
}

//initial setup  
function initial()
{
    quizContainer.innerHTML ="";
    questionCount = 0;
    scoreCount= 0;
    count= 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}

// when user click start

startButton.addEventListener("click", () =>{
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});

  window.onload =() => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
  };
