document.addEventListener("DOMContentLoaded", () =>{
    createSquares();

    let guessWords = [ [ ] ];
    let availableSpace = 1;

    let word = "dairy"

    const keys = document.querySelectorAll('.keyboard-row button');

    function getCurrentWordArr(){
        const numberOfGuessedWords = guessWords.length;
        return guessWords[numberOfGuessedWords -1];
    }

    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr();

        if (currentWordArr && currentWordArr.length <5){
            currentWordArr.push(letter);

            const availableSpacEl = document.getElementById(String(availableSpace));
            availableSpace = availableSpace + 1

            availableSpacEl.textContent = letter;
        }
    }

    function createSquares(){
        const gameBoard = document.getElementById("board")

        for (let index = 0; index < 30; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
            
        }
    }

    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr.length !==5){
            window.alert("Word must be 5 letters");
        }

        const currentWord = currentWordArr.join('')

        if (currentWord === word){
            window.alert("Congratulations!");
        }

        if (guessWords.length === 6){
            window.alert(`You have lost. The word is ${word}`);
        }

        guessWords.push([])
    }


    for (let x = 0; x < keys.length; x++) {
        keys[x].onclick = ({target}) => {
            const letter = target.getAttribute("data-key");

            if (letter === 'enter'){
                handleSubmitWord()
                return;
            }

            updateGuessedWords(letter);
        };
        
    }

});