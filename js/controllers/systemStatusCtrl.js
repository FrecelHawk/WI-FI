/**
 * Created by vitamin on 2017/8/25.
 *
 * 系统状态控制器
 */
define(['app','jquery'], function(app,$){

    return app.controller('systemStatusCtrl', ['$scope','$rootScope','httpService',function ($scope,$rootScope,httpService) {
        $('.navbar-nav-txt').each(function(){
            if($(this).text()=='路由状态'){
                $(this).addClass('navbar-nav-txt-active');
            }else{
                $(this).removeClass('navbar-nav-txt-active');
            }
        });

    }])

});
