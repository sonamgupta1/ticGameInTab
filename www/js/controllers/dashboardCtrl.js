tic_tac_toe.controller('DashboardCtrl', function ($scope, $q, $http, localStorageService) {

    $scope.dashBoardData = "";

    var access_token = localStorageService.get('access_token');

    $scope.getDashboard = function () {

        var dfd = $q.defer();

        var data = [];
        setTimeout(function () {
            $http({
                url: 'http://localhost:8100/api/dashboard',
                method: "GET",
                params: {access_token: access_token}
            }).success(function (result) {

                data.push(result);

                $scope.dashBoardData = data[0].data;

                console.log(data[0].message);

                console.log("data in dashboard controller",data[0]);

                dfd.resolve(data);
            }).error(function (error) {
                console.log("error", error);
            });

        })

        return dfd.promise;
    };

    $scope.getDashboard();
});

