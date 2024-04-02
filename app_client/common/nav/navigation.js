var app = angular.module('bloggerApp');

app.directive('navigation', function() {
    return {
        restrict: 'EA',
        templateUrl: '/common/nav/navigation.html',
        controller: 'NavigationController',
        controllerAs: 'nc'
    };
});

app.controller('NavigationController', ['$location', 'authentication', function NavigatioController($location, authentication) {
    var nc = this;
    nc.currentPath = $location.path();
    nc.currentUser = function() {
        return authentication.currentUser();
    }
    nc.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
    nc.logout = function() {
        authentication.logout();
        $location.path('/');
    };
}]);