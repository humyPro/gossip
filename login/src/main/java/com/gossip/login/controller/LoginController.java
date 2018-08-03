package com.gossip.login.controller;

import com.gossip.login.entity.User;
import com.gossip.login.vo.SysResult;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;


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
    public SysResult register(User user){
        //对user做处理，保存到数据库中
        return SysResult.oK();
    }
    @PostMapping("/user/login")
    @ResponseBody
    public SysResult login(User user){
        System.out.println(user);
        if(user.getHeadpic()==null){
            System.out.println("ahahhah ");
        }
        //return SysResult.build(1, "失败");
        return SysResult.oK();
    }
}
