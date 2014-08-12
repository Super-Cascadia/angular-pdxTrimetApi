angular.module('pdxTrimet.api', ['ngResource'])

    .factory('trimet', function ($http, $q) {
        'use strict';

        // Service logic
        var trimetAppId = "F3757A12A14F88550C14A9A2B";
        var baseUrl = 'http://developer.trimet.org/ws/V1/';
        var trimetURL;

        function getArrivalsForStreetCar(locid) {
            var deferred = $q.defer();
            trimetURL = baseUrl + 'arrivals/json/true/locIDs/' + locid + '/appID/' + trimetAppId;
            $http({
                method: 'GET',
                url: trimetURL,
                responseType: 'xml',
                headers: {
                    'Accept': 'application/xml, text/xml, */*; q=0.01'
                }
            }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function getTrimetRoutes() {
            var deferred = $q.defer();
            trimetURL = baseUrl + 'routeConfig/json/true/routes/100,200,90,190/stops/tp/dir/appID/' + trimetAppId;
            $http({
                method: 'GET',
                url: trimetURL,
                responseType: 'xml',
                headers: {
                    'Accept': 'application/xml, text/xml, */*; q=0.01'
                }
            }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function getAllBusRoutes() {
            var deferred = $q.defer();
            var routeNumbers = [
                1,4,6,8,9,10,11,12,14,15,16,17,18,19,20,21,22,23,24,25,28,29,30,31,32,33,34,35,36,37,38,39,43,44,45,46,47,48,50,51,52,53,54,55,56,57,58,59,61,62,63,64,65,66,67,68,70,71,72,75,76,77,78,79,80,81,83,84,85,87,88,92,93,94,96,99,152,154,155,156
            ];
            trimetURL = baseUrl + 'routeConfig/json/true/routes/' + routeNumbers + '/stops/tp/dir/true/appID/' + trimetAppId;
            $http({
                method: 'GET',
                url: trimetURL,
                responseType: 'xml',
                headers: {
                    'Accept': 'application/xml, text/xml, */*; q=0.01'
                }
            }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function getStreetcarRoutes() {
            var deferred = $q.defer();
            trimetURL = baseUrl + 'routeConfig/json/true/routes/193,194/stops/tp/dir/appID/' + trimetAppId;
            $http({
                method: 'GET',
                url: trimetURL,
                responseType: 'xml',
                headers: {
                    'Accept': 'application/xml, text/xml, */*; q=0.01'
                }
            }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function getStopsAroundLocation(lat, lng, radiusFeet) {
            var deferred = $q.defer();
            var latLng = lat + ',' + lng;
            trimetURL = baseUrl + 'stops/json/true/showRoutes/true/showRouteDirs/true/ll/' + latLng + '/feet/' + radiusFeet + '/appID/' + trimetAppId;
            $http({
                method: 'GET',
                url: trimetURL,
                responseType: 'xml',
                headers: {
                    'Accept': 'application/xml, text/xml, */*; q=0.01'
                }
            }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        function getStops (routeId) {
            var deferred = $q.defer();
            trimetURL = baseUrl + 'routeConfig/json/true/routes/'+ routeId +'/stops/tp/dir/appID/' + trimetAppId;
            $http({
                method: 'GET',
                url: trimetURL,
                responseType: 'xml',
                headers: {
                    'Accept': 'application/xml, text/xml, */*; q=0.01'
                }
            }).
                success(function (data, status, headers, config) {
                    deferred.resolve(data);
                }).
                error(function (data, status, headers, config) {
                    deferred.reject(data);
                });
            return deferred.promise;
        }

        // Public API here
        return {
            getStopsAroundLocation: getStopsAroundLocation,
            getArrivalsForStop: function (stop) {
                return getArrivalsForStreetCar(stop);
            },
            rail: {
                getRoutes: getTrimetRoutes
            },
            streetcar: {
                getRoutes: getStreetcarRoutes
            },
            bus: {
                getRoutes: getAllBusRoutes
            },
            getStops: getStops
        };
    });
