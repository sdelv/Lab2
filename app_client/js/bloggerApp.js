var app = angular.module('bloggerApp', ['ngRoute']);


app.config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        })
        .when('/blogadd', {
            templateUrl: 'pages/blogAdd.html',
            controller: 'AddBlogController',
            controllerAs: 'ab'
        })
        .when('/bloglist', {
            templateUrl: 'pages/blogList.html',
            controller: 'BlogListController',
            controllerAs: 'bl'
        })
        .when('/blogedit/:id', {
            templateUrl: 'pages/blogEdit.html',
            controller: 'BlogEditController',
            controllerAs: 'eb'
        })
        .when('/blogdeletion/:id', {
            templateUrl: 'pages/blogDeletion.html',
            controller: 'BlogDeletionController',
            controllerAs: 'bd'
        })
        .otherwise({redirectTo: '/'});
});

/** API CONTROLLERS **/
function getAllBlogs($http) {
    return $http.get('/api/blogs')
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
}

function getABlog($http, id) {
    return $http.get('/api/blogs/' + id)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
} 

function updateBlog($http, id, data) {
    return $http.put('/api/blogs/' + id, data)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
}

function postBlog($http, data) {
    return $http.post('/api/blogs', data) 
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
}

function deleteBlog($http, id) {
    return $http.delete('/api/blogs/' + id)
        .then(function(response) {
            return response.data;
        })
        .catch(function(error) {
            throw error;
        });
}


/** PAGE CONTROLLERS **/
app.controller('HomeController', ['$scope', function($scope) {
    var vm = this;
    vm.pageHeader = {
        title: "Shane del Villar's Blog Page"
    };
}]);

app.controller('AddBlogController', ['$scope', '$http', '$location', function($scope, $http, $location) {
    var ab = this;

    ab.pageHeader = {
        title: 'Blog Add'
    };

    ab.blogTitle = '';
    ab.blogEntry = '';

    ab.submit = function() {
        var data = {
            blogTitle: ab.blogTitle,
            blogEntry: ab.blogEntry
        };

        postBlog($http, data)
            .then(function(data) {
                ab.blog = data;
                console.log('Blog Posted!');
                $location.path('bloglist');
            })
            .catch(function(error) {
                console.error('Could not post blog');
            });
    };
}]);


app.controller('BlogListController', ['$scope','$http', function($scope, $http) {
    var bl = this;

    bl.pageHeader = {
        title: 'Blog List'
    };

    getAllBlogs($http)
        .then(function(data) {
            bl.blogs = data;
            console.log('Blogs Found!');
        })
        .catch(function(error) {
            console.error('Could not get list of blogs!');
        });
}]);

app.controller('BlogEditController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
    var eb = this;
    eb.blog = {};
    eb.id = $routeParams.id;

    eb.pageHeader = {
        title: 'Edit Blog'
    };

    getABlog($http, eb.id)
        .then(function(data) {
            eb.blog = data;
            console.log('Blog Found!');
        })
        .catch(function(error){
            throw error;
        });

        eb.submit = function() {
            var data = eb.blog;
            data.blogTitle = userForm.blogTitle.value;
            data.blogEntry = userForm.blogEntry.value;

            updateBlog($http, eb.id, data)
                .then(function(data){
                    eb.blog = data;
                    console.log('Blog was successfully updated!');
                    $location.path('bloglist');
                })
                .catch(function(error) {
                    throw error;
                });
        }


}]);

app.controller('BlogDeletionController', ['$scope', '$http', '$routeParams', '$location', function($scope, $http, $routeParams, $location) {
    var bd = this;
    bd.id = $routeParams.id;

    bd.pageHeader = {
        title: 'Blog Deletion'
    };

    getABlog($http, bd.id)
        .then(function(data) {
            bd.blog = data;
            console.log('Blog Found!');
        })
        .catch(function(error){
            throw error;
        });

    bd.submit = function() {

        deleteBlog($http, bd.id)
            .then(function(data) {
                console.log('Blog was successfully deleted!');
                $location.path('bloglist');
            })
            .catch(function(error){
                throw error;
            });
    }
}]);
