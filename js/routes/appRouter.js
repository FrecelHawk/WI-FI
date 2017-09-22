/**
 * 路由器
 */
define(['app'], function(app){
    return app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider) {
        $routeProvider
            .when('/index', {
                templateUrl: 'js/views/routerStatus/index.html',
                controller:'terminalCtrl'
            })
            .when('/router',{
                 templateUrl:'js/views/routerStatus/router.html',
                 controller:'routerCtrl'
            })
            .when('/internet',{
                templateUrl:'js/views/routerStatus/internet.html',
                controller:'internetCtrl'
            })
            .when('/wifiSet',{
                templateUrl:'js/views/normalSet/wifi_set.html',
                controller:'wifiSetCtrl'
            })
            .when('/internetSet',{
                templateUrl:'js/views/normalSet/internet_set.html',
                controller:'internetSetCtrl'
            })
            .when('/security',{
                templateUrl:'js/views/normalSet/security.html',
                controller:'securityCtrl'
            })
            .when('/networkSet',{
                templateUrl:'js/views/normalSet/network_set.html',
                controller:'networkSetCtrl'
            })
            .when('/systemStatus',{
                templateUrl:'js/views/normalSet/systemStatus.html',
                controller:'systemStatusCtrl'
            })
            .when('/qos',{
                templateUrl:'js/views/highSet/qos.html',
                controller:'qosCtrl'

            })
            .when('/dhcp',{
                templateUrl:'js/views/highSet/dhcp.html',
                controller:'dhcpCtrl'
            })
            .when('/ddns',{
                templateUrl:'js/views/highSet/ddns.html',
                controller:'ddnsCtrl'
            })
            .when('/portRelay',{
                templateUrl:'js/views/highSet/portRelay.html',
                controller:'portRelayCtrl'
            })
            .when('/vpn',{
                templateUrl:'js/views/highSet/vpn.html',
                controller:'vpnCtrl'
            })
            .when('/other',{
                templateUrl:'js/views/highSet/other.html',
                controller:'otherCtrl'
            })
            .otherwise('/index');

       //$locationProvider.html5Mode(true);
    }])


});