/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// outline the variables and data you need to have at the start. declare variables in one line then give them values.
let scores, roundscore, activeplayer, dice, gameplaying;

init();

// // creates a random whole number between 1 and 6 
// dice = Math.floor(Math.random() * 6) + 1;
// console.log(dice);

// =======================================
// =======================================

// // textcontent can only add plain html text - this is called a setter
// document.querySelector('#current-' + activeplayer).textContent = dice;

// // innerhtml can be used to edit more the html not just the text
// document.querySelector('#current-' + activeplayer).innerHTML = "<strong>" + dice + "<strong>"

// // here we can read the value of score-0 and store it in the variable x - this is called a getter
// let x = document.querySelector('#score-0').textContent;
// console.log(x);

// // using JS to alter css of element in DOM
// document.querySelector('.dice').style.display = 'none';



// =======================================
// =======================================


// // using onclick method to make the dice appear on clicking the button. this is also considered using an anonymous function
// document.querySelector('.btn-roll').onclick = function () {
//     document.querySelector('.dice').style.display = 'block';
// }


// // addeventlistener declared here and the function is called after the button is clicked - the functon is called button.
// document.querySelector('.btn-roll').addEventListener('click', button);
// // declating a function first to be called later inside the addevent listener
// function button() {
//     document.querySelector('.dice').style.display = 'block';
// }


// // Can also delcare an anonymous function inside the addeventlistener.
// document.querySelector('.btn-roll').addEventListener('click', function () {
//     document.querySelector('.dice').style.display = 'block';
// });

// getelementbyid is faster



// how to make it that when we press a button - a random number is selected between 1 and 6 and this number is represented in the dice.
document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gameplaying) {
        // need a random number
        dice = Math.floor(Math.random() * 6) + 1;

        // need to display the result
        // since we will be using document.querySelector repeatedly - we want to keep the code DRY so we give that a variable which we can use and thus is shorter.
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // update the main score IF the rolled number was not a 1

        if (dice !== 1) {
            // add score
            roundscore += dice;
            document.querySelector('#current-' + activeplayer).textContent = roundscore;


        } else {
            // next player
            nextplayer();
        }

    }

    // document.querySelector('.dice').style.display = 'block';
});

// when the hold button is pressed. the current score is added to the global score and the current score is reset to 0
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gameplaying) {
        // add current score to global score
        scores[activeplayer] += roundscore;

        // update UI 
        document.querySelector('#score-' + activeplayer).textContent = scores[activeplayer];

        // check if player won the game
        if (scores[activeplayer] >= 100) {
            document.querySelector('#name-' + activeplayer).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
            gameplaying = false;

        } else {
            nextplayer();
        }
    }
});

function nextplayer() {
    // next player turn
    activeplayer === 0 ? activeplayer = 1 : activeplayer = 0;
    roundscore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';

    // document.querySelector('player-0-panel').classList.remove('active');
    // document.querySelector('player-1-panel').classList.add('active');

}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activeplayer = 0;
    roundscore = 0;
    gameplaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');

}