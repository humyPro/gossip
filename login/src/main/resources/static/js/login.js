$(function () {

    $("input").click(function () {
        $("#login_1").html("");
    });

    //每次加载login.html页面的时候，都要取出cookie中的账号和密码
   if(getCookie("remember")!=null){
       //如果cookie中不为空，则默认勾选记住我
       $("input[name='login_rem']")[0].checked=true;
   }

    $("input[name='login_username']").val(getCookie("remember"));
    $("#login_form").submit(function () {
        return login();
    });
    //登录成功后页面变化


});
function login() {
    var login_key=$("input[name='login_username']").val().trim();
    var password=$("input[name='login_password']").val().trim();

    var flag=true;
    if(login_key.length<=0){
        flag=flag&false;
        $("#login_1").html("账号不能为空").css({"float":"right","color":"red"});
    }else{
        $("#login_1").html("");
    }
    if(password.length<=0){
        flag=flag&false;
        $("#login_2").html("密码不能为空").css({"float":"right","color":"red"});
    }else{
        $("#login_2").html("");
    }
//判断key是用户名还是邮箱还是电话号码
    var numReg=/^\d+$/g;
    var emailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$","g");
    var data;
    //不知道为什么，在if中判断失效，只能写在外面
    var isPhone=numReg.test(login_key);
    if(emailReg.test(login_key)){
        var email=login_key;
        data={"email":email,"password":password};

    }else if(isPhone) {
        var phone = login_key;
        data = {"phone": phone, "password": password};
    }else{
        var username=login_key;
        data={"username":username,"password":password};
    }

    if(flag) {
        $.ajax({//登录
            url: "/user/login",
            type: "post",
            dataType: "json",
            data: data,//前端已经判断好了，如果是邮箱，data就只封装了邮箱和密码
            success: function (result) {
                if (result.status == 200) {
                    //addcookie();
                    $("#login_1").html("");
                    var rem = $("input[name='login_rem']").get(0).checked;
                    if (rem == true) {
                        addCookie("remember", username, 300);
                    } else {
                        delCookie("remember");
                    }
                    location.reload();
                } else {
                    $("#login_1").html("用户名或密码错误").css({"float": "right", "color": "red"});
                }

            },
            error: function () {
                alert("请求失败！(｡˘•ε•˘｡)(｡˘•ε•˘｡)");
            }

        });
    }
    return false;
}

// function spaceTest(str) {
//     if (str.indexOf(" ") >= 0) {
//         return false;
//     } else {
//         return true;
//     }
// }