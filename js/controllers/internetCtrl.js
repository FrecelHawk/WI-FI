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
