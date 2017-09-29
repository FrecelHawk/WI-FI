/**
 * Created by vitamin on 2017/8/25.
 *
 * 互联网控制器
 */
define(['app','jquery'], function(app,$){

    return app.controller('internetCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {




        $scope.add = function(){
            $("#userDialog").dialog("open");
        };


        $scope.auto = function(){
            $('#autoDialog').dialog("open");
        };



        $.getJSON('data/internet.json','',function(result){
            if(result.error=="0"){

                $scope.$apply(function () {
                    $scope.gw = result.gw;
                    $scope.ip = result.ip;
                    $scope.dns = result.dns;
                    $scope.mode = swtichMode(result.mode);
                    $scope.cur_speed = parseFloat(result.cur_speed/1024/1024).toFixed(2);
                    $scope.up_speed = parseFloat(result.up_speed/1024/1024).toFixed(2);
                    $scope.test = 'test';
                });
            }
        });


        function swtichMode(name){
            var str = "DHCP";
            switch (name){
                case 1: str="DHCP";break;
                case 2: str="PPOE";break;
                case 3: str="STATIC"; break;
                case 4: str="无线中继"; break;
            }
            return str;
        }
/*
        $("#userDialog").dialog({
            autoOpen: false,
            modal: true,
            width:350
        });

        $("#autoDialog").dialog({
            autoOpen: false,
            modal: true,
            width:350
        });


        function add() {
            $("#userDialog").dialog("open");
        }

        function auto(){
            $('#autoDialog').dialog("open");
        }
*/




    }])

});
