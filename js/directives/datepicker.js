app.directive('datePicker',function(){
   return{
       scope:{},
       link : function(scope,ele,attr){
           ele.addClass('fdatepicker').fdatepicker({
               format: 'yyyy-mm-dd'
           });;
       }
   }
});