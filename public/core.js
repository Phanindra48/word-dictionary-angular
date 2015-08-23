var dictApp = angular.module('dictApp', ['ui.bootstrap']);

dictApp.controller('mainController',['$scope','$http',function($scope, $http) {
    $scope.formData = {};
    $scope.searchResults = [];
    $scope.selected_word = {};
    

    // when landing on the page, get all bookmarks and show them
    $http.get('/api/bookmarks')
        .success(function(data) {
            $scope.bookmarks = data;
            //console.log('phanindra',data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createBookmark = function(selection) {
        console.log(selection);
        console.log('create',selection.word);
        $scope.formData = {
            word : selection.word,
            audio_url : selection.audio_url,
            description : selection.description
        };
        $http.post('/api/bookmarks', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.bookmarks = data;
                //console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.deleteBookmark = function(id) {
        $http.delete('/api/bookmarks/' + id)
            .success(function(data) {
                $scope.bookmarks = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.search = function(query){
        $scope.currentPage = 0;
        $http.get('http://letsventure.0x10.info/api/dictionary.php?type=json&query=' + $scope.query).
            then(function(response) {
                if(response.status === 200){
                    $scope.searchResults = response.data;
                    $scope.totalItems = response.data.length;
                    $scope.currentPage = 1;
                    console.log(response);
                }
            }, function(response) {
            console.log(response);
          });
    };
    
    //pagination data
    $scope.filteredResults = []
    ,$scope.currentPage = 0
    ,$scope.numPerPage = 10
    ,$scope.maxSize = 5;

    $scope.setPage = function (pageNo) {
        $scope.currentPage = pageNo;
    };

    $scope.$watch('currentPage + numPerPage', function() {
        var begin = (($scope.currentPage - 1) * $scope.numPerPage)
        , end = begin + $scope.numPerPage;
        if($scope.searchResults.length > 0){
            $scope.filteredResults = $scope.searchResults.slice(begin, end);
        }
    });
    
    //selected word
    $scope.setSelectedWord = function(word){
        $scope.selected_word = word
    };

    $scope.play = function(id){
        var audio = document.getElementById(id);
        audio.play();
    }
}]);

dictApp.controller('ChildController', ['$scope', function($scope) {

}]);



dictApp.directive('keypress', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.keypress);
                });

                event.preventDefault();
            }
        });
    };
});
