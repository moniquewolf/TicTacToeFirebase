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
