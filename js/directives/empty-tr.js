app.directive('emptytr',function(){

    return {
        restrict:"E",
        replace : true,
        scope:{
            dataarr : "="
        },
        template:"<div data-ng-show='!dataarr' data-ng-init='dataarr = true' class='text-center'><span class='round alert label' ng-cloak>No records found</span></div>"
    }
});