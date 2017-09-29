$(document).ready(function(){

    //var url = "http://"+document.domain+":"+window.location.port+"/cgi-bin/router.csp?";

    var url = "http://192.168.11.1/cgi-bin/router.csp?";

    var self = new Object();


    self.login = function(){
        var name ="admin";
        var str =$('.login_input_pwd').val();
        var pwd =md5(name+str);
        $.ajax({
            type: "POST",
            xhrFields: {withCredentials: true},
            url: url + "fname=system&opt=login&function=set&usrid=" + pwd,
            success: function (data) {
                var ret = JSON.parse(data);
                if(ret.error==0){
                    layer.msg('登录成功', {time: 3000, icon:6});
                    $.cookie('lstatus', true);
                    $.cookie('usrid', pwd);
                    window.location.assign('index.html');
                }else{
                    layer.msg('密码错误', {time: 3000, icon:5});
                }
            }, complete: function (XHR, TS) {
                XHR = null;
            }, error: function (XHRequest, status, data) {
                console.log(status);
            }
        });
    };

$('.my-btn-login').click(function(){

    self.login();

});


});