tic_tac_toe.controller('profileCtrl', function ($scope, $http, $state, localStorageService) {


  $scope.user = {};

  var access_token = localStorageService.get('access_token');


  $scope.getProfile = function () {

    $http({
      url: 'http://localhost:8100/api/profile',
      method: "GET",
      params: {access_token: access_token}
    }).success(function (result) {

      if (parseInt(result.status) === 200) {

        //localStorageService.set('access_token', result.data[0].access_token);

        $scope.user.name = result.data[0].full_name;

        $scope.user.user_name = result.data[0].user_name;

        $scope.user.password = '....';

        if (result.data[0].gender == 0) {
          $scope.user.gender = 'Female';
        }
        else {
          $scope.user.gender = 'Male';

        }

      } else if (parseInt(result.status) === 400) {
        alert(result.message);
      }
    }).error(function (error) {
      alert("There is something wrong happen !!!!");
      console.log("error", error);
    });
  };
  $scope.getProfile();

  $scope.editProfile = function () {

    var user = {};

    user.access_token = access_token;

    user.name = $scope.user.name;

    $http({
      url: 'http://localhost:8100/api/edit_profile',
      method: 'POST',
      data: user,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).success(function (result) {
      console.log("result for edit api", result);

    }).error(function (error) {
      alert("There is something wrong happen !!!!");
      console.log("error", error);
    });
  }


});


