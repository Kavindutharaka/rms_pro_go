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
    $scope.load_cat = function () {

        var bbb = {
            "typ": 0, "SysID": 0, "n": "", "s": 0
        };
        $http.post('../api/MasterApi/cat_change', JSON.stringify(bbb)).then(function (responsea) {
            $scope.cat_lst = responsea.data;
          //  console.log($scope.cat_lst);
           

        }, function (responsea) { });
    };
    $scope.load_cat();

    $scope.msg = 'HI';
    $scope.msg_d = false;

    $scope.btn_txt = "SAVE";
    $scope.SysID = 0;
    $scope.typ = 0;
    $scope.n = "";
    $scope.pn = "";
    $scope.cp = "";
    $scope.sp = "";
    $scope.stb = '' + 2;
    $scope.s = '' + 1;
    $scope.cat = "";
    $scope.dis = 0;
    $scope.lo = '' + 1;

    $scope.cat_change = function () {
        $scope.pro_lst = [];
        $scope.test_ob = [];
     //   $scope.pro_lst_or
        for (var c = 0; c < $scope.pro_lst_or.length; c++) {
            if (Number($scope.pro_lst_or[c].cat) == Number($scope.cat)) {
                $scope.pro_lst.push($scope.pro_lst_or[c]);
                //console.log($scope.pro_lst_or[c].cat);
            }
           
        };
        console.log($scope.cat);
       // console.log($scope.pro_lst.filter($scope.cat == 'cat'));
    };
    $scope.load = function () {

        if (angular.isUndefined($scope.dis) || $scope.dis == '' || $scope.dis == null) { $scope.dis = 0; };

        var bbb = {
            "typ": $scope.typ, "SysID": $scope.SysID, "n": $scope.n, "pn": $scope.pn, "cp": $scope.cp, "sp": $scope.sp,
            "dis": $scope.dis, "stb": $scope.stb, "s": $scope.s, "cat": $scope.cat, "lo": $scope.lo
        };
        $http.post('../api/MasterApi/pro_call', JSON.stringify(bbb)).then(function (responsea) {
            $scope.pro_lst = responsea.data;
            $scope.pro_lst_or = responsea.data;
             console.log($scope.pro_lst);
            if (Number($scope.pro_lst[0].i) == 1) {
                $scope.msg_d = true; $scope.msg = 'Done !';
                $timeout(function () { $scope.msg_d = false; }, 2500);
            }
            if (Number($scope.pro_lst[0].i) == 10) {
                $scope.msg_d = true; $scope.msg = 'Duplicate Data, Not Updated !';
                $timeout(function () { $scope.msg_d = false; }, 2500);
            }
            $scope.btn_txt = "SAVE";
            $scope.SysID = 0;
            $scope.typ = 0;
            $scope.n = "";
            $scope.pn = "";
            $scope.cp = "";
            $scope.sp = "";
            $scope.stb = '' + 2;
            $scope.s = '' + 1;
          //  $scope.cat = '';
            $scope.dis = 0;
           // $scope.lo = '' + 1;
        }, function (responsea) { });
    };

    $scope.load();
    $scope.new_data = function () {
        $scope.btn_txt = "SAVE";
        $scope.SysID = 0;
        $scope.typ = 0;
        $scope.n = "";
        $scope.s = '' + 1;
        $scope.cat = '';
        $scope.stb = '' + 2;
        $scope.dis = 0;
        $scope.lo = ''+1;
        $scope.load();
    };
    $scope.view = function (a) {
        $scope.SysID = a.sysID; 
        $scope.n = a.n;
        $scope.s = '' + a.s;
        $scope.cat = ''+a.cat;
        $scope.pn = a.pn;
        $scope.cp = a.cp;
        $scope.sp = a.sp;
        $scope.stb = '' + a.stb;
        $scope.dis = a.dis;
        $scope.lo = ''+a.lo;
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