tic_tac_toe.controller('DashboardCtrl', function ($scope, $http, localStorageService) {

  $scope.dashBoardData = "";

  var access_token = localStorageService.get('access_token');

  $scope.getDashboard = function () {
    $http({
      url: 'http://localhost:8100/api/dashboard',
      method: "GET",
      params: {access_token: access_token}
    }).success(function (result) {

      $scope.dashBoardData = result.data;
      console.log(result.message);

    }).error(function (error) {
      alert("Comes from error");
    });
  };

  $scope.getDashboard();
});

