'use strict';
angular.module('pdxTrimetApi')
    .factory('trimet', function ($http) {
        // Service logic
        var trimetAppId = "F3757A12A14F88550C14A9A2B";
        var baseUrl = 'http://developer.trimet.org/ws/V1/';
        var trimetURL;

        function getArrivals(stop, success, error) {
            var locID = stop.locid;
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
                    success(data);
                }).
                error(function (data, status, headers, config) {
                    error(data);
                });
        }

        function getTrimetRoutes(success, error) {
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
                    success(data);
                }).
                error(function (data, status, headers, config) {
                    error();
                });
        }

        function getStreetcarRoutes(success, error) {
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
                    success(data);
                }).
                error(function (data, status, headers, config) {
                    error();
                });
        }

        function getStopsAroundLocation(lat, lng, radiusFeet, success, error) {
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
                    success(data);
                }).
                error(function (data, status, headers, config) {
                    error();
                });
        }

        // Public API here
        return {
            getStopsAroundLocation: function (lat, lng, radiusFeet, success, error) {
                getStopsAroundLocation(lat, lng, radiusFeet, success, error);
            },
            getArrivalsForStop: function (stop, success, error) {
                return getArrivals(stop, success, error);
            },
            rail: {
                getRoutes: function (success, error) {
                    return getTrimetRoutes(success, error);
                }
            },
            streetcar: {
                getRoutes: function (success, error) {
                    return getStreetcarRoutes(success, error);
                }
            },
            bus: {
                getRoutes: function (success, error) {
                    return getTrimetRoutes(success, error);
                }
            }
        };
    });
