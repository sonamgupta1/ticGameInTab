tic_tac_toe.controller('signupCtrl', function ($scope, $http, $state,localStorageService,$cordovaCamera) {
  $scope.user        = {};
  $scope.choice      = "";
  $scope.user.gender = '';
  $scope.images      = [];

  $scope.register = function() {

    console.log("$scope.user =====", $scope.user);

    var user       = {};
    user.name      = $scope.user.name;
    user.user_name = $scope.user.username;
    user.password  = $scope.user.password;
    user.gender    = $scope.user.gender;

    $scope.takePicture();

    $http({
      method : 'POST',
      url : 'http://localhost:8100/api/sign_up',
      data : user,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).success(function(result){

      alert(result.message);
      if(parseInt(result.status) === 200) {

        console.log("result.data ======",result.data[0].access_token);

        localStorageService.set('access_token', result.data[0].access_token);


        $state.go('menu.dashboard');

        $scope.user = "";
        $scope.user.username = "";
        $scope.user.password = "";
      }
    }).error(function(error) {
      alert(error.message);
      console.log("error===========", JSON.stringify(error));
    })
  };


  $scope.takePicture = function() {
    var options = {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 200,
      targetHeight: 200,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
    };



    $cordovaCamera.getPicture(options).then(function(imageData) {

      var imgURI = "data:image/jpeg;base64," + imageData;

      $scope.images.push(imgURI);

    }, function(err) {
      // An error occured. Show a message to the user
    });

    console.log("length",$scope.images.length);

  }


});

