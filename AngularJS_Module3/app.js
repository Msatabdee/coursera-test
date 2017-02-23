(function(){
'use strict';	

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems', foundItemsDirective);


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
	var NDC = this;
	NDC.getMatchedMenuItems = function(){
		console.log(NDC.searchTerm);
		NDC.found_Items = MenuSearchService.getMatchedMenuItems(NDC.searchTerm);
		
	}
}	

function foundItemsDirective() {
	var ddo = {
		templateUrl: 'found_Items.html',
		scope: {
		  items: '<',
		  found_Items: '@found_Items',
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

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){
	var service=this;	
	
	service.getMatchedMenuItems = function(searchTerm) {
		return $http({
		  method: "GET",
		  url: ("http://davids-restaurant.herokuapp.com/menu_items.json")
		  
		}).then(function(result){
			console.log(result.data.menu_items[1].name)
			var foundItems = [];
			for (var i = 0; i < result.data.menu_items.length; i++) {
			  var name = result.data.menu_items[i].name;
			  if (name.toLowerCase().indexOf(searchTerm) !== -1) {
				 foundItems.push(name);
			  }
			}
			console.log(foundItems);
		}).catch(function (error) {
			console.log("Something went terribly wrong.");
		});
	};
	
}
})();