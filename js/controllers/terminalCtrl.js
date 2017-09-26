/**
 * Created by vitamin on 2017/8/25.
 *
 * 用户控制器
 */
define(['app','jquery'], function(app,$){

    return app.controller('terminalCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {


        var device_list = "line_device_list";

        httpService.get(device_list,function (response) {
            console.log(response);
        })

    }])

});