// Original js code


let origArray = [
    "back.jpg",
    "back.jpg",
    "blue.jpg",
    "blue.jpg", 
    "green.jpg",
    "green.jpg",
    "grey.jpg",
    "grey.jpg",
    "orange.jpg",
    "orange.jpg",
    "pink.jpg",
    "pink.jpg",
    "purple.jpg",
    "purple.jpg",
    "rainbow.jpg",
    "rainbow.jpg",
    "red.jpg",
    "red.jpg",
   ];
   

   //You're going to use this array to store the cards after you shuffle them


   let shuffledcardArray = [];
   
   
//    //A task is to add the shuffledCardArray cards to the board while at the same time making all the card backs all the same
// new function   

   function shuffleCards(cardsArray) {
   
    for (let i = cardsArray.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        [cardsArray[i], cardsArray[randIndex]] = [cardsArray[randIndex], cardsArray[i]];
    }
   
    let cardElements = document.getElementsByClassName('card');
    for (let i = 0; i < cardElements.length; i++) {
        let card = cardElements[i];
        let cardValue = cardsArray[i];
        let cardBack = card.getElementsByClassName('card-back')[0];
        let cardValueImg = document.createElement('img');
        cardValueImg.classList.add('card-value');
        cardValueImg.src = `img/${cardValue}`;
        card.appendChild(cardValueImg);
        cardBack.style.backgroundImage = `url('img/${cardValue}')`;
    }
}


   //You have to find
   
   
   //You'll see that you pass in the origArray with the "let game = new MixOrMatch etc." below the class

   

class MixOrMatch {
    constructor(totalTime, cards) {
        this.cardsArray = cards;
        this.totalTime = totalTime;
        this.timeRemaining = totalTime;
        this.timer = document.getElementById('time-remaining');
        this.ticker = document.getElementById('flips');
    }

    startGame() {
        this.totalClicks = 0;
        this.timeRemaining = this.totalTime;
        this.cardToCheck = null;
        this.matchedCards = [];
        this.busy = true;
        setTimeout(() => {
            this.shuffleCards(this.cardsArray);
            this.countdown = this.startCountdown();
            this.busy = false;
        }, 500)
        this.hideCards();
        this.timer.innerText = this.timeRemaining; 
        this.ticker.innerText = this.totalClicks;
    }
    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if(this.timeRemaining === 0)
                this.gameOver();
        }, 1000);
    }
    gameOver() {
        clearInterval(this.countdown);
        document.getElementById('game-over-text').classList.add('visible');
    }
    victory() {
        clearInterval(this.countdown);
        document.getElementById('victory-text').classList.add('visible');
    }
    hideCards() {
        this.cardsArray.forEach(card => {
            card.classList.remove('visible')
            card.classList.remove('matched');
        });
    }
    flipCard(card) {
        if(this.canFlipCard(card)) {
            this.totalClicks++;
            this.ticker.innerText = this.totalClicks;
            card.classList.add('visible');

            if(this.cardToCheck) {
                this.checkForCardMatch(card);
            } else {
                this.cardToCheck = card;
        }
    }
}
checkForCardMatch(card) {
    if(this.getCardType(card) === this.getCardType(this.cardToCheck))
        this.cardMatch(card, this.cardToCheck);
    else
        this.cardMismatch(card, this.cardToCheck);

        this.cardToCheck = null;
}
cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    this.audioController.match();
    if(this.matchedCards.length === this.cardsArray.length)
        this.victory();
}
cardMismatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
        card1.classList.remove('visible');
        card2.classList.remove('visible');
        this.busy = false;
    }, 1000);
}
shuffleCards(cardsArray) {
    for (let i = cardsArray.length - 1; i > 0; i--) {
        let randIndex = Math.floor(Math.random() * (i + 1));
        cardsArray[randIndex].style.order = i;
        cardsArray[i].style.order = randIndex;
    }
}
getCardType(card) {
    return card.getElementsByClassName('card-value')[0].src;
}
canFlipCard(card) {
    return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
}
}

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));
    let cards = Array.from(document.getElementsByClassName('card'));
    let game = new MixOrMatch(100, cards);
    
    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
            game.startGame();
        });
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            game.flipCard(card);
        });
    });
}


let game = new MixOrMatch(origArray);


console.log(game);


let startClick = document.getElementById("start-click");







//This will show you errors in the console, which is a good starting point to fix issues in the MixOrMatch class


startClick.addEventListener("click", ()=>{console.log("game"),
 game.startGame()});

