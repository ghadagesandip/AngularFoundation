app.directive('setactive',function(){
    return {
        scope :{},
        link : function(scope, element, attr){
            element.on('click',function(){f
                element.parent().children().removeClass('active');
                element.addClass('active');
            })
        }
    }
});