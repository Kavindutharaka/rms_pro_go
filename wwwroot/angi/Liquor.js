var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {


    Audio.prototype.play = (function (play) {
        return function () {
            var audio = this,
                args = arguments,
                promise = play.apply(audio, args);
            if (promise !== undefined) {
                promise.catch(_ => {
                    // Autoplay was prevented. This is optional, but add a button to start playing.
                    var el = document.createElement("button");
                    el.innerHTML = "Play";
                    el.style.display = 'none';
                    el.addEventListener("click", function () { play.apply(audio, args); });
                    this.parentNode.insertBefore(el, this.nextSibling)
                });
            }
        };
    })(Audio.prototype.play);

    // Try automatically playing our audio via script. This would normally trigger and error.


    var sound = document.getElementById('mySound');


    function getPath() {
        var path = window.location.href;
        return path.substring(0, path.lastIndexOf("/"));
    }
    var p_d = '';
    $scope.pp = function () {
        var config = getUpdatedConfig();
        var opts = getUpdatedOptions(true);

        const elem = document.getElementById("print");
        var printData = [
            {
                type: 'pixel',
                format: 'html',
                flavor: 'plain',
                data: '<html>' +
                    '<body style="margin:20px;">' +
                    p_d +
                    '</body></html>',
                options: opts
            }
        ];


        qz.print(config, printData).catch();

    };


    var pn = 'XP-80C'; // XP-80C

    setPrinter(pn);

    /// QZ print end

  
    //p_d = p_d +
    //    '   <div style="margin-top:3px;">' +
    //    '       <div style="font-size:18px;display:inline-block;">' + $scope.new_pending[c].pn + '</div>' +
    //    '       <div style="font-size: 18px; display: inline-block;float: right">x ' + $scope.new_pending[c].q + '</div>' +
    //    '   </div>' +
    //    '   <div style="margin-top:2px;">' +
    //    '       <div style="font-size:14px;font-weight:bolder;">' + $scope.new_pending[c].c + '</div>' +
    //    '   </div>';



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
    var loo
    $scope.load_item_pending = function () {
      
            var bbb = {
                "SysID": 2
            };
        $http.post('./api/viewApi/PendingByLo', JSON.stringify(bbb)).then(function (responsea) {
            $scope.PendingByLo = responsea.data;
            console.log($scope.PendingByLo);
            if ($scope.PendingByLo.length > 0) {
                sound.play();

                if (true) {
                    var ndt = $filter('date')(new Date(), 'yyyy/MMM/dd HH:mm:ss');
                    var dt = $filter('date')(new Date(), 'yyyy/MMM/dd');
                    var t = $filter('date')(new Date(), 'HH:mm:ss');
                    p_d = '   <div style="margin-top:2px;height: 16px;">' +
                        '       <div style="font-size:12px;float: right">' + dt + '</div>' +
                        '   </div> ' +
                        '   <div style="margin-top:2px;border-bottom:solid 2px;height: 16px;">' +
                        '       <div style="font-size:12px;float: right">' + t + '</div>' +
                        '   </div> ';

                    var bbbbb = [];
                    for (var c = 0; c < $scope.PendingByLo.length; c++) {
                        console.log($scope.PendingByLo[c]);


                        p_d = p_d +
                            '   <div style="margin-top:5px;">' +
                            '       <div style="font-size:14px;display:inline-block;">' + $scope.PendingByLo[c].tb_n + '</div>' +
                            ' <div style="font-size:14px;display:inline-block;float: right;">' + $scope.PendingByLo[c].dn + '</div>' +
                            '   </div>' +
                            '   <div style="margin-top:3px;">' +
                            '       <div style="font-size:18px;display:inline-block;">' + $scope.PendingByLo[c].pn + '</div>' +
                            '       <div style="font-size: 18px; display: inline-block;float: right">x ' + $scope.PendingByLo[c].q + '</div>' +
                            '   </div>' +
                            '   <div style="margin-top:2px;border-bottom:solid 1px;">' +
                            '       <div style="font-size:14px;font-weight:bolder;">' + $scope.PendingByLo[c].i_c + '</div>' +
                            '   </div>';
                        var bbb = {
                            "SysID": $scope.PendingByLo[c].sysID, "cid": $scope.chef_id, "tbid": $scope.PendingByLo[c].tb_id, "u": $scope.PendingByLo[c].u, "pid": $scope.PendingByLo[c].p_id, "q": $scope.PendingByLo[c].q, "sdt": ndt
                        };
                        bbbbb.push(bbb);
                    }
                    $http.post('./api/viewApi/chef_update01_auto', JSON.stringify(bbbbb)).then(function (responsea) {
                       
                    }, function (responsea) { });
                    $scope.pp();
                }
 
                $scope.new_i = 1;
                $timeout(function () {
                    $scope.new_i = 0;

                }, 8000);
            } else {
                console.log("Noooo Item");
            }

             
            }, function (responsea) { });
 
        $http.post('./api/viewApi/OngoingByLo', JSON.stringify(bbb)).then(function (responsea) {
            $scope.OngoingByLo = responsea.data;
            console.log($scope.OngoingByLo);
        }, function (responsea) { });
        $timeout(function () {
            $scope.load_item_pending();
        }, 10000);
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



    

    $scope.item_done = function (a) {
        console.log(a);

        var bbb = {
            "SysID": a.sysID, "cid": $scope.chef_id, "tbid": a.tb_id, "u": a.u, "pid": a.p_id, "q": a.q, "sdt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss')
        };
        $http.post('./api/viewApi/chef_update02', JSON.stringify(bbb)).then(function (responsea) {

        }, function (responsea) { });
        $scope.new_load = 1;
        connection.invoke("SendMessage", "Liquor Bar", a.pn+" x "+a.q+" Done").catch(function (err) {
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
  







});