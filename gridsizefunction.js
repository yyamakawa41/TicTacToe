var gridSize = 4
var winnerHorizTemp = []
var winnerVerticalTemp = []
var winnerDiagonalTemp = []
var winner = []

for ( i=1; i <= gridSize*gridSize; i++){
	winnerHorizTemp.push(i)
	if(i % gridSize ==0){
		winner.push(winnerHorizTemp);
		winnerHorizTemp = [];
	}
}

for ( i=1; i <= gridSize; i++){
	for( x=0; x<= gridSize; x++){
		winnerVerticalTemp.push(x*gridSize + 1);
	}
	winner.push(winnerVerticalTemp);
	winnerVerticalTemp = [];
}

for ( i=1; i <= gridSize*gridSize; i+=gridSize+1){
	winnerDiagonalTemp.push(i);
	}

	winner.push(winnerDiagonalTemp);
	winnerDiagonalTemp = [];


for ( i= gridSize; i < gridSize*gridSize; i+=gridSize-1){
	winnerDiagonalTemp.push(i);
	}

	winner.push(winnerDiagonalTemp);
	winnerDiagonalTemp=[];


