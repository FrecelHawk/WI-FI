/**
 * Created by vitamin on 2017/8/25.
 *
 * 上网设置控制器
 */
define(['app','jquery'], function(app,$){

    return app.controller('internetSetCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {



        $scope.static = {};
        $scope.pppoe = {};


        $.getJSON('data/internetSet.json','',function(response){


            $scope.type = getModeValue(response.mode) ;
            $scope.dns = response.dns;
            $scope.ip  = response.ip;
            $scope.mask = response.mask;


            $('#type_select_txt').text($scope.type);
            handleType(response.mode);

        });




        $scope.apply = function(){


            var txt = $('#type_select_txt').text();
            if(txt=="PPPOE拨号") sendPppoe();

            if(txt=="静态IP") sendStatic();

            if(txt=="DHCP") sendDhcp();

        };





        $('#type_select a').click(function(){

            var type = $(this).attr('ng-value');
             handleType(type);

        });


        function handleType(val){
            if(val==1) dhcp();

            if(val==2) pppoe();

            if(val==3) static();

        }


        function pppoe(){
             $('.pppoe_set').show();
             $('.static_set').hide();
        }

        function sendPppoe(){
            var data = { "fname": "net", "opt": "wan_conf", "function": "set", user:$scope.pppoe.user,passwd:$scope.pppoe.pwd,mode:2};
            console.log(data);

        }

        function sendStatic() {
           var data = { "fname": "net", "opt": "wan_conf", "function": "set",ip:$scope.static.ip,gw:$scope.static.gateway,mask:$scope.static.mask,mode:3};
           console.log(data);
        }

        function sendDhcp(){
            var data = { "fname": "net", "opt": "wan_conf", "function": "set", mode:1 };
            console.log(data);
        }

        function static(){
            $('.pppoe_set').hide();
            $('.static_set').show();
        }

        function  dhcp(){
            $('.pppoe_set').hide();
            $('.static_set').hide();
        }


        function getModeValue(value){
            var str = 'DHCP';
            if(value==2) str = 'PPPOE拨号';
            if(value==3) str = '静态IP';

            return str;
        }

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