package com.gossip.web.controller;

import com.gossip.common.vo.SysResult;
import com.gossip.web.pojo.User;
import com.gossip.web.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

/**
 * @author humy
 * @date 2018/8/4 - 23:11
 */
@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("user/register")
    public SysResult userRegister(User user){
        // TODO 数据校验，但是前端做了，能防君子
        userService.register(user);

        return  null;
    }
}
