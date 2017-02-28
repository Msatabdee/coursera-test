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
		
	  };console.log("in directive ctrl  "+ ddo.items)
  return ddo;
}

function foundItemsDirectiveController() {
  var list = this;
list.items = [];
  list.cookiesInList = function () {
    for (var i = 0; i < list.items.length; i++) {
      var name = list.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
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
		  url: ("http://davids-restaurant.herokuapp.com/menu_items.json")
		
		});
		return response;
	};
	
	service.removeItem = function (itemIndex) {
		items.splice(itemIndex, 1);
	};
}
})();