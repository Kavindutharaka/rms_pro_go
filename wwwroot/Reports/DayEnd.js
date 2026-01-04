var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {
 
    
    var bbb = {
        "SysID": "exec [dbo].[DayEndLst] 0"
    };
    $http.post('../api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
        $scope.dayend_lst = responsea.data;
     
    }, function (responsea) { });

    var bbb = {
        "SysID": "exec [dbo].[DayEndLst_all] 0"
    };
    $http.post('../api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
        $scope.dayend_lst_all = responsea.data;
        

    }, function (responsea) { });

    // --------------------------
    $scope.view_2 = function (a) {
        console.log(a);
        $scope.DayEndInv = [];
        $scope.kich = [];
        $scope.bema = [];
        $scope.endTot = 0; $scope.cash = 0; $scope.card = 0;

        //for (var c = 0; c < $scope.dayend_lst_all.length; c++) {
        //    if (Number($scope.dayend_lst_all[c].sysID) == Number(a.sysID)) { $scope.dayend_lst[c].sel = 1; console.log("dasdasd"); } else { $scope.dayend_lst[c].sel = 0; }
        //}
        $scope.DayEndInvData = [];
        var bbb = {
            "SysID": "exec [dbo].[DayEndInv_all] '" + a.f + "','" + a.t + "'"
        };
        $http.post('../api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.DayEndInv = responsea.data;

            for (var c = 0; c < $scope.DayEndInv.length; c++) {
                $scope.endTot = Number($scope.endTot) + (Number($scope.DayEndInv[c].endTot));
                $scope.cash = Number($scope.cash) + (Number($scope.DayEndInv[c].cash));
                $scope.card = Number($scope.card) + (Number($scope.DayEndInv[c].card));
            }
            var bb = {
                "SysID": "exec [dbo].[DayEndInvItemAll] '" + a.f + "','" + a.t + "'"
            };
            $http.post('../api/MasterApi/sp', JSON.stringify(bb)).then(function (responsea) {
                $scope.DayEndInvData = responsea.data;

                for (var c = 0; c < $scope.DayEndInvData.length; c++) {
                    if (Number($scope.DayEndInvData[c].lo) == 1) {
                        $scope.kich.push($scope.DayEndInvData[c]);
                    } else {
                        $scope.bema.push($scope.DayEndInvData[c]);
                    }
                }
            }, function (responsea) { });

        }, function (responsea) { });

    };
    // -----------------------


    $scope.view = function (a) {
        $scope.DayEndInv = [];
        $scope.kich = [];
        $scope.bema = [];
        $scope.endTot = 0; $scope.cash = 0; $scope.card = 0;

        for (var c =0; c < $scope.dayend_lst.length; c++) {
            if (Number($scope.dayend_lst[c].sysID) == Number(a.sysID)) { $scope.dayend_lst[c].sel = 1; console.log("dasdasd"); } else { $scope.dayend_lst[c].sel = 0; }
        }
        $scope.DayEndInvData = [];
        var bbb = {
            "SysID": "exec [dbo].[DayEndInv] '"+a.u+"','"+a.f+"','"+a.t+"'"
        };
        $http.post('../api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.DayEndInv = responsea.data;
            
            for (var c = 0; c < $scope.DayEndInv.length; c++) {
                $scope.endTot = Number($scope.endTot) + (Number($scope.DayEndInv[c].endTot));
                $scope.cash = Number($scope.cash) + (Number($scope.DayEndInv[c].cash));
                $scope.card = Number($scope.card) + (Number($scope.DayEndInv[c].card));
            }
            var bb = {
                "SysID": "exec [dbo].[DayEndInvItem] '" + a.u + "','" + a.f + "','" + a.t + "'"
            };
            $http.post('../api/MasterApi/sp', JSON.stringify(bb)).then(function (responsea) {
                $scope.DayEndInvData = responsea.data;

                for (var c = 0; c < $scope.DayEndInvData.length; c++) {
                    if (Number($scope.DayEndInvData[c].lo) == 1) {
                        $scope.kich.push($scope.DayEndInvData[c]);
                    } else {
                        $scope.bema.push($scope.DayEndInvData[c]);
                    }
                }
            }, function (responsea) { });

        }, function (responsea) { });

    };
    $scope.p = 1;
    $scope.p_loa = function (a) { $scope.p = a; };
    $scope.dp = 1;
    $scope.p_dayS = function (a) { $scope.dp = a; };

});