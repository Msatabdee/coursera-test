(function (){
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);	

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemToBuy= this;
   itemToBuy.itemName = "";
   itemToBuy.itemQuantity = "";

  itemToBuy.itemList = [
	{itemName : 'cookies', itemQuantity : 10},
	{itemName : 'napkins', itemQuantity : 15},
	{itemName : 'pen', itemQuantity : 3},
	{itemName : 'notebook', itemQuantity : 5},
	{itemName : 'Chocolate', itemQuantity : 100},
	{itemName : 'Milk', itemQuantity : 1},
  ];
  itemToBuy.addItemToBoughtList = function (index) {
    ShoppingListCheckOffService.addItemToBoughtList(itemToBuy.itemList[index].itemName, itemToBuy.itemList[index].itemQuantity);
  }
  itemToBuy.removeItemToBuyList = function(index) {
	  itemToBuy.itemList.splice(index, 1);
	  
  }
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var itemBought = this;
	itemBought.name="";
	itemBought.items = ShoppingListCheckOffService.getItems(); 
}

function ShoppingListCheckOffService() {
  var service = this;
  // List of shopping items
  var items = [];

  service.addItemToBoughtList = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.getItems = function () {
    return items; 
  };
  
}

})();