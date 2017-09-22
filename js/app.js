/**
 * 初始化MODULE绑定
 */
define(['angular'], function (angular) {
    var app = angular.module('webapp', ['ngRoute', 'angular-md5']);
    return app;
});
