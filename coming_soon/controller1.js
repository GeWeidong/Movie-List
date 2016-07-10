(function () {
    // 创建正在热映模块
    var module = angular.module(
        'moviecat.coming_soon', ['ngRoute', 'moviecat.services.http']);
    // 配置模块的路由
    module.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/coming_soon/:page', {  //page  注入路由参数
            templateUrl: 'coming_soon/view.html',
            controller: 'comingsoonController'
        });
    }]);
    module.controller('comingsoonController', [
        '$scope',
        '$http',
        '$route',
        'HttpService',
        '$routeParams',   //路由对象
        function ($scope, $http,$route, HttpService, $routeParams) {
            $scope.subjects = [];
            $scope.totalcount = 0;//一共有多少项
            $scope.totalpages = 0; //一共有多少页
            $scope.loadingImg = true; //loading图片出来
            var page = parseInt($routeParams.page);   //当前页数
            var count = 3;                           //当前页的项数
            var start = (page-1)*count;              //当前页从哪一项开始
            HttpService.jsonp(
                //分页
                //    start = 0;count = 10;
                //    start = 10;count = 10;
                //start = (page-1)*count
                'http://api.douban.com/v2/movie/coming_soon',
                {start:start,count:count},
                function (data) {
                    $scope.subjects = data.subjects;
                    $scope.totalcount = data.total;
                    $scope.totalpages = Math.ceil( $scope.totalcount / count );
                    $scope.currentpage = page;
                    //console.log($scope.subjects)
                    //重新同步上去，用到了$apply
                    $scope.loadingImg = false;  //loading图片隐藏
                    $scope.$apply();
                }
            )

            $scope.go = function(page){
                if(page < 1 || page > $scope.totalpages){
                    return false;
                }else{
                    $route.updateParams({page:page})
                }
            }

        }]);
})();


























