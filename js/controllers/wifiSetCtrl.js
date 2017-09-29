/**
 * Created by vitamin on 2017/8/25.
 *
 * WIFI设置 控制器
 */
define(['app','jquery'], function(app,$){

    return app.controller('wifiSetCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {

        $scope.wifi = {};
        $scope.visit = {};
        $scope.fiveG = {};
        $scope.wifi.encrypt = 0;
        $scope.wifi.infoValue = 0;
        $scope.wifi.channel = "HT20";
        $scope.wifi.intensity = 30;
        $scope.fiveG.infoValue = 1;
        $scope.fiveG.encrypt =0;



        $scope.isChecked = function(value){
           return value==0?false:true;
        };

        $scope.start = function(){
           console.log($scope);
           var data = {fname:"net",opt:"wifi_ap",function:"set",ssid:$scope.wifi.name,security:$scope.wifi.encrypt,
                        passwd:$scope.wifi.pwd,hidden:$scope.wifi.hidden,ssid1:$scope.visit.name,security1:$scope.visit.encrypt,
                        passwd1:$scope.visit.pwd,hidden1:'',txrate:$scope.wifi.intensity,channel:$scope.wifi.channel,bw:$scope.wifi.intensity};

           console.log(data);
            fetch('http://localhost:3000/tasks', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(function(response) {
                return response.json()
            }).then(function(json) {
                console.log('parsed json: ', json)
            }).catch(function(ex) {
                console.log('parsing failed: ', ex)
            });

        };


        $.getJSON('/data/wifiset.json','',function(response){
            console.log(response);
            $scope.$apply(function(){
                $scope.wifi.name = response.ssid;
                $scope.wifi.pwd = response.passwd;
                $scope.wifi.channel = response.channel;
                $scope.wifi.security = response.security;
                $scope.wifi.bw = response.bw;
                $scope.wifi.hidden = response.hidden;
                $scope.wifi.intensity = response.txrate;
                $scope.visit.name = response.ssid1;
                $scope.visit.pwd = response.passwd1;
                $scope.visit.security1 = response.security1;

            });

            wifiEncrypt();
            wifiChannel();
            wifiWB();
            wifiIntensity();
            visitEncrypt();

        });




        function wifiEncrypt(){
            $('#wifi_select_encrypt').text(resolveEncrypt($scope.wifi.security));
        }


        function wifiChannel(){
            $('#wifi_channel_select').text($scope.wifi.channel);
        }


        function wifiWB(){
            $('#wifi_select_bw').text(resolveBW($scope.wifi.bw));
        }


        function wifiIntensity(){
            $('#wifi_select_intensity').text(resolveIntensity($scope.wifi.intensity));
        }

        function visitEncrypt(){
            $('#visit_select_encrypt').text(resolveEncrypt($scope.visit.security1));
        }

        function wifiHidden(){
            $('')
        }


        function resolveEncrypt(value){

            var str = "无加密（允许所有人连接）";
            if(value=="psk2")
                 str = "强加密（WPA2个人版）";
            if(value=="psk-mixed")
                 str = "混合加密（WPA/WPA2个人版）";
            return str;
        }


        function resolveBW(value){
            var str = "";
            if(value=="HT20")
                str="20MHZ";
            if(value=="HT40")
                str="40MHZ";
            return str;
        }

        function resolveIntensity(value){
            var str = "健康模式";
            if(value==60)
                str = "标准模式";
            if(value==100)
                 str = "穿墙模式";
            return str;
        }

/*
        fetch('http://localhost:3000/tasks', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "done": true
            })
        }).then(function(response) {
            return response.json()
        }).then(function(json) {
            console.log('parsed json: ', json)
        }).catch(function(ex) {
            console.log('parsing failed: ', ex)
        });
*/

        //wifi 加密
        $('#wifi_encrypt a').click(function(){
           // alert($(this).attr('ng-value'));
            $scope.wifi.encrypt = $(this).attr('ng-value');
        });

        //wifi 信号
        $('#wifi_info a').click(function(){
            $scope.wifi.infoValue = $(this).attr('ng-value');
        });


        //wifi 带宽
        $('#wifi_channel a').click(function(){
            $scope.wifi.bw = $(this).attr('ng-value');
        });


        //wifi 信号强度
        $('#wifi_intensity a').click(function(){
             $scope.wifi.intensity = $(this).attr('ng-value');
        });


        //5G 无线信号
        $('#wifi_5g_info a').click(function(){
            $scope.fiveG.infoValue = $(this).attr('ng-value');
        });

        //5G 强度
        $('#wifi_5g_intensity a').click(function(){
            $scope.fiveG.intensity = $(this).attr('ng-value');
        });


        //访问 加密
        $("#visit_encrypt a").click(function(){

             $scope.fiveG.encrypt = $(this).attr('ng-value');
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