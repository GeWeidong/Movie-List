(function () {
    //
    var module = angular.module(
        'moviecat.detail', ['ngRoute', 'moviecat.services.http']);
    // 配置模块的路由
    module.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/detail/:id', {  //page  注入路由参数
            templateUrl: 'detail/view.html',
            controller: 'detailController'
        });
    }]);
    module.controller('detailController', [
        '$scope',
        '$http',
        '$route',
        'HttpService',
        '$routeParams',   //路由对象
        function ($scope, $http,$route, HttpService, $routeParams) {
            $scope.results = [];
            $scope.loadingImg = true;
            HttpService.jsonp(
                'http://api.douban.com/v2/movie/subject/'+$routeParams.id,
                {},
                function(data){
                    $scope.results = data;
                    $scope.loadingImg = false;
                    $scope.$apply();
                }
            )

        }]);
})();


























