var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {

    console.log("dasdas HI");
    //$scope.un = localStorage.getItem("un");
    //$scope.login = false;
    //if (angular.isUndefined($scope.un) || $scope.un == "" || $scope.un == null) {
    //    $window.location.href = './sign-in.html';
    //} else {
    //    $scope.login = true;
    //}
    $scope.msg = 'HI';
    $scope.msg_d = false;

    $scope.btn_txt = "SAVE";
    $scope.SysID = 0;
    $scope.typ = 0;
    $scope.n = "";
    $scope.dn = "";
    $scope.s = '' + 1;
    $scope.load = function () {
       
        var bbb = {
            "typ": $scope.typ, "SysID": $scope.SysID, "n": $scope.n, "dn": $scope.dn, "s": $scope.s 
        };
        $http.post('../api/MasterApi/chef_change', JSON.stringify(bbb)).then(function (responsea) {
            $scope.cat_lst = responsea.data;
            console.log($scope.cat_lst[0].i);
            if (Number($scope.cat_lst[0].i) == 1) {
                $scope.msg_d = true; $scope.msg = 'Done !';
                $timeout(function () { $scope.msg_d = false; }, 2500);
            }
            if (Number($scope.cat_lst[0].i) == 10) {
                $scope.msg_d = true; $scope.msg = 'Duplicate Data, Not Updated !';
                $timeout(function () { $scope.msg_d = false; }, 2500);
            }
            $scope.btn_txt = "SAVE";
            $scope.SysID = 0;
            $scope.typ = 0;
            $scope.n = ""; $scope.dn = "";
            $scope.s = '' + 1;
          
        }, function (responsea) { });
    };

    $scope.load();
    $scope.new_data = function () {
        $scope.btn_txt = "SAVE";
        $scope.SysID = 0;
        $scope.typ = 0;
        $scope.n = ""; $scope.dn = "";
        $scope.s = '' + 1;
        $scope.load();
    };
    $scope.view = function (a) {
        $scope.SysID = a.sysID; 
        $scope.n = a.n;
        $scope.s = '' + a.s; $scope.dn = a.dn;
        $scope.btn_txt = "UPDATE";
    };
    $scope.change = function () {
        if ($scope.btn_txt == "UPDATE") {
            $scope.typ = 2;
        } else {
            $scope.typ = 1;
        }
        $scope.load();
    };

});