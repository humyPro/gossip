package com.gossip.login.controller;

import com.gossip.login.entity.User;
import com.gossip.login.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;


/**
 * @Author humy
 * @Date 2018/8/2 - 15:57
 */
@Controller
public class Person {
    @GetMapping("person/{ticket}")
    public String person(@PathVariable String ticket, Model model) {
        String image="/head/2018-05-17_191339.png";
        User user =new User();
        user.setHeadpic(image);
        model.addAttribute("user", user);
        return "person";
    }

    @Autowired
    private UserService userService;

    @Autowired
    ApplicationContext ac;

    @PostMapping("/user/fileupload/{ticket}")
    @ResponseBody
    public String fileUpload(@PathVariable String ticket, @RequestParam("changePic") MultipartFile picture) {
        String image = userService.changeHeadPic(ticket, picture);
        System.out.println(image);
        return image;
    }


    @GetMapping("test")
    public String test(Model model){
        String image="/head/12114ca4ba7dde9d0400c54d23a1d5de.jpg";
        User user =new User();
        user.setHeadpic(image);
        model.addAttribute("user", user);
        return "testhtml";
    }






}




