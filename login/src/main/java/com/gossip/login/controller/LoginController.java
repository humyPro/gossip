package com.gossip.login.controller;

import com.gossip.login.entity.User;
import com.gossip.login.util.CookieUtils;
import com.gossip.login.vo.SysResult;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


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
    public SysResult login(User user, HttpServletRequest request, HttpServletResponse response){
        System.out.println(user);
        if(user.getHeadpic()==null){
            System.out.println("假装做了数据校验 ");
        }
        //return SysResult.build(1, "失败");
        CookieUtils.setCookie(request, response, "USER_TICKET", "asdsadsad");
        user.setUsername("行止由风");
        user.setId(100L);
        return SysResult.oK(user);
    }
    @GetMapping("user/{ticket}")
    public String goHone(@PathVariable String ticket){
        System.out.println(ticket);
        return "person";
    }
}
