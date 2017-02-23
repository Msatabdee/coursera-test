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
		
		var promise = MenuSearchService.getMatchedMenuItems(NDC.searchTerm);

		  promise.then(function (response) {
			console.log(response.data.menu_items[1].name)
			NDC.foundItems = [];
			NDC.error="";
			for (var i = 0; i < response.data.menu_items.length; i++) {
			  var name = response.data.menu_items[i].name;
			  if (name.toLowerCase().indexOf(NDC.searchTerm) !== -1) {
				 var item = {
					  name: response.data.menu_items.[i].name,
					  description: response.data.menu_items[i].description
					};
				 NDC.foundItems.push(item);
			  }
			}
			console.log(NDC.foundItems);
		  });
	};
	NDC.removeItem = function (itemIndex) {
		MenuSearchService.removeItem(itemIndex);
	};
}	

function foundItemsDirective() {
	var ddo = {
		templateUrl: 'found_Items.html',
		scope: {
		  found_Items: '<',
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
		var response = $http({
		  method: "GET",
		  url: ("http://davids-restaurant.herokuapp.com/menu_items.json")
		
		});
		return response;
	};
	
	service.removeItem = function (itemIndex) {
		foundItems.splice(itemIndex, 1);
	};
}
})();