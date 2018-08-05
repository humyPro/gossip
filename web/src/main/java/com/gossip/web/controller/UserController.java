package com.gossip.web.controller;

import com.gossip.common.vo.SysResult;
import com.gossip.web.pojo.User;
import com.gossip.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @author humy
 * @date 2018/8/4 - 23:11
 */
@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/user/register")
    @ResponseBody
    public SysResult userRegister(User user) {
        // TODO 数据校验，但是前端做了，能防君子

        try {
            int count = userService.register(user);
            if (count == 1)
                return SysResult.oK();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return SysResult.build(201, "注册失败");
    }
    @PostMapping("user/login")
    @ResponseBody
    public SysResult login(User user,HttpServletRequest request, HttpServletResponse response){

        //if redis 上没有ticket 就执行登录逻辑，有就取出ticket返回
        //修改密码后要删除redis上的ticke
        return userService.login(user,request,response);
    }
}
