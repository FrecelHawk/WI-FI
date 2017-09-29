/**
 * Created by vitamin on 2017/8/25.
 *
 * 系统状态控制器
 */
define(['app','jquery'], function(app,$){


    return app.controller('systemStatusCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {

        var languages = [{key:'中文',val:'zh'},{key:'英语',val:'en'},{key:'de',val:'德语'},{key:'ja',val:'日语'}];

        $(function(){
            $("#autoDialog").dialog({
                autoOpen: false,
                modal: true,
                width:350
            });

        });


        $scope.saveTimeZone = function(){
            var data =  { "fname": "system", "opt": "ntp", "function": "set", "ntp_address": $scope.ntp,"ntp_zone":$scope.timeZoon };
            console.log(data);

        };

        $('#timeZoon a').click(function(){
             $scope.timeZoon = $(this).attr('value');
             console.log(data);
        });


        $scope.recover = function(){
            var data =  { "fname": "system", "opt": "setting", "function": "set", "action": "default" };
            console.log(data);
        };

        $scope.changeTimeZone = function(){
           $('#autoDialog').dialog('open');
        };



        //访问 加密
        $("#language_select a").click(function(){

            $scope.language= $(this).attr('ng-value');
            var data =  { "fname": "system", "opt": "language_", "function": "set","language_":$scope.language};
            console.log(data);
        });







        //下拉效果
        $('.dropdown-content a').click(function(){
            $(this).parent().hide();
            $(this).parents('.dropdown').find('.dropbtn .text').html($(this).text());

        });

        //下拉滑过的效果
        $('.dropbtn').hover(function(){
            $(this).parents('.dropdown').find(".dropdown-content").show();
        },function(){
            //$(this).parents('.dropdown').find(".dropdown-content").hide();
        });




    }])

});
