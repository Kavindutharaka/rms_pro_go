var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {

    console.log("dasdas HI");
    $scope.un = localStorage.getItem("dn");
    $scope.ul = localStorage.getItem("ul");
    console.log($scope.un);
    if (angular.isUndefined($scope.un) || $scope.un == "" || $scope.un == null) {
      
    } else {
        if (Number($scope.ul) == 10) { $window.location.href = './Waiter.html'; };
        if (Number($scope.ul) < 3) { $window.location.href = './index.html'; };
        if (Number($scope.ul) == 5) { $window.location.href = './cashier.html'; }; // chasir
        if (Number($scope.ul) == 6) { $window.location.href = './Manager/Collector.html'; }; 
    }


 
    $scope.pw_worng = false;
    $scope.un = ""; $scope.pw = "";
    $scope.login_call = function () {

        var bbb = {
            "SysID": 0, "un": $scope.un, "pw": $scope.pw,"ul":"0","dn":"dn"
        };


        $http.post('./api/LoginApi/call_login', JSON.stringify(bbb)).then(function (responsea) {

            $scope.incomeing = responsea.data;
            if (Number($scope.incomeing[0].sysID) == 0) {
                $scope.pw_worng = true;
                $timeout(function () { $scope.pw_worng = false; $scope.un = ""; $scope.pw = ""; }, 2500);

            }
            else {
            localStorage.setItem("dn", $scope.incomeing[0].dn);
            localStorage.setItem("uid", $scope.incomeing[0].sysID);
            localStorage.setItem("ul", $scope.incomeing[0].ul);
                if (Number($scope.incomeing[0].ul) == 10) { $window.location.href = './Waiter.html'; }; // waiter
                if (Number($scope.incomeing[0].ul) == 5) { $window.location.href = './cashier.html'; }; // chasir
                if (Number($scope.incomeing[0].ul) < 3) { $window.location.href = './index.html'; }; // admin
                if (Number($scope.incomeing[0].ul) == 6) { $window.location.href = './Manager/Collector.html'; }; 

            }
            console.log($scope.incomeing);

        }, function (responsea) { });
    };


    $scope.go = function () {
        $window.location.href = '../Home/';
    };

});