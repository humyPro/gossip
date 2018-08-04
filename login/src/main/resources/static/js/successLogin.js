



$(function () {
    var ticket = $.cookie("USER_TICKET");
    if (ticket.length != 0) {
        changeMeau(ticket);
    }
});

function changeMeau(ticket) {
    $("#meau_bar").html(
        "<ul class=\"layui-nav pull-left\">" +
        "<li class=\"layui-nav-item layui-this\"><a href=\"index\">首页</a></li>" +
        "<li class=\"layui-nav-item\"><a href=\"message.html\">留言</a></li>" +
        "<li class=\"layui-nav-item\"><a href=\"about.html\">关于</a></li>" +
        "<li class=\"layui-nav-item\">" +
        "</li>" +
        "</ul>" +
        /*图片需要换乘user.headpic*/
        "<a href=\"/person/" + ticket + "\">" +
        "<img class=\"last_mouse\" src=\"/head/12114ca4ba7dde9d0400c54d23a1d5de.jpg\">" +
        "</a>"
    );
    //鼠标悬停时样式变化
    $(".last_mouse").mouseover(function () {
        $(this).addClass("get_mouse");
    });
    //鼠标离开时样式变化
    $(".last_mouse").mouseout(function () {
        $(this).removeClass("get_mouse");
    });
    //鼠标点击时进入首页
}