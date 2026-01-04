var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {

    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();
    connection.start().then(function () {
        console.log("Wada karanna gaththa");
    }).catch(function (err) {
        return console.error(err.toString());
    });


    function getPath() {
        var path = window.location.href;
        return path.substring(0, path.lastIndexOf("/"));
    }
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
                    p_d+ 
                    '</body></html>',
                options: opts
            }
        ];

 
        qz.print(config, printData).catch();

        
        $timeout(function () {
            $scope.run00v = 0;
        }, 1000);

    };


    var pn = 'XP-80C'; // XP-80C

    setPrinter(pn);

    /// QZ print end

    var p_d = '' ;
    var sgnal = 1;

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
   


  

    

    $scope.ap = true;
  
 



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
    $scope.new_i = 0;

    $scope.run00v = 0;
    $scope.run_00 = function () {

        console.log("run " + $filter('date')(new Date(), 'mm:ss'));
        if (Number($scope.run00v) == 0) { 
          $scope.run00v = 1;
        p_d = '';
        var bbb = {
            "SysID": "exec [dbo].[KOT_load] 0"
        };
        $http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
            $scope.new_pending = responsea.data;
            console.log($scope.new_pending);
            if ($scope.new_pending.length > 0) {
                sound.play();
                var ndt = $filter('date')(new Date(), 'yyyy/MMM/dd HH:mm:ss');

                var dt = $filter('date')($scope.new_pending[0].dt, 'yyyy/MMM/dd');
                var t = $filter('date')($scope.new_pending[0].dt, 'HH:mm:ss');
                p_d = '   <div style="margin-top:2px;height: 14px;">' +
                    '       <div style="font-size:12px;">' + $scope.new_pending[0].n + '</div>' +
                    '   </div> ' +
                    '   <div style="margin-top:2px;height: 16px;">' +
                    '       <div style="font-size:12px;float: right">' + dt + '</div>' +
                    '   </div> ' +
                    '   <div style="margin-top:2px;height: 16px;">' +
                    '       <div style="font-size:12px;float: right">' + t + '</div>' +
                    '   </div>  ' +
                    '   <div style="margin-top:5px;border-bottom:solid 2px;">' +
                    '       <div style="font-size:14px;display:inline-block;">' + $scope.new_pending[0].tb_n + '</div>' +
                    ' <div style="font-size:14px;display:inline-block;float: right;">' + $scope.new_pending[0].dn + '</div>' +
                    '   </div> ';


                for (var c = 0; c < $scope.new_pending.length; c++) {
                    p_d = p_d +
                        '   <div style="margin-top:3px;">' +
                        '       <div style="font-size:18px;display:inline-block;">' + $scope.new_pending[c].pn + '</div>' +
                        '       <div style="font-size: 18px; display: inline-block;float: right">x ' + $scope.new_pending[c].q + '</div>' +
                        '   </div>' +
                        '   <div style="margin-top:2px;">' +
                        '       <div style="font-size:14px;font-weight:bolder;">' + $scope.new_pending[c].c + '</div>' +
                        '   </div>';
                    //var bbb = {
                    //    "SysID": $scope.PendingByLo[c].sysID, "cid": $scope.chef_id, "tbid": $scope.PendingByLo[c].tb_id, "u": $scope.PendingByLo[c].u, "pid": $scope.PendingByLo[c].p_id, "q": $scope.PendingByLo[c].q, "sdt": ndt
                    //};
                    //bbbbb.push(bbb);
                }
                $scope.pp();
                var bb = {
                    "SysID": "exec [dbo].[KOT_Update] '" + $scope.new_pending[0].oT_ID + "','" + ndt + "'"
                };
                $http.post('./api/MasterApi/sp', JSON.stringify(bb)).then(function (responsea) {
                    $scope.new_pen_inv = responsea.data;
                    console.log($scope.new_pen_inv);
                    $scope.run00v = 0;
                }, function (responsea) { });


                $scope.new_i = 1;
                $timeout(function () {
                    $scope.new_i = 0;

                }, 8000);
            } else {
                $scope.run00v = 0;
            }



        }, function (responsea) { });

        var bb = {
            "SysID": "exec [dbo].[KOT_onGolst] 0"
        };
        $http.post('./api/MasterApi/sp', JSON.stringify(bb)).then(function (responsea) {
            $scope.new_pen_invLst = responsea.data;
            console.log($scope.new_pen_invLst);

            var bbb = {
                "SysID": "exec [dbo].[KOT_onGolstD] 0"
            };
            $http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
                $scope.new_pen_kots = responsea.data;


                console.log($scope.new_pen_kots);
            }, function (responsea) { });

        }, function (responsea) { });
           // $scope.run00v = 0;
        }
    };

    $scope.phv_test = function () {
       
        $scope.run_00();
        sgnal = Number(sgnal) + 1;
        if (Number(sgnal) == 30) {
            sgnal = 1;
            try {
                connection.start().then(function () {
                    console.log("Wada karanna gaththa");
                }).catch(function (err) {
                    return console.error(err.toString());
                });

            } catch (e) { }
           

        }
        $timeout(function () {
            $scope.phv_test();
        }, 12000);
    };
     
    $scope.phv_test();


    $scope.load_item_pending = function () {
        //p_d = '';
        //    var bbb = {
        //        "SysID": 1
        //    };
        //$http.post('./api/viewApi/PendingByLo', JSON.stringify(bbb)).then(function (responsea) {
        //    $scope.PendingByLo = responsea.data;
        //    // sound.muted = false;
        //    console.log($scope.PendingByLo);

        //    if ($scope.PendingByLo.length > 0) {
        //        sound.play();

        //        if ($scope.ap == true) {
        //            var ndt = $filter('date')(new Date(), 'yyyy/MMM/dd HH:mm:ss');
        //            var dt = $filter('date')(new Date(), 'yyyy/MMM/dd');
        //            var t = $filter('date')(new Date(), 'HH:mm:ss');
        //            p_d = '   <div style="margin-top:2px;height: 16px;">' +
        //                '       <div style="font-size:12px;float: right">' + dt + '</div>' +
        //                '   </div> ' +
        //                '   <div style="margin-top:2px;border-bottom:solid 2px;height: 16px;">' +
        //                '       <div style="font-size:12px;float: right">' + t + '</div>' +
        //                '   </div> ';
                   
        //            var bbbbb = [];
        //            for (var c = 0; c < $scope.PendingByLo.length; c++) {
        //                console.log($scope.PendingByLo[c]);

                      
        //                p_d = p_d +
        //                    '   <div style="margin-top:5px;">' +                         
        //                    '       <div style="font-size:14px;display:inline-block;">' + $scope.PendingByLo[c].tb_n  + '</div>' +
        //                   ' <div style="font-size:14px;display:inline-block;float: right;">'+ $scope.PendingByLo[c].dn +'</div>' +
        //                    '   </div>' +
        //                    '   <div style="margin-top:3px;">' +
        //                    '       <div style="font-size:18px;display:inline-block;">' + $scope.PendingByLo[c].pn +'</div>' +
        //                    '       <div style="font-size: 18px; display: inline-block;float: right">x ' + $scope.PendingByLo[c].q +'</div>' +
        //                    '   </div>' +
        //                    '   <div style="margin-top:2px;border-bottom:solid 1px;">' +
        //                    '       <div style="font-size:14px;font-weight:bolder;">' + $scope.PendingByLo[c].i_c +'</div>' +
        //                    '   </div>';
        //                var bbb = {
        //                    "SysID": $scope.PendingByLo[c].sysID, "cid": $scope.chef_id, "tbid": $scope.PendingByLo[c].tb_id, "u": $scope.PendingByLo[c].u, "pid": $scope.PendingByLo[c].p_id, "q": $scope.PendingByLo[c].q, "sdt": ndt
        //                };
        //                bbbbb.push(bbb);
        //            }
        //            $http.post('./api/viewApi/chef_update01_auto', JSON.stringify(bbbbb)).then(function (responsea) {
        //                $scope.load_item_pending();
        //            }, function (responsea) { });
        //            $scope.pp();
        //        }

        //        //var notification = new Notification('RMS Notification > ' + "HEY", {
        //        //    icon: './logo.png.png',
        //        //    body: "NEW Item ..",
        //        //});
        //        $scope.new_i = 1;
        //        $timeout(function () {
        //            $scope.new_i = 0;
                    
        //        }, 8000);
        //    } else {
        //        console.log("Noooo Item");
        //    }
                
        //    }, function (responsea) { });
 
        //$http.post('./api/viewApi/OngoingByLo', JSON.stringify(bbb)).then(function (responsea) {
        //    $scope.OngoingByLo = responsea.data;
        //   // console.log($scope.OngoingByLo);
        //}, function (responsea) { });
            
    };

     
  //  $scope.load_item_pending();

    //$scope.run = function () {
    //    $timeout(function () {

    //        if (Number($scope.new_load) == 0) {
    //         //   $scope.load_item_pending();
    //           // $window.location.reload(); 
    //        }
    //        $scope.run();
    //    }, 15000);
    //};
    //$scope.run();

    $scope.chef_sel = [];
    //$scope.add_item = function (xx) {
    //    $scope.new_load = 1;
    //    for (var c = 0; c < $scope.cheh_lst.length; c++) {
    //        if (Number($scope.cheh_lst[c].sysID) == Number($scope.chef_id)) {
    //            $scope.chef_n = $scope.cheh_lst[c].dn;
    //        }
    //    }

    //    for (var c = 0; c < $scope.PendingByLo.length; c++) {
    //        if (Number($scope.PendingByLo[c].sysID) == Number(xx.sysID)) {
    //            $scope.PendingByLo[c].sel = 1;
    //        }
    //    }

    //    try { $scope.chef_sel.push(xx); } catch (e) { }

    //    var bbb = {
    //        "SysID": xx.sysID, "cid": $scope.chef_id, "tbid": xx.tb_id, "u": xx.u, "pid": xx.p_id, "q": xx.q, "sdt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss')
    //    };
    //    $http.post('./api/viewApi/chef_update01', JSON.stringify(bbb)).then(function (responsea) {
            
    //    }, function (responsea) { });
        
    //    console.log(xx.sysID);
    //  //  $scope.chef_sel 
    //};

    //$scope.remove_sel = function (a) {


    //    var bbb = {
    //        "SysID": a.sysID, "cid": $scope.chef_id, "tbid": a.tb_id, "u": a.u, "pid": a.p_id, "q": a.q, "sdt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss')
    //    };
    //    $http.post('./api/viewApi/chef_update01R', JSON.stringify(bbb)).then(function (responsea) {

    //    }, function (responsea) { });

    //    for (var c = 0; c < $scope.PendingByLo.length; c++) {
    //        if (Number($scope.PendingByLo[c].sysID) == Number(a.sysID)) {
    //            $scope.PendingByLo[c].sel = 0;
    //        }
    //    }

    //    var index = $scope.chef_sel.indexOf(a);
    //    $scope.chef_sel.splice(index, 1);

    //    if ($scope.chef_sel == '' || $scope.chef_sel == null || $scope.chef_sel.length < 0) {
    //        $scope.close_sel();
    //    }

    //};

    $scope.close_sel = function () {
        $scope.new_load = 0;
        $scope.chef_sel = [];
        $scope.load_item_pending();
    };


    $scope.pending_done = function (a) {
        console.log(a.oT_ID);
        var bb = {
            "SysID": "update [dbo].[order_ticket] set s = 2 where OT_ID = '" + a.oT_ID +"'; exec [dbo].[KOT_onGolst] 0"
        };
        $http.post('./api/MasterApi/sp', JSON.stringify(bb)).then(function (responsea) {
            $scope.new_pen_invLst = responsea.data;
            console.log($scope.new_pen_invLst);

            var bbb = {
                "SysID": "exec [dbo].[KOT_onGolstD] 0"
            };
            $http.post('./api/MasterApi/sp', JSON.stringify(bbb)).then(function (responsea) {
                $scope.new_pen_kots = responsea.data;


                console.log($scope.new_pen_kots);
            }, function (responsea) { });

        }, function (responsea) { });
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

    //$scope.item_done = function (a) {
    //    console.log(a);

    //    var bbb = {
    //        "SysID": a.sysID, "cid": $scope.chef_id, "tbid": a.tb_id, "u": a.u, "pid": a.p_id, "q": a.q, "sdt": $filter('date')(new Date(), 'yyyy/MM/dd HH:mm:ss')
    //    };
    //    $http.post('./api/viewApi/chef_update02', JSON.stringify(bbb)).then(function (responsea) {

    //    }, function (responsea) { });
    //    $scope.new_load = 1;
    //    connection.invoke("SendMessage", "Kitchen", a.pn+" x "+a.q+" Done").catch(function (err) {
    //        return console.error(err.toString());
    //    });
    //    $scope.new_load = 0;
    //    var index = $scope.chef_sel.indexOf(a);
    //    $scope.chef_sel.splice(index, 1);
    //};


    "use strict";

  



    connection.on("ReceiveMessage", function (user, message) {
        if (Number($scope.new_load) == 0) {
            $scope.run_00();
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

 


    $scope.sendOK = function () {
        connection.invoke("SendMessage", "Waiter", $scope.msg).catch(function (err) {
            return console.error(err.toString());
        });

    };
  







});