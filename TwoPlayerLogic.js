
// This is where I create the firebase variables for the player switching
var playerRef = new Firebase('https://samstictactoe.firebaseio.com/players');
  var playerSync = $firebase(playerRef);
  $scope.players = playerSync.$asArray

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