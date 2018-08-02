$(function(){

    $("input[name='username']").blur(function () {
        var username=$(this).val();
        if(username.length<6||username.length>15){
            $("#span_1").html("6-15位字母或数字").css({"float":"right","color":"red"});
        }else{
            $("#span_1").html("");
        }
    });
    var pw=0;
    $("input[name='password']").blur(function () {
        var password=$(this).val();
        pw=password;
        if(password.length<6){
            $("#span_2").html("至少6位字母或数字").css({"float":"right","color":"red"});
        }else{
            $("#span_2").html("");
        }
    });
    $("input[name='password2']").blur(function () {
        var password2=$(this).val();
        if(password2!=pw){
            $("#span_3").html("密码不一致").css({"float":"right","color":"red"});
        }else{
            $("#span_3").html("");
        }
    });
    $("input[name='phone']").blur(function () {
        var phone=$(this).val();
        if(phone.length<11){
            $("#span_4").html("请输入正确的电话号码").css({"float":"right","color":"red"});
        }else{
            $("#span_4").html("");
        }
    });
    $("input[name='email']").blur(function () {
        var email=$(this).val();
        var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
        if(!reg.test(email)){
            $("#span_5").html("请输入正确的邮箱地址").css({"float":"right","color":"red"});
        }else{
            $("#span_5").html("");
        }
    });

    $("#register form").submit(function(){

        return register();
    });
});
function register() {
    var username=$("input[name='username']").val();
    var password=$("input[name='password']").val();
    var phone=$("input[name='phone']").val();
    var email=$("input[name='email']").val();

    $.ajax({
        url:"/user/register",
        type:"post",
        dataType:"json",
        data:{"username":username,"password":password,"phone":phone,"email":email},
        success:function (result) {
            if(result.status==200){
                alert("注册成功!O(∩_∩)O哈哈~");
            }else{
                alert("注册失败，请稍后重试_(:зゝ∠)_");
            }
            location.reload();
        },
        error:function () {
            alert("请求失败 ┗( T﹏T )┛");
        }

    });
    return false;
}