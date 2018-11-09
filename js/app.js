/*
 * Create a list that holds all of your cards
 */
let cards_array = ['fa fa-gem', 'fa fa-gem', 'fa fa-paper-plane', 'fa fa-paper-plane', 'fa fa-anchor', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-bolt', 'fa fa-cube', 'fa fa-cube', 'fa fa-leaf', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
let deckContainer = document.querySelector('.deck');
let clickedCards = [];
let matchedCards = [];
let firstClick = true;
let cardClickedCount = 0;
let shuffledCards = shuffle(cards_array);

shuffledCards.forEach(function (e) {
    let card = document.createElement("li");
    card.classList.add("card");
    card.innerHTML = "<i class='" + e + "'></i>";
    deckContainer.appendChild(card);

    card.addEventListener('click', function () {
        let _this = this;

        cardClickedCount++;

        if(cardClickedCount % 2 == 0)
        {
            countMoves();
        }

        if(firstClick)
        {
            firstClick = false;
            startTimer();
        }

        if (clickedCards.length == 1) {
            card.classList.add('open', 'show');
            clickedCards.push(this);
            if (this.innerHTML == clickedCards[0].innerHTML) {
                this.classList.add('match');
                clickedCards[0].classList.add('match');
                matchedCards.push(this, clickedCards[0]);
                clickedCards = [];
                stopGame();
            } else {
                setTimeout(function () {
                    _this.classList.remove('open', 'show');
                    clickedCards[0].classList.remove('open', 'show');
                    clickedCards = [];
                }, 350);
            }
        } else {
            this.classList.add('open', 'show');
            clickedCards.push(this);
        }
    });

});

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

//function to eliminate star depending on moves
function removeStar() {
       let starCollection = document.querySelector('ul');
       let  stars = document.querySelector('li'); 
       starCollection.removeChild(stars);
}

let moves = document.querySelector('.moves');
let numberOfMoves = 0;
//function to keep track of the number of moves
function countMoves(){
    numberOfMoves++;
    moves.innerHTML = numberOfMoves;
    if(numberOfMoves == 7 || numberOfMoves == 11)
    {
       removeStar();
    }
}

let initialTime = document.querySelector('#timer');
let interval;
//function to set a timer through the game
function startTimer(){
    let min = 0;
    let second = 0;
    interval = setInterval(function(){
        let a = new Date();
        initialTime.innerHTML = min +" : " + second ;
        second++;
        if(second == 60)
        {
            min++;
            second = 00;
            if (min == 0)
            {
                min = 2;
            }
        }
        },1000);
}

//function to reset the game using restart button
let restart = document.querySelector('.restart');
restart.addEventListener('click',function reset()
{
    window.location.reload();
}
);

//function to stop the game after all cards are matched
function stopGame() {
    if(matchedCards.length == 16)
    {
        clearInterval(interval);
        timeTaken = initialTime.innerHTML;
        openModal();
    }
}

let modal = document.getElementById('modal');
let totalMoves = document.getElementById('moves');
let totalTime = document.getElementById('time');
let totalStars = document.getElementById('stars');
let closeModalButton = document.querySelector('button.btn-secondary');
//function to open a modal after the game stops
function openModal() {
   modal.classList.remove('hide');
   totalMoves.innerHTML =  numberOfMoves;
   totalTime.innerHTML = timeTaken;
   totalStars.innerHTML = document.querySelector('.stars').innerHTML;
   closeModalButton.addEventListener('click',function() {
    modal.classList.add('hide');
    window.location.reload();
});
}