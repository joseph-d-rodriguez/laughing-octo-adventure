(function() {
    var app = angular.module('freshTomatoes', ['firebase']);
    
    app.controller('TomatoController', ['$http', '$filter', '$scope', '$firebaseObject', '$firebaseArray', 
                    function($http, $filter, $scope, $firebaseObject, $firebaseArray) {
        var tomato = this;
        tomato.sortOrder="movie_name";
        
        tomato.firebaseRef = new Firebase("https://jrod-fresh-tomatoes.firebaseio.com/");
        tomato.firebaseTomato = $firebaseObject(tomato.firebaseRef);
        tomato.fileteredMovies = tomato.firebaseTomato.movies;
        
        tomato.showAddMovie = false;
        tomato.clickAddMovie = function() {
            tomato.showAddMovie = !tomato.showAddMovie;
        };
        tomato.addMovie = function() {
            tomato.firebaseTomato.movies.push(
                {
                    movie_name: tomato.newMovieName, 
                    description: tomato.newMovieDescription, 
                    image_url: tomato.newMovieImage, 
                    rating: tomato.newMovieRating
                }
            );
            tomato.firebaseTomato.$save();
            // clear fields
            tomato.newMovieName = '';
            tomato.newMovieDescription = '';
            tomato.newMovieImage = '';
            tomato.newMovieRating = '';
        };
                        
        tomato.removie = function(aMovieName) {
            for (index=0; index<tomato.firebaseTomato.movies.length; index++) {
                if (aMovieName === tomato.firebaseTomato.movies[index].movie_name) {
                    tomato.firebaseTomato.movies.splice(index, 1);
                    break;
                }
            }
            tomato.firebaseTomato.$save();
        }
        
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
            tomato.filteredMovies = $filter('filter')(tomato.firebaseTomato.movies, searchCriteria);
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
    
    app.directive('tomatoMovieSorting', function() {
        return {
            restrict: 'E',
            templateUrl: 'tomato-movie-sorting.html'
        };
    });
    
    app.directive('tomatoMovieAdding', function() {
        return {
            restrict: 'E',
            templateUrl: 'tomato-movie-adding.html'
        };
    });
    
})();