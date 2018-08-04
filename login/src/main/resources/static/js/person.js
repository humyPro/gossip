$(function () {
    var ticket = $.cookie("USER_TICKET");
    $("#uploadForm").submit(function () {
        doFileUpload(ticket);

       //

        return false;
    });

});


function doFileUpload(ticket) {
    $.ajaxFileUpload({
        url:"/user/fileupload/"+ticket,
        fileElementId:'changePic',
        type:'post',
        secureuri: false,   //是否启用安全提交，默认为false。
        async : true,   //是否是异步
        dataType:'text',
        success:function (data) {
            if(!$.isEmptyObject(data)) {
                $(".touXiang").attr("src", data);
                $("#head_upload").modal("hide");
            }else{
                alert("请选择图片");
            }
        },
        error:function (data,status,e) {
            //todo
            alert("请求失败");
        }
    });
}

function image_check(feid) { //自己添加的文件后缀名的验证
    var img = document.getElementById(feid);
    return /.(jpg|png|gif|bmp)$/.test(img.value)?true:(function() {
        modals.info('图片格式仅支持jpg、png、gif、bmp格式，且区分大小写。');
        return false;
    })();
}