/**
 * Created by vitamin on 2017/8/25.
 *
 * 用户控制器
 */
define(['app','jquery'], function(app,$){

    return app.controller('terminalCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {


        $(document).on('click','.sub-menu-block',function(){
            alert('test');
        });


        var device_list = "line_device_list";

        $.getJSON('data/line_device_list.json','',function(result){
            console.log(result);
            if(result.error==0){
                for(var i=0;i<result.data.length;i++){
                    if(result.data[i].type=="5G")
                           fiveGDevice(result.data[i]);

                    if(result.data[i].type=="2.4G")
                           twoFourGDevice(result.data[i]);

                    if(result.data[i].type=="PC")
                           lineDevice(result.data[i]);
                }

            }
        });


        //有线设备
        function  lineDevice(device){
           var template = "<div class='row line_top_margin'>"
                                        +"<div class='col-md-1'>"
                                        +"<img src='img/shebei.png'>"
                                        +"</div>"
                                        +"<div class='col-md-2'>"
                                             +"<label>"+device.name+"</label>"
                                             +"<label style='color: #999999'>已连接："+timeHandler(device.time)+"</label>"
                                        +"</div>"
                                        +"<div class='col-md-3 col-md-offset-1' style='margin-top: 30px'>"
                                            +"<label>IP地址："+device.ip+"</label>"
                                        +"</div>"
                                        +"<div class='col-md-3' style='margin-top: 30px'>"
                                            +"<label>MAC地址："+device.mac+"</label>"
                                        +"</div>"
                                        +"<div class='col-md-2' style='margin-top: 15px'>"
                                             +"<div class='checkbox checkbox-slider--b-flat checkbox-slider-info'>"
                                             +"<label>"
                                             +"<input type='checkbox' checked=''><span></span>"
                                             +"</label>"
                                             +"</div>"
                                        +"</div>"
                            +"</div>";

           $("#line_device").append(template);

        }

        //2.4G设备
        function twoFourGDevice(device){
           var template =   "<tr>"
                                +"<td>"+device.name+"</td>"
                                +"<td>"+device.ip+"</td>"
                                +"<td>"+device.mac+"</td>"
                                +"<td>"
                                    +"<div class='checkbox checkbox-slider&#45;&#45;b-flat checkbox-slider-info'>"
                                        +"<label>"
                                        +"<input type='checkbox' checked=''><span></span>"
                                        +"</label>"
                                    +"</div>"
                                +"</td>"
                        +"</tr>";
            $("#twoDevice").append(template);
        }

        //5G设备
        function fiveGDevice(device){
            var template =   "<tr>"
                +"<td>"+device.name+"</td>"
                +"<td>"+device.ip+"</td>"
                +"<td>"+device.mac+"</td>"
                +"<td>"
                +"<div class='checkbox checkbox-slider&#45;&#45;b-flat checkbox-slider-info'>"
                +"<label>"
                +"<input type='checkbox' checked=''><span></span>"
                +"</label>"
                +"</div>"
                +"</td>"
                +"</tr>";
            $("#fiveDevice").append(template);

        }


        //时间处理
        function timeHandler(time){
            var  day_txt = "天";
            var  hour_txt = "时";
            var  minute_txt="分";
            var  second_txt = "秒";


           //计算分
           if(parseInt(time/60)>=0&&time/3600<1){
               var min = parseInt(time/60)+day_txt+time%60+"秒";
               return min;
           }

           //计算时
           if(parseInt(time/3600)>0&&time/(3600*24)<1){
               var hour = parseInt(time/3600)+hour_txt+parseInt(time/60%60)+minute_txt+time%60+second_txt;
               return hour;
           }

           if(parseInt(time/(3600*24))>0){
               var day = parseInt(time/(3600*24))+day_txt+parseInt(time/3600%24)+hour_txt+parseInt(time/60%60)+minute_txt+time%60+second_txt;
               return day;
           }

        }

    }])

});