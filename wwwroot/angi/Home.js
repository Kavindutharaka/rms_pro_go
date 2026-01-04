var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {

    console.log("dasdas HI");
    $scope.dn = localStorage.getItem("dn");
    $scope.ul = localStorage.getItem("ul");
    console.log($scope.un);
    if (angular.isUndefined($scope.dn) || $scope.dn == "" || $scope.dn == null) {
      $window.location.href = './login.html'; 
    } 

    console.log($window.innerHeight);
    var h = Number($window.innerHeight) - 81;
    document.getElementById("ifem").setAttribute("style", "height:" + h +"px; width:100%; boder:none;");
   // 

    //var objs = {
    //    "SysID": 0, "sp": "[dbo].[db_01]", "pm": "0"
    //};


    //$http.post('./api/DBApiCon/sp', JSON.stringify(objs)).then(function (responsea) {

    //    $scope.db_01 = responsea.data;
    //    console.log($scope.db_01);     

    //}, function (responsea) { });

    //var bbb = {
    //    "SysID": 0, "sp": "[dbo].[db_02]", "pm": "0"
    //};
     
    $scope.go = function () {
        $window.location.href = '../Home/';
    };
    $scope.exit = function () {
        localStorage.setItem("dn", "");
        localStorage.setItem("uid", 0);
        localStorage.setItem("ul", 0);
        $window.location.href = './login.html';
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
            notification.onclick = function () {
                window.open('https://phppot.com');
            };
    };
    //function createNotification() {
    //    var notification = new Notification('Web Push Notification', {
    //        icon: 'https://phppot.com/badge.png',
    //        body: 'New article published!',
    //    });
    //    // url that needs to be opened on clicking the notification
    //    // finally everything boils down to click and visits right
    //    notification.onclick = function () {
    //        window.open('https://phppot.com');
    //    };
    //}




    "use strict";

    var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();



    connection.on("ReceiveMessage", function (user, message) {

        console.log(user + " > " + message);
        var notification = new Notification('RMS Notification > ' + user, {
            icon: '../ico.ico',
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
        connection.invoke("SendMessage", "Chasier", $scope.msg).catch(function (err) {
            return console.error(err.toString());
        });

    };

    $scope.go_to = function (a) { $scope.dt = $filter('date')(new Date(), 'HHmmss'); $scope.currentProjectUrl = a + ".html?t=" + $scope.dt; };
    $scope.currentProjectUrl =  "./admin/admin.html"; 

});