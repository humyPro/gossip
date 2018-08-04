var flag = true;
$(function () {

   /* var numReg = new RegExp("^\d+$","g");
    var atReg = /^((?!@).)*$/g;*/
    $("input[name='username']").blur(function () {
        var username = $(this).val();
        username = username.trim();
        var test_username=/^((?!@).)*$/g.test(username);
        if (/^\d+$/g.test(username)) {
            flag = flag & false;
            $("#span_1").html("用户名不能为纯数字").css({"float": "right", "color": "red"});
        } else if (!test_username) {
            flag = flag & false;
            $("#span_1").html("用户名不能有@").css({"float": "right", "color": "red"});
        }else if (username.length < 6 || username.length > 15) {
            flag = flag & false;
            $("#span_1").html("请输入6-15位字符").css({"float": "right", "color": "red"});
        } else {
            //flag = flag & true;
            $("#span_1").html("");
        }
    });
    var pw = 0;
    $("input[name='password']").blur(function () {

        var password = $(this).val();
        password = password.trim();
        pw = password;
        if (password.length < 6) {
            flag = flag & false;
            $("#span_2").html("至少6位字母或数字").css({"float": "right", "color": "red"});
        } else {
           // flag = flag & true;
            $("#span_2").html("");
        }
    });
    $("input[name='password2']").blur(function () {
        var password2 = $(this).val();
        password2 = password2.trim();
        if (password2 != pw) {
            flag = flag & false;
            $("#span_3").html("密码不一致").css({"float": "right", "color": "red"});
        } else {
           // flag = flag & true;
            $("#span_3").html("");
        }
    });
    $("input[name='phone']").blur(function () {
        var phone = $(this).val();
        phone = phone.trim();
        var testPhone=/^\d+$/g.test(phone);
        if (phone.length < 11 || !testPhone) {
            flag = flag & false;
            $("#span_4").html("请输入正确的电话号码").css({"float": "right", "color": "red"});
        } else {
            //flag = flag & true;
            $("#span_4").html("");
        }
    });
    $("input[name='email']").blur(function () {
        var email = $(this).val();
        email = email.trim();
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if (!reg.test(email)) {
            flag = flag & false;
            $("#span_5").html("请输入正确的邮箱地址").css({"float": "right", "color": "red"});
        } else {
            //flag = flag & true;
            $("#span_5").html("");
        }
    });

    $("#register form").submit(function () {

        return register();
    });
});

function register() {
    var username = $("input[name='username']").val();
    var password = $("input[name='password']").val();
    var password2 = $("input[name='password2']").val();
    var phone = $("input[name='phone']").val();
    var email = $("input[name='email']").val();

    if (username.length == 0) {
        flag = flag & false;
        $("#span_1").html("用户名不能为空").css({"float": "right", "color": "red"});
    }
    if (password.length == 0) {
        flag = flag & false;
        $("#span_2").html("密码不能为空").css({"float": "right", "color": "red"});
    }
    if (password2.length == 0) {
        flag = flag & false;
        $("#span_3").html("确认密码不能为空").css({"float": "right", "color": "red"});
    }
    if (phone.length == 0) {
        flag = flag & false;
        $("#span_4").html("电话号码不能为空").css({"float": "right", "color": "red"});
    }
    if (phone.length == 0) {
        flag = flag & false;
        $("#span_5").html("邮箱地址不能为空").css({"float": "right", "color": "red"});
    }
    if (flag == false) {
        $("#span_1").html("");
        $("#span_1").html("请正确填写注册信息").css({"float": "right", "color": "red"});
    } else {
        $.ajax({//注册
            url: "/user/register",
            type: "post",
            dataType: "json",
            data: {"username": username, "password": password, "phone": phone, "email": email},
            success: function (result) {
                if (result.status == 200) {
                    alert("注册成功!O(∩_∩)O哈哈~");
                } else {
                    alert("注册失败，请稍后重试_(:зゝ∠)_");
                }
                location.reload();
            },
            error: function () {
                alert("请求失败 ┗( T﹏T )┛");
            }

        });
    }
    return false;
}

function spaceTest(str) {
    if (str.indexOf(" ") >= 0) {
        return false;
    } else {
        return true;
    }
}
