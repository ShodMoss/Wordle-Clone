document.addEventListener("DOMContentLoaded", () =>{
    createSquares();
    
    let guessWords = [ [ ] ];
    let availableSpace = 1;

    let word = "dairy"
    let guessedWordCount = 0;

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
            square.classList.add("animate__animated");
            square.setAttribute("id", index + 1);
            gameBoard.appendChild(square);
            
        }
    }

    function getTileColor(letter, index) {
        const isCorrectLetter = word.includes(letter);
    
        if (!isCorrectLetter) {
          return "rgb(58, 58, 60)";
        }
    
        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;
    
        if (isCorrectPosition) {
          return "rgb(83, 141, 78)";
        }
    
        return "rgb(181, 159, 59)";
      }



    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr.length !==5){
            window.alert("Word must be 5 letters");
        }

        const currentWord = currentWordArr.join("");

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        currentWordArr.forEach((letter, index) => {
          setTimeout(() => {
            const tileColor = getTileColor(letter, index);

            const letterId = firstLetterId + index;
            const letterEl = document.getElementById(letterId);
            letterEl.classList.add("animate__flipInX");
            letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
          }, interval * index);
        });

        guessedWordCount += 1;

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