let title = "Guss Game";
document.title = title
document.querySelector("h1").innerHTML = title
document.querySelector("footer").innerHTML = `This game created by Mohamed Hazem`

let numberOftry = 6;
let numberOfLetter = 6;
let currentTry = 1;


function generateInput() {
    let inputsContainer = document.querySelector(".inputs")
    for(let i = 1;i <= numberOftry;i++){

        const Trydiv = document.createElement('div');
        Trydiv.classList.add( `try-${i}`);
        Trydiv.innerHTML = `<span>Try ${i}</span>`;


        if(i !== 1) Trydiv.classList.add("disabled-input")

        for(let l =1;l<=numberOfLetter;l++){
            const input = document.createElement("input")
            input.type = "text";
            input.id = `guess${i}-letter${l}`;
            input.setAttribute("maxlength","1");
            Trydiv.appendChild(input);
        }

        inputsContainer.appendChild(Trydiv)

    }
    inputsContainer.children[0].children[1].focus();

    //Disabel All Input Except Frist One
    const inputsinDisabledDiv = document.querySelectorAll(".disabled-input input")
    inputsinDisabledDiv.forEach((input)=> input.disabled = true)


}
window.onload = function(){
    generateInput()
}
