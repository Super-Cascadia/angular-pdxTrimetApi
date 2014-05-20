'use strict';
angular.module('pdxTrimetApi', ['$http', '$q'])
    .factory('trimet', function ($http, $q) {
        // Service logic
        var trimetAppId = "F3757A12A14F88550C14A9A2B";
        var baseUrl = 'http://developer.trimet.org/ws/V1/';
        var trimetURL;

        function getArrivalsForStreetCar(stop) {
            var locID = stop.locid,
                deferred = $q.defer();
            trimetURL = baseUrl + 'arrivals/json/true/streetcar/true/locIDs/' + locID + '/appID/' + trimetAppId;
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

        function getStopsAroundLocation(lat, lng, radiusFeet, success, error) {
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

        // Public API here
        return {
            getStopsAroundLocation: function (lat, lng, radiusFeet, success, error) {
                return getStopsAroundLocation(lat, lng, radiusFeet, success, error);
            },
            getArrivalsForStop: function (stop) {
                return getArrivalsForStreetCar(stop);
            },
            rail: {
                getRoutes: function () {
                    return getTrimetRoutes();
                }
            },
            streetcar: {
                getRoutes: function () {
                    return getStreetcarRoutes();
                }
            },
            bus: {
                getRoutes: function () {
                    return getTrimetRoutes();
                }
            }
        };
    });
