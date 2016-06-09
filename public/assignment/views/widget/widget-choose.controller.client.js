(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooseController",WidgetChooseController);

    /* you will need $routeParams to extract the page Id when you are implementing it */
    /* the below one just works for hard coded stuff */

    function WidgetChooseController($sce, $location, $routeParams, WidgetService) {
        var vm = this;
        /* based on the pageId, you have to retrieve widgets for that pageID */

         vm.pageId= $routeParams.pageId;
         vm.userId = $routeParams.userId;
       vm.websiteId = $routeParams.websiteId;
        

        var pageId = $routeParams.pageId;

        vm.createHeaderWidget= createHeaderWidget;
        vm.createImageWidget= createImageWidget;
        vm.createYouTubeWidget= createYouTubeWidget;

        function createHeaderWidget(pageId){
            var widget = {
                //_id : (new Date()).getTime()+"",
                type: "HEADER"
                //pageId : pageId
            };


            WidgetService
                .createWidget(pageId, widget)
                .then(function (response) {
                    var result = response.data;
                    console.log(response.data);
                    if (result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
                    }else{
                        vm.error = "error in creating Header page";
                    }
                });


         }


        function createImageWidget(pageId){
            var widget = {
              //  _id : (new Date()).getTime()+"",
                type : "IMAGE"
                //pageId : pageId
            };

            WidgetService.createWidget(pageId, widget)
                .then (function (response) {
                    var result = response.data;
                    if (result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
                    }else{
                        vm.error = "error in creating Image page";
                    }
                });

        }


        function createYouTubeWidget(pageId){
            var widget = {
               // _id : (new Date()).getTime()+"",
                type: "YOUTUBE"
               // pageId : pageId
            };

            WidgetService.createWidget(pageId, widget)
                .then (function (response) {
                    var result = response.data;
                    if (result){
                        $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+result._id);
                    }else{
                        vm.error = "error in creating Youtube Page ";
                    }
                });

        }


        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/" + id;
            return $sce.trustAsResourceUrl(url);
        }

        function getSafeHtml(widget){
            return $sce.trustAsHtml(widget.text);
        }


    }
})();