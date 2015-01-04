app.directive('emptytr',function(){

    return {
        restrict:"E",
        replace : true,
        scope:{
            dataarr : "="
        },
        template:"<div data-ng-show='!dataarr' class='text-center'><span class='round alert label'>No records found</span></div>"
    }
});