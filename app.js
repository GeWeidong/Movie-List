(function(angular){
    angular.module('moviecat', [
        'ngRoute',
        'moviecat.in_theaters',
        'moviecat.coming_soon',
        'moviecat.detail'
    ])    
//配置路由
        .config(['$routeProvider', function ($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/in_theater/1'});
        }])
        .controller('navContrller',['$scope','$location',function($scope,$location){
            $scope.$location = $location;
            $scope.$watch('$location.path()',function(now,old){
                if(now.startsWith('/in_theater')){
                    $scope.navList = 1;
                }else if(now.startsWith('/coming_soon')>0){
                    $scope.navList = 2;
                }
            })
        }]);
})(angular);