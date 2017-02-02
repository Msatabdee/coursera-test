(function (){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);	

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemToBuy = [
	{itemName : 'cookies', itemQuantity : '10'},
	{itemName : 'napkins', itemQuantity : 15}
  ];
  

  itemToBuy.itemName = "";
  itemToBuy.itemQuantity = "";

  itemToBuy.addItemToBoughtList = function () {
    ShoppingListCheckOffService.addItemToBoughtList(itemToBuy.itemName, itemToBuy.itemQuantity);
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemAdder = [];

  service.addItemToBoughtList = function (itemName, quantity) {
    var items = {
      name: itemName,
      quantity: quantity
    };
    items.push(items);
  };

    service.getItems = function () {
    return items;
  };
}
})();