var app = angular.module('angularInputsApp', ["firebase"]);


app.controller('angularInputsCtrl', function($scope, $firebase){

var boardRef = new Firebase("https://monique-tictactoe.firebaseio.com/board");
var boardSync = $firebase(boardRef);
$scope.board = boardSync.$asArray();

$scope.board.$loaded(function(){
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

	$scope.turnNum = 0;

	function winConditions(piece){
		// console.log($scope.turnNum);
		for(var i = 0; i < 3; i++){
			//row wins
			if($scope.board[i].eachsquare == $scope.board[i][1] && $scope.board[i][0] == $scope.board[i][2] && $scope.board[i][0] != ""){
				alert(piece + " wins in the row " + i);
			}
			//column wins
			else if($scope.board[0][i] == $scope.board[1][i] && $scope.board[0][i] == $scope.board[2][i] && $scope.board[0][i] != ""){
				alert(piece + " wins in the row " + i);
			}

		}
		//top left to bottom right
		if($scope.board[0][0] == $scope.board[1][1] && $scope.board[0][0] == $scope.board[2][2] && $scope.board[0][0] != ""){
				alert(piece + " wins in the row " + i);
			}
		//top right to bottom left
		else if($scope.board[0][2] == $scope.board[1][1] && $scope.board[0][2] == $scope.board[2][0] && $scope.board[0][2] != ""){
			alert(piece + " wins in the row " + i);
		}
		//this keeps track of the amount of turns goes and if it exceeds 9 times, it's cat's game
		else if($scope.turnNum == 9){
			alert("tie game");
			$scope.turnNum = 0;
		}
	}

	$scope.turnNum = 0;
	$scope.makeMove = function(index){
		if($scope.board[index].eachsquare == ""){
			var piece = ($scope.turnNum % 2) == 0 ? "X" : "O";
			$scope.turnNum++;
			$scope.board[index].eachsquare = piece;
			// winConditions(piece);
			$scope.board.$save($scope.board[index]);
		}
	};

	// $scope.squareClick = function(index){
	// 	$scope.board[Math.floor(index / 3)][index % 3] = "I got clicked!!!";
	// };

});
