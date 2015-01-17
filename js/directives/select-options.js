app.directive('selectOptions',function(){
   return {
       restrict:"E",
       replace: true,
       scope :
           {
            taskid :"="
           },
       templateUrl:"Views/DirectiveTemplates/select-option.html"
   }
});