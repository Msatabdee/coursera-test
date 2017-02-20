(function(){
'use strict';
// app.js
angular.module("ShoppingListCheckOff",[])
.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService);

ToBuyController.$injector =['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getBuyItems();
    toBuy.buy = function(index){
        ShoppingListCheckOffService.buyItem(index);
    }
}

AlreadyBoughtController.$injector = ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var bought = this;
    bought.items = ShoppingListCheckOffService.boughtItems();
}

ShoppingListCheckOffService.$injector = ["scope"]
function ShoppingListCheckOffService(){
    var checkService = this;


    // List of ToBuy items
    var toBuyItems = [ 
        {name:'cases of beer', quantity:3}, 
        {name:'bucket of chicken wings', quantity:3},
        {name:'bags of pretrels', quantity:4},
        {name:'bags of chips', quantity:5},
        {name:'bags cheese curls', quantity:6},
        {name:'cases of coke', quantity:4},
        ];
        // List of Bought itms
    var boughtItems = [];
checkService.buyItem = function(itemIndex){
    var item = toBuyItems.splice(itemIndex,1)[0];
    boughtItems.push(item);
}
checkService.getBuyItems = function(){
    return toBuyItems;
}
checkService.boughtItems = function(){
    return boughtItems;
}
}

})()