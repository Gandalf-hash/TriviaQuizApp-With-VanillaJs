    import triviaItems from "./trivia-item.js";
    import shuffle from "./shuffle.js";


    const scoreEl = document.querySelector("#score"),
    questionNumberEl = document.querySelector("#question-number"),
    triviaContainer = document.querySelector("#trivia-container"),
    triviaTemplate = document.querySelector("#trivia-item-template");

    let score = 0;
    let triviaItemIndex = 0;


    // console.log(triviaItems);
    // udates the score and keep our index in sync wiht the UI
    function updateScore(newScore) {
        score = newScore;
        scoreEl.textContent = score;
    }

    // Updates the Question number and also sync our index
    function updateQuestionNumber() {
        const questionNum = triviaItemIndex + 1;
        const totalNumQuestions = triviaItems.length;
        questionNumberEl.textContent = `${questionNum} / ${totalNumQuestions}`;
    }

    // Cloning the template
    function displayTriviaItem() {
        const triviaItem = triviaItems[triviaItemIndex];
        //Renaming the actual data with mine.
        const {question, correct_answer: correctAnswer, incorrect_answers: incorrectAnswers} = triviaItem;

        // Creating the shuffled answers
        const allAnswer = shuffle([correctAnswer, ...incorrectAnswers])

        const triviaItemData = triviaTemplate.content.cloneNode(true);
        const questionEl = triviaItemData.querySelector(".trivia-item__question");
        questionEl.innerHTML = question;

    const buttonEl = triviaItemData.querySelectorAll(".trivia-item__button");
    buttonEl.forEach((button, index) => {
        button.innerHTML = allAnswer[index];
        button.addEventListener("click", onAnswerClicked);
    });

    triviaContainer.appendChild(triviaItemData);

    const triviaDiv = triviaContainer.querySelector(".trivia-item");
    const keyFrames = [
        {opacity: 1},
        {opacity: 0}
    ]
    const options = {
        duration: 500,
        easing: "ease-out"
    };
    }
    //Checking the correct and icorrect answers. And giving feedback.
    function onAnswerClicked() {
        const target = event.target;
        const selectedAnswer = target.innerHTML;
        const triviaItem = triviaItems[triviaItemIndex];
        const correctAnswer = triviaItem.correct_answer;


        const buttonEl = triviaContainer.querySelectorAll(".trivia-item__button");
        buttonEl.forEach(button => {
            button.disabled = true;
            button.classList.add(".trivia-item__button--disabled");
        })

        if (selectedAnswer === correctAnswer) {
            console.log("Correct!");
            updateScore(score + 1);
            target.classList.add("trivia-item__button--correct");
        } else {
            console.log("Incorrect!");
            target.classList.add("trivia-item__button--incorrect");
        }
        const triviaDiv = triviaContainer.querySelector(".trivia-item");
        const keyFrames = [
            {opacity: 1},
            {opacity: 0}
        ];
        const options = {
            duration: 500,
            delay: 500,
            easing: "ease-in"
        };
        const animate = triviaDiv.animate(keyFrames, options);

        animate.addEventListener("finish", () => {
            clearTrivia();
            triviaItemIndex += 1;

            if (triviaItemIndex === triviaItems.length) 
                alert(`Game over. Your score is ${score}.`);
            else
            displayTriviaItem();
            updateQuestionNumber();
        });


    }
    // Clear the trivia items page
    function clearTrivia() {
        let child;
        for (child of triviaContainer.children){
            triviaContainer.removeChild(child);
        }
    }

    updateScore(0);
    updateQuestionNumber();
    displayTriviaItem();


    // console.log(scoreEl, questionNumberEl, triviaContainer, triviaTemplate);
    // scoreEl.textContent = 10;
    // questionNumberEl.textContent = "2 / 15";
    // triviaContainer.insertAdjacentHTML("beforeend", "<p>Testing</p>");





















    

