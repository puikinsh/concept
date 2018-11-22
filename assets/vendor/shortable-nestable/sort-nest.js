
$(function() {
    "use strict";
    // ============================================================== 
    // sortable
    // ============================================================== 
   var el = document.getElementById('items');
    var pl = document.getElementById('item-2');
    var sortable = Sortable.create(el);
    var sortable = Sortable.create(pl);
    // ============================================================== 
    // nestable
    // ============================================================== 
  $('.dd').nestable('serialize');
    



    

});