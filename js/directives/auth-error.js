app.directive('authError',function(){
    return{
        restrict:"E",
        replace:true,
        scope:{
            feedback:"="
        },
        template:"<div class='round alert label' ng-cloak> {{feedback}}</div>"
    }
});
