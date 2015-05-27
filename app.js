(function() {
    var app = angular.module('freshTomatoes', []);
    
    app.controller('TomatoController', ['$http', '$filter', function($http, $filter) {
        var tomato = this;
        tomato.sortOrder="movie_name";
        tomato.movies = [];
        tomato.filteredMovies = tomato.movies;
        tomato.currentMovie = {};
        //var movieUrl = 'http://private-05248-rottentomatoes.apiary-mock.com/';
        var movieUrl = '/mock-movie-list.json';
        $http.get(movieUrl).success(function(data) {
           for (movieData in data.movies) {
             movieData.show = false;   
           }
           tomato.movies = data.movies;
           tomato.filteredMovies = tomato.movies;
        });
        
        tomato.movieClicked = function(aMovie) {
            aMovie.show = !aMovie.show;
        };
        
        tomato.search = function(searchText, searchAll) {
            var searchCriteria = {};
            if (searchAll) {
                searchCriteria = searchText;
            } else {
                // Else just search movie_name
                searchCriteria.movie_name = searchText;
            }
            tomato.filteredMovies = $filter('filter')(tomato.movies, searchCriteria);
        };
    }]);
    
    app.directive('tomatoMovieSearch', function() {
       return {
         restrict: 'E',
         templateUrl: 'tomato-movie-search.html'
       };
    });
    
    app.directive('tomatoMovieListing', function() {
       return {
         restrict: 'E',
         templateUrl: 'tomato-movie-listing.html'
       };
    });
})();