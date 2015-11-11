
var activeClass = 'ttt-active';
var activeRegEx = /(?:^|\s)ttt-active(?!\s)/g;

var winners = [
    ['ttt_a1', 'ttt_a2', 'ttt_a3'],
    ['ttt_b1', 'ttt_b2', 'ttt_b3'],
    ['ttt_c1', 'ttt_c2', 'ttt_c3'],
    ['ttt_a1', 'ttt_b1', 'ttt_c1'],
    ['ttt_a2', 'ttt_b2', 'ttt_c2'],
    ['ttt_a3', 'ttt_b3', 'ttt_c3'],
    ['ttt_a1', 'ttt_b2', 'ttt_c3'],
    ['ttt_a3', 'ttt_b2', 'ttt_c1']
];

var playSqrs = [];
var compSqrs = [];

var compOut   = 1500;
var compTimer = 0;
var compWait  = false;

var body    = document.getElementsByTagName('body')[0];
var message = document.getElementById('ttt_message');
var board   = document.getElementById('ttt_board');
var buttons = board.getElementsByTagName('button');

var randButton = {};
var mark       = '';
var won        = false;

function checkWins(sqrs, isPlayer) {
    var thisWin = [];
    var rowCount = 0;
	for (var i = 0; i < winners.length; i++) {
        thisWin = winners[i];
        rowCount = 0;
    	for (var j = thisWin.length - 1; j >= 0; j--) {
    		if(sqrs.indexOf(thisWin[j]) > -1) {
				rowCount++;
            }
        };
        if(rowCount === 3) {
        	won = true;
        	gameOver(thisWin, isPlayer);
        	return;
        }
    };
    if(!won) {
    	checkDraw(isPlayer);
    	return;
    }
};

function finishGame() {
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].removeEventListener('click', btnBinding);
        buttons[i].blur();
    };
    board.className += ' ttt_winner';
    message.className = message.className.replace(activeRegEx, '' );
    var reloadBtn = document.createElement('button');
    reloadBtn.className = 'ttt_reloadBtn';
    reloadBtn.innerHTML = 'Play Again';
    reloadBtn.addEventListener('click', function() {
        location.reload();
    });
    body.appendChild(reloadBtn);
};

function checkDraw(isPlayer) {
    var activeBtns = playSqrs.concat(compSqrs);
    if(activeBtns.length >= buttons.length) {
        message.innerHTML = 'It\'s a Draw!';
        message.className += ' ttt_message-draw';
        finishGame();
    } else {
        isPlayer? compTurn(): playTurn();
    }
};

function gameOver(winRow, isPlayer) {
    if(isPlayer) {
        board.className += ' ttt_winner-play';
        message.className += ' ttt_message-play';
        message.innerHTML = 'You won!';
    } else {
        board.className += ' ttt_winner-comp';
        message.className += ' ttt_message-comp';
        message.innerHTML = 'You lost.';
    }
    for (var j = 0; j < winRow.length; j++) {
        document.getElementById(winRow[j]).className += ' ttt_winSqr';
    };
    finishGame();
};

function randomSqr() {
    randButton = buttons[Math.floor((Math.random() * buttons.length) + 1) - 1];
    if( randButton.className.match(activeRegEx) ) {
        randomSqr();
    } else {
        markSqr(randButton, true);
    }
};

function compTurn() {
    compWait = true;
    board.className += ' ' + activeClass;
    message.innerHTML = 'My Turn...';
    message.className += ' ' + activeClass;
    compTimer = setTimeout(function() {
        randomSqr();
        compWait = false;
    }, compOut);

};

function playTurn() {
    message.innerHTML = 'Your Turn...';
    board.className = board.className.replace(activeRegEx, '' );
    message.className = message.className.replace(activeRegEx, '' );
};


function markSqr(button, comp) {
    mark = comp? 'O': 'X';
    button.querySelector('.ttt_status').innerHTML = mark;
    button.className += ' ' + activeClass;
    if(!comp) {
        playSqrs.push(button.id);
        checkWins(playSqrs, true);
    } else {
        compSqrs.push(button.id);
        checkWins(compSqrs, false);
    }
};


function btnBinding(button) {
    if(compWait) {
        alert("Please, wait your turn.");
        return;
    }
    if( !this.className.match(activeRegEx) ) {
        markSqr(this);

    } else {
        alert("This seat's taken. Try another.");
    }
};

for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', btnBinding);
};

playTurn();

























