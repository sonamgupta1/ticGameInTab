tic_tac_toe.controller('loginCtrl', function ($scope, $state,$http,localStorageService) {

  $scope.user = {};



  $scope.getGameId = function(access_token1){

    var user = {};

    var access_token = access_token1;


    user.access_token = access_token;

    $http({
      url: 'http://localhost:8100/api/initialize_game',
      method: 'POST',
      data: user,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).success(function (result) {
      console.log("result for game api", result);

    }).error(function (error) {
      console.log("error", error);
    });
  }



    $scope.login = function () {

      var token = localStorageService.get('access_token');

        $http({
          url: 'http://localhost:8100/api/login',
          method: "GET",
          params: {user_name: $scope.user.username, password: $scope.user.password}
        }).success(function (result) {

          if (parseInt(result.status) === 200) {

            localStorageService.set('access_token', result.data[0].access_token);

            var access_token = localStorageService.get('access_token');

            $scope.getGameId(access_token);

            alert(result.message);

            $state.go('menu.dashboard');

            $scope.user.username = "";
            $scope.user.password = "";

          } else if (parseInt(result.status) === 400) {
            alert(result.message);
          }
        }).error(function (error) {
          alert("There is something wrong happen !!!!");
          console.log("error", error);
        });

      }

});

