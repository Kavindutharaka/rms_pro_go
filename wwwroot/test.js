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
            data: 'log_80.png' // Path to your image file
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

        qz.print(config, data).catch();

    };

    $scope.print_new = function () {
        var config = getUpdatedConfig();
        var opts = getUpdatedOptions(true);
        var imageData = [{
            type: 'raw',
            format: 'image',
            data: './log_80.png', // Path to your image file
            options: { language: "ESCPOS" } // Or your printer's specific language
        }];

        // Data for printing the text
        var textData = [
         //   '\\x1B' + '\\x40', // Initialize printer (ESCPOS command)
         //  '\\x1B' + '\\x61' + '\\x31', // Center align text (ESCPOS command)
            'Your Company Name' + '\\x0A', // Text with line break
            '123 Main Street' + '\\x0A',
            'Anytown, USA 12345' + '\\x0A',
            '\\x0A', // Line break
            '\\x1B' + '\\x61' + '\\x30', // Left align text (ESCPOS command)
            'Item Description Qty Price' + '\\x0A',
            '-----------------------------------' + '\\x0A',
            'Product A           1    $10.00' + '\\x0A',
            'Product B           2    $5.00' + '\\x0A',
            '\\x0A',
            'Total: $20.00' + '\\x0A     GS V 0'
        ];

        // Combine and print the image and text
        qz.print(config, imageData)
            .then(function () {
                // After printing the image, print the text
                return qz.print(config, textData);
            })
            .catch(function (e) {
                console.error(e);
            });
    };
   

    var pn = 'XP-80C';
    
    setPrinter(pn);


});