/*global angular,console,canvg*/
(function () {
    'use strict';

    var app = angular.module("app", ["angularplasmid"]);

    app.controller('MainCtrl', ['$timeout', '$scope', function ($timeout, $scope) {

        var isZoomed, timer, markers;

        markers = [
            {start : 50, end : 80, color : 'rgba(170,0,85,0.6)', colorband : 'rgba(255,221,238,0.4)'},
            {start : 120, end : 190, color : 'rgba(85,0,170,0.6)', colorband : 'rgba(238,221,255,0.4)'},
            {start : 200, end : 230, color : 'rgba(0,85,170,0.6)', colorband : 'rgba(221,238,255,0.4)'},
            {start : 260, end : 300, color : 'rgba(85,170,0,0.6)', colorband : 'rgba(238,255,221,0.4)'},
            {start : 305, end : 315, color : 'rgba(170,85,0,0.6)', colorband : 'rgba(255,238,221,0.4)'}
        ];

        $scope.mlines = [
            {start : 25, label : 'HindIII'},
            {start : 40, label : 'AcoII'},
            {start : 90, label : 'Aval'},
            {start : 125, label : 'BanII'},
            {start : 225, label : 'Ncol'},
            {start : 325, label : 'MSIV'},
            {start : 340, label : 'StyI'}
        ];

        $scope.mstart = 0;

        $scope.markers = markers;

        $scope.start = function () {
            var plength = $scope.l;
            angular.forEach($scope.markers, function (val) {
                val.start += 1;
                if (val.start > plength) { val.start -= plength; }

                val.end += 1;
                if (val.end > plength) { val.end -= plength; }

            });

            angular.forEach($scope.mlines, function (val) {
                val.start += 0.5;
                if (val.start > plength) { val.start -= plength; }
            });

            timer = $timeout($scope.start, 50);
        };

        $scope.stop = function () {
            $timeout.cancel(timer);
        };

        $scope.clicked = function (item, marker, event) {
            console.log(item, marker, event);
            var plasmid = angular.element(document.getElementById("p1"));
            if (!isZoomed) {
                plasmid.css("-webkit-transform", "scale(2)");
                isZoomed = true;
            } else {
                plasmid.css("-webkit-transform", "scale(1)");
                isZoomed = false;
            }
        };

        $scope.save = function () {
            var canvas, img, imglink,
                svg = document.getElementById('p1');

            canvg(document.getElementById('canvas'), svg.outerHTML);
            canvas = document.getElementById("canvas");
            img = canvas.toDataURL("image/png");
            imglink = angular.element(document.getElementById('imglink'));
            imglink.attr("href", img);
            imglink.html("Click to see saved image");
        };
    }]);

    function myClicked(marker) {
        console.log(marker);
    }
}());