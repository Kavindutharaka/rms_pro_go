var app = angular.module('RMSApp', []);
app.controller('HomeCtrl', function ($scope, $http, $filter, $rootScope, $window, $timeout) {
    console.log("dasdsadasd");


    function getPath() {
        var path = window.location.href;
        return path.substring(0, path.lastIndexOf("/"));
    }
  
    $scope.pp = function () {
        var config = getUpdatedConfig();
        var opts = getUpdatedOptions(true);
        var data = [{
            type: 'pixel',
            format: 'image',
            flavor: 'file',
            data: 'assets/img/image_sample.png' // Path to your image file
        }];

       

        var printData = [
            {
                type: 'pixel',
                format: 'html',
                flavor: 'plain',
                data: '<html>' +
                    '<body>' +
                    '        <h4>Adoo Bawwaa</h4>' +
                    '        <h4>Adoo Bawwaa</h4>' +
                    '        <h4>Adoo Bawwaa</h4>' +
                    '        <h4>Adoo Bawwaa</h4>' +
                    '        <h4>Adoo Bawwaa</h4>' +
                    '        <h4>Adoo Bawwaa</h4>' +
                    '        <h4>Adoo Bawwaa</h4>' +
                    '</html>',
                options: opts
            }
        ];

        qz.print(config, printData).catch();

    };
   

    var pn = 'POS-80Ca';
    
    setPrinter(pn);


});