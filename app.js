(function() {
    var app = angular.module('freshTomatoes', []);
    
    app.controller('TomatoController', ['$http', function($http) {
        var tomato = this;
        tomato.movies = [];
        tomato.currentMovie = {};
        //var movieUrl = 'http://private-05248-rottentomatoes.apiary-mock.com/';
        var movieUrl = '/mock-movie-list.json';
        $http.get(movieUrl).success(function(data) {
           for (movieData in data.movies) {
             movieData.show = false;   
           }
           tomato.movies = data.movies;
        });
        
        tomato.movieClicked = function(aMovie) {
            aMovie.show = !aMovie.show;
        };
    }]);
    
})();