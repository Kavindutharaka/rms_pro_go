var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {
    $scope.s_ch_v = 10;
    $scope.main_sel = 1;
  
    $scope.PendingByLo = [];

    $scope.new_load = 0;
    $scope.chef_id = 5 + '';
    $scope.chef_n = "";
    
    var bbb = {
        "SysID": 1
    };
    $http.post('./api/viewApi/chef_lst', JSON.stringify(bbb)).then(function (responsea) {
        $scope.cheh_lst = responsea.data;
    
    }, function (responsea) { });

    $scope.OngoingByLo = [];
    $scope.load_item_pending = function () {
      
            var bbb = {
                "SysID": 3
            };
        $http.post('./api/viewApi/PendingByLo', JSON.stringify(bbb)).then(function (responsea) {
                $scope.PendingByLo = responsea.data;
                
            }, function (responsea) { });
 
        $http.post('./api/viewApi/OngoingByLo', JSON.stringify(bbb)).then(function (responsea) {
            $scope.OngoingByLo = responsea.data;
            console.log($scope.OngoingByLo);
        }, function (responsea) { });
            
    };

     
    $scope.load_item_pending();

    $scope.chef_sel = [];
    $scope.add_item = function (xx) {
        $scope.new_load = 1;
        for (var c = 0; c < $scope.cheh_lst.length; c++) {
            if (Number($scope.cheh_lst[c].sysID) == Number($scope.chef_id)) {
                $scope.chef_n = $scope.cheh_lst[c].dn;
            }
        }

        for (var c = 0; c < $scope.PendingByLo.length; c++) {
            if (Number($scope.PendingByLo[c].sysID) == Number(xx.sysID)) {
                $scope.PendingByLo[c].sel = 1;
            }
        }

        try { $scope.chef_sel.push(xx); } catch (e) { }

        var bbb = {
            "SysID": xx.sysID, "cid": $scope.chef_id, "tbid": xx.tb_id, "u": xx.u, "pid": xx.p_id, "q": xx.q, "sdt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss')
        };
        $http.post('./api/viewApi/chef_update01', JSON.stringify(bbb)).then(function (responsea) {
            
        }, function (responsea) { });
        
        console.log(xx.sysID);
      //  $scope.chef_sel 
    };

    $scope.remove_sel = function (a) {


        var bbb = {
            "SysID": a.sysID, "cid": $scope.chef_id, "tbid": a.tb_id, "u": a.u, "pid": a.p_id, "q": a.q, "sdt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss')
        };
        $http.post('./api/viewApi/chef_update01R', JSON.stringify(bbb)).then(function (responsea) {

        }, function (responsea) { });

        for (var c = 0; c < $scope.PendingByLo.length; c++) {
            if (Number($scope.PendingByLo[c].sysID) == Number(a.sysID)) {
                $scope.PendingByLo[c].sel = 0;
            }
        }

        var index = $scope.chef_sel.indexOf(a);
        $scope.chef_sel.splice(index, 1);

        if ($scope.chef_sel == '' || $scope.chef_sel == null || $scope.chef_sel.length < 0) {
            $scope.close_sel();
        }

    };

    $scope.close_sel = function () {
        $scope.new_load = 0;
        $scope.chef_sel = [];
        $scope.load_item_pending();
    };



    $scope.print = function () {
        $scope.dt = $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss');
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
            $scope.new_load = 0;
            $scope.chef_sel = [];
            $scope.load_item_pending();
        }, 100);


    };

    $scope.item_done = function (a) {
        console.log(a);

        var bbb = {
            "SysID": a.sysID, "cid": $scope.chef_id, "tbid": a.tb_id, "u": a.u, "pid": a.p_id, "q": a.q, "sdt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss')
        };
        $http.post('./api/viewApi/chef_update02', JSON.stringify(bbb)).then(function (responsea) {

        }, function (responsea) { });
        $scope.new_load = 1;
        connection.invoke("SendMessage", "Coffee Bar", a.pn+" x "+a.q+" Done").catch(function (err) {
            return console.error(err.toString());
        });
        $scope.new_load = 0;
        var index = $scope.chef_sel.indexOf(a);
        $scope.chef_sel.splice(index, 1);
    };






    pushNotify();
    function pushNotify() {
        if (!("Notification" in window)) {
            // checking if the user's browser supports web push Notification
            alert("Web browser does not support desktop notification");
        } else if (Notification.permission === "granted") {
            console.log("Permission to show web push notifications granted.");
            // if notification permissions is granted,
            // then create a Notification object
            // createNotification();
        } else if (Notification.permission !== "denied") {
            alert("Going to ask for permission to show web push notification");
            // User should give explicit permission
            Notification.requestPermission().then((permission) => {
                // If the user accepts, let's create a notification
                // createNotification();
            });
        }
        // User has not granted to show web push notifications via Browser
        // Let's honor his decision and not keep pestering anymore
    }
    $scope.noti = function () {
        var notification = new Notification('Web Push Notification', {
            icon: 'https://phppot.com/badge.png',
            body: 'New article published!',
        });
        // url that needs to be opened on clicking the notification
        // finally everything boils down to click and visits right
        //notification.onclick = function () {
        //    window.open('https://phppot.com');
        //};
    };









    "use strict";

    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

   

    connection.on("ReceiveMessage", function (user, message) {
        if (Number($scope.new_load) == 0) {
            $scope.load_item_pending();
        }
        console.log(user + " > " + message);
        var notification = new Notification('RMS Notification > ' + user, {
            icon: './logo.png.png',
            body: message,
        });
        // url that needs to be opened on clicking the notification
        // finally everything boils down to click and visits right
        //notification.onclick = function () {
        //    window.open('https://phppot.com');
        //};
 
    });

    connection.start().then(function () {
        console.log("Wada karanna gaththa");
    }).catch(function (err) {
        return console.error(err.toString());
    });

    $scope.sendOK = function () {
        connection.invoke("SendMessage", "Waiter", $scope.msg).catch(function (err) {
            return console.error(err.toString());
        });

    };

    $scope.phv_test = function () {
        $scope.load_item_pending();
        $timeout(function () {
            $scope.phv_test();
        }, 12000);
    };

    $scope.phv_test();




});