tic_tac_toe.controller('DashboardCtrl', function($scope, $http, localStorageService) {

  $scope.dashBoardData ="";

  var access_token = localStorageService.get('access_token');

  console.log("token in dashboard controller", access_token);

  $scope.getDashboard = function() {
    $http({
      url: 'http://localhost:8100/api/dashboard',
      method: "GET",
      params: {access_token:access_token}
    }).success(function(result){

      $scope.dashBoardData = result.data;
      console.log(result.message);
      console.log("result.data =======",result.data);

    }).error(function(error) {
      alert("Comes from error");
      console.log("error", error);
    });
  };

  $scope.getDashboard();
});

