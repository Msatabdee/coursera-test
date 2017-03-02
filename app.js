(function(){
'use strict';	

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems', foundItemsDirective);


function foundItemsDirective() {
	var ddo = {
		templateUrl: 'foundItems.html',
		scope: {
		  items: '<',
		  onRemove: '&'
		},
		controller: foundItemsDirectiveController,
		controllerAs: 'list',
		bindToController: true
		
	  };
  return ddo;
}

function foundItemsDirectiveController() {
  var list = this;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
	var list = this;
	list.getMatchedMenuItems = function(){
		
		var promise = MenuSearchService.getMatchedMenuItems(list.searchTerm);

		  promise.then(function (response) {
			console.log("in ctrl app  "+response.data.menu_items[1].name)
			list.items = [];
			list.error="";
			for (var i = 0; i < response.data.menu_items.length; i++) {
			  var name = response.data.menu_items[i].name;
			  if (name.toLowerCase().indexOf(list.searchTerm) !== -1) {
				 var item = {
					  name: response.data.menu_items[i].name,
					  description: response.data.menu_items[i].description
					};
				 list.items.push(item);
			  }
			}
			console.log(list.items);
		  });
	};
	list.removeItem = function (itemIndex) {
		MenuSearchService.removeItem(itemIndex);
	};
}	

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
	var service=this;	
	
	service.getMatchedMenuItems = function(searchTerm) {
		var response = $http({
		  method: "GET",
		  url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
		
		});
		return response;
	};
	
	service.removeItem = function (itemIndex) {
		items.splice(itemIndex, 1);
	};
}
})();