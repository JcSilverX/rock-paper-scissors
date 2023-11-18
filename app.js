const CHOICES = [ 'rock', 'paper', 'scissors' ];
const EVENT_CLICK = 'click';
const CLASS_NAME_SHOW = 'show';

const SCREEN_TEXT_SELECTOR = '.screen__text';
const PLAYER_SCORE_SELECTOR = '.player__score';
const COMPUTER_SCORE_SELECTOR = '.pc__score';
const RESTART_BTN_SELECTOR = '.restart__btn';
const RESTART_SELECTOR = '.restart';
const DATA_SELECTION_SELECTOR = '[data-selection]';

let numberOfRounds = 1;
let playerCounter = 0;
let computerCounter = 0;


class RPS {
    constructor(element) {
        this._playerChoice = element.dataset.selection;
        this._computerChoice = getComputerChoice(getRandomInt());
        this._restartBtn = document.querySelector(RESTART_BTN_SELECTOR);
        this._restart = this._restartBtn.closest(RESTART_SELECTOR);

        this._addEventListeners();
    };

    // getters/setters

    // public methods
    playRound() {
        const result = document.querySelector(SCREEN_TEXT_SELECTOR);
        const playerScore = document.querySelector(PLAYER_SCORE_SELECTOR);
        const computerScore = document.querySelector(COMPUTER_SCORE_SELECTOR);

        if (this._isDraw(this._playerChoice, this._computerChoice)) {
            result.textContent = 'is a Draw';
        }
        else if (this._isWinner(this._playerChoice, this._computerChoice)) {
            result.textContent = 'You Win! ' + this._playerChoice + ' beats ' + this._computerChoice;
            playerCounter++;
            playerScore.textContent = playerCounter;
        } else {
            result.textContent = 'You Lose! ' + this._computerChoice + ' beats ' + this._playerChoice;
            computerCounter++;
            computerScore.textContent = computerCounter;
        }

        this.checkMatchWinner(playerCounter, computerCounter);
    }

    checkMatchWinner(playerScore, computerScore) {
        const result = document.querySelector(SCREEN_TEXT_SELECTOR);

        if (playerScore >= 3) {
            result.textContent = 'Congratulations! You are the winner.';
            this._showRestart();
        }
        else if (computerScore >= 3) {
            result.textContent = 'I won the game!';
            this._showRestart();
        }
    }

    // private methods
    _isDraw(playerSelection, computerSelection) {
        return playerSelection === computerSelection;
    }

    _isWinner(playerSelection, computerSelection) {
        return  playerSelection === 'rock' && computerSelection === 'scissors' ||
                playerSelection === 'paper' && computerSelection === 'rock' ||
                playerSelection === 'scissors' && computerSelection === 'paper';
    }

    _showRestart() {
        this._hide();
        
        this._restart.classList.add(CLASS_NAME_SHOW);
    }

    _addEventListeners() {
        this._restartBtn.addEventListener(EVENT_CLICK, () => {
            window.location.reload();
        });
    }

    _hide() {
        document.querySelector('.list').style.display = 'none';
    }

    // static methods

};


const getRandomInt = (n = 3) => {
    return Math.floor(Math.random() * n);
};

const getComputerChoice = (choice) => {
    return CHOICES[choice];
};



document.querySelectorAll(DATA_SELECTION_SELECTOR)
    .forEach((selector) => {
            selector.addEventListener(EVENT_CLICK, (event) => {
                const THIS = event.target.closest(DATA_SELECTION_SELECTOR);

                if (event.preventDefault()) return;

                const instance = new RPS(THIS);
                instance.playRound();
            });
    });