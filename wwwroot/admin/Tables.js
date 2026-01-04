var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {

    console.log("dasdas HI");
   
    $scope.msg = 'HI';
    $scope.msg_d = false;

    $scope.btn_txt = "SAVE";
    $scope.SysID = 0;
    $scope.typ = 0;
    $scope.n = "";
    $scope.s = '' + 1;
    $scope.load = function () {
       
        var bbb = {
            "typ": $scope.typ, "SysID": $scope.SysID, "n": $scope.n, "s": $scope.s 
        };
        console.log(bbb);
        $http.post('../api/MasterApi/tb_call', JSON.stringify(bbb)).then(function (responsea) {
            $scope.cat_lst = responsea.data;
            console.log($scope.cat_lst[0]);
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
            $scope.n = "";
            $scope.s = '' + 1;
          
        }, function (responsea) { });
    };

    $scope.load();
    $scope.new_data = function () {
        $scope.btn_txt = "SAVE";
        $scope.SysID = 0;
        $scope.typ = 0;
        $scope.n = "";
        $scope.s = '' + 1;
        $scope.load();
    };
    $scope.view = function (a) {
        $scope.SysID = a.sysID; 
        $scope.n = a.n;
        $scope.s = '' + a.s;
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