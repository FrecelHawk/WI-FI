/**
 * Created by vitamin on 2017/8/25.
 * 数据请求服务
 */
define(['app','jquery'], function(app,$){

    return  app.service('httpService',['$http',function($http){


        var config = {
            headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
               },

              withCredentials:true,
              corssDomain:true
            };

        var domain = localStorage.getItem('domain');


        this.get = function(url){

            return  $http.get(domain+url,config);
        };

        this.post = function(url,data){
              return  $http.post(domain+url,$.param(data),config);
        };

        this.put = function(url,data){
              return $http.put(domain+url,$.param(data),config);
        };

        this.delete = function(url){
             return $http.delete(domain+url,config);
        }

    }]);


});