(function () {
    let numsArray = [];
    let stringsArray = [];
    let cardsArray = [];
    let quanStrings;
    let quanCards;
    let quanColumns;
    let changeSpace = document.getElementById('changeStrAndCol');  //Getting div from html to change
    let gameSpace = document.getElementById('couples-game'); // Getting div from html to game
    let counterDiv = document.createElement('div');
    let q = 0;
    counterDiv.innerHTML = q;
    let timerBlock = document.createElement('div');
    timerBlock.classList.add('timer');
// -------------------------------------------------------------------------------------------------------------------------
    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }
// -------------------------------------------------------------------------------------------------------------------------
    function createSpaceChange() {
        let title = document.createElement('h1'); //Creating title
        let changeForm = document.createElement('form'); //Creating form to selecting the number of strings
        let labelStrings = document.createElement('label'); //Creating label for String input
        let labelColumns = document.createElement('label'); // Creating label for column input
        let changeStrings = document.createElement('input'); // Creating string-input
        let changeColumns = document.createElement('input'); // Creating column-input
        let changeButtonWrapper = document.createElement('div'); //Creating div for btn
        let changeButton = document.createElement('button'); //Creating btn to Play

        changeSpace.classList.add('display-block'); //Adding class to firstdiv in html
        changeForm.classList.add('pageForm'); // Adding class to form
        title.classList.add('title'); // Adding class to title
        title.textContent = 'COUPLES';
        labelStrings.textContent = 'Выберите количество строк (от 2 до 10)';
        labelColumns.textContent = 'Выберите количество колонок (от 2 до 10)';
        changeButton.textContent = 'Играть';
        changeButton.disabled = false; //Playing btn is disabled

        changeColumns.type = 'number';
        changeStrings.type = 'number';

        changeColumns.defaultValue = 4;
        changeStrings.defaultValue = 4;

        changeColumns.max = 10;
        changeStrings.max = 10;

        changeColumns.min = 2;
        changeStrings.min = 2;

        quanCards = changeColumns.value;
        quanStrings = changeStrings.value;

        changeColumns.addEventListener('input', function () {
            let quantity = changeColumns.value*changeStrings.value;
            if(changeColumns.value == 0 || quantity%2 != 0) {
                changeButton.disabled = true;
            } else {
                changeButton.disabled = false;
            }
        })
        changeStrings.addEventListener('input', function () {
            let quantity = changeColumns.value*changeStrings.value;
            if(changeStrings.value == 0 || quantity%2 != 0) {
                changeButton.disabled = true;
            } else {
                changeButton.disabled = false;
            }
        })
        labelColumns.append(changeColumns);
        labelStrings.append(changeStrings);
        changeButtonWrapper.append(changeButton);
        changeForm.append(labelColumns);
        changeForm.append(labelStrings);
        changeForm.append(changeButtonWrapper);
        changeSpace.append(title);
        changeSpace.append(changeForm);

        return {
            changeColumns,
            changeStrings,
            labelColumns,
            labelStrings,
            changeButton,
            changeButtonWrapper,
            changeForm
        }
    }
// -------------------------------------------------------------------------------------------------------------------------
    function createNumArray(quanColumns, quanStrings) {
        for(let elem = 0; elem < quanColumns*quanStrings; elem+=2) {
            numsArray[elem] = elem+1;
            numsArray[elem+1] = elem+1;
        }
        shuffle(numsArray);
        console.log(numsArray);
    }
//--------------------------------------------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------------------------------------------
function assignNumsToCards(quanCards) {
    let cardButton = document.getElementsByTagName('button');
    for(let num = 0; num < quanCards; num++) {
        cardButton[num+1].textContent = numsArray[num];
    }
}

//----------------------------------------------------------------------------------------------

function clickCard(q) {
    let arrayData = [];
    let cardBack = document.querySelectorAll('.card-back')
    cardBack.forEach(btn => btn.addEventListener('click', cardClick = () => { 
        let frontToBack = () => {
            arrayData[0].classList.add('card-back');
            arrayData[0].classList.remove('card-front');
            arrayData[0].classList.remove('game-btn-not-click');
            arrayData[1].classList.add('card-back');
            arrayData[1].classList.remove('card-front');
            arrayData[1].classList.remove('game-btn-not-click');
            arrayData.length = 0;
        }
        
        btn.classList.remove('card-back');
        btn.classList.add('card-front');
        btn.classList.add('game-btn-not-click');
        

    arrayData.push(btn);

    if(arrayData.length == 2) {
        if(arrayData[0].textContent === arrayData[1].textContent) {
            q++;
            counterDiv.innerHTML = q;
            arrayData.length = 0;

            createBtnNextGame(q)

            return q;
        } if(arrayData[0].textContent != arrayData[1].textContent) {
            setTimeout(frontToBack, 500)

        }
    }
    
    
    
    console.log(arrayData);
}))
    };

// -------------------------------------------------------------------------------------------------------------------------
    function createCards(quanCards, quanStrings) { 
       for(let unitStr = 0; unitStr < quanStrings; unitStr++) {
            stringsArray[unitStr] = document.createElement('div');

                for(let unitCard = 0;  unitCard < quanCards/quanStrings; unitCard++) {
                    let cardButton = document.createElement('button');
                    cardButton.disabled = false;
                    cardButton.classList.add('card-btn', 'card-back')
                    cardsArray[unitCard] = cardButton;
                    stringsArray[unitStr].append(cardsArray[unitCard]);
                }
                gameSpace.append(stringsArray[unitStr]);
            }
        }

        
        // -------------------------------------------------------------------------------------------------------------------------
        function createTimer(quanCards) {
            
            let time;
            let toStartTimer;
            for(let quantity = 2; quantity <= quanCards; quantity+=2) {
                if(quanCards == quantity) {
                    time = Math.floor(quantity*3.75);
                    timerBlock.innerHTML = time;
                    
                    let timer = () => {
                        if(timerBlock.innerHTML > 0) {
                            timerBlock.innerHTML --;
                        } if(timerBlock.innerHTML == 0 || counterDiv.innerHTML == quanCards/2) {
                            createBtnNextGame(q, timerBlock);
                            clearInterval(toStartTimer);

                            
                        }
                    }

                    toStartTimer = window.setInterval(timer, 1000);
                    gameSpace.append(timerBlock);

                }
            }
        }
// -------------------------------------------------------------------------------------------------------------------------
        function createBtnNextGame(q, timerBlock) {
            let btnNext = document.createElement('a');
                btnNext.classList.add('game-btn');
                btnNext.textContent = 'Начать заново';
                btnNext.href = 'index.html';

                
                if(q == quanCards/2) {
                    gameSpace.remove();
                    let textVictory = document.createElement('div');
                    textVictory.textContent = 'Поздравляем Вы набрали максимальное количество очков!!!'
                    textVictory.classList.add('text-vic');
                    document.body.append(textVictory);
                    document.body.append(btnNext);
                } if(timerBlock.innerHTML == 0) {
                    gameSpace.remove();
                    let textFailed = document.createElement('div');
                    textFailed.textContent = `УВЫ!!! К сожалению Вы не успели! :( Ваше количество очков: ${counterDiv.innerHTML} `
                    textFailed.classList.add('text-fail');
                    document.body.append(textFailed);
                    document.body.append(btnNext);
                }
            }
// -------------------------------------------------------------------------------------------------------------------------
    function createGame() {
        let spaceForChange = createSpaceChange();


        spaceForChange.changeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            quanColumns = spaceForChange.changeColumns.value;
            quanStrings = spaceForChange.changeStrings.value;
            quanCards = spaceForChange.changeColumns.value*spaceForChange.changeStrings.value;
            counterDiv.classList.add('counter')
            gameSpace.append(counterDiv);
            
            let timer = createTimer(quanCards);
            let arrayForNum = createNumArray(quanColumns, quanStrings);
            let arrayForCards = createCards(quanCards, quanStrings);
            let assignNums = assignNumsToCards(quanCards);
            let click = clickCard(q);
            changeSpace.classList.remove('display-block');
            changeSpace.classList.add('display-none');
            gameSpace.classList.remove('display-none');
            gameSpace.classList.add('display-block');

            
        })
    }



    window.createSpaceChange = createGame;
}) ();