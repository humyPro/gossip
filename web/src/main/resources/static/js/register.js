$(function () {
    var flag = true;
    var f1, f2, f3, f4, f5;
    /* var numReg = new RegExp("^\d+$","g");
     var atReg = /^((?!@).)*$/g;*/
    $("input[name='username']").blur(function () {
        var username = $(this).val();
        username = username.trim();
        var test_username = /^((?!@).)*$/g.test(username);
        //替换汉字验证长度
        var repName = username.replace(/[\u4e00-\u9fa5]/g, "aa");

        if (/^\d+$/g.test(username)) {
            $("#span_1").html("用户名不能为纯数字").css({"float": "right", "color": "red"});
            f1 = false;
        } else if (!test_username) {
            f1 = false;
            $("#span_1").html("用户名不能有@").css({"float": "right", "color": "red"});
        }
        else if (repName.length < 6 || repName.length > 15) {
            f1 = false;
            $("#span_1").html("请输入6-15位字符,或最多7个汉字").css({"float": "right", "color": "red"});
        } else {

            $("#span_1").html("");
            f1= doJSONP(username, 1);
        }
    });
    var pw = 0;
    $("input[name='password']").blur(function () {

        var password = $(this).val();
        password = password.trim();
        pw = password;
        if (password.length < 6) {
            f2 = false;
            $("#span_2").html("至少6位字母或数字").css({"float": "right", "color": "red"});
        } else {
            $("#span_2").html("");
            f2 = true;
        }
    });
    $("input[name='password2']").blur(function () {
        var password2 = $(this).val();
        password2 = password2.trim();
        if (password2 != pw) {
            $("#span_3").html("密码不一致").css({"float": "right", "color": "red"});
            f3 = false;
        } else {
            $("#span_3").html("");
            f3 = true;
        }
    });
    $("input[name='phone']").blur(function () {
        var phone = $(this).val();
        phone = phone.trim();
        var testPhone = /^\d+$/g.test(phone);
        if (phone.length < 11 || !testPhone) {
            $("#span_4").html("请输入正确的电话号码").css({"float": "right", "color": "red"});
            f4 = false;
        } else {
            $("#span_4").html("");
            f4 = doJSONP(phone, 2);
        }
    });
    $("input[name='email']").blur(function () {
        var email = $(this).val();
        email = email.trim();
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (!reg.test(email)) {
            $("#span_5").html("请输入正确的邮箱地址").css({"float": "right", "color": "red"});
            f5 = false;
        } else {
            //flag = flag & true;
            $("#span_5").html("");
            f5 = doJSONP(email, 3);
        }
    });

    $("#register form").submit(function () {
        var username = $("input[name='username']").val().trim();
        var password = $("input[name='password']").val().trim();
        var password2 = $("input[name='password2']").val().trim();
        var phone = $("input[name='phone']").val().trim();
        var email = $("input[name='email']").val().trim();
        var newFlag = flag && f1 && f2 && f3 && f4 && f5;
        if (username.length == 0) {
            newFlag = newFlag && false;
            $("#span_1").html("用户名不能为空").css({"float": "right", "color": "red"});
        }
        if (password.length == 0) {
            newFlag = newFlag && false;
            $("#span_2").html("密码不能为空").css({"float": "right", "color": "red"});
        }
        if (password2.length == 0) {
            newFlag = newFlag && false;
            $("#span_3").html("确认密码不能为空").css({"float": "right", "color": "red"});
        }
        if (phone.length == 0) {
            newFlag = newFlag && false;
            $("#span_4").html("电话号码不能为空").css({"float": "right", "color": "red"});
        }
        if (email.length == 0) {
            newFlag = newFlag && false;
            $("#span_5").html("邮箱地址不能为空").css({"float": "right", "color": "red"});
        }

        if (newFlag == false) {
            $("#span_1").html("");
            $("#span_1").html("请正确填写注册信息").css({"float": "right", "color": "red"});
        } else {
            register(username,password,phone,email);//满足所有条件才能注册
        }
        return false;

    });
});

function register(username,password,phone,email) {
    $.ajax({//注册
        url: "/user/register",
        type: "post",
        dataType: "json",
        data: {"username": username, "password": password, "phone": phone, "email": email},
        success: function (result) {
            //alert("清奇成功");
            if (result.status == 200) {
                alert("注册成功!O(∩_∩)O哈哈~");
            } else {
                alert("注册失败，请稍后重试_(:зゝ∠)_");
            }
            //location.reload();
        },
        error: function () {
            alert("请求失败 ┗( T﹏T )┛");
        }

    });
}

function spaceTest(str) {
    if (str.indexOf(" ") >= 0) {
        return false;
    } else {
        return true;
    }
}


function doJSONP(param, type) {
    var f=true;
    var msg = "";
    var num = 1;//<span>标签id
    if (type == 1) {
        msg = "用户名已存在";
        num = 1;
    } else if (type == 2) {
        msg = "电话号码已被注册";
        num = 4;
    } else if (type == 3) {
        msg = "邮箱已被注册";
        num = 5;
    }
    $.ajax({
        url: 'http://sso.gossip.com/user/check/' + param + "/" + type,//可以不是本地域名
        type: 'get',
        catch: false,
        dataType: 'jsonp',  //jsonp格式访问
        jsonp: "callback", //这里定义了callback的参数名称，以便服务获取callback的函数名即getMessage
        jsonpCallback: 'getMessage', //获取数据的函数
        success: function (data) {
            if (data.data == true) {
                $("#span_" + num).html(msg).css({"float": "right", "color": "red"});
                f=false;
            } else {
                $("#span_" + num).html("");
                f=true;
            }
        },
        error: function () {
            alert("服务器异常，请求失败");
        }
    });
    return f;

}