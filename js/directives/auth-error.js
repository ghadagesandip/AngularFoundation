app.directive('authError',function(){
    return{
        restrict:"E",
        replace:true,
        scope:{
            feedback:"="
        },
        template:"<div class='round alert label'> {{feedback}}</div>"
    }
});
