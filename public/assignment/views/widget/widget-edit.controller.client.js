(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",WidgetEditController);

    /* you will need $routeParams to extract the page Id when you are implementing it */
    /* the below one just works for hard coded stuff */

    function WidgetEditController($sce,$location, $routeParams, WidgetService) {
        var vm = this;
        /* based on the pageId, you have to retrieve widgets for that pageID */
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        vm.widgetId = $routeParams.widgetId;

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function init(){
            WidgetService.findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget= response.data;

                });

        }
        init();

        function updateWidget(widget) {
            if(vm.myform.$valid == false){
                vm.error = "Enter the name of the Widget";
                vm.alert = "* Enter the field name";
                if(widget.type == "HEADER"){
                    vm.numerror="enter values between 1 and 6";
                }
            }else{
                WidgetService.updateWidget(vm.widgetId, widget)
                    .then (function (response) {
                        var result= response.data;
                        if(result){
                            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                        }else {
                            vm.error = "Error";
                        }
                    });
            }

        }

        
        function deleteWidget(widget) {
            
            WidgetService
                .deleteWidget(vm.widgetId, vm.pageId, vm.widget.position)
                .then(function (response) {
                    var result = response.data;
                    if (result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget");
                    }else {
                        vm.error = "Error";
                    }
                });
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }


    }
})();