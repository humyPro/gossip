package com.gossip.sso.controller;

import com.fasterxml.jackson.databind.util.JSONPObject;
import com.gossip.common.vo.SysResult;
import com.gossip.sso.pojo.User;
import com.gossip.sso.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * @author humy
 * @date 2018/8/5 - 0:04
 */
@Controller

public class UserController {
    @Autowired
    private UserService UserService;

    @PostMapping("/user/register")
    @ResponseBody
    public int register(User user) {
       return userService.register(user);
    }

    @GetMapping("/hello")
    @ResponseBody
    public String hello(String name) {

        return "hello," + name;

    }

    @Autowired

    private UserService userService;

    @GetMapping("/user/check/{param}/{type}")
    @ResponseBody
    public JSONPObject check(@PathVariable String param, @PathVariable Integer type, String callback) {
        System.out.println("检查重名"+callback);
        Boolean exists = userService.check(param, type);
        JSONPObject result = new JSONPObject(callback, SysResult.oK(exists));
        return result;
    }

    @PostMapping("/user/login")
    @ResponseBody
    public String login(User user){
        String ticket=userService.login(user);
        return ticket;
    }
}
