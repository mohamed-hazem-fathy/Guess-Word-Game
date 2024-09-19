//Setting Game Name
let gameName = "Guess the Word"
document.title = gameName
document.querySelector('h1').innerHTML = gameName;
document.querySelector('footer').innerHTML = `${gameName} Game Created By Mohamed Hazem`

//Setting Game Option
let numbersOfTries = 6;
let numbersOfLetter = 6;
let curruntTry = 1;

//Manage Words
let wordToGuess = "";
const words = ["Create","Update","Delete","Master","Branch","Mainly","Elzero","School"];
wordToGuess = words[Math.floor(Math.random() * words.length)].toLowerCase();
let MassageArea = document.querySelector('.massage')
console.log(wordToGuess);



function generateInput() {
    const inputsContainer = document.querySelector('.inputs');
    // Creat main try dIV
    for(let i = 1; i <= numbersOfTries ; i++) {

        const tryDiv = document.createElement('div');
        tryDiv.classList.add( `try-${i}`);
        tryDiv.innerHTML = `<span>Try ${i}</span>`;


        if(i !== 1) tryDiv.classList.add("disabled-input")

        //creat input
        for(let j = 1; j <= numbersOfLetter; j++){
            const input = document.createElement('input');
            input.type = "text";
            input.id = `guess-${i}-letter-${j}`;
            input.setAttribute("maxlength", "1");
            tryDiv.appendChild(input);
        }

        inputsContainer.appendChild(tryDiv)

    }
    inputsContainer.children[0].children[1].focus();

    //Disable All Input Except Frist One
    const inputsinDisabledDiv = document.querySelectorAll(".disabled-input input")
    inputsinDisabledDiv.forEach((input) => (input.disabled = true));

    const inputs = document.querySelectorAll("input");
    inputs.forEach((input, index)=> {
        //Convert input to uppercase
        input.addEventListener("input",function() {
            this.value = this.value.toUpperCase();
            const nextInput = inputs[index  + 1]
            if(nextInput) nextInput.focus()

        });

        input.addEventListener("keydown" , function(event) {
            //console.log(event)
            const currentIndex = Array.from(inputs).indexOf(event.target); //or this
            //console.log(currentIndex)
            if(event.key === "ArrowRight") {
                const nextInput = currentIndex + 1;
                if (nextInput < inputs.length) inputs[nextInput].focus();
            }
            if(event.key === "ArrowLeft") {
                const pervInput = currentIndex - 1;
                if (pervInput < inputs.length) inputs[pervInput].focus();
            }
        });
    });

}

const guessButton = document.querySelector(".check");
guessButton.addEventListener("click", handelGuesses);

function handelGuesses() {
    let successGuess = true;
    for(let i = 1 ; i <= numbersOfLetter; i++) {
        const inputField = document.querySelector(`#guess-${curruntTry}-letter-${i}`);
        const letter = inputField.value.toLowerCase();
        const actualLetter = wordToGuess[i - 1];
        //Game Logic
        if(letter === actualLetter) {
           //Letter Is Correct And In Place
            inputField.classList.add("yes-in-place");
        }else if (wordToGuess.includes(letter) && letter !== "") {
            //Letter Is Correct And Not In Place
            inputField.classList.add("not-in-place");
            successGuess =  false;
        }else{
            inputField.classList.add("no");
            successGuess = false;
        }
    }

    //Check if user win or lose

    if(successGuess ) {
    MassageArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`
    //Add Disabel Class An All Input
    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    //Disable Guess Button
    guessButton.disabled = true;
    }else{
        document.querySelector(`.try-${curruntTry}`).classList.add("disabled-input");
        const currentTryInput = document.querySelectorAll(`.try-${curruntTry} input`);
        currentTryInput.forEach((input) => input.disabled = true)

        curruntTry++;


        const nextTryInputs = document.querySelectorAll(`.try-${curruntTry} input`);
        nextTryInputs.forEach((input) => input.disabled = false);


        let el = document.querySelector(`.try-${curruntTry}`)
        if (el) {
            document.querySelector(`.try-${curruntTry}`).classList.remove("disabled-inputs");
            el.children[1].focus();
        }else {

        }

    }
}









window.onload = function() {
    generateInput();
}