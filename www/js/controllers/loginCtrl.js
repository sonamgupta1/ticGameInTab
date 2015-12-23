tic_tac_toe.controller('loginCtrl', function ($scope, $state,$http,localStorageService) {

  $scope.user = {};

    $scope.login = function () {

      var token = localStorageService.get('access_token');

      console.log("token", token);

        $http({
          url: 'http://localhost:8100/api/login',
          method: "GET",
          params: {user_name: $scope.user.username, password: $scope.user.password}
        }).success(function (result) {

          if (parseInt(result.status) === 200) {

            localStorageService.set('access_token', result.data[0].access_token);

            alert(result.message);

            $state.go('menu.dashboard');

            $scope.user = "";

          } else if (parseInt(result.status) === 400) {
            alert(result.message);
          }
        }).error(function (error) {
          alert("There is something wrong happen !!!!");
          console.log("error", error);
        });

      }

});

