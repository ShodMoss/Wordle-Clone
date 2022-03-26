document.addEventListener("DOMContentLoaded", () =>{
    createSquares();
    
    let guessWords = [ [ ] ];
    let availableSpace = 1;
    let correctKeys = {};
    [..."abcdefghijklmnopqrstuvwxyz"].forEach((letter) => {
        correctKeys[letter] = -1 //set to no color state
    });
    let tile_colors = {
        0: "rgb(58, 58, 60)",
        1: "rgb(181, 159, 59)",
        2: "rgb(83, 141, 78)"
    };
    let word = "greed"
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

    function getTileColorId(letter, index) {
        const isCorrectLetter = word.includes(letter);
        const letterInThatPosition = word.charAt(index);
        const isCorrectPosition = letter === letterInThatPosition;

        if (!isCorrectLetter) {
            //gray
            return 0;
        } else if (isCorrectPosition) {
            //green
            return 2;
        }
        //yellow
        return 1;
    }

    function updateCorrectKey(letter, colorId) {
        if (correctKeys[letter] < colorId) {
            correctKeys[letter] = colorId; 
        }
    }
    function changeKeyColor(key){
        let letter = key.getAttribute('data-key');
        let keyColor = tile_colors[correctKeys[letter]];
        if (keyColor) {
            key.style = `background-color:${keyColor}`;
        }
    }

    function realWord () {
          if (realWordBank.includes(handleSubmitWord.currentWord)){
              return true
          }
          else
            return false
      }

    function handleSubmitWord(){
        const currentWordArr = getCurrentWordArr()
        if (currentWordArr.length !==5){
            window.alert("Word must be 5 letters");
            return
        }

        const currentWord = currentWordArr.join("");

        if (realWord === false){
            window.alert("That is not a real word");
            return
        }

        const firstLetterId = guessedWordCount * 5 + 1;
        const interval = 200;
        let letterELs = [];

        currentWordArr.forEach((letter, index) => {
            const colorId = getTileColorId(letter, index);
            const tileColor = tile_colors[colorId];
            const letterId = firstLetterId + index;
            letterELs.push([tileColor, letterId]);
            updateCorrectKey(letter, colorId);
        });

        keys.forEach(key => {
            changeKeyColor(key);
        });

        letterELs.forEach((letterData, index)=> 
            setTimeout(() => {
                const tileColor = letterData[0];
                const letterId = letterData[1];
                const letterEl = document.getElementById(letterId);
                letterEl.classList.add("animate__flipInX");
                letterEl.style = `background-color:${tileColor};border-color:${tileColor}`;
            }, interval * index));

        guessedWordCount += 1;

        if (currentWord === word){
            window.alert("Congratulations!");
        }

        if (guessWords.length === 6 && currentWord != word){
            window.alert(`You have lost. The word is ${word}`);
        }

        guessWords.push([])
    }

    function handleDeleteLetter() {
        const currentWordArr = getCurrentWordArr();
        const removedLetter = currentWordArr.pop();
    
        guessWords[guessWords.length - 1] = currentWordArr;
    
        const lastLetterEl = document.getElementById(String(availableSpace - 1));
    
        lastLetterEl.textContent = "";
        availableSpace = availableSpace - 1;
      }


    for (let x = 0; x < keys.length; x++) {
        keys[x].onclick = ({target}) => {
            const letter = target.getAttribute("data-key");

            if (letter === 'enter'){
                handleSubmitWord()
                return;
            }

            if (letter === "del"){
                const currentWordArrDel = getCurrentWordArr()
                if (currentWordArrDel.length === 0){
                    return
                }
                else {
                    handleDeleteLetter()
                }
                return;
            }

            updateGuessedWords(letter);
        };
        
    }

});