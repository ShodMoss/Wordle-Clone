document.addEventListener("DOMContentLoaded", () =>{
    createSquares();

    const guessWords = [ [ ] ]

    const keys = document.querySelectorAll('.keyboard-row button')

    for (let x = 0; x < keys.length; x++) {
        keys[x].onclick = ({target}) => {
            const letter = target.getAttribute("data-key");

            updateGuessedWords(letter)
        }
        
    }

    function getCurrentWordArr(){
        const numberOfGuessedWords = guessWords.length
        return guessWords[numberOfGuessedWords -1]
    }

    function updateGuessedWords(letter){
        const currentWordArr = getCurrentWordArr()

        if (currentWordArr && currentWordArr.length <5){
            currentWordArr.push(letter)
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


})