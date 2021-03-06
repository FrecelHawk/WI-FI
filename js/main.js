
/**
 * JS配置加载入口
 */
require.config({
    baseUrl: "",
    paths: {
        "jquery": "plugs/jquery/jquery.min",
        "jquery-ui":"plugs/jquery-ui/jquery-ui.min",
        "jquery-cookie":"plugs/jquery-cookie/jquery.cookie",
        "bootstrap":"plugs/bootstrap/bootstrap.min",
        "highcharts":"plugs/highcharts/highcharts",
        "exporting":"plugs/highcharts/modules/exporting",
        "common":"js/commons/common",

        "angular":"plugs/angular/angular.min",
        "angular-route":"plugs/angular/angular-route.min",
        "angular-sanitize":"plugs/angular/angular-sanitize.min",
        "angular-md5":"plugs/angular/angular-md5",

        "app":"js/app",
        "httpService":"js/services/HttpService",
        "terminalCtrl":"js/controllers/terminalCtrl",
        "routerCtrl":"js/controllers/routerCtrl",
        "internetCtrl":"js/controllers/internetCtrl",
        "wifiSetCtrl":"js/controllers/wifiSetCtrl",
        "internetSetCtrl":"js/controllers/internetSetCtrl",
        "securityCtrl":"js/controllers/securityCtrl",
        "networkSetCtrl":"js/controllers/networkSetCtrl",
        "systemStatusCtrl":"js/controllers/systemStatusCtrl",
        "qosCtrl":"js/controllers/qosCtrl",
        "dhcpCtrl":"js/controllers/dhcpCtrl",
        "ddnsCtrl":"js/controllers/ddnsCtrl",
        "portRelayCtrl":"js/controllers/portRelayCtrl",
        "vpnCtrl":"js/controllers/vpnCtrl",
        "otherCtrl":"js/controllers/otherCtrl",

        "router":"js/routes/appRouter"

    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route':{
            deps: ["angular"],
            exports: 'angular-route'
        },
        'angular-sanitize':{
            deps: ["angular"],
            exports: 'angular-sanitize'
        },
        'angular-md5':{
            deps: ["angular"],
            exports: 'angular-md5'
        },
        'bootstrap':{
            deps:['jquery'],
            exports:'bootstrap'
        },
        'highcharts':{
            deps:['jquery'],
            exports:'highcharts'
        },
        'exporting':{
            deps:['jquery','highcharts'],
            exports:'exporting'
        },
        'jquery-cookie':{
            deps:['jquery'],
            exports:'jquery-cookie'
        }


    }
});


require(['jquery', 'angular', 'angular-md5', 'jquery-ui','jquery-cookie', 'bootstrap','common', 'highcharts', 'exporting', 'angular-route', 'angular-sanitize', 'app', 'httpService', 'terminalCtrl', 'routerCtrl', 'internetCtrl', 'wifiSetCtrl', 'internetSetCtrl', 'securityCtrl', 'networkSetCtrl', 'systemStatusCtrl','qosCtrl','dhcpCtrl','ddnsCtrl','portRelayCtrl','vpnCtrl','otherCtrl', 'router'], function ($, angular) {

    $(function () {
        var domain = "http://127.0.0.1:8999/data/";
        var devices_set = [
            {name:"终端设备",url:"#/index"},
            {name:"路由器",url:"#/router"},
            {name:"互联网",url:"#/internet"},
            {name:"WIFI设置",url:"#/wifiSet"},
            {name:"上网设置",url:"#/internetSet"},
            {name:"安全中心",url:"#/security"},
            {name:"局域网设置",url:"#/networkSet"},
            {name:"系统状态",url:"#/systemStatus"},
            {name:"QOS智能限速",url:"#/qos"},
            {name:"DHCP静态IP分配",url:"#/dhcp"},
            {name:"DDNS",url:"#/ddns"},
            {name:"端口转发",url:"#/portRelay"},
            {name:"VPN",url:"#/vpn"},
            {name:"其他",url:"#/other"}


        ];
        var navivations = [{name:'路由状态',url:'#/index'},{name:'常用设置',url:'#/wifiSet'},{name:'高级设置',url:'#/qos'}];

        var url = "http://192.168.11.1/cgi-bin/router.csp?";

        localStorage.setItem('domain',domain);
        angular.bootstrap(document, ["webapp"]);
        $('.sub-menu-block').click(function(){
            alert($(this).find('.sub-menu-title-txt').text());
        });

         $(document).on('click','.sub-menu-block',function(){

              for(var i=0;i<devices_set.length;i++){
                   if(devices_set[i].name==$(this).find('.sub-menu-title-txt').text())
                       window.location.assign(devices_set[i].url);

              }
         });

         $(document).on('click','#menu li',function(){
               $('#menu li a').removeClass('navbar-nav-txt-active');
               $(this).find('a').addClass('navbar-nav-txt-active');
               for(var i=0;i<navivations.length;i++)
                    if(navivations[i].name==$(this).text())
                        window.location.assign(navivations[i].url);


         });


         $(document).on('click','#profile li',function(){

             if($(this).text()=="系统升级") upgrade();

             if($(this).text()=="下载客户端") downloadClient();

             if($(this).text()=="重启") reboot();

             if($(this).text()=="注销") loginout();

         });



         //升级
        function  upgrade(){

            var data = {fname:"system",opt:"local_firmup",function:"set"};
            layer.alert('路由器升级', {
                skin: 'layui-layer-lan'
                ,closeBtn: 2
                ,anim: 1 //动画类型
            },function(){
                $.ajax({
                    type: "POST",
                    xhrFields: {withCredentials: true},
                    url: url + $.param(data),
                    success: function (data) {
                        var ret = JSON.parse(data);
                        if(ret.error==0){
                        }else{
                        }
                    }, complete: function (XHR, TS) {
                        XHR = null;
                    }, error: function (XHRequest, status, data) {
                        console.log(status);
                    }
                });
                layer.closeAll();
            });
        }


        //下载客户端
        function downloadClient(){
            layer.alert('下载客户端', {
                skin: 'layui-layer-lan'
                ,closeBtn: 2
                ,anim: 1 //动画类型
            },function(){
                layer.closeAll();
            });
        }

        //重新启动
        function reboot(){
            layer.alert('重新启动', {
                skin: 'layui-layer-lan'
                ,closeBtn: 2
                ,anim: 1 //动画类型
            },function(){
                layer.closeAll();
                $.ajax({
                    type: "POST",
                    xhrFields: {withCredentials: true},
                    url: url + "fname=system&opt=setting&function=set&action=reboot",
                    success: function (data) {
                        var ret = JSON.parse(data);
                        if(ret.error==0){
                        }else{
                        }
                    }, complete: function (XHR, TS) {
                        XHR = null;
                    }, error: function (XHRequest, status, data) {
                        console.log(status);
                    }
                });

            });
        }

        //注销
        function loginout(){
            layer.alert('退出登录', {
                skin: 'layui-layer-lan'
                ,closeBtn: 2
                ,anim: 1 //动画类型
            },function(){
                layer.closeAll();
                setTimeout(function () {
                    $.cookie('lstatus', false, {path: '/'});
                    $.cookie('usrid', null);
                    document.location = "login.html";
                }, 3000);
            });

        }



    });


});