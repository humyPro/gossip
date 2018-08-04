package com.gossip.login.controller;

import com.gossip.login.controller.service.UserService;
import com.gossip.login.vo.SysResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @Author humy
 * @Date 2018/8/2 - 15:57
 */
@Controller
public class Person {
    @GetMapping("person")
    public String person(){
        return "person";
    }

    @Autowired
    private UserService userService;
    @PostMapping("/user/fileupload/{ticket}")
    public String fileUpload(@PathVariable String ticket, MultipartFile picture, HttpServletRequest request, HttpServletResponse response){

        String image=userService.changeHeadPic(ticket,picture,request,response);
        return image;
    }
}
