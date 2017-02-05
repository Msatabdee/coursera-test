(function () {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

   ToBuyController.$inject = ['ShoppingListCheckOffService'];
   AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.toBuyArray = ShoppingListCheckOffService.getItemsToBuy();

    toBuy.moveItem = function(itemToMove) {
      if (toBuy.toBuyArray.includes(itemToMove)) {
        toBuy.toBuyArray = ShoppingListCheckOffService.moveItem(itemToMove);
      };
    }
  };

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.boughtArray = ShoppingListCheckOffService.getItemsBought();
  };

  function ShoppingListCheckOffService() {
    var service = this;
    var itemsBuy = ["Milk", "Cheese", "Bread", "Coffee", "Wine"];
    var itemsBought = [];

    service.getItemsToBuy = function() {
      return itemsBuy;
    }

    service.getItemsBought = function() {
      return itemsBought;
    }

    service.moveItem = function(itemToMove) {
      for (var i = 0; i < itemsBuy.length; i++) {
        if (itemToMove == itemsBuy[i]) {
          itemsBuy.splice(i, 1);
          itemsBought.push(itemToMove);
          break;
        }
      }
      return itemsBuy;
    }
  };
}) ();
