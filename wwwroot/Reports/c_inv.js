var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {
 

    $scope.pre_load = function () {

        $scope.inv_no = 0;
        var bbb = {
            "SysID": "exec [dbo].[CurrentInvLst] 0"
        };
        $scope.endTot = 0;
        $scope.cash = 0;
        $scope.card = 0;
        $http.post('../api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.CurrentInvLst = responsea.data;
            console.log($scope.CurrentInvLst);
            for (var c = 0; c < $scope.CurrentInvLst.length; c++) {
                $scope.endTot = Number($scope.endTot) + (Number($scope.CurrentInvLst[c].endTot));
                $scope.cash = Number($scope.cash) + (Number($scope.CurrentInvLst[c].cash));
                $scope.card = Number($scope.card) + (Number($scope.CurrentInvLst[c].card));
            }
        }, function (responsea) { });
    };

    $scope.pre_load();
    $scope.pp = 1;

    $scope.inv_no = 0;
    $scope.load_data_01 = function (a) {
        console.log(a);
        $scope.dt = $filter('date')(a.dt, 'yyyy/MM/dd HH:mm:ss');
        $scope.invoice_no = a.inv;

        $scope.inv_no = a.sysID;
        for (var c = 0; c < $scope.CurrentInvLst.length; c++) {
          //  console.log($scope.CurrentInvLst[c].sysID, a.sysID);
            if (Number($scope.CurrentInvLst[c].sysID) == Number(a.sysID)) {
                $scope.CurrentInvLst[c].sel = 1;
            } else {
                $scope.CurrentInvLst[c].sel = 0;
            }
        }

        $scope.InvDataV = [];
        $scope.inv_info = a.inv + " " + a.tbn + " ";
        var bbb = {
            "SysID": "exec [dbo].[InvDataV] '" + a.sysID + "'"
        };
        $http.post('../api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.InvDataV = responsea.data;
            $scope.bill = responsea.data;
        //    console.log($scope.InvDataV);
            $scope.s_ch_v = a.sf;//s_chg tot_b
            $scope.tot = 0;
            $scope.s_chg = 0;
            $scope.g_tot = 0;
            for (var c = 0; c < $scope.bill.length; c++) {
                
                $scope.tot = Number($scope.tot) + Number($scope.bill[c].dis_v);
            }
            $scope.s_chg = (Number($scope.tot) / 100) * Number($scope.s_ch_v);
            $scope.g_tot = Number($scope.tot) + Number($scope.s_chg);

            $scope.bill_poot = [];
            $scope.bill_poot.push({ n: 'Total', v: $scope.tot });
            $scope.bill_poot.push({ n: 'Service ' + $scope.s_ch_v + '%', v: $scope.s_chg });
            $scope.bill_poot.push({ n: 'Grand Total ', v: $scope.g_tot });
        }, function (responsea) { });

    };


    $scope.print = function () {
        $timeout(function () {
            var printContents = document.getElementById('print').innerHTML;
            var popupWin = window.open('', 'testp', 'width=800,height=800,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no,top=50');
            popupWin.window.focus();
            popupWin.document.open();
            popupWin.document.write('<!DOCTYPE html><html><head>'
                + '<style type="text/css">@page { size: auto;  margin: 1mm;font-family:Arial!important;  }; .headcell { border-collapse: collapse; text-align: center; padding: 2px; border: 1px solid #807c7c; } .cellbd{border-collapse:collapse; padding:4px;  border: 1px solid #a39d9d;}</style>'
                + ' <script src="./support/angular.min.js"></script></head><body onload="window.print(); window.close();"><div>'
                + printContents + '</div></html>');
            popupWin.document.close();
            popupWin.focus();
            setTimeout(function () {

                self.close();
            //    $window.location.reload();
            }, 1000);

        }, 100);
    };



 
    $scope.p = 1;
    $scope.p_loa = function (a) { $scope.p = a; };
 
    $scope.p_loa2 = function (a) {
        $scope.endTot = 0;
        $scope.cash = 0;
        $scope.card = 0;
        $scope.CurrentInvLst = [];
        $scope.dayend_lst = [];

        $scope.pp = a;
        if (Number(a) == 1) { $scope.pre_load(); };
    };


    $scope.delInv = function () {
        $scope.CurrentInvLst = [];
        $scope.InvDataV = [];
        console.log($scope.inv_no);
        var bbb = {
            "SysID": "exec [dbo].[del_inv] '" + $scope.inv_no +"'"
        };
       
        $http.post('../api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.pre_load();
        }, function (responsea) { });

    };

    $scope.do_dayEnd = function () {
        $scope.CurrentInvLst = [];
        $scope.InvDataV = [];
        
        var bbb = {
            "SysID": "exec [dbo].[DoDayEnd] '7','" + $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss') + "'"
        };

        $http.post('../api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.pre_load();
        }, function (responsea) { });

    };

    
});