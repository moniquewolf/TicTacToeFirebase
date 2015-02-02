	var app = angular.module('angularInputsApp', ["firebase"]);


	app.controller('angularInputsCtrl', function($scope, $firebase){

	var boardRef = new Firebase("https://monique-tictactoe.firebaseio.com/board");
	var boardSync = $firebase(boardRef);
	$scope.board = boardSync.$asArray();
	
	$scope.board.$loaded(function(){
		//if the board hasn't been created, run this 
		if($scope.board.length == 0){
			for(var i = 0; i < 9; i++){
				$scope.board.$add({eachsquare: ""});
			}
		}
		else{
			for(var i = 0; i < 9; i++){
				$scope.board[i].eachsquare = "";
				$scope.board.$save(i);
			}
		}
	})
	// This is where I create the firebase variables for the player switching
	var playerRef = new Firebase('https://monique-tictactoe.firebaseio.com/players');
  	var playerSync = $firebase(playerRef);
  	$scope.players = playerSync.$asArray();

	$scope.players.$loaded(function(){
		// If the players array has not been created then i make it
		if($scope.players.length == 0){
			$scope.players.$add({playerOne: false, playerTwo: true});
		}
		// if it has been created then on page refresh i set it back to the default values
		else{
			$scope.players[0].playerOne = false;
			$scope.players[0].playerTwo = true;
			$scope.players.$save(0);
		}
	});
// Thoughts on why i did it this way. I made playerOne false and left playerTwo true for the reason that i can make conditionals
// for when a square is clicked a certain player variable needs to be true.
	var counterRef = new Firebase("https://monique-tictactoe.firebaseio.com/counter");
	var counterSync = $firebase(counterRef);
	$scope.counter = counterSync.$asArray();
	
	$scope.counter.$loaded(function(){
	//if the board hasn't been created, run this
		if($scope.counter.length == 0){
		$scope.counter.$add({turnNum: 0});
		}
		else{
			$scope.counter[0].turnNum = 0;
			$scope.counter.$save(0);
		}
	})

	$scope.makeMove = function(index){
		// So when a button is clicked it checks to see if the turn is 0 (the first turn of the game)
		if($scope.counter[0].turn == 0){
			// if it is the first move of the game then i swap the values and make playerOne true and playerTwo false
			$scope.players[0].playerOne = true;
			$scope.players[0].playerTwo = false;
			// the key to this trick is that i don't save it back to the firebase database so that only the person that made the
			// first move is assigned playerOne = true and and the other person is still assigned playerTwo = true. Now that we have
			// each person assigned to a spcific player variable we just need to put a conditional into to make sure only playerOne
			// make X moves and only playerTwo can make O moves.
		}
		if(($scope.square[index].playerMove !== "X") && ($scope.square[index].playerMove !== "O") && ($scope.counter[0].turn >= 0)){
			// On the below line you can see that I make sure the turn is even AND playerOne is true. Only if those two conditions
			// are true can you assign a square 'X'
			if((($scope.counter[0].turn % 2) == 0) && ($scope.players[0].playerOne == true)){
				var symbol = "X";
				$scope.square[index].playerMove = symbol;
				$scope.square.$save($scope.square[index]);
				$scope.counter[0].turn++;
				$scope.counter.$save(0);
				$scope.winMessage[0].message = "Player Two\'s Turn";
				$scope.winMessage.$save(0);
				document.getElementById("sq" + index).className = "square chosen";
			}
			// And vice versa only if it is an odd turn number AND playerTwo is true can you assign a square 'O'
			else if((($scope.counter[0].turn % 2) == 1) && ($scope.players[0].playerTwo == true)){
				var symbol = "O";
				$scope.square[index].playerMove = symbol;
				$scope.square.$save($scope.square[index]);
				$scope.counter[0].turn++;
				$scope.counter.$save(0);
				$scope.winMessage[0].message = "Player One\'s Turn";
				$scope.winMessage.$save(0);
				document.getElementById("sq" + index).className = "square chosen";
			}
			if($scope.counter[0].turn >= 5){
				winConditions(symbol);
			}
		}
	};

	function winConditions(piece){
		// console.log($scope.turnNum);
		if((($scope.board[0].eachsquare == $scope.board[1].eachsquare) && ($scope.board[0].eachsquare == $scope.board[2].eachsquare) && ($scope.board[0].eachsquare !== ""))||
		(($scope.board[3].eachsquare == $scope.board[4].eachsquare) && ($scope.board[3].eachsquare == $scope.board[5].eachsquare) && ($scope.board[3].eachsquare !== ""))||
		(($scope.board[6].eachsquare == $scope.board[7].eachsquare) && ($scope.board[6].eachsquare == $scope.board[8].eachsquare) && ($scope.board[6].eachsquare !== ""))||
		(($scope.board[0].eachsquare == $scope.board[3].eachsquare) && ($scope.board[0].eachsquare == $scope.board[6].eachsquare) && ($scope.board[0].eachsquare !== ""))||
		(($scope.board[1].eachsquare == $scope.board[4].eachsquare) && ($scope.board[1].eachsquare == $scope.board[7].eachsquare) && ($scope.board[1].eachsquare !== ""))||
		(($scope.board[2].eachsquare == $scope.board[5].eachsquare) && ($scope.board[2].eachsquare == $scope.board[8].eachsquare) && ($scope.board[2].eachsquare !== ""))||
		(($scope.board[0].eachsquare == $scope.board[4].eachsquare) && ($scope.board[0].eachsquare == $scope.board[8].eachsquare) && ($scope.board[0].eachsquare !== ""))||
		(($scope.board[2].eachsquare == $scope.board[4].eachsquare) && ($scope.board[2].eachsquare == $scope.board[6].eachsquare) && ($scope.board[2].eachsquare !== ""))){
			if(piece == "X"){
				alert("X wins");
			}
			else if (piece == "O"){
				alert("O wins");
			}
		}
		//this keeps track of the amount of turns goes and if it exceeds 9 times, it's cat's game
		else if($scope.counter[0].turnNum == 9){
			alert("tie game");
		}
	}

	$scope.turnNum = 0;
	$scope.makeMove = function(index){
		if($scope.board[index].eachsquare == ""){
			var piece = ($scope.counter[0].turnNum % 2) == 0 ? "X" : "O";
			$scope.counter[0].turnNum++;
			$scope.counter.$save(0);
			$scope.board[index].eachsquare = piece;
			$scope.board.$save($scope.board[index]);
			winConditions(piece);
		}
	};
});
