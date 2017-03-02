(function () {
  'use strict';
  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
    .directive('foundItems', FoundItemsDirective);

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var vm = this;
    vm.searchItem = "";
    vm.title = "";
    vm.setTitle = function () {
      if (vm.found.length > 0) {
        vm.title = "Found: " + vm.found.length + " results";
      }
      else {
        vm.title = "Nothing found";
      }
    };
    vm.getMatched = function () {
      vm.found = "";
      var promise = MenuSearchService.getMatchedMenuItems(vm.searchItem);
      promise.then(function (response) {
        if (vm.searchItem != '') {
          vm.found = response;
        }
        vm.setTitle();
      });
    };
    vm.removeItem = function (itemIndex) {
      console.log(itemIndex);
      vm.found.splice(itemIndex, 1);
      vm.setTitle();
    }
  }

  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function (result) {
        // process result and only keep items that match
        var foundItems;
        foundItems = service.filterItems(result.data.menu_items, searchTerm);
        // return processed items
        return foundItems;
      });
    };
    service.filterItems = function (itemsArray, searchText) {
      return itemsArray.filter(function (item) {
        return item.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
    };
  }

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        myTitle: '@title',
        onRemove: '&'
      },
      controller: NarrowItDownController,
      controllerAs: 'search',
      bindToController: true
    };

    return ddo;
  }
})();