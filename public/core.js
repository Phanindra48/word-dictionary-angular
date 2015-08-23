var dictApp = angular.module('dictApp', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all bookmarks and show them
    $http.get('/api/bookmarks')
        .success(function(data) {
            $scope.bookmarks = data;
            console.log('phanindra',data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.createBookmark = function() {
        $http.post('/api/bookmarks', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.bookmarks = data;
                console.log(data);
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
        $http.get('http://letsventure.0x10.info/api/dictionary.php?type=json&query=' + $scope.query).
            then(function(response) {
                if(response.status === 200){
                    $scope.searchResults = response.data;
                    console.log(repsonse);
                }
            }, function(response) {
            console.log(response);
          });
    }

}


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