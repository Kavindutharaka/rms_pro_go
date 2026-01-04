var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {
    $scope.s_ch_v = 10;
    $scope.main_sel = 1;
    $scope.exit = function () {
        localStorage.setItem("dn_n", "");
        localStorage.setItem("uid", 0);
        localStorage.setItem("ul", 0);
        $window.location.href = './login.html';
    };

    $scope.new_order = [];
    $scope.tb_search_d = '';
    $scope.tb_search = function (a) { $scope.tb_search_d = a; localStorage.setItem("tb_sel", a); };
    $scope.load_item_pending = function () {
        //
        var bbb = {
            "SysID": $scope.uid
        };
        $http.post('./api/WorkApi/item_by_waiter', JSON.stringify(bbb)).then(function (responsea) {
            $scope.item_by_waiter = responsea.data;
           //  console.log($scope.item_by_waiter);
        }, function (responsea) { });
    };


    $scope.home_clk = function () {
        $scope.main_sel = 1;
        $scope.new_order = [];
    $scope.dn = localStorage.getItem("dn_n");
        $scope.ul = localStorage.getItem("ul");
        $scope.uid = localStorage.getItem("uid");
    console.log($scope.un);
    if (angular.isUndefined($scope.dn) || $scope.dn == "" || $scope.dn == null) {
        $window.location.href = './login.html';
        }  
        $scope.load_item_pending();
    $scope.tb_view = 1; 
    var bbb = {
        "SysID": 0
    };
    $http.post('./api/WorkApi/load_tb', JSON.stringify(bbb)).then(function (responsea) {
        $scope.load_tb = responsea.data;         
       // console.log($scope.load_tb);
    }, function (responsea) { });

    $http.post('./api/WorkApi/load_cat', JSON.stringify(bbb)).then(function (responsea) {
        $scope.load_cat = responsea.data;
        //console.log($scope.load_cat);
    }, function (responsea) { });

    $scope.seled_tb_id = 0;
    $scope.seled_tb = "";
    $scope.cat_lst = true;


        $scope.tb_view = 1;

        var tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        var tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById('London').style.display = "block";
        document.getElementById('b1').classList.add('active');

        $scope.tb_owner = 0;
    };

    $scope.home_clk();
    $scope.all_tb_view = function () {
        $scope.tb_view = 1;
        $scope.seled_tb_id = 0;
        $scope.seled_tb = "";

        var tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        var tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById('London').style.display = "block";
        document.getElementById('b1').classList.add('active');
    };

    $scope.tb_owner = 0;
    
    $scope.sel_tb = function (a) {
        console.log(a);
        $scope.seled_tb_id = a.sysID;
        $scope.seled_tb = a.n;
        $scope.tb_view = 2;  
        $scope.cat_lst = true;
        $scope.tb_owner = a.u;
        var bbb = {
            "SysID": $scope.seled_tb_id
        };
        $http.post('./api/WorkApi/item_by_tb', JSON.stringify(bbb)).then(function (responsea) {
            $scope.item_by_tb = responsea.data;
            console.log($scope.item_by_tb);
            //  $scope.s_ch_v = 10; s_chg tot_b
            $scope.tot = 0;
            $scope.s_chg = 0;
            $scope.g_tot = 0;
            for (var c = 0; c < $scope.item_by_tb.length; c++) {
                $scope.tot = Number($scope.tot) + Number($scope.item_by_tb[c].dis_v);
            }
            $scope.s_chg = (Number($scope.tot) / 100) * Number($scope.s_ch_v);
            $scope.g_tot = Number($scope.tot) + Number($scope.s_chg);

        }, function (responsea) { });
      
    };


    $scope.sel_cat = function (a) {
        $scope.load_pro = [];
        console.log(a);
        $scope.cat_lst = false;

        var bbb = {
            "SysID": a.sysID
        };
        $http.post('./api/WorkApi/load_pro', JSON.stringify(bbb)).then(function (responsea) {
            $scope.load_pro = responsea.data;
            console.log($scope.load_pro);
        }, function (responsea) { });
    };

    $scope.all_cat_view = function () {
        $scope.cat_lst = true;
    };

    $scope.tb_search_d = localStorage.getItem("tb_sel");

    $scope.add_item = function (a) {
       
        var dd = { 'n': a.n, 'pn': a.pn, 'sp': a.sp, 'sysID': a.sysID, "dis_v": a.dis_v, "i_c": $scope.i_c }; 
        $scope.new_order.push(dd);
        $scope.i_c = "";
    };

    $scope.i_c = "";
    $scope.remove_item = function (a) {
         
        var index = $scope.new_order.indexOf(a);
        $scope.new_order.splice(index, 1); 
    };
    $scope.order_save = function () {

        if (Number($scope.tb_owner) == 0) { $scope.tb_owner = $scope.uid; };
        var bbb = [];
        for (var x = 0; x < $scope.new_order.length; x++) {
            $scope.new_order[x].uid = $scope.uid;
            $scope.new_order[x].tbid = $scope.seled_tb_id;
            $scope.new_order[x].tbid_owr = $scope.tb_owner;
            var dd = {
                "sysID": $scope.new_order[x].sysID,
                "tbid": $scope.seled_tb_id,
                "uid": $scope.uid,
                "tb_owr": $scope.tb_owner,
                "dt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss'),
                "i_c": $scope.new_order[x].i_c
}
            bbb.push(dd);
        };
        console.log($scope.new_order);
        $http.post('./api/WorkApi/save_table_order', JSON.stringify(bbb)).then(function (responsea) {
            console.log(responsea.data);
            //  $window.location.reload();
            $scope.home_clk();
        }, function (responsea) { });

        connection.invoke("SendMessage", $scope.dn, "New Order").catch(function (err) {
            return console.error(err.toString());
        });
       

    };
    $scope.main_btn_call = function (a) {
        $scope.main_sel = a;
        if (Number(a) == 2) { $scope.load_item_pending(); };
    };


    $scope.iten_done = function (a) {
        console.log(a); //
        var bbb = {
            "SysID": a.sysID
        };
        $http.post('./api/WorkApi/itemDoneByWaiter', JSON.stringify(bbb)).then(function (responsea) {
            $scope.load_item_pending();
        }, function (responsea) { });
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
        $scope.load_item_pending();
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
  







});