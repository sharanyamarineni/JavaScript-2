$(document).ready(function(){
    if(!localStorage.getItem('food')){
      for(i=1;i<n+1;i++){
        localStorage.setItem("foodItem-"+i+"",JSON.stringify([{count: 0, bill: 0}]));
      }
    $.getJSON('data.json', function(data) {
        localStorage.setItem('food',JSON.stringify(data));
        
    }) ; 
}
var htm="";
    JSON.parse(localStorage.getItem("food")).forEach(function(val,index){
        htm+='<div id="'+''+index+''+'" draggable="true" ondragstart="return dragStart(event)"> <p>'+''+val.name+' '+'</p><p>'+''+val.price+' '+'</p><p><img src=\"'+val.url+'\" /></p></div>';
        document.getElementById("menu").innerHTML=htm;
     });
     showTables();
});
function showTables(){
    for(i=1;i<4;i++){
        if(!localStorage.getItem('table-'+i+'')){
                var htm1="";
                   htm1+='<span>Rs.0 | Totalitems:0</span>';
                   document.getElementById('table-'+i+'').innerHTML=htm1;
                }
        else{
            var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
            var htm1="";
            /*var finalBill=data[0]+bill;
            if(finalBill<0)
            finalBill=0;*/
                   htm1+='<span>Rs.'+data[0].bill+' | Totalitems:'+data[0].count+'</span>';
                   document.getElementById("table-"+i+"").innerHTML=htm1;
        }
        }
}


 function tabDivColor(i){
  document.getElementById('target'+i+'').style.backgroundColor="white";
}
 function order(i){
     var items=JSON.parse(localStorage.getItem("table-"+i+""));
     
     document.getElementById('clos').innerHTML=`<button type="button" class="close" style="color: white" onclick="tabDivColor(`+i+`)" data-dismiss="modal">&times;</button><h4 class="modal-title" id="modal-title" style="color: white"></h4>`;
     document.getElementById('target'+i+'').style.backgroundColor="yellow";
     if(items!=null && items.length!=0){
         var total=0;     
         //getOrderDiv();
         htm='Table-'+i+'|Order Details';
         document.getElementById("modal-title").innerHTML=htm;
         htm1='<table class="gfg" style="width:100%"><tr><th style="text-align: left;width:50px">S.No</th><th style="text-align: center;width:150px">Item</th><th style="text-align: left;width:100px">Price</th><th style="text-align: left"></th><th style="text-align: left"></th></tr>';
       
         for(j=0;j<items.length;j++){
        htm1+='<tr><td>'+(j+1)+'</td><td>'+items[j].name+'</td><td>'+items[j].price+'</td><td><label for="quantity" style=" font-weight: 200;">Number of servings</label><input type="number" id="'+j+'" value='+items[j].count+' onchange="return updateValue('+i+','+j+',this.value)" name="quantity"></td><td><span class="glyphicon glyphicon-trash" onclick="deleteItem('+i+','+j+')"></span></td></tr>';
        total+=items[j].price*items[j].count;
        if(total<0)
        total=0;
    }
    htm1+='<tr><td></td><td></td><td>Total:'+total+'</td>';
}
    else{
      htm='Table-'+i+'|Order Details';
      document.getElementById("modal-title").innerHTML=htm;
      /*htm1='<table style="width:100%"><tr><th style="text-align: left;width:50px">S.No</th><th style="text-align: center;width:150px">Item</th><th style="text-align: left">Price</th><th style="text-align: left"></th><th style="text-align: left"></th></tr>';
    
      htm1+='<tr><td> </td></tr><tr><td> </td></tr><tr><td></td><td>Total:</td><td>0</td>';*/
        htm1='<br>'+'No items. Add some items in table'+'<br>'+'<br>';
    }
    document.getElementById("modal-body").innerHTML=htm1;
}

function actionDiv(items,data){
  localStorage.removeItem("table-"+i+"");
    localStorage.removeItem("foodItem-"+i+"");
    localStorage.setItem("table-"+i+"",JSON.stringify(items));
    localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));
    order(i);
    showTables();
}
function updateValue(i,j,val){
    var items=JSON.parse(localStorage.getItem("table-"+i+""));
    var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
    data[0].bill-=items[j].price*items[j].count;
    items[j].count=parseInt(val);
    data[0].bill+=items[j].price*items[j].count;
    localStorage.removeItem("table-"+i+"");
    localStorage.removeItem("foodItem-"+i+"");
    localStorage.setItem("table-"+i+"",JSON.stringify(items));
    localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));
    order(i);
    showTables();

}
function deleteItem(i,j){
    var items=JSON.parse(localStorage.getItem("table-"+i+""));
    var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
    data[0].count=data[0].count-1;
    data[0].bill=parseFloat(data[0].bill)-(parseInt(items[j].count)*parseInt(items[j].price));
    items.splice(j,1);
    localStorage.removeItem("table-"+i+"");
    localStorage.removeItem("foodItem-"+i+"");
    localStorage.setItem("table-"+i+"",JSON.stringify(items));
    localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));
    order(i);
    showTables();
}
function checkout(i){
     var items=JSON.parse(localStorage.getItem("table-"+i+""));
/*     console.log("order"+items);*/
     document.getElementById('clos2').innerHTML=`<button type="button" class="close" style="color: white" onclick="tabDivColor(`+i+`)" data-dismiss="modal">&times;</button><h4 class="modal-title" style="color: white" id="modal-title2"></h4>`;
     document.getElementById('target'+i+'').style.backgroundColor="yellow";
     if(items!=null){
         var total=0;     
          htm='Checkout Details';
          document.getElementById("modal-title2").innerHTML=htm;
 
         
         htm1='<table class="gfg" style="width:100%"><tr><th style="text-align: left;width:50px">S.No</th><th style="text-align: center;width:150px">Item</th><th style="text-align: left; width: 100px">Price</th><th style="text-align: left">Quantity</th></tr>';
       
         for(j=0;j<items.length;j++){
        htm1+='<tr><td>'+(j+1)+'</td><td>'+items[j].name+'</td><td>'+items[j].price+'</td><td>'+items[j].count+'</td></tr>';
        total+=items[j].price*items[j].count;
        if(total<0)
        total=0;
    }

    htm1+='<tr><td></td><td></td><td>Total:'+total+'</td>';
}
    else{
     document.getElementById('clos2').innerHTML=`<button type="button" class="close" style="color: white" onclick="tabDivColor(`+i+`)" data-dismiss="modal">&times;</button>`;
     document.getElementById('target'+i+'').style.backgroundColor="yellow";
      htm1='<br>'+'No items to checkout'+'<br>'+'<br>';
   
    }
    document.getElementById("modal-body2").innerHTML=htm1;
}

function generateBill(){
  var tableName=document.getElementById("modal-title").innerHTML;
  checkout(parseInt(tableName[6]));
  localStorage.removeItem('table-'+tableName[6]+'');
  localStorage.setItem(""+tableName[6]+"-data",JSON.stringify([{count: 0, bill: 0}]));
  localStorage.removeItem("foodItem-"+tableName[6]+"")
  localStorage.setItem("foodItem-"+tableName[6]+"",JSON.stringify([{count: 0, bill: 0}]));

  order(parseInt(tableName[6]));
  showTables();
	

}

function searchTables() {
    var input, filter,tableValue;
    input = document.getElementById("searchTable");
    filter = input.value.toUpperCase();
    for (i = 1; i < 4; i++) {
      var tr=document.getElementById('target'+i+'');
    var input, filter,tableValue;
      tableValue = 'table-'+i+'';
        if (tableValue.toUpperCase().indexOf(filter) > -1) {
          tr.style.display = "";
        } else {
          tr.style.display = "none";
        }          
    }
  }
  function searchItems() {
    var input, filter, itemValue;
    input = document.getElementById("searchMenu");
    filter = input.value.toUpperCase();
   var items=JSON.parse(localStorage.getItem("food"));
    for (i = 0; i < items.length; i++) {
      var tr=document.getElementById(''+i+'');
        itemValue = items[i].name;
        if (itemValue.toUpperCase().indexOf(filter) > -1) {
          tr.style.display = "";
        } else {
          tr.style.display = "none";
        }          
    }
  }
  
  var n=3;
  
  function dragStart(event) {
    event.dataTransfer.effectAllowed='move';
    event.dataTransfer.setData("text", event.target.id);
    event.dataTransfer.setDragImage(event.target,0,0);
    return true;
 }
 function dragEnter(event) {
    event.preventDefault();
    return true;
 }
 function dragOver(event) {
    return false;
 }
 function dragDrop(event,i) {
    var src = event.dataTransfer.getData("text");
    item=JSON.parse(localStorage.getItem("food"));
    addItem(item[src],i);
    showTables();
    event.stopPropagation();
    return false;
 }
 var element = document.getElementById('menu'); 

  element.addEventListener("touchstart", function(event) {
    event.dataTransfer.effectAllowed='move';
      event.dataTransfer.setData("text", event.target.id);
      event.dataTransfer.setDragImage(event.target,0,0);
}, false);
  element.addEventListener("touchend", function(event,i) {
    var src = event.dataTransfer.getData("text");
    item=JSON.parse(localStorage.getItem("food"));
    addItem(item[src],i);
    showTables();
    event.stopPropagation();
 }, false);
  element.addEventListener("touchcancel", function(event){
}, false);
  element.addEventListener("touchleave", function(event,i) {
    var src = event.dataTransfer.getData("text");
    item=JSON.parse(localStorage.getItem("food"));
    addItem(item[src],i);
    showTables();
    event.stopPropagation();
 }, false);
  element.addEventListener("touchmove", function(event){
}, false);

 function addItem(item,i){
     if(!localStorage.getItem('table-'+i+'')){
        var oldItems=[];
        var newItem1={
            "name":item.name,
            "price":item.price,
            "count":1
        }
        oldItems.push(newItem1);
        localStorage.setItem('table-'+i+'',JSON.stringify(oldItems)); 
        var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
        data[0].count+=1;
        data[0].bill+=parseFloat(item.price);
        localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));

     }
     else{
         var flag=0;
            var oldItems1=(JSON.parse(localStorage.getItem('table-'+i+'')));
            var newItem={
                "name":item.name,
                "price":item.price,
                "count":1
            }; 
          for(j=0;j<oldItems1.length;j++){
              if(item.name==oldItems1[j].name){
                  oldItems1[j].count+=1;
                  flag+=1;
                  break;
              }
            }
            var data=JSON.parse(localStorage.getItem("foodItem-"+i+""));
              if(flag==0){
                oldItems1.push(newItem);
                data[0].count+=1;
              }
            localStorage.removeItem('table-'+i+'');
            localStorage.setItem('table-'+i+'',JSON.stringify(oldItems1));
            data[0].bill+=parseFloat(item.price);
            localStorage.setItem("foodItem-"+i+"",JSON.stringify(data));
     }   
 }

 
 $("#gen").on( "click", function() {
        $('#myModal').modal('hide');  
});

$("#gen").on( "click", function() {
        $('#myModal2').modal('show');  

});