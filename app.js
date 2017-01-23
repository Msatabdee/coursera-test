(function (){
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);	

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope){
	$scope.list = "";
	$scope.message="";
	
	$scope.displayMessage = function(){
		var totalItem = calculateTotalItem($scope.list);
		if(totalItem==0){
			$scope.message="Please enter data first";
		}
		else if(totalItem<=3){
			$scope.message="Enjoy!";
		}
		else{
			$scope.message="Too much!";
		}
	};
	
	function calculateTotalItem(string){
		var count = 0;
		var words = string.split(","); 
		for (var i=0 ; i < words.length ; i++){
		if (words[i] != "")
          count += 1; 
    }
		return count;
	}
}
})();