/**
 * Created by vitamin on 2017/8/25.
 *
 * 局域网设置控制器
 */
define(['app','jquery'], function(app,$){

    return app.controller('networkSetCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {

       $scope.mask = "225.255.255.0" ;
       $scope.enable = 1;

       $scope.saveDHCP = function(){
           var data = { "fname": "system", "opt": "dhcpd", "function": "set","mask":$scope.mask, "start": $scope.start, "end": $scope.end, "enable":  $scope.enable }
           console.log(data);
       };


       $scope.saveGateway = function(){
           var data =  { "fname": "system", "opt": "dhcpd_ip", "function": "set","ip": $scope.ip};
           console.log(data);
       };

       $.getJSON('data/networkSet.json','',function(response){
              $scope.mask = response.mask;
              $scope.ip = response.ip;
              $scope.enable = response.enable;
              splitStart(response.start);
              splitEnd(response.end);
       });


       function  splitStart(value){
          var first = value.substring(0,value.lastIndexOf('.'));
          var second = value.substring(value.lastIndexOf('.')+1,value.length);
          $('#start_value').text(first);
          $scope.start = second;

       }

       function splitEnd(value){
           var first = value.substring(0,value.lastIndexOf('.'));
           var second = value.substring(value.lastIndexOf('.')+1,value.length);
           $('#end_value').text(first);
           $scope.end = second;
       }

    }])

});
