tic_tac_toe.controller('signupCtrl', function ($scope, $http, $q, $cordovaCamera, $state, $cordovaFileTransfer, localStorageService) {
    $scope.user = {};
    $scope.choice = "";
    $scope.user.gender = '';


    $scope.userNameExistance = "";

    $scope.tic1 = "";

    $scope.buttonDisable = false;

    $scope.getGameId = function (access_token1) {

        var user = {};

        var access_token = access_token1;

        user.access_token = access_token;

        var dfd = $q.defer();

        var data = [];
        setTimeout(function () {
            $http({
                url: 'http://localhost:8100/api/initialize_game',
                method: 'POST',
                data: user,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (result) {

                data.push(result);

                dfd.resolve(data);
            }).error(function (error) {
                console.log("error", error);
            });

        })
        return dfd.promise;
    };

    $scope.checkUserName = function () {

        var dfd = $q.defer();

        var data = [];
        setTimeout(function () {

            $http({
                url: 'http://localhost:8100/api/user_name',
                method: "GET",
                params: {user_name: $scope.user.username}
            }).success(function (result) {

                data.push(result);

                $scope.userNameExistance = data[0].data;

                if (parseInt($scope.userNameExistance) === 1) {

                    $scope.tic1 = 1;

                    $scope.buttonDisable = true;

                }
                else {

                    $scope.tic1 = 0;

                    $scope.buttonDisable = false;


                }
                dfd.resolve(data);
            }).error(function (error) {
                console.log("error", error);
            });
            return dfd.promise;
        })
    };

    $scope.takePicture = function () {
        var options = {
            quality: 75,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 200,
            targetHeight: 200,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {

            $scope.imgURI = "data:image/jpeg;base64," + imageData;

        }, function (err) {
            console.log(error);
        });


    }

    $scope.register = function () {

        var user = {};
        user.name = $scope.user.name;
        user.user_name = $scope.user.username;
        user.password = $scope.user.password;
        user.gender = $scope.user.gender;
        user.base64ImageData = $scope.imgURI;

        var dfd = $q.defer();

        var data = [];

        setTimeout(function () {

            $http({
                method: 'POST',
                url: 'http://localhost:8100/api/sign_up',
                data: user,
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                }
            }).success(function (result) {
                data.push(result);
                alert(data[0].message);
                if (parseInt(data[0].status) === 200) {

                    localStorageService.set('access_token', data[0].data[0].access_token);

                    var access_token = localStorageService.get('access_token');

                    $scope.getGameId(access_token);

                    $state.go('menu.dashboard');

                    $scope.user = "";
                    $scope.user.username = "";
                    $scope.user.password = "";
                }
                dfd.resolve(data);
            }).error(function (error) {
                //alert(error.message);
                console.log("error", JSON.stringify(error));
            })
            return dfd.promise;
        })
    };


});
