/**
 * Created by vitamin on 2017/8/25.
 *
 * 安全中心控制器
 */
define(['app','jquery'], function(app,$){

    return app.controller('securityCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {

        $(function(){
            $("#manualDialog").dialog({
                autoOpen: false,
                modal: true,
                width:350
            });

        });

        $(function(){
            $('#onlineDialog').dialog({
                autoOpen:false,
                modal:true,
                width:600,
                height:500
            });
        });

       $scope.manager = {};
       $scope.manual = {};

        $scope.savePwd = function(){
            var data =  { "fname": "system", "opt": "login_account", "function": "set", "usrid": $scope.manager.newPwd};
        };

        $scope.saveManula = function(){
             var data =  { "fname": "system", "opt": "access_list", "function": "set", "name_list":$scope.manual.deviceName,"mac_list": $scope.manual.mac,"act":"add","access":"REJECT" };
             console.log(data);
        };

        $scope.manual = function(){

            $('#manualDialog').dialog('open');
        };


        $scope.onlineList = function(){

            $('#onlineDialog').dialog('open');
        };


        $.getJSON('data/blacklist.json','',function(response){
            $('#black_list tbody').remove('tr');
            for(var i=0;i<response.mac_list.length;i++){
                appendBlackList(response.mac_list[i]);
            }

            $.getJSON('data/line_device_list.json','',function(ret){

                $('#onlineList tbody').remove('tr');


/*                    for(var i=0;i<ret.data.length;i++)
                          if(response.mac_list.indexOf(ret.data[i])==-1)
                                         list.push(ret.data[i]);

                    for(var i=0;i<list.length;i++)
                             appendOnlineList(list[i]);*/

              var boxList = response.mac_list.concat(ret.data);
               var list = unique(boxList);

               for(var i=0;i<list.length;i++)
                     appendOnlineList(list[i]);

            });

        });



        function unique(data){
            var result = [];
            for(var i=0;i<data.length;i++){
                var flag = true;
                for(var j = i;j<data.length-1;j++){
                    if(data[i].mac==data[j+1].mac){
                        flag = false;
                        break;
                    }
                }
                if(flag){
                    result.push(data[i]);
                }
            }

            return result;
        };




        function appendBlackList(obj){

            var template = "<tr>"+
                              "<td>"+obj.name+"</td>"+
                              "<td>"+obj.mac+"</td>"+
                              "<td>"+
                                "<div class='form-group'>"+
                                   "<span class='my-btn my-btn-primary' style='width: 60px; margin-top: 10px;' >删除</span>"+
                                "</div>"+
                              "</td>"+
                            "</tr>";

            $('#black_list tbody').append(template);
        }


        function appendOnlineList(obj){


            var template = "<tr>"+
                "<td>"+obj.name+"</td>"+
                "<td>"+obj.mac+"</td>"+
                "<td>"+
                "<div class='form-group'>"+
                   "<input type='checkbox' name='box' value='"+obj.mac+"' >"+
                "</div>"+
                "</td>"+
                "</tr>";

            $('#onlineList tbody').append(template);
        }




    }]);

});