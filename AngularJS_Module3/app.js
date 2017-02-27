(function(){
'use strict';	

angular.module('NarrowItDownApp',[])
.controller('NarrowItDownController',NarrowItDownController)
.service('MenuSearchService',MenuSearchService)
.directive('foundItems', foundItemsDirective);


function foundItemsDirective() {
	var ddo = {
		templateUrl: 'found_Items.html',
		scope: {
		  found_Items: '<found_Items',
		  onRemove: '&'
		},
		controller: foundItemsDirectiveController,
		controllerAs: 'NDC',
		bindToController: true
		
	  };console.log("in directive ctrl  "+ ddo.found_Items)
  return ddo;
}

function foundItemsDirectiveController() {
  var NDC = this;
NDC.found_Items = [];
  NDC.cookiesInList = function () {
    for (var i = 0; i < NDC.items.length; i++) {
      var name = NDC.items[i].name;
      if (name.toLowerCase().indexOf("cookie") !== -1) {
        return true;
      }
    }

    return false;
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
	var NDC = this;
	NDC.getMatchedMenuItems = function(){
		
		var promise = MenuSearchService.getMatchedMenuItems(NDC.searchTerm);

		  promise.then(function (response) {
			console.log("in ctrl app  "+response.data.menu_items[1].name)
			NDC.found_Items = [];
			NDC.error="";
			for (var i = 0; i < response.data.menu_items.length; i++) {
			  var name = response.data.menu_items[i].name;
			  if (name.toLowerCase().indexOf(NDC.searchTerm) !== -1) {
				 var item = {
					  name: response.data.menu_items[i].name,
					  description: response.data.menu_items[i].description
					};
				 NDC.found_Items.push(item);
			  }
			}
			console.log(NDC.found_Items);
		  });
	};
	NDC.removeItem = function (itemIndex) {
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
		found_Items.splice(itemIndex, 1);
	};
}
})();