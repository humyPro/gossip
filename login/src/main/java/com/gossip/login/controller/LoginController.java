package com.gossip.login.controller;

import com.gossip.login.entity.User;
import com.gossip.login.vo.SysResult;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;


/**
 * @Author humy
 * @Date 2018/8/2 - 10:18
 */
@Controller
public class LoginController {
    @GetMapping("/index")
    public String main(Model model){
        return "index";
    }
    @GetMapping("/login")
    public String login(Model model){
        return "login_bar";
    }

    @PostMapping("/user/register")
    @ResponseBody
    public SysResult login(User user){
        System.out.println("请求成功");
        System.out.println(user);
        return SysResult.oK();
    }
}
